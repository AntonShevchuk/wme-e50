import { NAME } from '../translations'
import { Provider } from './base'
import { TYPES } from '../types'

/**
 * Based on the closest segment and city
 */
export class MagicProvider extends Provider {
  constructor(container: any, settings: any, scriptSettings: any, wmeSDK: any) {
    super(WMEUI.t(NAME).providers.magic, container, settings, scriptSettings, wmeSDK)
  }

  async request(lon: number, lat: number, radius: number): Promise<any[]> {
    let segments = this.wmeSDK.DataModel.Segments.getAll()
    let except = [TYPES.boardwalk, TYPES.stairway, TYPES.railroad, TYPES.runway, TYPES.parking]

    segments = segments.filter((segment: any) => except.indexOf(segment.roadType) === -1)

    let streets: Record<string, any> = {}

    console.groupCollapsed(this.uid)

    for (let key in segments) {
      let segment = segments[key]
      let address = this.wmeSDK.DataModel.Segments.getAddress({ segmentId: segment.id })

      if (address.street.name === '') {
        continue
      }

      let distance = turf.pointToLineDistance(
        turf.point([lon, lat]),
        segment.geometry,
        {
          units: 'meters'
        }
      )

      if (!streets[address.street.id]
        || distance < streets[address.street.id].distance) {

        let nearestPointOnLine = turf.nearestPointOnLine(
          segment.geometry,
          turf.point([lon, lat])
        )

        streets[address.street.id] = {
          lon: nearestPointOnLine.geometry.coordinates[0],
          lat: nearestPointOnLine.geometry.coordinates[1],
          streetId: address.street.id,
          streetName: address.street.name,
          cityId: address.city.id,
          cityName: address.city.name,
          number: '',
          name: '',
          title: address.street.name,
          raw: address.city.name + ', ' + address.street.name,
          distance: distance,
        }
      }
    }

    let result: any[] = []

    for (let key in streets) {
      if (streets.hasOwnProperty(key) && streets[key].distance <= radius) {
        result.push(streets[key])
      }
    }

    result.sort((a, b) => {
      if (a.distance < b.distance) {
        return -1;
      }
      if (a.distance > b.distance) {
        return 1;
      }
      return 0;
    })

    console.log(result.length + ' streets found.')
    console.groupEnd()
    return result
  }
}
