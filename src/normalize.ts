/**
 * Normalize the string:
 *  - remove the double quotes
 *  - remove double space
 */
export function normalizeString(str: any): string {
  // Clear space symbols and double quotes
  str = str.trim()
    .replace(/["""]/g, '')
    .replace(/\s{2,}/g, ' ')

  // Clear accents/diacritics, but "\u0306" needed for "й"
  // str = str.normalize('NFD').replace(/[\u0300-\u0305\u0309-\u036f]/g, '');
  return str
}

/**
 * Normalize the name:
 *  - remove № and # chars
 *  - remove dots
 */
export function normalizeName(name: any): string {
  name = normalizeString(name)
  name = name.replace(/[№#]/g, '')
  name = name.replace(/\.$/, '')
  return name
}

/**
 * Normalize the city name
 */
export function normalizeCity(city: any): string {
  return normalizeString(city)
}

/**
 * Normalize the street name by UA rules
 */
export function normalizeStreet(street: any): string {
  street = normalizeString(street)

  if (street === '') {
    return ''
  }

  // Prepare street name
  street = street.replace(/['']/, '\'')
  // Remove text in the "()", OSM puts alternative name to the pair brackets
  street = street.replace(/( ?\(.*\))/gi, '')
  // Normalize title
  let regs: Record<string, string> = {
    '(^| )бульвар( |$)': '$1б-р$2',         // normalize
    '(^| )вїзд( |$)': '$1в\'їзд$2',         // fix mistakes
    '(^| )в\'ізд( |$)': '$1в\'їзд$2',       // fix mistakes
    '(^|.+?) ?вулиця ?(.+|$)': 'вул. $1$2', // normalize, but ignore Lviv rules
    '(^|.+?) ?улица ?(.+|$)': 'вул. $1$2',  // translate, but ignore Lviv rules
    '^(.+) в?ул\\.?$': 'вул. $1',            // normalize and translate, but ignore Lviv rules
    '^в?ул.? (.+)$': 'вул. $1',             // normalize and translate, but ignore Lviv rules
    '(^| )дорога( |$)': '$1дор.$2',         // normalize
    '(^| )мікрорайон( |$)': '$1мкрн.$2',    // normalize
    '(^| )набережна( |$)': '$1наб.$2',      // normalize
    '(^| )площадь( |$)': '$1площа$2',       // translate
    '(^| )провулок провулок( |$)': '$1пров.$2', // O_o
    '(^| )провулок( |$)': '$1пров.$2',      // normalize
    //'(^| )проїзд( |$)': '$1пр.$2',          // normalize
    '(^| )проспект( |$)': '$1просп.$2',     // normalize
    '(^| )район( |$)': '$1р-н$2',           // normalize
    '(^| )станція( |$)': '$1ст.$2',         // normalize
  }

  for (let key in regs) {
    let re = new RegExp(key, 'gi')
    if (re.test(street)) {
      street = street.replace(re, regs[key])
      break
    }
  }

  return street
}

/**
 * Normalize the number by UA rules
 */
export function normalizeNumber(number: any): string {
  // invalid data as a number
  if (number?.trim().length > 16) {
    return ''
  }

  // process "д."
  number = number.replace(/^д\. ?/i, '')
  // process "дом"
  number = number.replace(/^дом ?/i, '')
  // process "буд."
  number = number.replace(/^буд\. ?/i, '')
  // remove spaces
  number = number.trim().replace(/\s/g, '')
  number = number.toUpperCase()
  // process Latin to Cyrillic
  number = number.replace('A', 'А')
  number = number.replace('B', 'В')
  number = number.replace('E', 'Е')
  number = number.replace('I', 'І')
  number = number.replace('K', 'К')
  number = number.replace('M', 'М')
  number = number.replace('H', 'Н')
  number = number.replace('О', 'О')
  number = number.replace('P', 'Р')
  number = number.replace('C', 'С')
  number = number.replace('T', 'Т')
  number = number.replace('Y', 'У')
  // process і, з, о
  number = number.replace('І', 'і')
  number = number.replace('З', 'з')
  number = number.replace('О', 'о')
  // process "корпус" to "к"
  number = number.replace(/(.*)к(?:орп|орпус)?(\d+)/gi, '$1к$2')
  // process "N-M" or "N/M" to "NM"
  number = number.replace(/(.*)[-/]([а-яі])/gi, '$1$2')
  // valid number format
  //  123А  123А/321 123А/321Б 123к1 123Ак2
  /*if (!number.match(/^\d+[а-яі]?([/к]\d+[а-яі]?)?$/gi)) {
    return ''
  }*/
  return number
}

/**
 * Sørensen-Dice coefficient similarity
 * @link https://github.com/aceakash/string-similarity
 */
export function compareTwoStrings(first: string, second: string): number {
  first = first.replace(/\s+/g, '')
  second = second.replace(/\s+/g, '')

  if (!first.length && !second.length) return 1           // if both are empty strings
  if (!first.length || !second.length) return 0           // if only one is empty string
  if (first === second) return 1                          // identical
  if (first.length === 1 && second.length === 1) return 0 // both are 1-letter strings
  if (first.length < 2 || second.length < 2) return 0     // if either is a 1-letter string

  let firstBigrams = new Map()
  for (let i = 0; i < first.length - 1; i++) {
    const bigram = first.substring(i, i + 2)
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) + 1 : 1

    firstBigrams.set(bigram, count)
  }

  let intersectionSize = 0
  for (let i = 0; i < second.length - 1; i++) {
    const bigram = second.substring(i, i + 2)
    const count = firstBigrams.has(bigram) ? firstBigrams.get(bigram) : 0

    if (count > 0) {
      firstBigrams.set(bigram, count - 1)
      intersectionSize++
    }
  }
  return (2.0 * intersectionSize) / (first.length + second.length - 2)
}

/**
 * Find the best match from an array of target strings
 */
export function findBestMatch(mainString: string, targetStrings: string[]): number {
  let bestMatch = ''
  let bestMatchRating = 0
  let bestMatchIndex = -1

  for (let i = 0; i < targetStrings.length; i++) {
    let rating = compareTwoStrings(mainString, targetStrings[i])
    if (rating > bestMatchRating) {
      bestMatch = targetStrings[i]
      bestMatchRating = rating
      bestMatchIndex = i
    }
  }
  if (bestMatch === '' || bestMatchRating < 0.35) {
    console.log('❌', mainString, '🆚', targetStrings)
    return -1
  } else {
    console.log('✅', mainString, '🆚', bestMatch, ':', bestMatchRating)
    return bestMatchIndex
  }
}
