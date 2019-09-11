// ==UserScript==
// @name         WME E50 Fetch POI Data
// @version      0.0.29
// @description  Fetch information about the POI from external sources
// @author       Anton Shevchuk
// @license      MIT License
// @grant        none
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @exclude      https://beta.waze.com/user/editor*
// @icon         data:image/png;base64,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
// @require      https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=731051
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require      https://greasyfork.org/scripts/389117-apihelper/code/APIHelper.js?version=729842
// @require      https://greasyfork.org/scripts/389577-apihelperui/code/APIHelperUI.js?version=730559
// @require      https://greasyfork.org/scripts/38421-wme-utils-navigationpoint/code/WME%20Utils%20-%20NavigationPoint.js?version=251067
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

/* jshint esversion: 8 */
/* global require, $, window, console, W, I18n, OL, APIHelper, APIHelperUI, WazeWrap, NavigationPoint, Cache, Settings */
(function () {
  'use strict';

  let helper, tab, modal, panel;
  let vectorLayer, vectorPoint, vectorLine;

  const NAME = 'E50';

  // translation structure
  const TRANSLATION = {
    'en': {
      title: 'Information',
      description: {
        copyData: 'Copy name and address of the selected POI to clipboard',
      },
      options: {
        title: 'Options',
        modal: 'Use modal window',
        entryPoint: 'Create Entry Point if not exists',
        copyData: 'Copy POI data to clipboard on click',
        lock: 'Lock POI to 2 level',
      },
      providers: {
        title: 'Providers',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        yandex: 'Yandex',
      },
      questions: {
        changeName: 'Are you sure to change the name?',
        changeCity: 'Are you sure to change the city?',
        changeStreet: 'Are you sure to change the street name?',
        changeNumber: 'Are you sure to change the house number?',
      }
    },
    'uk': {
      title: 'Інформація',
      description: {
        copyData: 'Копіювати до буферу обміну назву та адресу обраного POI',
      },
      options: {
        title: 'Налаштування',
        modal: 'Використовувати окрему панель',
        entryPoint: 'Створювати точку в\'їзду, якщо відсутня',
        copyData: 'При виборі, копіювати до буферу обміну назву та адресу POI',
        lock: 'Блокувати POI 2-м рівнем',
      },
      providers: {
        title: 'Джерела',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        yandex: 'Яндекс',
      },
      questions: {
        changeName: 'Ви впевненні що хочете змінити им\'я?',
        changeCity: 'Ви впевненні що хочете змінити місто?',
        changeStreet: 'Ви впевненні що хочете змінити вулицю?',
        changeNumber: 'Ви впевненні що хочете змінити номер дома?',
      }
    },
    'ru': {
      title: 'Информация',
      description: {
        copyData: 'Копировать в буфер обмена название и адрес выбранного POI',
      },
      options: {
        title: 'Настройки',
        modal: 'Использовать отдельную панель',
        entryPoint: 'Создавать точку въезда если отсутствует',
        copyData: 'При виборе, копировать в буфер обмена название и адрес POI',
        lock: 'Блокировать POI 2-м уровнем',
      },
      providers: {
        title: 'Источники',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        yandex: 'Яндекс',
      },
      questions: {
        changeName: 'Ви уверены, что хотите изменить имя?',
        changeCity: 'Ви уверены, что хотите изменить город?',
        changeStreet: 'Ви уверены, что хотите изменить улицу?',
        changeNumber: 'Ви уверены, что хотите изменить номер дома?',
      }
    }
  };

  const settings = {
    options: {
      modal: true,
      entryPoint: true,
      copyData: true,
      lock: true,
    },
    providers: {
      osm: true,
      gis: true,
      bing: true,
      here: true,
      google: true,
      yandex: true,
    }
  };

  // OpenLayer styles
  APIHelper.bootstrap();
  APIHelper.addTranslation(NAME, TRANSLATION);
  APIHelper.addStyle(
    '.e50 legend { cursor:pointer; font-size: 12px; font-weight: bold; width: auto; text-align: right; border: 0; margin: 0; padding: 0 8px; }' +
    '.e50 fieldset { border: 1px solid #ddd; padding: 4px; }' +
    '.e50 fieldset.e50 div.controls label { white-space: normal; }' +
    '.e50 ul { padding: 0; margin: 0 }' +
    '.e50 li { padding: 0; margin: 0; list-style: none; margin-bottom: 2px }' +
    '.e50 li a { display: block; padding: 2px 4px; text-decoration: none; border: 1px solid #e4e4e4; }' +
    '.e50 li a:hover { background: #ddd }' +
    '.e50 li a.noaddress { background: rgba(255, 255, 200, 0.5) }' +
    '.e50 li a.noaddress:hover { background: rgba(255, 255, 200, 1) }' +
    '#panel-container .archive-panel .body { overflow-x: auto; max-height: 420px; }'
  );

  let WazeActionMultiAction = require('Waze/Action/MultiAction');
  let WazeActionUpdateObject = require('Waze/Action/UpdateObject');
  let WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress');

  let E50Cache = new Cache();
  let E50Settings = new Settings(NAME, settings);

  /**
   * Basic Provider class
   */
  class Provider {
    constructor(uid) {
      this.uid = uid;
      this.response = [];
      this.panel = document.createElement('div');
      this.panel.id = 'E50-' + this.uid;
      this.panel.className = 'e50';
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @return {Promise<void>}
     */
    async request(lon, lat) {
      throw new Error('Abstract method');
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @return {Promise<void>}
     */
    async search(lon, lat) {
      try {
        let key = this.uid + ':' + lon + ',' + lat;
        if (E50Cache.has(key)) {
          this.response = E50Cache.get(key);
        } else {
          this.response = await this.request(lon, lat);
          E50Cache.set(key, this.response);
        }
        console.log('E50:', this.uid, this.response);
        this.render();
      } catch (e) {
        console.error(e);
      }
    }

    /**
     * @param  {Array} res
     * @return {Array}
     */
    collection(res) {
      let result = [];
      for (let i = 0; i < res.length; i++) {
        result.push(this.item(res[i]));
      }
      return result;
    }

    /**
     * Should return {Object}
     * @param  {Object} res
     * @return {Object}
     */
    item(res) {
      throw new Error('Abstract method');
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @param  {String} city
     * @param  {String} street
     * @param  {String} number
     * @param  {String} name
     * @return {{number: *, city: *, street: *, name: *, raw: *, lon: *, title: *, lat: *}}
     */
    element(lon, lat, city, street, number, name = '') {
      // Raw data from provider
      let raw = [street, number, name].filter(x => !!x).join(', ');
      city = normalizeCity(city);
      street = normalizeStreet(street);
      number = normalizeNumber(number);
      name = normalizeName(name);
      let title = [street, number, name].filter(x => !!x).join(', ');
      return {
        lat: lat,
        lon: lon,
        city: city,
        street: street,
        number: number,
        name: name,
        title: title,
        raw: raw,
      };
    }

    /**
     * Inject panel to target HTML element
     * @param dom
     */
    container(dom) {
      dom.append(this.panel);
    }

    /**
     * Render result to target element
     */
    render() {
      if (this.response.length === 0) {
        return;
      }

      let fieldset = document.createElement('fieldset');
      let list = document.createElement('ul');
      list.style.display = this.response.length > 2 ? 'none' : 'block';

      for (let i = 0; i < this.response.length; i++) {
        let item = document.createElement('li');
        item.append(this.link(this.response[i]));
        list.append(item);
      }

      let legend = document.createElement('legend');
      legend.innerHTML = this.uid + ' [' + this.response.length + ']';
      legend.onclick = function () {
        $(this).next().toggle();
        return false;
      };
      fieldset.append(legend, list);
      this.panel.append(fieldset);
    }

    /**
     * Build link by {Object}
     * @param  {Object} item
     * @return {HTMLAnchorElement}
     */
    link(item) {
      let a = document.createElement('a');
      a.href = '#';
      a.dataset.lat = item.lat;
      a.dataset.lon = item.lon;
      a.dataset.city = item.city;
      a.dataset.street = item.street;
      a.dataset.number = item.number;
      a.dataset.name = item.name;
      a.innerHTML = item.title;
      a.title = item.raw;
      a.className = NAME + '-link';
      if (!item.city || !item.street || !item.number) {
        a.className += ' noaddress';
      }
      return a;
    }
  }

  /**
   * Open Street Map
   */
  class OsmProvider extends Provider {
    async request(lon, lat) {
      let url = 'https://nominatim.openstreetmap.org/reverse';
      let data = {
        lon: lon,
        lat: lat,
        zoom: 18,
        addressdetails: 1,
        countrycodes: 'ua',
        'accept-language': 'uk_UA',
        format: 'json',
      };
      let response = await $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data
      });
      if (!response.address) {
        return [];
      } else {
        return [this.item(response)];
      }
    }

    item(res) {
      let output = [];
      let city = '';
      let street = '';
      let number = '';
      if (res.address.city) {
        city = res.address.city;
      }
      if (res.address.road) {
        street = res.address.road;
      }
      if (res.address.house_number) {
        number = res.address.house_number;
      } else {
        output.push(res.display_name.split(', ', 1));
      }
      return this.element(res.lon, res.lat, city, street, number, output.join(', '));
    }
  }

  /**
   * 2GIS
   * @link http://catalog.api.2gis.ru/doc/2.0/geo/#/default/get_2_0_geo_search
   */
  class GisProvider extends Provider {
    async request(lon, lat) {
      let url = 'https://catalog.api.2gis.ru/2.0/geo/search';
      let data = {
        point: lon + ',' + lat,
        radius: 20,
        type: 'building',
        fields: 'items.address,items.adm_div,items.geometry.centroid',
        locale: 'uk_UA',
        format: 'json',
        key: 'rubnkm' + '7490',
      };
      let response = await $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data
      });
      if (!response.result || !response.result.items.length) {
        return [];
      }
      return this.collection(response.result.items);
    }

    item(res) {
      let output = [];
      let city = '';
      let street = '';
      let number = '';
      if (res.adm_div.length) {
        for (let i = 0; i < res.adm_div.length; i++) {
          if (res.adm_div[i]['type'] === 'city') {
            city = res.adm_div[i]['name'];
          }
        }
      }
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

      let element = this.element(lon, lat, city, street, number, output.join(', '));
      if (res.purpose_name) {
        element.raw += ', ' + res.purpose_name;
      }
      return element;
    }
  }

  /**
   * Yandex Maps
   */
  class YMProvider extends Provider {
    async request(lon, lat) {
      let url = 'https://geocode-maps.yandex.ru/1.x/';
      let data = {
        geocode: lon + ',' + lat,
        kind: 'house',
        results: 2,
        lang: 'uk_UA',
        format: 'json',
        apikey: '2fe62c0e' + '-580f-4541-b325-' + '7c896d8d9481',
      };
      let response = await $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
      });
      if (!response.response || !response.response.GeoObjectCollection.featureMember.length) {
        return [];
      }

      return this.collection(response.response.GeoObjectCollection.featureMember);
    }

    item(res) {
      res = res.GeoObject;
      let center = res.Point.pos.split(' ');
      let lon = center[0];
      let lat = center[1];
      let city = '';
      let street = '';
      let number = '';
      if (res.metaDataProperty.GeocoderMetaData.Address.Components) {
        for (let el in res.metaDataProperty.GeocoderMetaData.Address.Components) {
          let component = res.metaDataProperty.GeocoderMetaData.Address.Components[el];
          if (component.kind === 'locality') {
            city = component.name;
          }
          if (component.kind === 'street') {
            street = component.name;
          }
          if (component.kind === 'house') {
            number = component.name;
          }
        }
      }
      return this.element(
        lon,
        lat,
        city,
        street,
        number
      );
    }
  }

  /**
   * Here Maps
   * @link https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html
   */
  class HereProvider extends Provider {
    async request(lon, lat) {
      let url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json';
      let data = {
        app_id: 'GCFmOOrSp8882vFwTxEm',
        app_code: 'O-LgGkoRfypnRuik0WjX9A',
        prox: lat + ',' + lon + ',10',
        mode: 'retrieveAddresses',
        locationattributes: 'none,ar',
        addressattributes: 'str,hnr'
      };
      let response = await $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
      });
      if (!response.Response || !response.Response.View || !response.Response.View || !response.Response.View[0] || !response.Response.View[0].Result) {
        return [];
      }
      return this.collection(response.Response.View[0].Result.filter(x => x.MatchLevel === 'houseNumber'));
    }

    item(res) {
      return this.element(
        res.Location.DisplayPosition.Longitude,
        res.Location.DisplayPosition.Latitude,
        res.Location.Address.City,
        res.Location.Address.Street,
        res.Location.Address.HouseNumber
      );
    }
  }

  /**
   * Bing Maps
   * @link https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
   * http://dev.virtualearth.net/REST/v1/Locations/50.03539,36.34732?o=xml&key=AuBfUY8Y1Nzf3sRgceOYxaIg7obOSaqvs0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw&c=uk
   * http://dev.virtualearth.net/REST/v1/Locations/50.03539,36.34732?o=xml&key=AuBfUY8Y1Nzf3sRgceOYxaIg7obOSaqvs0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw&c=uk&includeEntityTypes=Address
   */
  class BingProvider extends Provider {
    async request(lon, lat) {
      let url = 'https://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + lon;
      let data = {
        includeEntityTypes: 'Address',
        c: 'uk',
        key: 'AuBfUY8Y1Nzf' + '3sRgceOYxaIg7obOSaqvs' + '0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw',
      };
      let response = await $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
      });
      if (!response || !response.resourceSets || !response.resourceSets[0]) {
        return [];
      }
      return this.collection(response.resourceSets[0].resources.filter(el => el.address.addressLine && el.address.addressLine.indexOf(',') > 0));
    }

    item(res) {
      let address = res.address.addressLine.split(',');
      return this.element(
        res.point.coordinates[1],
        res.point.coordinates[0],
        res.address.locality,
        address[0],
        address[1]
      );
    }
  }

  /**
   * Google Place
   * @link https://developers.google.com/places/web-service/search
   */
  class GPProvider extends Provider {
    async request(lon, lat) {
      let url = 'https://' + location.hostname + '/maps/api/place/nearbysearch/json';
      let data = {
        location: lat + ',' + lon,
        radius: 40,
        fields: 'geometry,formatted_address',
        types: 'point_of_interest',
        language: 'ua',
        key: 'AIzaSy' + 'CebbES' + 'rWERY1MRZ56gEAfpt7tK2R6hV_I', // extract it from WME
      };
      let response = await $.ajax({
        dataType: 'json',
        cache: false,
        url: url,
        data: data,
      });
      if (!response.results || !response.results.length) {
        return [];
      }
      return this.collection(response.results);
    }

    item(res) {
      let address = res.vicinity.split(',');
      address = address.map(str => str.trim());

      let street = address[0] && address[0].length > 8 ? address[0] : '';
      let number = address[1] && address[1].length < 13 && /\d+/.test(address[1]) ? address[1] : '';
      let city = address[2] ? address[2] : '';

      return this.element(
        res.geometry.location.lng,
        res.geometry.location.lat,
        city,
        street,
        number,
        res.name
      );
    }
  }

  $(document)
    .on('ready.apihelper', ready)
    .on('none.apihelper', clearPanel)
    .on('landmark.apihelper', landmarkPanel)
    .on('click', '.' + NAME + '-link', applyData)
    .on('mouseenter', '.' + NAME + '-link', showVector)
    .on('mouseleave', '.' + NAME + '-link', hideVector)
  ;

  $(window).on('beforeunload', () => E50Settings.save());

  function ready() {
    helper = new APIHelperUI(NAME);

    modal = helper.createModal(I18n.t(NAME).title);

    panel = helper.createPanel(I18n.t(NAME).title);

    tab = helper.createTab(NAME + ': ' + I18n.t(NAME).title);

    // Setup options
    let fsOptions = helper.createFieldset(I18n.t(NAME).options.title);
    let options = E50Settings.get('options');
    for (let item in options) {
      fsOptions.addCheckbox(item, I18n.t(NAME).options[item], I18n.t(NAME).options[item], function (event) {
        E50Settings.set(['options', item], event.target.checked);
      }, E50Settings.get('options', item));
    }
    tab.addElement(fsOptions);

    // Setup providers settings
    let fsProviders = helper.createFieldset(I18n.t(NAME).providers.title);
    let providers = E50Settings.get('providers');
    for (let item in providers) {
      fsProviders.addCheckbox(item, I18n.t(NAME).providers[item], I18n.t(NAME).providers[item], function (event) {
        E50Settings.set(['providers', item], event.target.checked);
      }, E50Settings.get('providers', item));
    }
    tab.addElement(fsProviders);
    tab.inject();

    // Shortcut for copy POI data to clipboard
    new WazeWrap.Interface.Shortcut(
      NAME + '-clipboard',
      I18n.t(NAME).description.copyData,
      NAME,
      NAME,
      'C+B',
      function () {
        if (!W.selectionManager.hasSelectedFeatures() ||
          W.selectionManager.getSelectedFeatures()[0].model.type !== 'venue') {
          return;
        }
        let poi = W.selectionManager.getSelectedFeatures()[0].model;
        let data = [
          poi.attributes.name,
          poi.getAddress().attributes.houseNumber,
          poi.getAddress().getStreet().name,
          poi.getAddress().getCity().getName(),
        ];
        data = data.filter(x => !!x);
        data = data.filter((v, i, a) => a.indexOf(v) === i);

        toClipboard(data.join(' '));
      },
      null
    ).add();

    // Create layer for vectors
    vectorLayer = new OL.Layer.Vector("E50VectorLayer", {
      displayInLayerSwitcher: false,
      uniqueName: "__E50VectorLayer"
    });
    W.map.addLayer(vectorLayer);
  }

  /**
   * Clear modal panel
   */
  function clearPanel() {
    document.getElementById('panel-container').innerHTML = '';
    hideVector();
  }

  /**
   *
   * @return {null|Object}
   */
  function getSelectedPOI() {
    let elements = W.selectionManager.getSelectedFeatures().map((x) => x.model).filter((el) => el.type === 'venue');
    if (elements.length === 0) {
      return null;
    } else {
      return elements[0];
    }
  }

  /**
   * Create and fill modal panel
   * @param event
   * @param element
   */
  function landmarkPanel(event, element) {
    let container, parent;
    if (E50Settings.get('options', 'modal')) {
      parent = modal.toHTML();
      container = parent.querySelector('.body');
    } else {
      parent = panel.toHTML();
      container = parent.querySelector('.controls');
    }

    let poi = getSelectedPOI();

    if (!poi) {
      return;
    }

    let selected = poi.geometry.getCentroid().clone();
    selected.transform('EPSG:900913', 'EPSG:4326');

    if (E50Settings.get('providers').osm) {
      let Osm = new OsmProvider('OSM');
      Osm.container(container);
      Osm.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').gis) {
      let Gis = new GisProvider('2Gis');
      Gis.container(container);
      Gis.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').yandex) {
      let Yandex = new YMProvider('Yandex');
      Yandex.container(container);
      Yandex.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').here) {
      let Here = new HereProvider('Here');
      Here.container(container);
      Here.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').bing) {
      let Bing = new BingProvider('Bing');
      Bing.container(container);
      Bing.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').google) {
      let Google = new GPProvider('Google');
      Google.container(container);
      Google.search(selected.x, selected.y);
    }

    if (E50Settings.get('options', 'modal')) {
      modal.container().append(parent);
    } else {
      element.prepend(parent);
    }
  }

  /**
   * Apply data to current selected POI
   * @param event
   */
  function applyData(event) {
    event.preventDefault();
    let poi = getSelectedPOI();

    if (!poi.isGeometryEditable()) {
      return;
    }

    let lat = this.dataset.lat;
    let lon = this.dataset.lon;
    let name = this.dataset.name;
    let city = this.dataset.city;
    let street = this.dataset.street;
    let number = this.dataset.number;

    if (E50Settings.get('options', 'copyData')) {
      toClipboard([name, number, street, city].filter(x => !!x).join(' '));
    }

    // POI Name
    let newName;
    // If exists name ask user to replace it or not
    // If not exists - use name or house number as name
    if (poi.attributes.name) {
      if (name && name !== poi.attributes.name) {
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n«' + poi.attributes.name + '» ⟶ «' + name + '»?')) {
          newName = name;
        }
      } else if (number && number !== poi.attributes.name) {
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n«' + poi.attributes.name + '» ⟶ «' + number + '»?')) {
          newName = number;
        }
      }
    } else if (name) {
      newName = name;
    } else if (number) {
      newName = number;
    }
    if (newName) {
      W.model.actionManager.add(new WazeActionUpdateObject(poi, {name: newName}));
    }

    // POI Address HouseNumber
    let newHN;
    let addressHN = poi.getAddress().attributes.houseNumber;
    if (number) {
      if (addressHN) {
        if (addressHN !== number &&
          addressHN !== number.replace('к', '-') &&
          addressHN !== number.replace('/', '-') &&
          window.confirm(I18n.t(NAME).questions.changeNumber + '\n«' + addressHN + '» ⟶ «' + number + '»?')) {
          newHN = number;
        }
      } else {
        newHN = number;
      }
      if (newHN) {
        let aliases = poi.attributes.aliases;
        // Set "корпус" as alias for name
        // Replace "к" with "-"
        if ((new RegExp('[0-9]+[а-яі]?к[0-9]+', 'i')).test(newHN)) {
          let alias = newHN.replace('к', ' корпус ');
          if (aliases.indexOf(alias) === -1) {
            aliases.push(alias);
          }
          newHN = newHN.replace('к', '-');
        }
        // Replace "/" with "-" for house with letter
        if ((new RegExp('[0-9]+[а-яі]\\/[0-9]+', 'i')).test(newHN)) {
          newHN = newHN.replace('/', '-');
        }
        W.model.actionManager.add(new WazeActionUpdateObject(poi, {houseNumber: newHN, aliases: aliases}));
      }
    }

    // POI Address Street Name
    let newStreet;
    let addressStreet = poi.getAddress().getStreet().name;
    if (street) {
      if (addressStreet) {
        if (addressStreet !== street &&
          window.confirm(I18n.t(NAME).questions.changeStreet + '\n«' + addressStreet + '» ⟶ «' + street + '»?')) {
          newStreet = street;
        }
      } else {
        newStreet = street;
      }
    }

    // POI Address City
    let newCity;
    let addressCity = poi.getAddress().getCity().getName();
    if (city) {
      if (addressCity) {
        if (addressCity !== city &&
          window.confirm(I18n.t(NAME).questions.changeCity + '\n«' + addressCity + '» ⟶ «' + city + '»?')) {
          newCity = city;
        }
      } else {
        newCity = city;
      }
    }
    if (newCity || newStreet) {
      let address = {
        countryID: W.model.getTopCountry().getID(),
        stateID: W.model.getTopState().getID(),
        cityName: newCity ? newCity : poi.getAddress().getCityName(),
        streetName: newStreet ? newStreet : poi.getAddress().getStreetName()
      };
      W.model.actionManager.add(new WazeActionUpdateFeatureAddress(poi, address));
    }

    // If no entry point we would create it
    if (E50Settings.get('options', 'entryPoint') && poi.attributes.entryExitPoints.length === 0) {
      // Create point based on data from external source
      let point = new OL.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:900913');
      // Check intersection with selected POI
      if (!poi.getPolygonGeometry().intersects(point)) {
        point = poi.geometry.getCentroid();
      }
      // Create entry point
      let navPoint = new NavigationPoint(point);
      W.model.actionManager.add(new WazeActionUpdateObject(poi, {entryExitPoints: [navPoint]}));
    }

    // Lock to level 2
    if (E50Settings.get('options', 'lock') && poi.attributes.lockRank < 1 && W.loginManager.user.getRank() > 0) {
      W.model.actionManager.add(new WazeActionUpdateObject(poi, {lockRank: 1}));
    }

    if (newName || newHN || newStreet || newCity) {
      W.selectionManager.setSelectedModels([poi]);
    }

    // TODO: rewrite it to use multiAction
    /*
    let address = {
      countryID: W.model.getTopCountry().getID(),
      stateID: W.model.getTopState().getID(),
      cityName: poi.getAddress().getCityName(),
      streetName: poi.getAddress().getStreetName(),
      houseNumber: number,
    };
    // Check city
    address.emptyCity = (address.cityName === null);
    // Check street
    address.emptyStreet = (address.streetName === null) || (address.streetName === '');

    let multiAction = new WazeActionMultiAction();
        multiAction.setModel(W.model);

    multiAction.doSubAction(new WazeActionUpdateFeatureAddress(poi, address, {updateHouseNumber: true}));
    multiAction.doSubAction(new WazeActionUpdateObject(poi, {houseNumber: number}));
    W.model.actionManager.add(multiAction);
    */
  }

  /**
   * @param   {string} str
   * @returns {string}
   */
  function normalizeString(str) {
    // Clear space symbols and double quotes
    str = str.trim()
      .replace(/["“]/g, '')
      .replace(/\s{2,}/g, ' ')
    ;
    // Clear accents/diacritics, but "\u0306" needed for "й"
    // str = str.normalize('NFD').replace(/[\u0300-\u0305\u0309-\u036f]/g, '');
    return str;
  }

  /**
   * @param  {string} name
   * @return {string}
   */
  function normalizeName(name) {
    name = normalizeString(name);
    name = name.replace('№', '');
    name = name.replace(/\.$/, '');
    return name;
  }

  /**
   * @param  {string} city
   * @return {string}
   */
  function normalizeCity(city) {
    city = normalizeString(city);

    if (city === '') {
      return '';
    }

    // Get list of all available cities
    let cities = W.model.cities.getObjectArray().filter(m => m.attributes.name !== null && m.attributes.name !== '').map(m => m.attributes.name);

    // Remove text in the "( )"
    cities = cities.map(city => city.replace(/( ?\(.*\))/gi, ''));

    // More than one city, use city with best matching score
    let best = findBestMatch(city, cities);
    if (best > -1) {
      city = cities[best];
    }
    console.log('E50:', arguments[0], '=>', city);
    return city;
  }

  /**
   * @param  {string} street
   * @return {string}
   */
  function normalizeStreet(street) {
    street = normalizeString(street);

    if (street === '') {
      return '';
    }

    // Prepare street name
    street = street.replace(/[’']/, '\'');

    // Normalize title
    let regs = {
      '(^| )бульвар( |$)': '$1б-р$2',
      '(^| )вїзд( |$)': '$1в\'їзд$2',
      '(^| )в\'ізд( |$)': '$1в\'їзд$2',
      '(^|.+?) ?вулиця ?(.+|$)': 'вул. $1$2',
      '^(.+)[ ]+вул\.?$': 'вул. $1',
      '^вул[ ]+(.+)$': 'вул. $1',
      '(^| )дорога( |$)': '$1дор.$2',
      '(^| )мікрорайон( |$)': '$1мкрн.$2',
      '(^| )набережна( |$)': '$1наб.$2',
      '(^| )площадь( |$)': '$1площа$2',
      '(^| )провулок провулок( |$)': '$1пров.$2',
      '(^| )провулок( |$)': '$1пров.$2',
      '(^| )проїзд( |$)': '$1пр.$2',
      '(^| )проспект( |$)': '$1просп.$2',
      '(^| )район( |$)': '$1р-н$2',
      '(^| )станція( |$)': '$1ст.$2',
    };

    for (let key in regs) {
      let re = new RegExp(key, 'gi');
      if (re.test(street)) {
        street = street.replace(re, regs[key]);
        break;
      }
    }

    // Get all streets
    let streets = W.model.streets.getObjectArray().filter(m => m.name !== null && m.name !== '').map(m => m.name);

    // Get type and create RegExp for filter streets
    let reTypes = new RegExp('(алея|б-р|в\'їзд|вул\\.|дор\\.|мкрн|наб\\.|площа|пров\\.|пр\\.|просп\\.|р-н|ст\\.|тракт|траса|тупик|узвіз|шосе)', 'gi');
    let matches = [...street.matchAll(reTypes)];
    let types = [];

    // Detect type(s)
    if (matches.length === 0) {
      types.push('вул.'); // setup basic type
    } else {
      types = matches.map(match => match[0].toLowerCase());
    }
    // Filter streets by detected type(s)
    streets = streets.filter(street => types.some(type => street.indexOf(type) > -1));
    // Matching without type(s)
    let best = findBestMatch(
      street.replace(reTypes, '').trim(),
      streets.map(street => street.replace(reTypes, '').trim())
    );
    if (best > -1) {
      street = streets[best];
    }
    console.log('E50:', arguments[0], '=>', street);
    return street;
  }

  /**
   * @param  {string} number
   * @return {string}
   */
  function normalizeNumber(number) {
    // remove spaces
    number = number.trim().replace(/\s/g, '');
    number = number.toUpperCase();
    // process Latin to Cyrillic
    number = number.replace('A', 'А');
    number = number.replace('B', 'В');
    number = number.replace('E', 'Е');
    number = number.replace('I', 'І');
    number = number.replace('K', 'К');
    number = number.replace('M', 'М');
    number = number.replace('H', 'Н');
    number = number.replace('О', 'О');
    number = number.replace('P', 'Р');
    number = number.replace('C', 'С');
    number = number.replace('T', 'Т');
    number = number.replace('Y', 'У');
    // process і,з,о
    number = number.replace('І', 'і');
    number = number.replace('З', 'з');
    number = number.replace('О', 'о');
    // process "д."
    number = number.replace(/^д\./i, '');
    // process "дом"
    number = number.replace(/^дом ?/i, '');
    // process "буд."
    number = number.replace(/^буд\./i, '');
    // process "корпус" to "к"
    number = number.replace(/(.*)к(?:орп|орпус)?(\d+)/gi, '$1к$2');
    // process "N-M" to "NM"
    number = number.replace(/(.*)-([а-яі])/gi, '$1$2');

    return number;
  }

  function toClipboard(text) {
    // normalize
    text = normalizeString(text);
    text = text.replace(/'/g, '');
    // use search input for copy text to clipboard
    let input = document.querySelector('input.search-query');
    let old = input.value;
    input.value = text;
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    input.value = old;
    console.log('E50: copied «' + text + '»');
  }

  /**
   * Show vector from centr of the selected POI to point by lon and lat
   */
  function showVector() {
    let poi = getSelectedPOI();
    if (!poi) {
      return;
    }
    let from = poi.geometry.getCentroid();
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

  /**
   * Hide and clear all vectors
   */
  function hideVector() {
    vectorLayer.removeAllFeatures();
    vectorLayer.setVisibility(false);
  }

  /**
   * @link   https://github.com/aceakash/string-similarity
   * @param  {string} first
   * @param  {string} second
   * @return {number}
   */
  function compareTwoStrings(first, second) {
    first = first.replace(/\s+/g, '');
    second = second.replace(/\s+/g, '');

    if (!first.length && !second.length) return 1;           // if both are empty strings
    if (!first.length || !second.length) return 0;           // if only one is empty string
    if (first === second) return 1;                          // identical
    if (first.length === 1 && second.length === 1) return 0; // both are 1-letter strings
    if (first.length < 2 || second.length < 2) return 0;     // if either is a 1-letter string

    let firstBigrams = new Map();
    for (let i = 0; i < first.length - 1; i++) {
      const bigram = first.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1;

      firstBigrams.set(bigram, count);
    }

    let intersectionSize = 0;
    for (let i = 0; i < second.length - 1; i++) {
      const bigram = second.substring(i, i + 2);
      const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0;

      if (count > 0) {
        firstBigrams.set(bigram, count - 1);
        intersectionSize++;
      }
    }

    return (2.0 * intersectionSize) / (first.length + second.length - 2);
  }

  /**
   * @param  {string} mainString
   * @param  {string[]} targetStrings
   * @return {number}
   */
  function findBestMatch(mainString, targetStrings) {
    let bestMatch = '';
    let bestMatchRating = 0;
    let bestMatchIndex = -1;

    for (let i = 0; i < targetStrings.length; i++) {
      let rating = compareTwoStrings(mainString, targetStrings[i]);
      if (rating > bestMatchRating) {
        bestMatch = targetStrings[i];
        bestMatchRating = rating;
        bestMatchIndex = i;
      }
    }
    if (bestMatch === '' || bestMatchRating < 0.35) {
      console.log('E50:', mainString, 'not matched', targetStrings);
      return -1;
    } else {
      console.log('E50:', mainString, '<=>', bestMatch, '=', bestMatchRating);
      return bestMatchIndex;
    }
  }
})();
