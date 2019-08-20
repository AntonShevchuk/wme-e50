// ==UserScript==
// @name         WME E50
// @version      0.0.1
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
// @require      https://greasyfork.org/scripts/389117-wme-api-helper/code/WME%20API%20Helper.js?version=726604
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

/* jshint esversion: 6 */
/* global require, $, window, WazeWrap, OL, APIHelper */
(function () {
  'use strict';

  let helper, panel;

  // translation structure
  let translation = {
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

                let output = '';
                if (res.purpose_name) {
                    output += res.purpose_name + ', ';
                }
                if (res.name) {
                    output += res.name;
                } else {
                    output += res.address_name;
                }
                self.result('2GIS: ' + output);
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
              'accept-language':  'uk_UA'
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

                  self.result('OSM: ' + response.display_name);
              }
          });
      }
  }

  $(document)
      .on('ready.apihelper', ready)
      .on('landmark.apihelper', '#edit-panel', landmarkPanel);


    function ready() {
        console.info('@ready');

        helper = new APIHelperUI('E50');
        helper.addTranslate(translation);

        panel = helper.createPanel(helper.t().title);
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

        let group = panel.toHTML();
        element.prepend(group);
    }
})();
