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
  // If the clicked result came from the Google provider (it carries a Google
  // place reference), also link it as the venue's external (Google) place by
  // driving WME's own UI — but only when the "Auto-link Google place"
  // option is enabled.
  if (event.target.dataset.reference && E50Instance.settings.get('options', 'linkGoogle')) {
    linkExternalProvider(event.target.dataset)
  }
}

/**
 * Recursively search for `selector` in the light DOM and inside the shadow
 * roots of any custom elements. WME's UI is built from web components, so the
 * real button/input live inside shadow roots.
 */
function queryInShadows (root: Document | Element | ShadowRoot, selector: string): HTMLElement | null {
  const direct = root.querySelector(selector) as HTMLElement | null
  if (direct) {
    return direct
  }
  const hosts = root.querySelectorAll('*')
  for (let i = 0; i < hosts.length; i++) {
    const host = hosts[i] as HTMLElement & { shadowRoot?: ShadowRoot }
    if (host.shadowRoot) {
      const hit = queryInShadows(host.shadowRoot, selector)
      if (hit) {
        return hit
      }
    }
  }
  return null
}

/**
 * Same as queryInShadows but returns ALL matches (light DOM + shadow roots),
 * in document order. Useful when multiple elements share a selector.
 */
function queryInShadowsAll (root: Document | Element | ShadowRoot, selector: string): HTMLElement[] {
  const results: HTMLElement[] = []
  const collect = (r: Document | Element | ShadowRoot) => {
    r.querySelectorAll(selector).forEach((el) => results.push(el as HTMLElement))
    const hosts = r.querySelectorAll('*')
    for (let i = 0; i < hosts.length; i++) {
      const host = hosts[i] as HTMLElement & { shadowRoot?: ShadowRoot }
      if (host.shadowRoot) {
        collect(host.shadowRoot)
      }
    }
  }
  collect(root)
  return results
}

/**
 * Poll `fn` until it returns a truthy value or `timeout` ms elapse.
 */
function waitFor<T> (fn: () => T | null | undefined, timeout = 8000, interval = 150): Promise<T> {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const tick = () => {
      let result: any
      try {
        result = fn()
      } catch (e) {
        result = null
      }
      if (result) {
        resolve(result)
        return
      }
      if (Date.now() - start > timeout) {
        reject(new Error('waitFor: timed out'))
        return
      }
      setTimeout(tick, interval)
    }
    tick()
  })
}

/**
 * Link the Google place from a Google-provider result to the currently
 * selected venue by driving WME's own "+ Add linked Google place" UI:
 *   1. click the add button
 *   2. type the POI name into the search box
 *   3. click the top autocomplete result
 *
 * NOTE: this drives WME's internal DOM (web components with shadow roots).
 * The selectors below are best-effort and may need adjusting if WME changes
 * its markup. Failures are logged but never break the address apply.
 */
async function linkExternalProvider (data: any) {
  try {
    const reference = data.reference
    const name = data.name
    // WME links by searching a text query (name + address), not the place ID.
    const searchQuery = data.query || name
    if (!reference || !searchQuery) {
      return
    }

    const venue = E50Instance.getSelectedPOI()
    if (!venue || !E50Instance.canEditVenue(venue)) {
      return
    }

    // Skip if this Google place is already linked
    const model = E50Instance.wmeSDK.DataModel.Venues.getById({ venueId: venue.id })
    if (model && model.externalProviderIds && model.externalProviderIds.indexOf(reference) > -1) {
      console.info('Google place is already linked')
      return
    }

    // 1. Click "+ Add linked Google place"
    const addButton = await waitFor(() => queryInShadows(document, 'wz-button.external-provider-add-new'))
    ;(addButton as HTMLElement).click()

    // 2. Fill the "Search for a place" input. Use the native setter so the
    //    component's value binding updates, then dispatch an input event.
    const input = await waitFor(() => queryInShadows(document, 'input[placeholder="Search for a place"]')) as HTMLInputElement
    const valueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')
    if (valueSetter && valueSetter.set) {
      valueSetter.set.call(input, searchQuery || '')
    } else {
      input.value = searchQuery || ''
    }
    input.dispatchEvent(new Event('input', { bubbles: true }))

    // 3. Wait for the autocomplete dropdown. Each result is a
    //    "wz-menu-item.simple-item" that carries the Google place ID in its
    //    "item-id" attribute. Prefer the exact place; otherwise use the top
    //    result.
    const resultEl = await waitFor(() => {
      const items = queryInShadowsAll(document, 'wz-menu-item.simple-item')
      if (!items.length) {
        return null
      }
      return items.find((el) => el.getAttribute('item-id') === reference) || items[0]
    })
    ;(resultEl as HTMLElement).click()

    console.info('✅ Google place linked as external provider')
  } catch (e) {
    console.warn('Could not auto-link the Google place (WME UI may have changed)', e)
  }
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
