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
    constructor(lat, lon) {
      this.lat = lat;
      this.lon = lon;
    }
    result(item) {
      $('div.form-group.e50 > div.controls').append('<p>' + item + '</p>');
    }
  }

  class GisProvider extends Provider {
    request() {
      let url = 'https://catalog.api.2gis.ru/2.0/geo/search';
      let data = {
        point: this.lon + ',' + this.lat,
        format: 'json',
        fields: 'items.links',
        key: 'rubnkm7490',
        locale: 'uk_UA'
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
          if (!response.result) {
            return;
          }
          // 0 - building
          // 1 - district
          // 2 - city
          console.log(response.result);

          let res = response.result.items[0];
          let output = [];
          if (res.name) {
            output.push(res.name);
          } else {
            output.push(res.address_name);
          }
          if (res.purpose_name) {
            output.push(res.purpose_name);
          }
          self.result('2GIS: ' + output.join(', '));
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
        zoom: 20,
        format: 'json',
        addressdetails: 1,
        countrycodes: 'ua',
        'accept-language': 'uk_UA'
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
          if (response.address.road) {
            output.push(response.address.road);
          }
          if (response.address.house_number) {
            output.push(response.address.house_number);
          }

          self.result('OSM: ' + output.join(', '));
        }
      });
    }
  }

  class GMProvider extends Provider {
    request() {
      let url = 'https://www.waze.com/maps/api/place/nearbysearch/json';
      let data = {
        location: this.lat + ',' + this.lon,
        key: 'AIzaSy' + 'CebbES' + 'rWERY1MRZ56gEAfpt7tK2R6hV_I', // extract it from WME
        language: 'ua'
      };
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
          console.log(response);
        }
      });
    }
  }

  class YMProvider extends Provider {
    request() {
      let url = 'https://geocode-maps.yandex.ru/1.x/';
      let data = {
        geocode: this.lon + ',' + this.lat,
        apikey: '2fe62c0e-580f-4541-b325-7c896d8d9481',
        kind: 'house',
        results: 1,
        format: 'json',
        lang: 'uk_UA'
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

          let output = [];
          self.result('Ya: ' + response.response.GeoObjectCollection.featureMember[0].GeoObject.name);
        }
      });
    }
  }

  $(document)
    .on('ready.apihelper', ready)
    .on('landmark.apihelper', '#edit-panel', landmarkPanel);


  function ready() {
    console.info('@ready');

    helper = new APIHelperUI(NAME);

    panel = helper.createPanel(I18n.t(NAME).title);
  }

  function landmarkPanel(event, element) {
    console.info('@landmark');

    let selected = APIHelper.getSelectedVenues()[0].geometry.getCentroid().clone();
    selected.transform('EPSG:3857', 'EPSG:4326');
    let position = new OpenLayers.LonLat(selected.x, selected.y);

    let Gis = new GisProvider(position.lat, position.lon);
    Gis.request();

    let Osm = new OsmProvider(position.lat, position.lon);
    Osm.request();

    //let Yandex = new YMProvider(position.lat, position.lon);
    //Yandex.request();

    let Google = new GMProvider(position.lat, position.lon);
    Google.request();

    let group = panel.toHTML();
    element.prepend(group);
  }
})();
