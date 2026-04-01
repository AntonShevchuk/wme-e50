import { Provider } from './base'

/**
 * Here Maps
 * @link https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html
 * @link https://www.here.com/docs/bundle/geocoder-api-developer-guide/page/topics/resource-reverse-geocode.html
 */
export class HereProvider extends Provider {
  key: string

  constructor(container: any, settings: any, scriptSettings: any, wmeSDK: any, key: string) {
    super(I18n.t('E50').providers.here, container, settings, scriptSettings, wmeSDK)
    this.key = key
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let result: any[] = []
    let url = 'https://revgeocode.search.hereapi.com/v1/revgeocode'
    let data = {
      apiKey: this.key,
      at: lat + ',' + lon,
      types: 'address',
      limit: 20
    }

    let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

    console.groupCollapsed(this.uid)
    if (response?.items?.length) {
      result = this.collection(
        response.items.filter((x: any) => x.resultType === 'houseNumber')
      )
    } else {
      console.info('No response returned')
    }
    console.groupEnd()
    return result
  }

  item(res: any): any {
    console.log(res)
    return this.element(
      res.position.lng,
      res.position.lat,
      res.address.city,
      res.address.street,
      res.address.houseNumber
    )
  }
}
