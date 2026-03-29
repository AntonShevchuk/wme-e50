import { findBestMatch, compareTwoStrings } from './normalize'

/**
 * Search the city name from available in the editor area
 */
export function detectCity(wmeSDK: any, cityName: string): [number | null, string] {
  // Get the list of all available cities
  let cities = wmeSDK.DataModel.Cities.getAll()
    .filter((city: any) => city.name)

  console.log("Total found " + cities.length + " cities.")

  // More than one city, use city with best matching score
  // Remove text in the "()"; Waze puts the region name to the pair brackets
  let best = findBestMatch(cityName, cities.map((city: any) => city.name.replace(/( ?\(.*\))/gi, '')))

  if (best > -1) {
    console.info("✅ City detected")
    return [cities[best]['id'], cities[best]['name']]
  /*} else if (cities.length === 1) {
    console.info("❎ City doesn't found, uses default city")
    return [cities[0]['id'], cities[0]['name']]*/
  } else {
    console.info("❌ City doesn't found")
    return [null, cityName]
  }
}

/**
 * Search the street name from available in the editor area
 */
export function detectStreet(wmeSDK: any, cityId: number, streetName: string): [number | null, string] {
  // It can be empty
  if (streetName.trim() === '') {
    return [null, null as any]
  }

  // Get all streets
  let streets = wmeSDK.DataModel.Streets.getAll()
    .filter((street: any) => street.cityId === cityId)
    .filter((street: any) => street.name)

  // Get type and create RegExp for filter streets
  let reTypes = new RegExp('(алея|б-р|в\'їзд|вул\\.|дор\\.|мкрн|наб\\.|площа|пров\\.|проїзд|просп\\.|р-н|ст\\.|тракт|траса|тупик|узвіз|шосе)', 'gi')
  let matches = [...streetName.matchAll(reTypes)]
  let types: string[] = []

  // Detect type(s)
  if (matches.length === 0) {
    types.push('вул.') // set up a basic type
    streetName = 'вул. ' + streetName
  } else {
    types = matches.map(match => match[0].toLowerCase())
  }

  // Filter streets by detected type(s)
  let filteredStreets = streets.filter((street: any) => types.some(type => street.name.indexOf(type) > -1))

  // Matching names without type(s)
  let best = findBestMatch(
    streetName.replace(reTypes, '').toLowerCase().trim(),
    filteredStreets.map((street: any) => street.name.replace(reTypes, '').toLowerCase().trim())
  )

  if (best > -1) {
    return [filteredStreets[best]['id'], filteredStreets[best]['name']]
  } else {
    return [null, streetName]
  }
}
