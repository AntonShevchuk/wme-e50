export const SETTINGS = {
  options: {
    modal: true,
    transparent: false,
    entryPoint: true,
    externalProvider: false,
    copyData: true,
    lock: true,
  },
  ranges: {
    radius: 200,
    collapse: 3,
  },
  providers: {
    magic: true,
    osm: false,
    // bing: false,
    here: false,
    google: true,
    visicom: false,
    ua: false,
  },
  keys: {
    // Russian warship, go f*ck yourself!
    visicom: '',
    here: '',
    // bing: '',
    google: 'AIzaSyBWB3' + 'jiUm1dkFwvJWy4w4ZmO7K' + 'PyF4oUa0', // extracted from WME
    ua: 'E50'
  }
}
