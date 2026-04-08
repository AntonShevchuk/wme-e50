import { NAME } from '../translations'
import { Provider } from './base'

/**
 * UA Addresses
 */
export class UaAddressesProvider extends Provider {
  key: string

  constructor(container: any, settings: any, scriptSettings: any, wmeSDK: any, key: string) {
    super(WMEUI.t(NAME).providers.ua, container, settings, scriptSettings, wmeSDK)
    this.key = key
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let result: any[] = []
    let url = 'https://stat.waze.com.ua/address_map/address_map.php'
    let data = {
      lon: lon,
      lat: lat,
      radius: radius,
      limit: 20,
      script: this.key
    }
    let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

    console.groupCollapsed(this.uid)
    if (response?.result && response.result === 'success') {
      result = this.collection(response.data.polygons.Default)
    } else {
      console.info('No response returned')
    }
    console.groupEnd()
    return result
  }

  item(res: any): any {

    let data = res.name.split(",")

    data = data.map((part: string) => part.trim())

    let number = data.length ? data.pop() : null
    let street = data.length ? data.pop() : null
    let city = data.length ? data.pop() : null

    // https://cdn.jsdelivr.net/npm/wellknown@0.5.0/wellknown.min.js
    // let element = wellknown.parse(res.polygon);
    // let center = turf.centroid(element)
    //  center.geometry.coordinates[0],
    //  center.geometry.coordinates[1],

    let [lat, lon] = res.center.split(';')

    return this.element(
      lon,
      lat,
      city,
      street,
      number
    )
  }
}
