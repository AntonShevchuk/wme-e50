import { NAME } from './translations'
import { LOCALE } from './types'
import { SETTINGS } from './settings'
import { layerConfig } from './layers'
import { MagicProvider } from './providers/magic'
import { UaAddressesProvider } from './providers/ua-addresses'
import { VisicomProvider } from './providers/visicom'
import { OsmProvider } from './providers/osm'
import { HereProvider } from './providers/here'
import { BingProvider } from './providers/bing'
import { GoogleProvider } from './providers/google'

export class E50 extends WMEBase {
  helper: any
  modal: any
  panel: any

  constructor (name: string, settings: any) {
    super(name, settings)
    this.initHelper()
    this.initTab()
    this.initLayer()
  }

  initHelper () {
    this.helper = new WMEUIHelper(this.name)

    this.modal = this.helper.createModal(I18n.t(this.name).title)

    this.panel = this.helper.createPanel(I18n.t(this.name).title)
  }

  initTab () {
    let tab = this.helper.createTab(
      I18n.t(this.name).title,
      {
        sidebar: this.wmeSDK.Sidebar,
        image: GM_info.script.icon
      }
    )

    // Setup options
    /** @type {WMEUIHelperFieldset} */
    let fsOptions = this.helper.createFieldset(I18n.t(this.name).options.title)
    let options = this.settings.get('options')
    for (let item in options) {
      if (options.hasOwnProperty(item)) {
        fsOptions.addCheckbox(
          item,
          I18n.t(this.name).options[item],
          (event: any) => this.settings.set(['options', item], event.target.checked),
          this.settings.get('options', item)
        )
      }
    }
    tab.addElement(fsOptions)

    // Setup ranges
    /** @type {WMEUIHelperFieldset} */
    let fsRanges = this.helper.createFieldset(I18n.t(this.name).ranges.title)
    let ranges = this.settings.get('ranges')
    for (let item in ranges) {
      if (ranges.hasOwnProperty(item)) {
        fsRanges.addNumber(
          'settings-ranges-' + item,
          I18n.t(NAME).ranges[item],
          (event: any) => this.settings.set(['ranges', item], event.target.value),
          this.settings.get('ranges', item),
          (item === 'radius') ? 100 : 0,
          (item === 'radius') ? 1000 : 10,
          (item === 'radius') ? 50 : 1
        )
      }
    }
    tab.addElement(fsRanges)

    // Setup providers settings
    /** @type {WMEUIHelperFieldset} */
    let fsProviders = this.helper.createFieldset(I18n.t(this.name).providers.title)
    let providers = this.settings.get('providers')
    for (let item in providers) {
      if (providers.hasOwnProperty(item) && SETTINGS.providers.hasOwnProperty(item)) {
        fsProviders.addCheckbox(
          item,
          I18n.t(this.name).providers[item],
          (event: any) => this.settings.set(['providers', item], event.target.checked),
          this.settings.get('providers', item)
        )
      }
    }
    tab.addElement(fsProviders)

    // Setup providers key's
    /** @type {WMEUIHelperFieldset} */
    let fsKeys = this.helper.createFieldset(I18n.t(this.name).options.keys)
    let keys = this.settings.get('keys')
    for (let item in keys) {
      if (keys.hasOwnProperty(item) && SETTINGS.keys.hasOwnProperty(item)) {
        fsKeys.addInput(
          'key-' + item,
          I18n.t(this.name).providers[item],
          (event: any) => this.settings.set(['keys', item], event.target.value),
          this.settings.get('keys', item)
        )
      }
    }
    tab.addElement(fsKeys)

    tab.addText(
      'info',
      '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
    )

    tab.addText('blue', 'made in')
    tab.addText('yellow', 'Ukraine')

    tab.inject()
  }

  initLayer () {
    this.wmeSDK.Map.addLayer({
      layerName: this.name,
      styleRules: layerConfig.styleRules,
      styleContext: layerConfig.styleContext
    });
    // this.wmeSDK.LayerSwitcher.addLayerCheckbox({ name: this.name });
    this.wmeSDK.Map.setLayerZIndex({ layerName: this.name, zIndex: 9999 });
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
  }

