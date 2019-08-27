// ==UserScript==
// @name         WME E50
// @version      0.0.4
// @description  Get POI information from external sources
// @author       Anton Shevchuk
// @license      MIT License
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @exclude      https://beta.waze.com/user/editor*
// @grant        none
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require      https://greasyfork.org/scripts/389117-wme-api-helper/code/WME%20API%20Helper.js?version=727077
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

/* jshint esversion: 6 */
/* global require, $, window, W, I18n, OL, APIHelper, WazeWrap */
(function () {
  'use strict';

  let helper, panel;
  let vectorLayer, vectorPoint, vectorLine;

  const NAME = 'E50';

  // translation structure
  const TRANSLATION = {
    'en': {
      title: 'Information'
    },
    'uk': {
      title: 'Інформація'
    },
    'ru': {
      title: 'Информация'
    }
  };

  // OpenLayer styles

  APIHelper.bootstrap();
  APIHelper.addTranslation(NAME, TRANSLATION);
  APIHelper.appendStyle(
    '.e50 legend { cursor:pointer; font-size: 12px; font-weight: bold; width: auto; text-align: right; border: 0; margin: 0; padding: 0 8px; }' +
    '.e50 fieldset { border: 1px solid #ddd; padding: 4px; }' +
    '.e50 ul { padding: 0; margin: 0 }' +
    '.e50 li { padding: 0; margin: 0; list-style: none; margin-bottom: 2px }' +
    '.e50 li a { display: block; padding: 2px 4px; text-decoration: none; border: 1px solid #e4e4e4; }' +
    '.e50 li a:hover { background: #ddd }'
  );

  class Provider {
    constructor(uid) {
      this.uid = uid;
    }

    request() {
      throw new Error('Abstract method');
    }

    search(lon, lat) {
      try {
        let params = {
          lon: lon,
          lat: lat,
        };
        this.request(params);
      } catch (e) {
        console.error(e);
      }
    }

    panel(parent) {
      let div = document.createElement('div');
      div.id = 'E50-' + this.uid;
      this.container = div;
      parent.append(this.container);
    }

    collection(results) {
      let fieldset = document.createElement('fieldset');
      let list = document.createElement('ul');
      list.style.display = results.length > 2 ? 'none' : 'block';

      for (let i = 0; i < results.length; i++) {
        let item = document.createElement('li');
            item.append(this.item(results[i]));
        list.append(item);
      }

      let legend = document.createElement('legend');
      legend.innerHTML = this.uid + ' [' + results.length + ']';
      legend.onclick = function () {
        $(this).next().toggle();
        return false;
      };
      fieldset.append(legend, list);
      this.result(fieldset);
    }

    /**
     * Should return {DocumentElement} link
     * @param res
     */
    item(res) {
      throw new Error('Abstract method');
    }

    result(item) {
      this.container.append(item);
      return this;
    }

    link(lon, lat, street, number, name = null) {
      let a = document.createElement('a');
          a.href = '#';
          a.dataset.lat = lat;
          a.dataset.lon = lon;
          a.dataset.street = street;
          a.dataset.number = number;
          a.dataset.name = name;
          a.innerHTML = [street, number, name].filter(x => !!x).join(', ');
          a.className = NAME + '-link';
      return a;
    }
  }

  /**
   * Open Street Map
   */
  class OsmProvider extends Provider {
    request(params) {
      let url = 'https://nominatim.openstreetmap.org/reverse';
      let data = {
        lon: params.lon,
        lat: params.lat,
        zoom: 18,
        addressdetails: 1,
        countrycodes: 'ua',
        'accept-language': 'uk_UA',
        format: 'json',
      };
      let self = this;

      $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
        error: function () {
        },
        success: function (response) {
          if (!response.address) {
            return;
          }
          console.log(response);

          self.collection([response]);
        }
      });
    }
    item(res) {
      let output = [];
      let street = null;
      let number = null;
      if (res.address.road) {
        street = res.address.road;
      }
      if (res.address.house_number) {
        number = res.address.house_number;
      } else {
        output.push(res.display_name.split(', ', 1));
      }
      return this.link(res.lon, res.lat, street, number, output.join(', '));
    }
  }

  /**
   * 2GIS
   * @link http://catalog.api.2gis.ru/doc/2.0/geo/#/default/get_2_0_geo_search
   */
  class GisProvider extends Provider {
    request(params) {
      let url = 'https://catalog.api.2gis.ru/2.0/geo/search';
      let data = {
        point: params.lon + ',' + params.lat,
        radius: 20,
        type: 'building',
        fields: 'items.address,items.geometry.centroid',
        locale: 'uk_UA',
        format: 'json',
        key: 'rubnkm' + '7490',
      };
      let self = this;

      $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
        error: function () {
        },
        success: function (response) {
          if (!response.result || !response.result.items.length) {
            return;
          }
          console.log(response.result);
          self.collection(response.result.items);
        }
      });
    }

    item(res) {
      let output = [];
      let street = null;
      let number = null;
      if (res.address.components) { // optional
        street = res.address.components[0].street;
        number = res.address.components[0].number;
      } else if (res.address_name) { // optional
        output.push(res.address_name);
      } else if (res.name) {
        output.push(res.name);
      }
      // e.g. POINT(36.401143 49.916814)
      let center = res.geometry.centroid.substring(6, res.geometry.centroid.length - 1).split(' ');
      let lon = center[0];
      let lat = center[1];

      let link = this.link(lon, lat, street, number, output.join(', '));
      if (res.purpose_name) {
        link.title = res.purpose_name;
      }
      return link;
    }
  }

  /**
   * Yandex Maps
   */
  class YMProvider extends Provider {
    request(params) {
      let url = 'https://geocode-maps.yandex.ru/1.x/';
      let data = {
        geocode: params.lon + ',' + params.lat,
        kind: 'house',
        results: 2,
        lang: 'uk_UA',
        format: 'json',
        apikey: '2fe62c0e' + '-580f-4541-b325-' + '7c896d8d9481',
      };
      let self = this;

      $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
        error: function () {
          console.error('Yandex Maps Request Error');
        },
        success: function (response) {
          if (!response.response || !response.response.GeoObjectCollection.featureMember.length) {
            return;
          }
          console.log(response.response);
          self.collection(response.response.GeoObjectCollection.featureMember);
        }
      });
    }

    item(res) {
      res = res.GeoObject;
      let center = res.Point.pos.split(' ');
      let lon = center[0];
      let lat = center[1];
      let street = null;
      let number = null;
      if (res.metaDataProperty.GeocoderMetaData.Address.Components) {
        for (let el in res.metaDataProperty.GeocoderMetaData.Address.Components) {
          if (res.metaDataProperty.GeocoderMetaData.Address.Components[el]['kind'] === 'street') {
            street = res.metaDataProperty.GeocoderMetaData.Address.Components[el]['name'];
          }
          if (res.metaDataProperty.GeocoderMetaData.Address.Components[el]['kind'] === 'house') {
            number = res.metaDataProperty.GeocoderMetaData.Address.Components[el]['name'];
          }
        }
      }
      let link = this.link(
        lon,
        lat,
        street,
        number
      );
      link.title = res.name;
      return link;
    }
  }

  /**
   * Here Maps
   * @link https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html
   * https://geocoder.api.here.com/6.2/geocode.json?app_id=GCFmOOrSp8882vFwTxEm&app_code=O-LgGkoRfypnRuik0WjX9A&searchtext=425+W+Randolph+Chicago
   * https://reverse.geocoder.api.here.com/6.2/reversegeocode.json?app_id=GCFmOOrSp8882vFwTxEm&app_code=O-LgGkoRfypnRuik0WjX9A&prox=49.929648517086314,36.433346448823414,10&mode=retrieveAddresses&locationattributes=none,ar&addressattributes=str,hnr
   */
  class HereProvider extends Provider {
    request(params) {
      let url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json';
      let data = {
        app_id: 'GCFmOOrSp8882vFwTxEm',
        app_code: 'O-LgGkoRfypnRuik0WjX9A',
        prox: params.lat + ',' + params.lon + ',10',
        mode: 'retrieveAddresses',
        locationattributes: 'none,ar',
        addressattributes: 'str,hnr'
      };

      let self = this;

      $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
        error: function () {
        },
        success: function (response) {
          if (!response.Response || !response.Response.View || !response.Response.View
            || !response.Response.View[0] || !response.Response.View[0].Result) {
            return;
          }
          let results = response.Response.View[0].Result;
          results = results.filter(x => x.MatchLevel === 'houseNumber');
          if (!results.length) {
            return;
          }
          console.log(results);
          self.collection(results);
        }
      });
    }

    item(res) {
      return this.link(
        res.Location.DisplayPosition.Longitude,
        res.Location.DisplayPosition.Latitude,
        res.Location.Address.Street,
        res.Location.Address.HouseNumber
      );
    }
  }

  /**
   * Map Quest
   * @link https://developer.mapquest.com/documentation/
   * http://open.mapquestapi.com/geocoding/v1/reverse?key=HFk67kfdVFGRYDtlFTRNoDUfHu1HwgEa&location=30.333472,-81.470448
   */
  class MQProvider extends Provider {

  }

  /**
   * Google Place
   * @link https://developers.google.com/places/web-service/search
   */
  class GPProvider extends Provider {
    request(params) {
      let url = 'https://www.waze.com/maps/api/place/nearbysearch/json';
      let data = {
        location: params.lat + ',' + params.lon,
        radius: 40,
        fields: 'geometry,formatted_address',
        types: 'point_of_interest',
        language: 'ua',
        key: 'AIzaSy' + 'CebbES' + 'rWERY1MRZ56gEAfpt7tK2R6hV_I', // extract it from WME
      };
      let self = this;

      $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
        error: function () {
        },
        success: function (response) {
          if (!response.results || !response.results.length) {
            return;
          }
          console.log(response.results);
          self.collection(response.results);
        }
      });
    }

    item(res) {
      return this.link(
        res.geometry.location.lng,
        res.geometry.location.lat,
        null,
        null,
        res.name + ', ' + res.vicinity
      );
    }
  }

  $(document)
    .on('ready.apihelper', ready)
    .on('landmark.apihelper', '#edit-panel', landmarkPanel)
    .on('click', '.' + NAME + '-link', applyData)
    .on('mouseenter', '.' + NAME + '-link', showVector)
    .on('mouseleave', '.' + NAME + '-link', hideVector)
  ;

  function ready() {
    console.info('@ready');

    helper = new APIHelperUI(NAME);

    panel = helper.createPanel(I18n.t(NAME).title);

    vectorLayer = new OL.Layer.Vector("E50VectorLayer", {
      displayInLayerSwitcher: false,
      uniqueName: "__E50VectorLayer"
    });
    W.map.addLayer(vectorLayer);
  }

  function landmarkPanel(event, element) {
    console.info('@landmark');

    let group = panel.toHTML();

    let selected = APIHelper.getSelectedVenues()[0].geometry.getCentroid().clone();
    selected.transform('EPSG:900913', 'EPSG:4326');

    let Osm = new OsmProvider('OSM');
    Osm.panel(group);
    Osm.search(selected.x, selected.y);

    let Gis = new GisProvider('2Gis');
    Gis.panel(group);
    Gis.search(selected.x, selected.y);

    let Yandex = new YMProvider('Yandex');
    Yandex.panel(group);
    Yandex.search(selected.x, selected.y);

    let Here = new HereProvider('Here');
    Here.panel(group);
    Here.search(selected.x, selected.y);

    let Google = new GPProvider('Google');
    Google.panel(group);
    Google.search(selected.x, selected.y);

    element.prepend(group);
  }

  function applyData() {
    console.log(this.dataset);
    return false;
  }

  function showVector() {
    let from = APIHelper.getSelectedVenues()[0].geometry.getCentroid();
    let to = new OL.Geometry.Point(this.dataset.lon, this.dataset.lat).transform('EPSG:4326', 'EPSG:900913');
    let distance = Math.round(WazeWrap.Geometry.calculateDistance([to, from]));

    vectorLine = new OL.Feature.Vector(new OL.Geometry.LineString([from, to]), {}, {
      strokeWidth: 4,
      strokeColor: '#fff',
      strokeLinecap: 'round',
      strokeDashstyle: 'dash',
      label: distance + 'm',
      labelOutlineColor: '#000',
      labelOutlineWidth: 3,
      labelAlign: 'cm',
      fontColor: '#fff',
      fontSize: '24px',
      fontFamily: 'Courier New, monospace',
      fontWeight: 'bold',
      labelYOffset: 24
    });
    vectorPoint = new OL.Feature.Vector(to, {}, {
      pointRadius: 8,
      fillOpacity: 0.5,
      fillColor: '#fff',
      strokeColor: '#fff',
      strokeWidth: 2,
      strokeLinecap: 'round'
    });
    vectorLayer.addFeatures([vectorLine, vectorPoint]);
    vectorLayer.setZIndex(1001);
    vectorLayer.setVisibility(true);
  }

  function hideVector() {
    vectorLayer.removeAllFeatures();
    vectorLayer.setVisibility(false);
  }
})();
