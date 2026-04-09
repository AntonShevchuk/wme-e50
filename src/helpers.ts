import { NAME } from './name'

let E50Instance: any

export function setE50Instance(instance: any) {
  E50Instance = instance
}

/**
 * Apply data to the current selected POI
 */
export function applyData (event: any) {
  event.preventDefault()
  E50Instance.applyData(event.target.dataset)
}

/**
 * Create the vector from the center of the selected POI to point by lon and lat
 */
export function showLayer (event: any) {
  const lon = parseFloat(event.target.dataset.lon)
  const lat = parseFloat(event.target.dataset.lat)

  E50Instance.createVector(lon, lat)
  E50Instance.showLayer()
}

/**
 * Remove all vectors and hide the layer
 */
export function hideLayer () {
  E50Instance.removeVectors()
  E50Instance.hideLayer()
}
