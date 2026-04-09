import { NAME } from '../name'
import { normalizeCity, normalizeStreet, normalizeNumber, normalizeName } from '../normalize'
import { detectCity, detectStreet } from '../detect'

let E50Cache: any
export function setCache(cache: any) { E50Cache = cache }

export class Provider {
  uid: string
  name: string
  container: any
  settings: any
  scriptSettings: any
  wmeSDK: any
  response: any[]
  panel: HTMLElement

  constructor(uid: string, container: any, settings: any, scriptSettings: any, wmeSDK: any) {
    this.uid = uid.trim().toLowerCase().replace(/\s/g, '-')
    this.name = uid
    this.response = []
    this.settings = settings
    this.scriptSettings = scriptSettings
    this.wmeSDK = wmeSDK
    // prepare DOM
    this.panel = this._panel()
    this.container = container
    this.container.append(this.panel)
  }

  /**
   * @param {String} url
   * @param {Object} data
   * @returns {Promise<unknown>}
   */
  async makeRequest(url: string, data: any): Promise<any> {
    let query = new URLSearchParams(data).toString()

    if (query.length) {
      url = url + '?' + query
    }

    console.log(url)

    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        method: 'GET',
        responseType: 'json',
        url: url,
        onload: (response: any) => {
          if (response && response.response) {
            resolve(response.response)
          } else {
            reject(response)
          }
        },
        onabort: () => reject('aborted'),
        onerror: (response: any) => reject(response),
        ontimeout: () => reject('timeout'),
      })
    })
  }

  /**
   * @param  {Number} lon
   * @param  {Number} lat
   * @param  {Number} radius
   * @return {Promise<array>}
   */
  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    throw new Error('Abstract method')
  }

  /**
   * @param  {Number} lon
   * @param  {Number} lat
   * @param  {Number} radius
   * @return {Promise<void>}
   */
  async search(lon: number, lat: number, radius: number = 1000): Promise<void> {
    let key = this.uid + ':' + lon + ',' + lat

    if (E50Cache.has(key)) {
      console.log('E50 Cache hit for ' + key)
      this.response = E50Cache.get(key)
    } else {
      console.log('E50 Cache miss for ' + key)
      this.response = await this.request(lon, lat, radius).catch(e => { console.error(this.uid, 'search return error', e); return [] })
      E50Cache.set(key, this.response)
    }

    return new Promise((resolve, reject) => {
      if (this.response) {
        resolve()
      } else {
        reject()
      }
    })
  }

  /**
   * @param  {Array} res
   * @return {Array}
   */
  collection(res: any[]): any[] {
    let result = []
    for (let i = 0; i < res.length; i++) {
      result.push(this.item(res[i]))
    }
    result = result.filter(x => x)
    return result
  }

  /**
   * Should return {Object}
   * @param  {Object} res
   * @return {Object}
   */
  item(res: any): any {
    throw new Error('Abstract method')
  }

  /**
   * @param  {Number} lon
   * @param  {Number} lat
   * @param  {String} city
   * @param  {String} street
   * @param  {String} number
   * @param  {String} name
   * @param  {String} reference
   * @return {{number: *, cityId: Number, cityName: *, streetId: Number, streetName: *, name: *, raw: *, lon: *, title: *, lat: *}}
   */
  element(lon: any, lat: any, city: string, street: string, number: string, name: string = '', reference: string = '') {
    // Raw data from provider
    let raw = [city, street, number, name].filter(x => !!x).join(', ')

    {
      city = normalizeCity(city)
      street = normalizeStreet(street)
      number = normalizeNumber(number)
      name = normalizeName(name)
    }

    let [cityId, cityName] = detectCity(this.wmeSDK, city)
    let [streetId, streetName] = detectStreet(this.wmeSDK, cityId, street)

    if (!cityId && streetId) {
      let streetModel = this.wmeSDK.DataModel.Streets.getById({ streetId: streetId })
      let cityModel = this.wmeSDK.DataModel.Cities.getById({ cityId: streetModel.cityId })

      cityId = cityModel.id
      cityName = cityModel.name
    }

    let title = [street, number, name].filter(x => !!x).join(', ')

    return {
      lat: lat,
      lon: lon,
      cityId: cityId,
      cityName: cityName,
      streetId: streetId,
      streetName: streetName,
      number: number,
      name: name,
      title: title,
      raw: raw,
      reference: reference
    }
  }

  /**
   * Render result to target element
   */
  render() {
    if (this.response.length === 0) {
      // remove empty panel
      this.panel.remove()
      return
    }

    this.panel.append(this._fieldset())
  }

  /**
   * Create div for all items
   * @return {HTMLDivElement}
   * @private
   */
  _panel(): HTMLDivElement {
    let div = document.createElement('div')
    div.id = NAME.toLowerCase() + '-' + this.name
    div.className = NAME.toLowerCase()
    return div
  }

  /**
   * Build fieldset with the list of the response items
   * @return {HTMLFieldSetElement}
   * @protected
   */
  _fieldset(): HTMLFieldSetElement {
    let fieldset = document.createElement('fieldset')
    let list = document.createElement('ul')

    let collapse = parseInt(this.scriptSettings.get('ranges', 'collapse'))

    if (collapse && this.response.length > collapse) {
      fieldset.className = 'collapsed'
    } else {
      fieldset.className = ''
    }

    for (let i = 0; i < this.response.length; i++) {
      let item = document.createElement('li')
      item.append(this._link(this.response[i]))
      list.append(item)
    }

    let legend = document.createElement('legend')
    legend.innerHTML = this.name + ' <span>' + this.response.length + '</span>'
    legend.onclick = function (this: HTMLElement) {
      this.parentElement!.classList.toggle("collapsed")
      return false
    }
    fieldset.append(legend, list)
    return fieldset
  }

  /**
   * Build link by {Object}
   * @param  {Object} item
   * @return {HTMLAnchorElement}
   * @protected
   */
  _link(item: any): HTMLAnchorElement {
    let a = document.createElement('a')
    a.href = '#'
    a.dataset.lat = item.lat
    a.dataset.lon = item.lon
    a.dataset.cityId = item.cityId || ''
    a.dataset.cityName = item.cityName || ''
    a.dataset.streetId = item.streetId || ''
    a.dataset.streetName = item.streetName || ''
    a.dataset.number = item.number
    a.dataset.name = item.name
    a.dataset.reference = item.reference || ''
    a.innerText = item.title || item.raw
    a.title = item.raw
    a.className = NAME + '-link'
    if (!item.cityId || !item.streetId) {
      a.className += ' noaddress'
    }
    if (!item.number) {
      a.className += ' nonumber'
    }
    return a
  }
}