  /**
   * Create the vector from the center of the selected POI to point by lon and lat
   * @param {Number} lon
   * @param {Number} lat
   */
  createVector (lon: number, lat: number) {
    let poi = this.getSelectedPOI()
    if (!poi) {
      return
    }

    const from = turf.centroid(poi.geometry)
    const to = turf.point([lon, lat], { styleName: "styleNode" }, { id: `node_${lon}_${lat}` });

    this.wmeSDK.Map.addFeatureToLayer({ layerName: this.name, feature: to });

    const lineCoordinates = [
      from.geometry.coordinates,
      to.geometry.coordinates,
    ];

    const distance = Math.round( turf.distance(to, from) * 1000)

    const label = (distance > 2000)
      ? (distance / 1000).toFixed(1) + 'km'
      : distance + 'm'

    // https://www.waze.com/editor/sdk/interfaces/index.SDK.FeatureStyle.html
    const line = turf.lineString(lineCoordinates, {
      styleName: "styleLine",
      style: {
        label: label,
      },
    }, { id: `line_${lon}_${lat}` });

    this.wmeSDK.Map.addFeatureToLayer({ layerName: this.name, feature: line });
  }

  /**
   * Remove all vectors from the layer
   */
  removeVectors () {
    this.wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: this.name });
  }

  /**
   * Show the Layer
   */
  showLayer () {
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: true });
  }

  /**
   * Hide the Layer
   */
  hideLayer () {
    this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: false });
  }

  /**
   * Handler for `none.wme` event
   * @param {jQuery.Event} event
   * @return {Null}
   */
  onNone (event: any) {
    if (this.settings.get('options', 'modal')) {
      this.modal.html().remove()
    }
  }

  /**
   * Handler for `venue.wme` event
   *  - create and fill the modal panel
   *
   * @param {jQuery.Event} event
   * @param {HTMLElement} element
   * @param {Venue} model
   * @return {null|void}
   */
  onVenue (event: any, element: any, model: any) {
    let container, parent
    if (this.settings.get('options', 'modal')) {
      parent = this.modal.html()
      container = parent.querySelector('.wme-ui-body')
    } else {
      parent = this.panel.html()
      container = parent.querySelector('.controls')
    }

    // Clear container
    try {
      if (container)
      while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
      }
    } catch (e) {
      console.error(e)
    }

    if (!model) {
      return
    }

    let feature = turf.centroid(model.geometry)

    let [lon, lat] = feature.geometry.coordinates;

    let providers: any[] = []

    let country = this.wmeSDK.DataModel.Countries.getTopCountry()?.id || 232

    let settings = LOCALE[country] || { country: 'en', language: 'en', locale: 'en_US' }

    this.group(
      '\u{1F4CD}' + lon + ' ' + lat
    )

    let radius = this.settings.get('ranges', 'radius')

    if (this.settings.get('providers', 'magic')) {
      let Magic = new MagicProvider(container, settings, this.settings, this.wmeSDK)
      let providerPromise = Magic
        .search(lon, lat, radius)
        .then(() => Magic.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('providers', 'ua')) {
      let UaAddresses = new UaAddressesProvider(container, settings, this.settings, this.wmeSDK, this.settings.get('keys', 'ua'))
      let providerPromise = UaAddresses
        .search(lon, lat, radius)
        .then(() => UaAddresses.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('providers', 'osm')) {
      let Osm = new OsmProvider(container, settings, this.settings, this.wmeSDK)
      let providerPromise = Osm
        .search(lon, lat, radius)
        .then(() => Osm.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('providers', 'visicom')) {
      let Visicom = new VisicomProvider(container, settings, this.settings, this.wmeSDK, this.settings.get('keys', 'visicom'))
      let providerPromise = Visicom
        .search(lon, lat, radius)
        .then(() => Visicom.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('providers', 'here')) {
      let Here = new HereProvider(container, settings, this.settings, this.wmeSDK, this.settings.get('keys', 'here'))
      let providerPromise = Here
        .search(lon, lat, radius)
        .then(() => Here.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('providers', 'bing')) {
      let Bing = new BingProvider(container, settings, this.settings, this.wmeSDK, this.settings.get('keys', 'bing'))
      let providerPromise = Bing
        .search(lon, lat, radius)
        .then(() => Bing.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('providers', 'google')) {
      let Google = new GoogleProvider(container, settings, this.settings, this.wmeSDK, this.settings.get('keys', 'google'))
      let providerPromise = Google
        .search(lon, lat, radius)
        .then(() => Google.render())
        .catch(() => this.log(':('))
      providers.push(providerPromise)
    }

    if (this.settings.get('options', 'externalProvider')) {
      if (model.externalProviderIds?.length) {
        let items = element.querySelectorAll('.external-providers-control .external-provider')

        for (let i = 0; i < model.externalProviderIds.length; i++) {
          let externalProviderId = model.externalProviderIds[i]
          let item = items[i]

          GoogleProvider
            .makeDetailsRequest(externalProviderId)
            .then((details: any) => {
              let extLat = details.geometry.location.lat()
              let extLng = details.geometry.location.lng()

              let distance = turf.distance(
                turf.point([lon, lat]),
                turf.point([extLng, extLat]),
                {
                  units: 'meters'
                }
              )

              item.dataset.distance = Math.round(distance)
              item.dataset.lat = extLat
              item.dataset.lon = extLng

              if (details.business_status === 'OPERATIONAL') {
                item.classList.add('external-operational')
              } else if (details.business_status === 'CLOSED_TEMPORARILY') {
                item.classList.add('external-closed-temporarily')
              } else if (details.business_status === 'CLOSED_PERMANENTLY') {
                item.classList.add('external-closed-permanently')
              }

              item.classList.add(this.name + '-external')

              if (distance > 1000) {
                item.classList.add('distance-over-1000')
              } else if (distance > 200) {
                item.classList.add('distance-over-200')
              }
            })
            .catch(() => { this.log(':(') })
        }
      }
    }

    Promise
      .all(providers)
      .then(() => this.groupEnd())

    if (this.settings.get('options', 'modal')) {
      if (this.settings.get('options', 'transparent')) {
        parent.style.opacity = '0.6'
        parent.onmouseover = () => (parent.style.opacity = '1')
        parent.onmouseout = () => (parent.style.opacity = '0.6')
      }
      this.modal.container().append(parent)
    } else {
      element.prepend(parent)
    }
  }

  /**
   * Get Selected Venue if it not the NATURAL_FEATURES
   * @return {null|Object}
   */
  getSelectedPOI () {
    let venue = this.getSelectedVenues().shift()
    if (!venue) {
      return null
    }
    let except = [
      'CAMPING_TRAILER_PARK',
      'FOREST_GROVE',
      'JUNCTION_INTERCHANGE',
      'NATURAL_FEATURES',
      'OUTDOORS',
      'PARKING_LOT',
      'PLAYGROUND',
    ]
    if (except.indexOf(venue.categories[0]) === -1) {
      return venue
    }
    return null
  }

  /**
   * Apply data to the current selected place
   * @param {Object} data
   */
  applyData (data: any) {
    let venue = this.getSelectedPOI()

    if (!this.wmeSDK.DataModel.Venues.hasPermissions({ venueId: venue.id })) {
      this.log('You don\'t have permissions to edit this venue')
      return
    }

    let address = this.wmeSDK.DataModel.Venues.getAddress({ venueId: venue.id })

    let lat = parseFloat(data.lat)
    let lon = parseFloat(data.lon)

    if (isNaN(lat) || isNaN(lon)) {
      this.log('Invalid coordinates')
      return
    }

    this.group('Apply data to selected Venue \u2193')

    let name = data.name ? data.name.trim() : ''
    let cityId = isNaN(parseInt(data.cityId)) ? null : parseInt(data.cityId)
    let cityName = data.cityName ? data.cityName.trim() : ''
    let streetId = isNaN(parseInt(data.streetId)) ? null : parseInt(data.streetId)
    let streetName = data.streetName ? data.streetName.trim() : ''
    let number = data.number ? data.number.trim() : ''

    if (this.settings.get('options', 'copyData')) {
      toClipboard([name, number, streetName, cityName].filter(x => !!x).join(' '))
    }

    // Apply new Name
    let newName
    // If exists, ask the user to replace it or not
    // If not exists - use name or house number as name
    if (venue.name) {
      this.log('The Venue has a Name \u00AB' + venue.name + '\u00BB' )
      if (name && name !== venue.name) {
        this.log('Replace a Venue Name with a new one?' )
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n\u00AB' + venue.name + '\u00BB \u27F6 \u00AB' + name + '\u00BB?')) {
          newName = name
          this.log(' \u2014 Yes, a new Venue Name is \u00AB' + newName + '\u00BB' )
        } else {
          newName = venue.name
          this.log(' \u2014 No, use a old Venue Name \u00AB' + newName + '\u00BB' )
        }
      } else if (number && number !== venue.name) {
        this.log('Replace the Venue Name with a number?' )
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n\u00AB' + venue.name + '\u00BB \u27F6 \u00AB' + number + '\u00BB?')) {
          newName = number
          this.log(' \u2014 Yes, a new Venue Name is \u00AB' + newName + '\u00BB' )
        } else {
          newName = venue.name
          this.log(' \u2014 No, use a old Venue Name \u00AB' + newName + '\u00BB' )
        }
      }
    } else if (name) {
      newName = name
      this.log('Use a new Venue Name \u00AB' + newName + '\u00BB' )
    } else if (number) {
      newName = number
      this.log('Use a new Venue Name \u00AB' + newName + '\u00BB' )
      // Update alias for korpus
      if ((new RegExp('[0-9]+[\u0430-\u044F\u0456]?\u043A[0-9]+', 'i')).test(number)) {
        let alias = number.replace('\u043A', ' \u043A\u043E\u0440\u043F\u0443\u0441 ')
        let aliases = venue.aliases?.slice() || []
        if (aliases.indexOf(alias) === -1) {
          aliases.push(alias)
          this.log('Apply a new Venue Alias \u00AB' + alias + '\u00BB' )
          this.wmeSDK.DataModel.Venues.updateVenue({
            venueId: venue.id,
            aliases: aliases
          })
        }
      }
    }
    // Set only really new name
    if (newName && newName !== venue.name) {
      this.log('Apply a new Venue Name \u00AB' + newName + '\u00BB' )
      this.wmeSDK.DataModel.Venues.updateVenue({
        venueId: venue.id,
        name: newName
      })
    }

    // Apply a City name
    if (!cityId && cityName) {
      this.log('We don\'t find a City with name \u00AB' + cityName + '\u00BB, create a new one?' )
      // Ask to create a new City
      if (window.confirm(I18n.t(NAME).questions.notFoundCity + '\n\u00AB' + cityName + '\u00BB?')) {
        cityId = this.getCity(cityName).id
        this.log(' \u2014 Yes, create new City \u00AB' + cityName + '\u00BB' )
      } else {
        cityId = this.getCity().id
        this.log(' \u2014 No, use the empty City with ID \u00AB' + cityId + '\u00BB' )
      }
    } else if (!cityId && !cityName) {
      cityId = this.getCity().id
      this.log('We don\'t find a City and use the empty City with ID \u00AB' + cityId + '\u00BB' )
    }

    let city = this.getCityById(cityId)

    let newStreetId

    // Apply a new Street
    if (streetId && address.street
      && streetId !== address.street.id
      && '' !== address.street.name) {
      this.log('Replace the Street with a new one?')
      if (window.confirm(I18n.t(NAME).questions.changeStreet + '\n\u00AB' + address.street.name + '\u00BB \u27F6 \u00AB' + streetName + '\u00BB?')) {
        newStreetId = streetId
        this.log(' \u2014 Yes, use a new Street Name \u00AB' + streetName + '\u00BB')
      } else {
        this.log(' \u2014 No, use a old Street Name \u00AB' + address.street.name + '\u00BB')
      }
    } else if (streetId) {
      newStreetId = streetId
      this.log('Use a new Street with ID \u00AB' + newStreetId + '\u00BB')
    } else if (!streetId) {
      let street
      if (streetName) {
        this.log('We don\'t find the street \u00AB' + streetName + '\u00BB')
        this.log('Create a new Street?')
        if (window.confirm(I18n.t(NAME).questions.notFoundStreet + '\n\u00AB' + streetName + '\u00BB?')) {
          street = this.getStreet(city.id, streetName)
          this.log(' \u2014 Yes, create a new Street \u00AB' + streetName + '\u00BB')
        } else if ('' !== address.street?.name) {
          street = this.wmeSDK.DataModel.Streets.getById( { streetId: address.street.id } )
          this.log(' \u2014 No, use the current Street \u00AB' + street.name + '\u00BB')
        } else {
          street = this.getStreet(city.id, '')
          this.log(' \u2014 No, use the empty Street with ID \u00AB' + street.id + '\u00BB')
        }
      } else {
        this.log('We don\'t find the street')
        street = this.getStreet(city.id, '')
        this.log('Use the empty Street with ID \u00AB' + street.id + '\u00BB')
      }

      if (street.id !== address.street?.id && '' !== address.street?.name) {
        this.log('Replace the Street with new one?')
        if (window.confirm(I18n.t(NAME).questions.changeStreet + '\n\u00AB' + address.street.name + '\u00BB \u27F6 \u00AB' + streetName + '\u00BB?')) {
          newStreetId = street.id
          this.log(' \u2014 Yes, use a new Street Name \u00AB' + streetName + '\u00BB')
        } else {
          this.log(' \u2014 No, use the current Street Name \u00AB' + address.street.name + '\u00BB')
        }
      } else {
        newStreetId = street.id
      }
    }

    if (newStreetId && newStreetId !== address.street?.id) {
      this.log('Apply a new Street ID \u00AB' + newStreetId + '\u00BB' )
      this.wmeSDK.DataModel.Venues.updateAddress({
        venueId: venue.id,
        streetId: newStreetId
      })
    }

    let newHouseNumber

    // Apply a House Number
    if (number) {
      if (address.houseNumber) {
        this.log('Replace the House Number with a new one?')
        if (address.houseNumber !== number &&
          window.confirm(I18n.t(NAME).questions.changeNumber + '\n\u00AB' + address.houseNumber + '\u00BB \u27F6 \u00AB' + number + '\u00BB?')) {
          newHouseNumber = number
          this.log(' \u2014 Yes, use a new House Number \u00AB' + number + '\u00BB')
        } else {
          this.log(' \u2014 No, use the current House Number \u00AB' + address.houseNumber + '\u00BB')
        }
      } else {
        newHouseNumber = number
        this.log('Use a new House Number \u00AB' + number + '\u00BB')
      }
    }

    if (newHouseNumber) {
      this.log('Apply a new House Number \u00AB' + newHouseNumber + '\u00BB' )
      this.wmeSDK.DataModel.Venues.updateAddress({
        venueId: venue.id,
        houseNumber: newHouseNumber
      })
    }

    // Lock to level 2
    if (this.settings.get('options', 'lock')
      && venue.lockRank < 1
      && this.wmeSDK.State.getUserInfo().rank > 0) {

      this.log('Apply a new Lock Rank \u00AB' + (1+1) + '\u00BB' )
      this.wmeSDK.DataModel.Venues.updateVenue({
        venueId: venue.id,
        lockRank: 1
      })
    }

    // If no an entry point, we would create it
    if (this.settings.get('options', 'entryPoint')
      && venue.navigationPoints?.length === 0) {

      this.log('Create a Navigation Point')

      let point = turf.point([lon, lat])

      if (venue.geometry.type === 'Point') {
        this.log('Use the coordinates for new Navigation Point for Point')
      } else if (turf.pointsWithinPolygon(point, venue.geometry).features?.length > 0) {
        this.log('Use the coordinates for new Navigation Point inside Polygon')
      } else {
        // point is outside the venue geometry
        this.log('Use the intersection of Polygon and vector to coordinates as new Navigation Point')
        let centroid = turf.centroid(venue.geometry);
        let line = turf.lineString([
          centroid.geometry.coordinates,
          point.geometry.coordinates,
        ]);
        let featureCollection = turf.lineIntersect(venue.geometry, line);
        point = featureCollection.features?.pop()
      }

      // create a navigation point
      let navigationPoint =  {
        isEntry: true,
        isExit: false,
        isPrimary: true,
        name: "",
        point: point.geometry
      }

      this.log('Apply a new Navigation Point')
      this.wmeSDK.DataModel.Venues.replaceNavigationPoints({
        venueId: venue.id,
        navigationPoints: [navigationPoint]
      })
    }

    this.groupEnd()
  }

  getCityById (cityID: any) {
    if (!cityID || isNaN(parseInt(cityID))) {
      return null
    }
    return this.wmeSDK.DataModel.Cities.getById({
      cityId: cityID
    })
  }

  getCity (cityName = '') {
    return this.wmeSDK.DataModel.Cities.getCity({
        countryId: this.wmeSDK.DataModel.Countries.getTopCountry().id,
        cityName: cityName
      })
      || this.wmeSDK.DataModel.Cities.addCity({
        countryId: this.wmeSDK.DataModel.Countries.getTopCountry().id,
        cityName: cityName
      })
  }

  getStreet (cityId: any, streetName = '') {
    return this.wmeSDK.DataModel.Streets.getStreet({
        cityId: cityId,
        streetName: streetName,
      })
      || this.wmeSDK.DataModel.Streets.addStreet({
        cityId: cityId,
        streetName: streetName
      })
  }
}

/**
 * Copy to clipboard
 */
function toClipboard (text: string) {
  // normalize
  text = normalizeString(text)
  text = text.replace(/'/g, '')
  GM.setClipboard(text)
  console.log(
    '%c' + NAME + ': %cCopied \u00AB' + text + '\u00BB to the clipboard',
    'color: #0DAD8D; font-weight: bold',
    'color: dimgray; font-weight: normal'
  )
}

/**
 * Normalize the string:
 *  - remove the double quotes
 *  - remove double space
 */
function normalizeString (str: string): string {
  // Clear space symbols and double quotes
  str = str.trim()
    .replace(/["\u201C\u201D]/g, '')
    .replace(/\s{2,}/g, ' ')

  return str
}
