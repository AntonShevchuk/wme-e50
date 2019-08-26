// ==UserScript==
// @name         WME E50
// @version      0.0.2
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

  APIHelper.bootstrap();
  APIHelper.addTranslation(NAME, TRANSLATION);

  class Provider {
    constructor(lon, lat) {
      this.lon = lon;
      this.lat = lat;
    }
    request() {
      throw new Error('Abstract method');
    }
    search() {
      try {
        this.request();
      } catch (e) {
        console.error(e);
      }
    }
    link(lat, lon, street, number, name = null) {
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
    result(prefix, item, postfix = '<br/>') {
      $('div.form-group.e50 > div.controls').append(prefix).append(item).append(postfix);
    }
  }

  /**
   * @link http://catalog.api.2gis.ru/doc/2.0/geo/#/default/get_2_0_geo_search
   */
  class GisProvider extends Provider {
    request() {
      let url = 'https://catalog.api.2gis.ru/2.0/geo/search';
      let data = {
        point: this.lon + ',' + this.lat,
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
          // 0 - building
          // 1 - district
          // 2 - city
          console.log(response.result);

          for (let i = 0; i < response.result.items.length; i++) {
            let res = response.result.items[i];
            let output = [];
            let street = null;
            let number = null;
            if (res.address.components) {
              street = res.address.components[0].street;
              number = res.address.components[0].number;
            } else if (res.address_name) {
              output.push(res.address_name);
            }
            if (res.purpose_name) {
              output.push(res.purpose_name);
            }

            let center = res.geometry.centroid.substring(6, res.geometry.centroid.length-1).split(' ');
            let lon = center[0];
            let lat = center[1];

            let link = self.link(lat, lon, street, number, output.join(', '));
            self.result('2GIS: ', link);
          }
        }
      });
    }
  }
  class OsmProvider extends Provider {
    request() {
      let url = 'https://nominatim.openstreetmap.org/reverse';
      let data = {
        lon: this.lon,
        lat: this.lat,
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

          let output = [];
          let street = null;
          let number = null;
          if (response.address.road) {
            street = response.address.road;
            output.push(street);
          }
          if (response.address.house_number) {
            number = response.address.house_number;
            output.push(number);
          }

          let link = self.link(response.lat, response.lon, street, number, output.join(', '));
          self.result('OSM: ', link);
        }
      });
    }
  }

  /**
   * @link https://developers.google.com/places/web-service/search
   */
  class GMProvider extends Provider {
    request() {
      let url = 'https://www.waze.com/maps/api/place/nearbysearch/json';
      let data = {
        location: this.lat + ',' + this.lon,
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
        error: function() {
        },
        success: function(response) {
          if (!response.results || !response.results.length) {
            return;
          }
          console.log(response.results);
          for (let i = 0; i < response.results.length; i++) {
            let res = response.results[i];
            let link = self.link(
                res.geometry.location.lat,
                res.geometry.location.lng,
                null,
                null,
                res.name + ' ' + res.vicinity
            );
            self.result('G: ', link);
          }
        }
      });
    }
  }

  class YMProvider extends Provider {
    request() {
      let url = 'https://geocode-maps.yandex.ru/1.x/';
      let data = {
        geocode: this.lon + ',' + this.lat,
        kind: 'house',
        results: 1,
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
        },
        success: function (response) {
          if (!response.response) {
            return;
          }
          if (!response.response.GeoObjectCollection.featureMember.length) {
            return;
          }
          console.log(response.response);

          self.result('Ya: ', response.response.GeoObjectCollection.featureMember[0].GeoObject.name);
        }
      });
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

    vectorLayer = new OL.Layer.Vector("E50VectorLayer", {displayInLayerSwitcher: false, uniqueName: "__E50VectorLayer"});
    W.map.addLayer(vectorLayer);
  }

  function landmarkPanel(event, element) {
    console.info('@landmark');

    let selected = APIHelper.getSelectedVenues()[0].geometry.getCentroid().clone();
        selected.transform('EPSG:900913', 'EPSG:4326');

    let Gis = new GisProvider(selected.x, selected.y);
        Gis.search();

    let Osm = new OsmProvider(selected.x, selected.y);
        Osm.search();

    //let Yandex = new YMProvider(selected.x, selected.y);
    //    Yandex.search();

    let Google = new GMProvider(selected.x, selected.y);
        Google.search();

    let group = panel.toHTML();
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
