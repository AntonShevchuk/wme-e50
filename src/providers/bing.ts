import { Provider } from './base'

/**
 * Bing Maps
 * @link https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
 * http://dev.virtualearth.net/REST/v1/Locations/50.03539,36.34732?o=xml&key=AuBfUY8Y1Nzf3sRgceOYxaIg7obOSaqvs0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw&c=uk
 * http://dev.virtualearth.net/REST/v1/Locations/50.03539,36.34732?o=xml&key=AuBfUY8Y1Nzf3sRgceOYxaIg7obOSaqvs0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw&c=uk&includeEntityTypes=Address
 */
export class BingProvider extends Provider {
  key: string

  constructor(container: any, settings: any, wmeSDK: any, key: string) {
    super(I18n.t('E50').providers.bing, container, settings, wmeSDK)
    this.key = key
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let result: any[] = []
    let url = 'https://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + lon
    let data = {
      includeEntityTypes: 'Address',
      c: this.settings.country,
      key: this.key,
    }

    let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

    console.groupCollapsed(this.uid)
    if (response?.resourceSets?.[0]?.resources?.length) {
      result = this.collection(
        response.resourceSets[0].resources.filter(
          (el: any) => el.address?.addressLine?.includes(',')
        )
      );
    } else {
      console.info('No response returned')
    }
    console.groupEnd()
    return result
  }

  item(res: any): any {
    let address = res.address.addressLine.split(',')
    return this.element(
      res.point.coordinates[1],
      res.point.coordinates[0],
      res.address.locality,
      address[0],
      address[1]
    )
  }
}
