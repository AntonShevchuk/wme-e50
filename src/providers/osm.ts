import { Provider } from './base'

/**
 * OpenStreetMap
 */
export class OsmProvider extends Provider {
  constructor(container: any, settings: any, scriptSettings: any, wmeSDK: any) {
    super(I18n.t('E50').providers.osm, container, settings, scriptSettings, wmeSDK)
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let result: any[] = []
    let url = 'https://nominatim.openstreetmap.org/reverse'
    let data = {
      lon: lon,
      lat: lat,
      zoom: 18,
      addressdetails: 1,
      countrycodes: this.settings.language,
      'accept-language': this.settings.locale,
      format: 'json',
    }

    let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

    console.groupCollapsed(this.uid)
    if (response?.address) {
      result = [this.item(response)]
    } else {
      console.info('No response returned')
    }
    console.groupEnd()
    return result
  }

  item(res: any): any {
    let city = ''
    let street = ''
    let number = ''
    if (res.address.city) {
      city = res.address.city
    } else if (res.address.town) {
      city = res.address.town
    }
    if (res.address.road) {
      street = res.address.road
    }
    if (res.address.house_number) {
      number = res.address.house_number
    }
    return this.element(res.lon, res.lat, city, street, number)
  }
}
