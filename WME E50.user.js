// ==UserScript==
// @name         WME E50 Fetch POI Data
// @version      0.0.17
// @description  Fetch information about the POI from external sources
// @author       Anton Shevchuk
// @license      MIT License
// @include      https://www.waze.com/editor*
// @include      https://www.waze.com/*/editor*
// @include      https://beta.waze.com/editor*
// @include      https://beta.waze.com/*/editor*
// @exclude      https://www.waze.com/user/editor*
// @exclude      https://beta.waze.com/user/editor*
// @grant        none
// @require      https://greasyfork.org/scripts/389765-common-utils/code/CommonUtils.js?version=730610
// @require      https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require      https://greasyfork.org/scripts/389117-apihelper/code/APIHelper.js?version=729842
// @require      https://greasyfork.org/scripts/389577-apihelperui/code/APIHelperUI.js?version=730559
// @require      https://greasyfork.org/scripts/38421-wme-utils-navigationpoint/code/WME%20Utils%20-%20NavigationPoint.js?version=251067
// @namespace    https://greasyfork.org/users/227648
// ==/UserScript==

/* jshint esversion: 8 */
/* global require, $, window, W, I18n, OL, APIHelper, APIHelperUI, WazeWrap, NavigationPoint, Cache, Settings */
(function () {
  'use strict';

  let helper, tab, modal;
  let vectorLayer, vectorPoint, vectorLine;

  const NAME = 'E50';

  // translation structure
  const TRANSLATION = {
    'en': {
      title: 'Information',
      providers: {
        settings: 'Providers',
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
      providers: {
        settings: 'Джерела',
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
      providers: {
        settings: 'Источники',
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
        console.log('E50: ', this.uid, this.response);
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
      if (city) {
        city = normalizeCity(city);
      }
      if (street) {
        street = normalizeStreet(street);
      }
      if (number) {
        number = normalizeNumber(number);
      }
      if (name) {
        name = normalizeName(name);
      }
      let title = [street, number, name].filter(x => !!x).join(', ');
      let item = {
        lat: lat,
        lon: lon,
        city: city,
        street: street,
        number: number,
        name: name,
        title: title,
        raw: raw,
      };
      return item;
    }

    /**
     * Inject panel to target HTML element
     * @param dom
     */
    container(dom) {
      dom.querySelector('.body').append(this.panel);
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
          if (res.metaDataProperty.GeocoderMetaData.Address.Components[el]['kind'] === 'locality') {
            city = res.metaDataProperty.GeocoderMetaData.Address.Components[el]['name'];
          }
          if (res.metaDataProperty.GeocoderMetaData.Address.Components[el]['kind'] === 'street') {
            street = res.metaDataProperty.GeocoderMetaData.Address.Components[el]['name'];
          }
          if (res.metaDataProperty.GeocoderMetaData.Address.Components[el]['kind'] === 'house') {
            number = res.metaDataProperty.GeocoderMetaData.Address.Components[el]['name'];
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
      return this.collection(response.resourceSets[0].resources.filter(el => el.address.addressLine.indexOf(',') > 0));
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
      let city = address[2] ? address[2].trim() : '';
      let street = address[0] && address[0].length > 8 ? address[0].trim() : '';
      let number = /\d+/.test(address[1]) ? address[1].trim() : '';


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

    tab = helper.createTab(NAME + ': ' + I18n.t(NAME).title);

    // Setup providers settings
    let fieldset = helper.createFieldset(I18n.t(NAME).providers.settings);
    let providers = E50Settings.get('providers');
    for (let source in providers) {
      fieldset.addCheckbox(source, I18n.t(NAME).providers[source], I18n.t(NAME).providers[source], function(event) {
        E50Settings.set(['providers', source], event.target.checked);
      }, E50Settings.get('providers', source));
    }

    tab.addElement(fieldset);
    tab.container().append(tab.toHTML());

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
   * Create and fill modal panel
   * @param event
   * @param element
   */
  function landmarkPanel(event, element) {
    let modalHTML = modal.toHTML();

    let selected = APIHelper.getSelectedVenues()[0].geometry.getCentroid().clone();
    selected.transform('EPSG:900913', 'EPSG:4326');

    if (E50Settings.get('providers').osm) {
      let Osm = new OsmProvider('OSM');
      Osm.container(modalHTML);
      Osm.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').gis) {
      let Gis = new GisProvider('2Gis');
      Gis.container(modalHTML);
      Gis.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').yandex) {
      let Yandex = new YMProvider('Yandex');
      Yandex.container(modalHTML);
      Yandex.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').here) {
      let Here = new HereProvider('Here');
      Here.container(modalHTML);
      Here.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').bing) {
      let Bing = new BingProvider('Bing');
      Bing.container(modalHTML);
      Bing.search(selected.x, selected.y);
    }

    if (E50Settings.get('providers').google) {
      let Google = new GPProvider('Google');
      Google.container(modalHTML);
      Google.search(selected.x, selected.y);
    }

    modal.container().append(modalHTML);
  }

  /**
   * Apply data to current selected POI
   * @param event
   */
  function applyData(event) {
    event.preventDefault();

    let poi = APIHelper.getSelectedVenues()[0];
    let name = this.dataset['name'];
    let city = this.dataset['city'];
    let street = this.dataset['street'];
    let number = this.dataset['number'];

    // POI Name
    let newName;
    // If exists ask user to replace or not
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
    } else {
      if (name) {
        newName = name;
      } else if (number) {
        newName = number;
      }
    }
    if (newName) {
      W.model.actionManager.add(new WazeActionUpdateObject(poi, {name: newName}));
    }

    // POI Address HouseNumber
    let newHN;
    let addressHN = poi.getAddress().attributes.houseNumber;
    if (number) {
      if (addressHN) {
        if (addressHN !== number && addressHN !== number.replace('к', '-')) {
          if (window.confirm(I18n.t(NAME).questions.changeNumber + '\n«' + addressHN + '» ⟶ «' + number + '»?')) {
            newHN = number;
          }
        }
      } else {
        newHN = number;
      }
      if (newHN) {
        let aliases = poi.attributes.aliases;
        // Set "корпус" as alias for name
        // Replace "к" with "-"
        if ((new RegExp('[0-9]+.*к[0-9]+')).test(newHN)) {
          let alias = newHN.replace('к', ' корпус ');
          if (aliases.indexOf(alias) === -1) {
            aliases.push(alias);
          }
          newHN = newHN.replace('к', '-');
        }
        W.model.actionManager.add(new WazeActionUpdateObject(poi, {houseNumber: newHN, aliases: aliases}));
      }
    }

    // POI Address Street Name
    let newStreet;
    let addressStreet = poi.getAddress().getStreet().name;
    if (street) {
      if (addressStreet) {
        if (addressStreet !== street) {
          if (window.confirm(I18n.t(NAME).questions.changeStreet + '\n«' + addressStreet + '» ⟶ «' + street + '»?')) {
            newStreet = street;
          }
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
        if (!(new RegExp(city, 'i')).test(addressCity)) {
          if (window.confirm(I18n.t(NAME).questions.changeCity + '\n«' + addressCity + '» ⟶ «' + city + '»?')) {
            newCity = city;
          }
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
    if (poi.attributes.entryExitPoints.length === 0) {
      let navPoint = new NavigationPoint(poi.geometry.getCentroid());
      W.model.actionManager.add(new WazeActionUpdateObject(poi, {entryExitPoints: [navPoint]}));
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
   * @param  {string} name
   * @return {string}
   */
  function normalizeName(name) {
    name = name.trim();
    name = name.replace('№', '');
    name = name.replace(/\.$/, '');
    return name;
  }

  /**
   * @param  {string} city
   * @return {string}
   */
  function normalizeCity(city) {
    city = city.trim();
    return city;
  }

  /**
   * @param  {string} street
   * @return {string}
   */
  function normalizeStreet(street) {
    street = street.trim();
    // Normalize title
    let regs = {
      '(^| )бульвар( |$)': '$1б-р$2',
      '(^| )вїзд( |$)': '$1в\'їзд$2',
      '(^|.+?) ?вулиця ?(.+|$)': 'вул. $1$2',
      '^(.+)[ ]+вул\.?$': 'вул. $1',
      '^вул[ ]+(.+)$': 'вул. $1',
      '(^| )дорога( |$)': '$1дор.$2',
      '(^| )мікрорайон( |$)': '$1мкрн.$2',
      '(^| )набережна( |$)': '$1наб.$2',
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

    // Get street type and name and create RegExp
    let streets = W.model.streets.getObjectArray().filter(m => m.name !== null && m.name !== '').map(m => m.name);
    let re = new RegExp('(алея|б-р|в\'їзд|вул\\.|дор\\.|мкрн|наб\\.|площа|пров\\.|пр\\.|просп\\.|р-н|ст\\.|тракт|траса|тупик|узвіз|шосе)');
    let typeMatch = street.match(re);
    let type = typeMatch ? typeMatch[1] : 'вул\\.'; // Special for 2GIS
    let name = street.replace(re, '').trim();
    let reType = new RegExp('(' + type + ')', 'i');
    let reName = new RegExp('(' + name.split(' ').join('|') + ')', 'i');

    // Filter street
    streets = streets.filter(str => reName.test(str) && reType.test(str));
    if (streets.length === 1) {
      street = streets[0];
    }
    console.log('E50: ', arguments[0], '=>', street);
    return street;
  }

  /**
   * @param  {string} number
   * @return {string}
   */
  function normalizeNumber(number) {
    number = number.trim();
    // і,з,о
    number = number.toUpperCase();
    number = number.replace('І', 'і');
    number = number.replace('З', 'з');
    number = number.replace('О', 'о');
    // Д. N
    number = number.replace(/^Д\. ?/, '');
    // \d( ?)к(орп)?\d
    let korp = new RegExp(/(.*)\s*к(?:орп)?\s*(\d+)/, 'gi');
    if (korp.test(number)) {
      number = number.replace(korp, '$1к$2');
    }

    return number;
  }

  /**
   * Show vector from centdr of the selected POI to point by lon and lat
   */
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

  /**
   * Hide and clear all vectors
   */
  function hideVector() {
    vectorLayer.removeAllFeatures();
    vectorLayer.setVisibility(false);
  }
})();
