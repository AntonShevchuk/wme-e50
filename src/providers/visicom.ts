import { NAME } from '../translations'
import { Provider } from './base'

/**
 * visicom.ua
 */
export class VisicomProvider extends Provider {
  key: string

  constructor(container: any, settings: any, scriptSettings: any, wmeSDK: any, key: string) {
    super(WMEUI.t(NAME).providers.visicom, container, settings, scriptSettings, wmeSDK)
    this.key = key
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let result: any[] = []
    let url = 'https://api.visicom.ua/data-api/5.0/uk/geocode.json'
    let data = {
      near: lon + ',' + lat,
      categories: 'adr_address',
      order: 'distance',
      radius: radius,
      limit: 10,
      key: this.key,
    }

    let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

    console.groupCollapsed(this.uid)
    if (response?.features?.length > 0) {
      result = this.collection(response.features)
    } else {
      console.info('No response returned')
      if (response?.status) {
        console.info('Status:', response.status)
      }
    }
    console.groupEnd()
    return result
  }

  item(res: any): any {
    let city = ''
    let street = ''
    let number = ''
    if (res.properties.settlement) {
      city = res.properties.settlement
    }
    if (res.properties.street) {
      street = res.properties.street_type + ' ' + res.properties.street
    }
    if (res.properties.name) {
      number = res.properties.name
    }
    return this.element(res.geo_centroid.coordinates[0], res.geo_centroid.coordinates[1], city, street, number)
  }
}
