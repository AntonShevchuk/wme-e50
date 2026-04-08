import { NAME, TRANSLATION } from './translations'
import { SETTINGS } from './settings'
import { E50 } from './e50'
import { setE50Instance, applyData, showLayer, hideLayer } from './helpers'
import { setCache } from './providers/base'
import css from './style.css'

$(document)
  .on('bootstrap.wme', () => {
    WMEUI.addTranslation(NAME, TRANSLATION)
    WMEUI.addStyle(css)

    let scriptSettings = new Settings(NAME, SETTINGS)
    let instance = new E50(NAME, scriptSettings)
    setE50Instance(instance)
    setCache(new SimpleCache(NAME))
  })
  .on('click', '.' + NAME + '-link', applyData)
  .on('mouseenter', '.' + NAME + '-link', showLayer)
  .on('mouseleave', '.' + NAME + '-link', hideLayer)
  .on('mouseenter', '.' + NAME + '-external', showLayer)
  .on('mouseleave', '.' + NAME + '-external', hideLayer)
  .on('none.wme', hideLayer)
