import { Provider } from './base'

/**
 * Google Place
 * @link https://developers.google.com/places/web-service/search
 */
export class GoogleProvider extends Provider {
  key: string

  constructor(container: any, settings: any, wmeSDK: any, key: string) {
    super(I18n.t('E50').providers.google, container, settings, wmeSDK)
    this.key = key
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let result: any[] = []
    let response = await this.makeAPIRequest(lat, lon, radius)
      .catch(e => null)
      //.catch(e => console.error(this.uid, 'return error', e))

    console.groupCollapsed(this.uid)
    if (response?.length) {
      result = this.collection(response)
    } else {
      console.info('No response returned')
    }
    console.groupEnd()
    return result
  }

  async makeAPIRequest(lat: number, lon: number, radius: number): Promise<any> {
    let center = new google.maps.LatLng(lat, lon)

    let map = new google.maps.Map(document.createElement('div'), { center: center })

    let request = {
      location: center,
      radius: radius,
      type: 'point_of_interest',
      // doesn't work
      // fields: ['name', 'address_component', 'geometry'],
      // language: this.settings.country,
    }

    let service = new google.maps.places.PlacesService(map)
    return new Promise((resolve, reject) => {
      service.nearbySearch(request, (results: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results)
        } else {
          reject(status)
        }
      })
    })
  }

  item(res: any): any {
    let address = res.vicinity.split(',')
    address = address.map((str: string) => str.trim())

    // looks like hell
    let street = address[0] && address[0].length > 4 ? address[0] : ''
    let number = address[1] && address[1].length < 13 ? address[1] : ''
    let city = address[2] ? address[2] : ''

    return this.element(
      res.geometry.location.lng(),
      res.geometry.location.lat(),
      city,
      street,
      number,
      res.name,
      res.reference
    )
  }

  /**
   * Details about a specific object or entity.
   *
   * This variable is used to encapsulate information or attributes
   * related to a particular subject. The structure and type of the
   * details may vary depending on the specific application or use-case.
   */
  static async makeDetailsRequest(reference: string): Promise<any> {
    // We need a map instance to initialize the service (even a dummy one)
    let map = new google.maps.Map(document.createElement('div'))
    let service = new google.maps.places.PlacesService(map)

    let request = {
      placeId: reference, // Google now uses placeId instead of reference
      // Specifying fields is cheaper and faster
      fields: ['business_status', 'geometry', 'name', 'place_id', 'vicinity']
    }

    return new Promise((resolve, reject) => {
      service.getDetails(request, (place: any, status: any) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(place)
        } else {
          reject(status)
        }
      })
    })
  }
}
