declare class WMEBase {
  constructor(name: string, options?: any)
  name: string
  id: string
  wmeSDK: any
  settings: any
  log(...args: any[]): void
  group(...args: any[]): void
  groupEnd(): void
  getAllVenues(except?: string[]): any[]
  getSelectedVenue(): any
  getSelectedVenues(): any[]
}

declare class WMEUI {
  static addTranslation(name: string, translation: any): void
  static addStyle(style: string): void
}

declare class WMEUIHelper {
  constructor(name: string)
  createTab(title: string, options: any): any
  createFieldset(title: string): any
  createPanel(title: string): any
  createModal(title: string): any
}

declare class WMEUIHelperFieldset {
  addCheckbox(key: string, label: string, handler: (event: any) => void, value: boolean): void
  addNumber(key: string, label: string, handler: (event: any) => void, value: number, options?: any): void
  addText(key: string, label: string, handler: (event: any) => void, value: string): void
}

declare class Settings {
  constructor(name: string, defaults: any)
  container: any
  get(...keys: string[]): any
  set(path: any[], value: any): void
}

declare class SimpleCache {
  constructor(name?: string)
  has(key: string): boolean
  get(key: string): any
  set(key: string, value: any): void
}

declare const Tools: {
  mergeDeep<T>(...objects: any[]): T
}

declare const I18n: {
  t(key: string): any
}

declare const turf: any
declare const google: any

declare const Container: any

declare module '*.css' {
  const content: string
  export default content
}
