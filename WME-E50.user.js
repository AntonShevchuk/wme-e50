// ==UserScript==
// @name         WME E50 Fetch POI Data
// @name:uk      WME 🇺🇦 E50 Fetch POI Data
// @version      0.10.8
// @description  Fetch information about the POI from external sources
// @description:uk Скрипт дозволяє отримувати інформацію про POI зі сторонніх ресурсів
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e50/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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ICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmE5OWYwNzEyLTc5ZDctNDY5Ni05MWUyLTE5YmEzNjM2NTIzYiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZGIzMGE2ZS00M2RkLTQ0MzktYTQ0Ny05ODc4YTc0MWZhZWYiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMjBiMWUzNS1mZjE3LTRjZjgtODk5My0wMTYwNTc0OGY5MDkiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJNYWMgT1MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjczNDMzNzgwNTU3NzE0IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzIiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzOjAxOjExVDExOjQzOjAwKzAxOjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMzowMToxMVQxMTo0MzowMCswMTowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI4N2M2YmI2LTJmZGItNDdlMi05MjYzLWE3ZjNmMjY0ZDYyOSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChNYWMgT1MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTAxLTExVDExOjQzOjAwKzAxOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgpaVBgAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAQsKKwBWE1eUAAAGfklEQVR42u2ae0zTVxTHv7R1yuRVymgrdMYhGh9oYDQBCzPMByYm4hAfU1E0IjjjIBKVxEqJIz7+ULFRJEq0hGCFzdDEaEBNAGkZERcnL3EMUXC0gIUCE9BSuj+wP/qzrZSHSy2/T0L4nXvPuXDP795z7rn5ARQUFBQUFBQUFBQUUxEH4ikFNDjgJwCbAIRAb9RnHzPVA5ADyIcDMpCKoZFOEbgQQSG5K9Er1Uq9vaJUK/WSuxI9RFBABK6xA+SV9ZX6qUJlfaUeIsiHF4YIcdcE1zJjVsUAAMprypFTkYPMfzLtagfEe8UjOigayxYvAwBI7kmwS7ErzgEilCp/Vn7HcedAUa1AyM0Quw568g1yCPwEUHWqwBVzH9DooIdy3DkAgCx5lt1HfcMcOe4c0EEPpXHpXCLaS9okdu8A4zly6VwH2lQ/BzCsUYpkRmKhx8Jx/YGetz0QN4sJeb3beiz+arHV9vdb7qNioMJsn9BXiOC5wfB088SgbhC1zbXI+jPLov64HbAtYBsiQyPH5YDW160QXxhxwL7QfVj97WrrB8gFKhrIEwp2DEbO9hz4ePmQ2oMWBmFr2FaIb4mRXJNs1fD/+xZwd3KfkD0NNOTtyjOZvAHH6Y5I+iEJQl+hbTpgotxcdRM8T97HlzWdgYS1CZO3BT5E3a1Gk6rJKt2O7o6P9h/LPTZqDDBm+ZLlJLmosghlz8rAnMlE7OpYuMx0AQB4uHngtN9pHKk+MvkOaFI1gS/lj+sNGv5BA2kNaVbbJs5OBNOZSci1TbVYc3sNIQ/ph3Ao8hAhhy4IBaptbAu4OI44YODdwJhsw+aHkeTy+nKSfLjqMPrf9hPyPK95th0DNP9qxqTvxfIiyXWqOtPt2aMmnlmuLLjR3GzMAca3DPrhX18zvobQVwihrxC7ObstmnJZXJKc/jLdREfVqSLJ+7/ZP/kxYCI4OTqR5BthN7AuaB0cpzsSbSe6TuDy3ctIeZpCflu0sb8vOp0++Q5gu7GRF5Y3+hJ/o0HcwziLDuCwONi8fLPp+Ew2hJuF4BZxEft7LNHu6uRKCnjmGBoity/gLgCeTbIDeGweeGzeqHoqtcrEAdbvFAfsXLETd+rvoKCrYPiQ88XIKul602XWrq2njbwCHOi2EwMczFwzage1qGqswqNnj6DuVpP6pjGmIen7JLNj6bQ6s+1arXbyi6HJYovnFpI88G4AybnJOP/yPNH2JPoJlvgsIWTjZ9Kbo5t/d3QG/dM7oKW9BRVPR6+4Plym0nYppCKp+YzwHtEtEQoSCwjZ+UtnRHtGI6c9BwPaAcyYNgMA4OZkPr2xXdjkmGAhVkzIAW1dbdhUvGniadAMMo0MKrUKHBaHaJvtOhtoBzS9Ghhurxg0hsU6gHRWUNZ9fsVQR4/5+kE3pBvzWDqd7vNzANOJaTGrGHOAd8BsCjXmXOM523FAtiAblT9W4nnccygPKCGaLzKrZ5zvAeBVzysAQHNHM6l9EXeRia2Hqwepau3T99mOA2axZiFwfiDmcOeAw+IgIjDCROci/yKcHZ0Jube/l7jILPmrhKQb6BNIkk8uOkk6UdY1132aLMBmspEflm+1/vXH1yHTyFD6tBQrA1YS7f6+/ihcW4i04jTI++TICs7CjhU7SLbVjSP1rLhZjJTuFLBcWQCApb5Lke6fjsTHiYhiRSFmRQzJtri2+NM4gOfJG/VWxpiqV1WQaWRIa0jD3va9JNtwfjjC+eHmDzWDWlwovUBqK6kuwYaQDUQmSIhIQEJEgtlULaoX2V45fPb2WWgHrTut5T/Ih7RDSj5M3d+C1tetH7XTDmqRUZRhm3eC6S/TceK3E+js7bSo0/+uH1eLrmL7g+0mfYMYxNFfj5qUvcaTPyM7g1ONpybvJCj/Wz6uHGygpqOGJKfWp0LaKMVB/4MI8AkAx50DBo0BZacSDa0NuPTwEkrelFgcT9ImgUQswZWgK+DP5YPNZKO7rxsvVC+QqciETCOz/lzmfdxb33KsZVhIta9vIiyhTx2+ieH9wgNNqVPqDR0x7Bi7n7zxHJU6pZ6mg67MsJ/2hOyxewcY5qjqVEEHXRkNQG7hH4UAAIGfAIooBeK944eLFjv6ifeOhyJKAYGfAADwfs6572vQqfuJjCENbuRL+eXZ97Itphd7QNWpQva9bPCl/HIAG8nV+VT6TE6PDBzHECgoKCgoKCgoKCgopiz/AYtz5BmJvxgCAAAAAElFTkSuQmCC
// @connect      api.here.com
// @connect      api.visicom.ua
// @connect      nominatim.openstreetmap.org
// @connect      catalog.api.2gis.com
// @connect      dev.virtualearth.net
// @connect      maps.googleapis.com
// @connect      stat.waze.com.ua
// @grant        GM.xmlHttpRequest
// @grant        GM.setClipboard
// @require      https://update.greasyfork.org/scripts/389765/1090053/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1218867/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/452563/1218878/WME.js
// @require      https://update.greasyfork.org/scripts/450221/1137043/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1281847/WME-UI.js
// @require      https://update.greasyfork.org/scripts/480123/1281900/WME-EntryPoint.js
// ==/UserScript==

/* jshint esversion: 8 */
/* global require */
/* global $, jQuery, jQuery.Event */
/* global W, W.model */
/* global I18n */
/* global OpenLayers */
/* global NavigationPoint */
/* global WME, WMEBase, WMEUI, WMEUIHelper */
/* global Container, Settings, SimpleCache, Tools  */

(function () {
  'use strict'

  let vectorPoint, vectorLine

  const NAME = 'E50'

  // translation structure
  const TRANSLATION = {
    'en': {
      title: 'Information 📍',
      notFound: 'Not found',
      options: {
        title: 'Options',
        modal: 'Use modal window',
        transparent: 'Transparent modal window',
        entryPoint: 'Create Entry Point if not exists',
        copyData: 'Copy POI data to clipboard on click',
        lock: 'Lock POI to 2 level',
        keys: 'API keys',
      },
      providers: {
        title: 'Providers',
        magic: 'Closest Segment',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        visicom: 'Visicom',
        ua: 'UA Adresses',
      },
      questions: {
        changeName: 'Are you sure to change the name?',
        changeCity: 'Are you sure to change the city?',
        changeStreet: 'Are you sure to change the street name?',
        changeNumber: 'Are you sure to change the house number?',
        notFoundCity: 'City not found in the current location, are you sure to apply this city name?',
        notFoundStreet: 'Street not found in the current location, are you sure to apply this street name?'
      }
    },
    'uk': {
      title: 'Інформація 📍',
      notFound: 'Нічого не знайдено',
      options: {
        title: 'Налаштування',
        modal: 'Використовувати окрему панель',
        transparent: 'Напівпрозора панель',
        entryPoint: 'Створювати точку в\'їзду, якщо відсутня',
        copyData: 'При виборі, копіювати до буферу обміну назву та адресу POI',
        lock: 'Блокувати POI 2-м рівнем',
        keys: 'Ключі до API',
      },
      providers: {
        title: 'Джерела',
        magic: 'Найближчий сегмент',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        visicom: 'Візіком',
        ua: 'UA Адреси',
      },
      questions: {
        changeName: 'Ви впевненні що хочете змінити им\'я?',
        changeCity: 'Ви впевненні що хочете змінити місто?',
        changeStreet: 'Ви впевненні що хочете змінити вулицю?',
        changeNumber: 'Ви впевненні що хочете змінити номер дома?',
        notFoundCity: 'Ми не знайшли такого міста у поточному місці, ви впевнені, що його треба застосувати?',
        notFoundStreet: 'Ми не знайшли таку вулицю у поточному місці, ви впевнені, що треба її додати?',
      }
    },
    'ru': {
      title: 'Информация 📍',
      notFound: 'Ничего не найдено',
      options: {
        title: 'Настройки',
        modal: 'Использовать отдельную панель',
        transparent: 'Полупрозрачная панель',
        entryPoint: 'Создавать точку въезда если отсутствует',
        copyData: 'При виборе, копировать в буфер обмена название и адрес POI',
        lock: 'Блокировать POI 2-м уровнем',
        keys: 'Ключи к API',
      },
      providers: {
        title: 'Источники',
        magic: 'Ближайший сегмент',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        visicom: 'Визиком',
        ua: 'UA Адреса',
      },
      questions: {
        changeName: 'Ви уверены, что хотите изменить имя?',
        changeCity: 'Ви уверены, что хотите изменить город?',
        changeStreet: 'Ви уверены, что хотите изменить улицу?',
        changeNumber: 'Ви уверены, что хотите изменить номер дома?',
        notFoundCity: 'Мы не нашли такого города в данной локации, вы уверены что нужно его добавить?',
        notFoundStreet: 'Мы не нашли такую улицу в данной локации, вы уверены что нужно её добавить?',
      }
    },
    'fr': {
      title: 'Informations 📍',
      notFound: 'Lieu inconnu',
      options: {
        title: 'Réglages',
        modal: 'Activer la fenêtre',
        transparent: 'Fenêtre transparente',
        entryPoint: 'Créer le point d\'entrée s\'il n\'existe pas',
        copyData: 'Copier les informations du POI en cliquant',
        lock: 'Verrouiller le POI au niveau 2',
        keys: 'API keys',
      },
      providers: {
        title: 'Sources',
        magic: 'Au plus proche du segment',
        osm: 'Open Street Map',
        gis: '2GIS',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        visicom: 'Visicom',
        ua: 'UA Adresses',
      },
      questions: {
        changeName: 'Êtes-vous sûr de changer le nom ?',
        changeCity: 'Êtes-vous sûr de changer la ville ?',
        changeStreet: 'Êtes-vous sûr de changer la rue ?',
        changeNumber: 'Êtes-vous sûr de changer le numéro de rue ?',
        notFoundCity: 'City not found in the current location, are you sure to apply this city name?',
        notFoundStreet: 'Street not found in the current location, are you sure to apply this street name?'
      }
    }
  }

  const SETTINGS = {
    options: {
      modal: true,
      transparent: false,
      entryPoint: true,
      copyData: true,
      lock: true,
    },
    providers: {
      magic: true,
      osm: false,
      gis: false,
      bing: false,
      here: false,
      google: true,
      visicom: false,
      ua: false,
    },
    keys: {
      // Russian warship go f*ck yourself!
      visicom: 'da' + '0110' + 'e25fac44b1b9c849296387dba8',
      gis: 'rubnkm' + '7490',
      here: 'GCFmOOrSp8882vFwTxEm' + ':' + 'O-LgGkoRfypnRuik0WjX9A',
      bing: 'AuBfUY8Y1Nzf' + '3sRgceOYxaIg7obOSaqvs' + '0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw',
      google: 'AIzaSyBWB3' + 'jiUm1dkFwvJWy4w4ZmO7K' + 'PyF4oUa0', // extract it from WME
      ua: 'E50'
    }
  }

  const LOCALE = {
    // Ukraine
    232: {
      country: 'uk',
      language: 'ua',
      locale: 'uk_UA'
    }
  }

  // Road Types
  //   I18n.translations.uk.segment.road_types
  //   I18n.translations.en.segment.road_types
  const TYPES = {
    street: 1,
    primary: 2,
    freeway: 3,
    ramp: 4,
    trail: 5,
    major: 6,
    minor: 7,
    offroad: 8,
    walkway: 9,
    boardwalk: 10,
    ferry: 15,
    stairway: 16,
    private: 17,
    railroad: 18,
    runway: 19,
    parking: 20,
    narrow: 22
  }

  WMEUI.addTranslation(NAME, TRANSLATION)

  // OpenLayer styles
  const STYLE =
    '.e50 .header h5 { padding: 0 16px; font-size: 16px }' +
    '.e50 .body { overflow-x: auto; max-height: 420px; padding: 4px 0; }' +

    '.e50 .button-toolbar legend { border: 1px solid #e5e5e5; width: 94%; margin: 0 auto; } ' +
    '.e50 .button-toolbar fieldset { margin-bottom: 8px } ' +

    '.e50 fieldset { border: 1px solid #ddd; }' +
    '.e50 fieldset legend { cursor:pointer; font-size: 12px; font-weight: bold; margin: 0; padding: 0 8px; background-color: #f6f7f7; border-top: 1px solid #e5e5e5; }' +
    '.panel.e50 fieldset legend::after { display: inline-block; font: normal normal normal 14px/1 FontAwesome; font-size: inherit; text-rendering: auto; content: ""; float: right; font-size: 10px; line-height: inherit; position: relative; right: 3px; } ' +
    '.panel.e50 fieldset.collapsed legend::after { content: "" }' +
    '.panel.e50 fieldset.collapsed ul { display: none } ' +
    '.panel.e50 fieldset legend span { font-weight: bold; background-color: #fff; border-radius: 5px; color: #ed503b; display: inline-block; font-size: 12px; line-height: 14px; max-width: 30px; padding: 1px 5px; text-align: center; } ' +

    '.e50 ul { padding: 8px; margin: 0 }' +
    '.e50 li { padding: 0; margin: 0; list-style: none; margin-bottom: 2px }' +
    '.e50 li a { display: block; padding: 2px 4px; text-decoration: none; border: 1px solid #e4e4e4; }' +
    '.e50 li a:hover { background: rgba(255, 255, 200, 1) }' +
    '.e50 li a.noaddress { background: rgba(255, 200, 200, 0.5) }' +
    '.e50 li a.noaddress:hover { background: rgba(255, 200, 200, 1) }' +

    '.e50 div.controls { padding: 8px; }' +
    '.e50 div.controls:empty, #panel-container .archive-panel .body:empty { min-height: 20px; }' +
    '.e50 div.controls:empty::after, #panel-container .archive-panel .body:empty::after { color: #ccc; padding: 0 8px; content: "' + I18n.t(NAME).notFound + '" }' +
    '.e50 div.controls label { white-space: normal; font-weight: 400; margin-top: 5px; }' +
    '.e50 div.controls input[type="text"] { float:right; }' +

    'p.e50-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }'

  WMEUI.addStyle(STYLE)

  let WazeActionUpdateObject
  let WazeActionUpdateFeatureAddress

  let E50Instance, E50Cache, vectorLayer

  class E50 extends WMEBase {
    constructor (name, settings) {
      super(name, settings)

      this.helper = new WMEUIHelper(name)

      this.modal = this.helper.createModal(I18n.t(name).title)

      this.panel = this.helper.createPanel(I18n.t(name).title)

      this.tab = this.helper.createTab(
        I18n.t(name).title,
        {
          image: GM_info.script.icon
        }
      )

      // Setup options
      let fsOptions = this.helper.createFieldset(I18n.t(name).options.title)
      for (let item in settings.options) {
        if (settings.options.hasOwnProperty(item)) {
          fsOptions.addCheckbox(
            item,
            I18n.t(name).options[item],
            (event) => this.settings.set(['options', item], event.target.checked),
            this.settings.get('options', item)
          )
        }
      }
      this.tab.addElement(fsOptions)

      // Setup providers settings
      let fsProviders = this.helper.createFieldset(I18n.t(name).providers.title)
      for (let item in settings.providers) {
        if (settings.providers.hasOwnProperty(item)) {
          fsProviders.addCheckbox(
            item,
            I18n.t(NAME).providers[item],
            (event) => this.settings.set(['providers', item], event.target.checked),
            this.settings.get('providers', item)
          )
        }
      }
      this.tab.addElement(fsProviders)

      // Setup providers key's
      let fsKeys = this.helper.createFieldset(I18n.t(name).options.keys)
      let keys = this.settings.get('keys')
      for (let item in keys) {
        if (keys.hasOwnProperty(item)) {
          fsKeys.addInput(
            'key-' + item,
            I18n.t(name).providers[item],
            (event) => this.settings.set(['keys', item], event.target.value),
            this.settings.get('keys', item)
          )
        }
      }
      this.tab.addElement(fsKeys)

      this.tab.addText(
        'info',
        '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
      )

      this.tab.inject()
    }

    /**
     * Handler for `none.wme` event
     * @param {jQuery.Event} event
     * @return {Null}
     */
    onNone (event) {
      document.getElementById('panel-container').innerText = ''
    }

    /**
     * Handler for `venue.wme` event
     *  - create and fill modal panel
     *
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {W.model} model
     * @return {null|void}
     */
    onVenue (event, element, model) {
      let container, parent
      if (this.settings.get('options', 'modal')) {
        parent = this.modal.html()
        container = parent.querySelector('.body')
      } else {
        parent = this.panel.html()
        container = parent.querySelector('.controls')
      }

      // Clear container
      while (container.hasChildNodes()) {
        container.removeChild(container.lastChild)
      }

      let poi = getSelectedPOI()

      if (!poi) {
        return
      }

      let selected = poi.getOLGeometry().getCentroid().clone()
      selected.transform('EPSG:900913', 'EPSG:4326')

      let providers = []

      let country = W.model.getTopCountry().getID() // or 232 is Ukraine

      let settings = LOCALE[country]

      this.group(
        '📍' + selected.x + ' ' + selected.y
      )

      if (this.settings.get('providers', 'magic')) {
        let Magic = new MagicProvider(container, settings)
        let providerPromise = Magic
          .search(selected.x, selected.y)
          .then(() => Magic.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'ua')) {
        let UaAddresses = new UaAddressesProvider(container, settings, this.settings.get('keys', 'ua'))
        let providerPromise = UaAddresses
          .search(selected.x, selected.y)
          .then(() => UaAddresses.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'osm')) {
        let Osm = new OsmProvider(container, settings)
        let providerPromise = Osm
          .search(selected.x, selected.y)
          .then(() => Osm.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'gis')) {
        let Gis = new GisProvider(container, settings, this.settings.get('keys', 'gis'))
        let providerPromise = Gis
          .search(selected.x, selected.y)
          .then(() => Gis.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'visicom')) {
        let Visicom = new VisicomProvider(container, settings, this.settings.get('keys', 'visicom'))
        let providerPromise = Visicom
          .search(selected.x, selected.y)
          .then(() => Visicom.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'here')) {
        let Here = new HereProvider(container, settings, this.settings.get('keys', 'here'))
        let providerPromise = Here
          .search(selected.x, selected.y)
          .then(() => Here.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'bing')) {
        let Bing = new BingProvider(container, settings, this.settings.get('keys', 'bing'))
        let providerPromise = Bing
          .search(selected.x, selected.y)
          .then(() => Bing.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'google')) {
        let Google = new GoogleProvider(container, settings, this.settings.get('keys', 'google'))
        let providerPromise = Google
          .search(selected.x, selected.y)
          .then(() => Google.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      Promise
        .all(providers)
        .then(() => this.groupEnd())

      if (this.settings.get('options', 'modal')) {
        if (this.settings.get('options', 'transparent')) {
          parent.style.opacity = '0.6'
          parent.onmouseover = () => (parent.style.opacity = '1')
          parent.onmouseout = () => (parent.style.opacity = '0.6')
        }
        this.modal.container().append(parent)
      } else {
        element.prepend(parent)
      }
    }
  }

  /**
   * Basic Provider class
   */
  class Provider {
    constructor (uid, container, settings) {
      this.uid = uid
      this.response = []
      this.settings = settings
      // prepare DOM
      this.panel = this._panel()
      this.container = container
      this.container.append(this.panel)
    }

    /**
     * @param {String} url
     * @param {Object} data
     * @returns {Promise<unknown>}
     */
    async makeRequest (url, data) {
      let query = new URLSearchParams(data).toString()

      if (query.length) {
        url = url + '?' + query
      }

      return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
          method: 'GET',
          responseType: 'json',
          url: url,
          onload: response => response && response.response && resolve(response.response) || reject(response),
          onabort: response => reject(response),
          onerror: response => reject(response),
          ontimeout: response => reject(response),
        })
      })
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @return {Promise<array>}
     */
    async request (lon, lat) {
      throw new Error('Abstract method')
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @return {Promise<void>}
     */
    async search (lon, lat) {
      let key = this.uid + ':' + lon + ',' + lat
      if (E50Cache.has(key)) {
        this.response = E50Cache.get(key)
      } else {
        this.response = await this.request(lon, lat).catch(e => console.error(this.uid, 'search return error', e))
        E50Cache.set(key, this.response)
      }

      return new Promise((resolve, reject) => {
        if (this.response) {
          resolve()
        } else {
          reject()
        }
      })
    }

    /**
     * @param  {Array} res
     * @return {Array}
     */
    collection (res) {
      let result = []
      for (let i = 0; i < res.length; i++) {
        result.push(this.item(res[i]))
      }
      result = result.filter(x => x)
      return result
    }

    /**
     * Should return {Object}
     * @param  {Object} res
     * @return {Object}
     */
    item (res) {
      throw new Error('Abstract method')
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @param  {String} city
     * @param  {String} street
     * @param  {String} number
     * @param  {String} name
     * @return {{number: *, city: *, street: *, name: *, raw: *, lon: *, title: *, lat: *}}
     */
    element (lon, lat, city, street, number, name = '') {
      // Raw data from provider
      let raw = [street, number, name].filter(x => !!x).join(', ')
      console.groupCollapsed(city, street, number, name)
      {
        city = normalizeCity(city)
        street = normalizeStreet(street)
        number = normalizeNumber(number)
        name = normalizeName(name)
      }
      console.groupEnd()
      let title = [street, number, name].filter(x => !!x).join(', ')
      return {
        lat: lat,
        lon: lon,
        city: city,
        street: street,
        number: number,
        name: name,
        title: title,
        raw: raw,
      }
    }

    /**
     * Render result to target element
     */
    render () {
      if (this.response.length === 0) {
        // remove empty panel
        this.panel.remove()
        return
      }

      this.panel.append(this._fieldset())
    }

    /**
     * Create div for all items
     * @return {HTMLDivElement}
     * @private
     */
    _panel () {
      let div = document.createElement('div')
      div.id = NAME + '-' + this.uid
      div.className = 'e50'
      return div
    }

    /**
     * Build fieldset with list of the response items
     * @return {HTMLFieldSetElement}
     * @protected
     */
    _fieldset () {
      let fieldset = document.createElement('fieldset')
      let list = document.createElement('ul')

      if (this.response.length > 3) {
        fieldset.className = 'collapsed'
      } else {
        fieldset.className = ''
      }

      for (let i = 0; i < this.response.length; i++) {
        let item = document.createElement('li')
        item.append(this._link(this.response[i]))
        list.append(item)
      }

      let legend = document.createElement('legend')
      legend.innerHTML = this.uid + ' <span>' + this.response.length + '</span>'
      legend.onclick = function () {
        this.parentElement.classList.toggle("collapsed")
        return false
      }
      fieldset.append(legend, list)
      return fieldset
    }

    /**
     * Build link by {Object}
     * @param  {Object} item
     * @return {HTMLAnchorElement}
     * @protected
     */
    _link (item) {
      let a = document.createElement('a')
      a.href = '#'
      a.dataset.lat = item.lat
      a.dataset.lon = item.lon
      a.dataset.city = item.city
      a.dataset.street = item.street
      a.dataset.number = item.number
      a.dataset.name = item.name
      a.innerText = item.title
      a.title = item.raw
      a.className = NAME + '-link'
      if (!item.city || !item.street || !item.number) {
        a.className += ' noaddress'
      }
      return a
    }
  }

  /**
   * Based on closest segment and city
   */
  class MagicProvider extends Provider {
    constructor (container, settings) {
      super(I18n.t(NAME).providers.magic, container, settings)
    }

    async request (lon, lat) {
      let city = ''
      let street = ''
      let segment = findClosestSegment(new OpenLayers.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:900913'), true, true)
      if (segment) {
        city = segment.getAddress().getCityName()
        street = segment.getAddress().getStreetName()

        // to lon, lat
        let point = segment.closestPoint.transform('EPSG:900913', 'EPSG:4326')
        lon = point.x
        lat = point.y
      }

      if (!city) {
        let cities = W.model.cities.getObjectArray().filter(c => c.getName()).map(c => c.getName())
        city = cities.length ? cities[0] : ''
      }
      if (!street) {
        return []
      }

      console.groupCollapsed(this.uid)
      // lon, lat, city, street, number, name
      let result = [
        this.element(
          lon,
          lat,
          city ? city : '',
          street,
          '',
          ''
        )
      ]
      console.groupEnd()
      return result
    }
  }

  /**
   * US Addresses
   */
  class UaAddressesProvider extends Provider {
    constructor (container, settings, key) {
      super(I18n.t(NAME).providers.ua, container, settings)
      this.key = key
    }

    async request (lon, lat) {
      let url = 'https://stat.waze.com.ua/address_map/address_map.php'
      let data = {
        lon: lon,
        lat: lat,
        script: this.key
      }
      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      if (!response || !response.result || response.result !== 'success') {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = this.collection(response.data.polygons.Default)
      console.groupEnd()
      return result
    }

    item (res) {
      let data = res.name.split(", ")

      data = data.filter(part => {
        return !part.trim().match(/^\D+\sобл\.$/)
        && !part.trim().match(/^\D+\sр-н?$/)
        && !part.trim().match(/^р-н\s+\D+$/)
        }
      )

      if (data.length < 3) {
        return false
      }

      let number = data.pop()
      let street = data.pop()
      let city = data.pop()

      let parser = new OpenLayers.Format.WKT()
      parser.internalProjection = W.map.getProjectionObject()
      //parser.externalProjection = new OpenLayers.Projection('EPSG:4326')

      let feature = parser.read(res.polygon)
      let centerPoint = feature.geometry.getCentroid()

      return this.element(centerPoint.x, centerPoint.y, city, street, number)
    }
  }

  /**
   * visicom.ua
   */
  class VisicomProvider extends Provider {
    constructor (container, settings, key) {
      super('Visicom', container, settings)
      this.key = key
    }

    async request (lon, lat) {
      let url = 'https://api.visicom.ua/data-api/5.0/uk/geocode.json'
      let data = {
        near: lon + ',' + lat,
        categories: 'adr_address',
        order: 'distance',
        radius: 100,
        limit: 10,
        key: this.key,
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      if (!response || !response.features || !response.features.length) {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = this.collection(response.features)
      console.groupEnd()
      return result
    }

    item (res) {
      let city = ''
      let street = ''
      let number = ''
      if (res.properties.settlement) {
        city = res.properties.settlement
      }
      if (res.properties.street) {
        street = res.properties.street_type + ' ' + res.properties.street
      }
      if (res.properties.name) {
        number = res.properties.name
      }
      return this.element(res.geo_centroid.coordinates[0], res.geo_centroid.coordinates[1], city, street, number)
    }
  }

  /**
   * Open Street Map
   */
  class OsmProvider extends Provider {
    constructor (container, settings) {
      super('OSM', container, settings)
    }

    async request (lon, lat) {
      let url = 'https://nominatim.openstreetmap.org/reverse'
      let data = {
        lon: lon,
        lat: lat,
        zoom: 18,
        addressdetails: 1,
        countrycodes: this.settings.language,
        'accept-language': this.settings.locale,
        format: 'json',
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      if (!response || !response.address || !response.address.house_number) {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = [this.item(response)]
      console.groupEnd()
      return result
    }

    item (res) {
      let city = ''
      let street = ''
      let number = ''
      if (res.address.city) {
        city = res.address.city
      } else if (res.address.town) {
        city = res.address.town
      }
      if (res.address.road) {
        street = res.address.road
      }
      if (res.address.house_number) {
        number = res.address.house_number
      }
      return this.element(res.lon, res.lat, city, street, number)
    }
  }

  /**
   * 2GIS
   * @link https://docs.2gis.com/ru/api/search/geocoder/reference/2.0/geo/search#/default/get_2_0_geo_search
   */
  class GisProvider extends Provider {
    constructor (container, settings, key) {
      super('2Gis', container, settings)
      this.key = key
    }

    async request (lon, lat) {
      let url = 'https://catalog.api.2gis.com/2.0/geo/search'
      let data = {
        point: lon + ',' + lat,
        radius: 20,
        type: 'building',
        fields: 'items.address,items.adm_div,items.geometry.centroid',
        locale: this.settings.locale,
        format: 'json',
        key: this.key,
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      if (!response || !response.result || !response.result.items.length) {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = this.collection(response.result.items)
      console.groupEnd()
      return result
    }

    item (res) {
      let output = []
      let city = ''
      let street = ''
      let number = ''
      if (res.adm_div.length) {
        for (let i = 0; i < res.adm_div.length; i++) {
          if (res.adm_div[i].type === 'city') {
            city = res.adm_div[i].name
          }
        }
      }
      if (res.address.components) { // optional
        street = res.address.components[0].street
        number = res.address.components[0].number
      } else if (res.address_name) { // optional
        output.push(res.address_name)
      } else if (res.name) {
        output.push(res.name)
      }
      // e.g. POINT(36.401143 49.916814)
      let center = res.geometry.centroid.substring(6, res.geometry.centroid.length - 1).split(' ')
      let lon = center[0]
      let lat = center[1]

      let element = this.element(lon, lat, city, street, number, output.join(', '))
      if (res.purpose_name) {
        element.raw += ', ' + res.purpose_name
      }
      return element
    }
  }

  /**
   * Here Maps
   * @link https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html
   * @link https://www.here.com/docs/bundle/geocoder-api-developer-guide/page/topics/resource-reverse-geocode.html
   */
  class HereProvider extends Provider {
    constructor (container, settings, key) {
      super('Here', container, settings)
      this.key = key.split(':')
    }

    async request (lon, lat) {
      let url = 'https://reverse.geocoder.api.here.com/6.2/reversegeocode.json'
      let data = {
        app_id: this.key[0],
        app_code: this.key[1],
        prox: lat + ',' + lon + ',10',
        mode: 'retrieveAddresses',
        locationattributes: 'none,ar',
        addressattributes: 'str,hnr'
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      if (!response
        || !response.Response
        || !response.Response.View
        || !response.Response.View
        || !response.Response.View[0]
        || !response.Response.View[0].Result) {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = this.collection(response.Response.View[0].Result.filter(x => x.MatchLevel === 'houseNumber'))
      console.groupEnd()
      return result
    }

    item (res) {
      return this.element(
        res.Location.DisplayPosition.Longitude,
        res.Location.DisplayPosition.Latitude,
        res.Location.Address.City,
        res.Location.Address.Street,
        res.Location.Address.HouseNumber
      )
    }
  }

  /**
   * Bing Maps
   * @link https://docs.microsoft.com/en-us/bingmaps/rest-services/locations/find-a-location-by-point
   * http://dev.virtualearth.net/REST/v1/Locations/50.03539,36.34732?o=xml&key=AuBfUY8Y1Nzf3sRgceOYxaIg7obOSaqvs0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw&c=uk
   * http://dev.virtualearth.net/REST/v1/Locations/50.03539,36.34732?o=xml&key=AuBfUY8Y1Nzf3sRgceOYxaIg7obOSaqvs0k5dhXWfZyFpT9ArotYNRK7DQ_qZqZw&c=uk&includeEntityTypes=Address
   */
  class BingProvider extends Provider {
    constructor (container, settings, key) {
      super('Bing', container, settings)
      this.key = key
    }

    async request (lon, lat) {
      let url = 'https://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + lon
      let data = {
        includeEntityTypes: 'Address',
        c: this.settings.country,
        key: this.key,
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      if (!response || !response.resourceSets || !response.resourceSets[0]) {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = this.collection(response.resourceSets[0].resources.filter(el => el.address.addressLine && el.address.addressLine.indexOf(',') > 0))
      console.groupEnd()
      return result
    }

    item (res) {
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

  /**
   * Google Place
   * @link https://developers.google.com/places/web-service/search
   */
  class GoogleProvider extends Provider {
    constructor (container, settings, key) {
      super('Google', container, settings)
      this.key = key
    }

    async request (lon, lat) {
      let response = await this.makeAPIRequest(lat, lon).catch(e => console.error(this.uid, 'return error', e))

      if (!response || !response.length) {
        return []
      }

      console.groupCollapsed(this.uid)
      let result = this.collection(response)
      console.groupEnd()
      return result
    }

    async makeAPIRequest (lat, lon) {
      let center = new google.maps.LatLng(lat, lon)

      let map = new google.maps.Map(document.createElement('div'), { center: center })

      let request = {
        location: center,
        radius: '100',
        type: ['point_of_interest'],
        // doesn't work
        // fields: ['name', 'address_component', 'geometry'],
        // language: this.settings.country,
      }

      let service = new google.maps.places.PlacesService(map)
      return new Promise((resolve, reject) => {
        service.nearbySearch(request, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(results)
          } else {
            reject(status)
          }
        })
      })
    }

    item (res) {
      let address = res.vicinity.split(',')
      address = address.map(str => str.trim())

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
        res.name
      )
    }
  }

  $(document)
    .on('bootstrap.wme', ready)
    .on('click', '.' + NAME + '-link', applyData)
    .on('mouseenter', '.' + NAME + '-link', showVector)
    .on('mouseleave', '.' + NAME + '-link', hideVector)
    .on('none.wme', hideVector)

  function ready () {
    WazeActionUpdateObject = require('Waze/Action/UpdateObject')
    WazeActionUpdateFeatureAddress = require('Waze/Action/UpdateFeatureAddress')

    E50Instance = new E50(NAME, SETTINGS)
    E50Cache = new SimpleCache()
  }

  /**
   *
   * @return {null|Object}
   */
  function getSelectedPOI () {
    let venue = WME.getSelectedVenue()
      // For TEST ENV only!
      // venue = W.selectionManager.getSelectedDataModelObjects()[0]
    if (!venue) {
      return null
    }
    let except = ['NATURAL_FEATURES']
    if (except.indexOf(venue.getMainCategory()) === -1) {
      return venue
    }
    return null
  }

  /**
   * Returns an array of all segments in the current extent
   * @function WazeWrap.Model.getOnscreenSegments
   */
  function getOnscreenSegments () {
    let segments = W.model.segments.objects
    let mapExtent = W.map.getExtent()
    let onScreenSegments = []
    let seg

    for (let s in segments) {
      if (!segments.hasOwnProperty(s))
        continue

      seg = W.model.segments.getObjectById(s)
      if (mapExtent.intersectsBounds(seg.getOLGeometry().getBounds()))
        onScreenSegments.push(seg)
    }
    return onScreenSegments
  }

  /**
   * Finds the closest on-screen drivable segment to the given point, ignoring PLR and PR segments if the options are set
   * @function WazeWrap.Geometry.findClosestSegment
   * @param {OpenLayers.Geometry.Point} geometry The given point to find the closest segment to
   * @param {boolean} ignorePLR If true, Parking Lot Road segments will be ignored when finding the closest segment
   * @param {boolean} ignoreUnnamedPR If true, Private Road segments will be ignored when finding the closest segment
   */
  function findClosestSegment (geometry, ignorePLR, ignoreUnnamedPR) {
    let onscreenSegments = getOnscreenSegments()
    let minDistance = Infinity
    let closestSegment

    for (let s in onscreenSegments) {
      if (!onscreenSegments.hasOwnProperty(s))
        continue

      let segmentType = onscreenSegments[s].attributes.roadType


      if (segmentType === TYPES.boardwalk
        || segmentType === TYPES.stairway
        || segmentType === TYPES.railroad
        || segmentType === TYPES.runway)
        continue

      // parking lots
      if (ignorePLR && segmentType === TYPES.parking) //PLR
        continue

      // private roads
      if (ignoreUnnamedPR && segmentType === TYPES.private)
        continue

      // unnamed roads, f**ing magic number
      if (
        !onscreenSegments[s].getAddress().getStreet().getID() ||
        onscreenSegments[s].getAddress().getStreet().getID() === 8325397)
        continue

      let distanceToSegment = geometry.distanceTo(onscreenSegments[s].getOLGeometry(), { details: true })

      if (distanceToSegment.distance < minDistance) {
        minDistance = distanceToSegment.distance
        closestSegment = onscreenSegments[s]
        closestSegment.closestPoint = new OpenLayers.Geometry.Point(distanceToSegment.x1, distanceToSegment.y1)
      }
    }

    return closestSegment
  }

  /**
   * Apply data to current selected POI
   * @param event
   */
  function applyData (event) {
    event.preventDefault()
    let poi = getSelectedPOI()

    if (!poi.isGeometryEditable()) {
      return
    }

    E50Instance.group('Apply data')

    let lat = this.dataset.lat
    let lon = this.dataset.lon
    let name = this.dataset.name
    let city = this.dataset.city
    let street = this.dataset.street
    let number = this.dataset.number

    if (E50Instance.settings.get('options', 'copyData')) {
      toClipboard([name, number, street, city].filter(x => !!x).join(' '))
    }

    // POI Name
    let newName
    // If exists name ask user to replace it or not
    // If not exists - use name or house number as name
    if (poi.attributes.name) {
      if (name && name !== poi.attributes.name) {
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n«' + poi.attributes.name + '» ⟶ «' + name + '»?')) {
          newName = name
        }
      } else if (number && number !== poi.attributes.name) {
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n«' + poi.attributes.name + '» ⟶ «' + number + '»?')) {
          newName = number
        }
      }
    } else if (name) {
      newName = name
    } else if (number) {
      newName = number
      // Update alias for korpus
      if ((new RegExp('[0-9]+[а-яі]?к[0-9]+', 'i')).test(number)) {
        let alias = number.replace('к', ' корпус ')
        let aliases = poi.attributes.aliases.slice()
        if (aliases.indexOf(alias) === -1) {
          aliases.push(alias)
          W.model.actionManager.add(new WazeActionUpdateObject(poi, { aliases: aliases }))
        }
      }
    }
    if (newName) {
      W.model.actionManager.add(new WazeActionUpdateObject(poi, { name: newName }))
    }

    // POI Address Street Name
    let newStreet
    let addressStreet = poi.getAddress().getStreet()?.getName() || ''
    if (street) {
      let existStreet = detectStreet(street)

      if (existStreet) {
        // We found street, all OK
        console.log('✅ Street detected, is «' + existStreet + '»')
        street = existStreet
      } else if (!window.confirm(I18n.t(NAME).questions.notFoundStreet + '\n«' + street + '»?')) {
        street = null
      }

      // Check the current POI street name, and ask to rewrite it
      if (street) {
        if (addressStreet) {
          if (addressStreet !== street &&
            window.confirm(I18n.t(NAME).questions.changeStreet + '\n«' + addressStreet + '» ⟶ «' + street + '»?')) {
            newStreet = street
          }
        } else {
          newStreet = street
        }
      }
    }

    // POI Address City
    let newCity
    let addressCity = poi.getAddress().getCity()?.getName() || ''
    if (city) {
      // Try to find the city in the current location
      let existCity = detectCity(city)

      if (existCity) {
        // We found city, all OK
        console.log('✅ City detected, is «' + existCity + '»')
        city = existCity
      } else if(!window.confirm(I18n.t(NAME).questions.notFoundCity + '\n«' + city + '»?')) {
        // We can't find city, and will ask to create new one, but not needed
        city = null
      }

      if (city) {
        if (addressCity) {
          if (addressCity !== city &&
            window.confirm(I18n.t(NAME).questions.changeCity + '\n«' + addressCity + '» ⟶ «' + city + '»?')) {
            newCity = city
          }
        } else {
          newCity = city
        }
      }
    }

    // Update Address
    if (newCity || newStreet) {
      let address = {
        countryID: W.model.getTopCountry().getID(),
        stateID: W.model.getTopState().getID(),
        cityName: newCity ? newCity : poi.getAddress().getCityName(),
        streetName: newStreet ? newStreet : poi.getAddress().getStreetName()
      }
      W.model.actionManager.add(new WazeActionUpdateFeatureAddress(poi, address))
    }

    // POI Address HouseNumber
    let newHN
    let addressHN = poi.getAddress().attributes.houseNumber
    if (number) {
      // Normalize «korpus»
      number = number.replace(/^(\d+)к(\d+)$/i, '$1-$2')
      // Check number for invalid format for Waze
      if ((new RegExp('^[0-9]+[а-яі][к|/][0-9]+$', 'i')).test(number)) {
        // Skip this step
        console.log(
          '%c' + NAME + ': %cskipped «' + number + '»',
          'color: #0DAD8D; font-weight: bold',
          'color: dimgray; font-weight: normal'
        )
      } else if (addressHN) {
        if (addressHN !== number &&
          window.confirm(I18n.t(NAME).questions.changeNumber + '\n«' + addressHN + '» ⟶ «' + number + '»?')) {
          newHN = number
        }
      } else {
        newHN = number
      }
      if (newHN) {
        W.model.actionManager.add(new WazeActionUpdateObject(poi, { houseNumber: newHN }))
      }
    }

    // If no entry point we would create it
    if (E50Instance.settings.get('options', 'entryPoint') && poi.attributes.entryExitPoints.length === 0) {
      // Create point based on data from external source
      let point = new OpenLayers.Geometry.Point(lon, lat).transform('EPSG:4326', 'EPSG:900913')

      // Check intersection with selected POI
      if (!poi.isPoint() && !poi.getOLGeometry().intersects(point)) {
        point = poi.getOLGeometry().getCentroid()
      }

      // Create entry point
      let navPoint = new entryPoint({primary: true, point: W.userscripts.toGeoJSONGeometry(point)})
      W.model.actionManager.add(new WazeActionUpdateObject(poi, { entryExitPoints: [navPoint] }))
    }

    // Lock to level 2
    if (E50Instance.settings.get('options', 'lock') && poi.attributes.lockRank < 1 && W.loginManager.user.getRank() > 0) {
      W.model.actionManager.add(new WazeActionUpdateObject(poi, { lockRank: 1 }))
    }

    if (newName || newHN || newStreet || newCity) {
      W.selectionManager.setSelectedModels([poi])
    }

    E50Instance.groupEnd()
  }

  /**
   * Normalize the string:
   *  - remove the double quotes
   *  - remove double space
   * @param   {String} str
   * @returns {String}
   */
  function normalizeString (str) {
    // Clear space symbols and double quotes
    str = str.trim()
      .replace(/["“”]/g, '')
      .replace(/\s{2,}/g, ' ')

    // Clear accents/diacritics, but "\u0306" needed for "й"
    // str = str.normalize('NFD').replace(/[\u0300-\u0305\u0309-\u036f]/g, '');
    return str
  }

  /**
   * Normalize the name:
   *  - remove № and #chars
   *  - remove dots
   * @param  {String} name
   * @return {String}
   */
  function normalizeName (name) {
    name = normalizeString(name)
    name = name.replace(/[№#]/g, '')
    name = name.replace(/\.$/, '')
    return name
  }

  /**
   * Normalize the city name
   * @param  {String} city
   * @return {String}
   */
  function normalizeCity (city) {
    return normalizeString(city)
  }

  /**
   * Search the city name from available in editor area
   * @param  {String} city
   * @return {String|null}
   */
  function detectCity(city) {
    // Get list of all available cities
    let cities = W.model.cities.getObjectArray()
      .filter(m => m.attributes.name !== null && m.attributes.name !== '' && m.attributes.name !== 'поза НП')
      .map(m => m.attributes.name)

    // More than one city, use city with best matching score
    // Remove text in the "( )", Waze puts region name to the pair brackets
    let best = findBestMatch(city, cities.map(city => city.replace(/( ?\(.*\))/gi, '')))

    if (best > -1) {
      console.log('✅ City detected')
      return cities[best]
    } else if (cities.length === 1) {
      console.log('❎ City doesn\'t found, uses default city')
      return cities[0]
    } else {
      console.log('❌ City doesn\'t found')
      return null
    }
  }

  /**\
   * Normalize the street name by UA rules
   * @param  {String} street
   * @return {String}
   */
  function normalizeStreet (street) {
    street = normalizeString(street)

    if (street === '') {
      return ''
    }

    // Prepare street name
    street = street.replace(/[’']/, '\'')
    // Remove text in the "( )", OSM puts alternative name to the pair brackets
    street = street.replace(/( ?\(.*\))/gi, '')
    // Normalize title
    let regs = {
      '(^| )бульвар( |$)': '$1б-р$2',         // normalize
      '(^| )вїзд( |$)': '$1в\'їзд$2',         // fix mistakes
      '(^| )в\'ізд( |$)': '$1в\'їзд$2',       // fix mistakes
      '(^|.+?) ?вулиця ?(.+|$)': 'вул. $1$2', // normalize, but ignore Lviv rules
      '(^|.+?) ?улица ?(.+|$)': 'вул. $1$2',  // translate, but ignore Lviv rules
      '^(.+) в?ул\.?$': 'вул. $1',            // normalize and translate, but ignore Lviv rules
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
   * Search the street name from available in editor area
   * Normalize the street name by UA rules
   * @param  {String} street
   * @return {String|null}
   */
  function detectStreet (street) {
    street = normalizeStreet(street)

    // Get all streets
    let streets = W.model.streets.getObjectArray().filter(m => m.getName()).map(m => m.getName())

    // Get type and create RegExp for filter streets
    let reTypes = new RegExp('(алея|б-р|в\'їзд|вул\\.|дор\\.|мкрн|наб\\.|площа|пров\\.|проїзд|просп\\.|р-н|ст\\.|тракт|траса|тупик|узвіз|шосе)', 'gi')
    let matches = [...street.matchAll(reTypes)]
    let types = []

    // Detect type(s)
    if (matches.length === 0) {
      types.push('вул.') // setup basic type
      street = 'вул. ' + street
    } else {
      types = matches.map(match => match[0].toLowerCase())
    }
    // Filter streets by detected type(s)
    let filteredStreets = streets.filter(street => types.some(type => street.indexOf(type) > -1))
    // Matching names without type(s)
    let best = findBestMatch(
      street.replace(reTypes, '').toLowerCase().trim(),
      filteredStreets.map(street => street.replace(reTypes, '').toLowerCase().trim())
    )
    if (best > -1) {
      street = filteredStreets[best]
    } else {
      // Matching with type
      best = findBestMatch(
        street.toLowerCase().trim(),
        streets.map(street => street.toLowerCase().trim())
      )
      if (best > -1) {
        street = streets[best]
      } else {
        return null
      }
    }
    return street
  }

  /**
   * Normalize the number by UA rules
   * @param  {String} number
   * @return {String}
   */
  function normalizeNumber (number) {
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
    // process і,з,о
    number = number.replace('І', 'і')
    number = number.replace('З', 'з')
    number = number.replace('О', 'о')
    // process "корпус" to "к"
    number = number.replace(/(.*)к(?:орп|орпус)?(\d+)/gi, '$1к$2')
    // process "N-M" or "N/M" to "NM"
    number = number.replace(/(.*)[-/]([а-яі])/gi, '$1$2')
    // valid number format
    //  123А  123А/321 123А/321Б 123к1 123Ак2
    if (!number.match(/^\d+[а-яі]?([/к]\d+[а-яі]?)?$/gi)) {
      return ''
    }
    return number
  }

  /**
   * Copy to clipboard
   * @param text
   */
  function toClipboard (text) {
    // normalize
    text = normalizeString(text)
    text = text.replace(/'/g, '')
    GM.setClipboard(text)
    console.log(
      '%c' + NAME + ': %ccopied «' + text + '»',
      'color: #0DAD8D; font-weight: bold',
      'color: dimgray; font-weight: normal'
    )
  }

  /**
   * Calculates the distance between given points, returned in meters
   * @function WazeWrap.Geometry.calculateDistance
   * @param {Array<OpenLayers.Geometry.Point>} pointArray An array of OpenLayers.Geometry.Point with which to measure the total distance. A minimum of 2 points is needed.
   */
  function calculateDistance (pointArray) {
    if (pointArray.length < 2) {
      return 0
    }

    let line = new OpenLayers.Geometry.LineString(pointArray)
    return line.getGeodesicLength(W.map.getProjectionObject()) // multiply by 3.28084 to convert to feet
  }

  /**
   * Get vector layer
   * @return {OpenLayers.Layer.Vector}
   */
  function getVectorLayer () {
    if (!vectorLayer) {
      // Create layer for vectors
      vectorLayer = new OpenLayers.Layer.Vector('E50VectorLayer', {
        displayInLayerSwitcher: false,
        uniqueName: '__E50VectorLayer'
      })
      W.map.addLayer(vectorLayer)
    }
    return vectorLayer
  }

  /**
   * Show vector from the center of the selected POI to point by lon and lat
   */
  function showVector () {
    let poi = getSelectedPOI()
    if (!poi) {
      return
    }
    let from = poi.getOLGeometry().getCentroid()
    let to = new OpenLayers.Geometry.Point(this.dataset.lon, this.dataset.lat).transform('EPSG:4326', 'EPSG:900913')
    let distance = Math.round(calculateDistance([to, from]))

    vectorLine = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.LineString([from, to]), {}, {
      strokeWidth: 4,
      strokeColor: '#fff',
      strokeLinecap: 'round',
      strokeDashstyle: 'dash',
      label: distance + 'm',
      labelOutlineColor: '#000',
      labelOutlineWidth: 3,
      labelAlign: 'cm',
      fontColor: '#fff',
      fontSize: '24px',
      fontFamily: 'Courier New, monospace',
      fontWeight: 'bold',
      labelYOffset: 24
    })
    vectorPoint = new OpenLayers.Feature.Vector(to, {}, {
      pointRadius: 8,
      fillOpacity: 0.5,
      fillColor: '#fff',
      strokeColor: '#fff',
      strokeWidth: 2,
      strokeLinecap: 'round'
    })
    getVectorLayer().addFeatures([vectorLine, vectorPoint])
    // getVectorLayer().setZIndex(1001)
    getVectorLayer().setVisibility(true)
  }

  /**
   * Hide and clear all vectors
   */
  function hideVector () {
    if (vectorLayer) {
      vectorLayer.removeAllFeatures()
      vectorLayer.setVisibility(false)
    }
  }

  /**
   * @link   https://github.com/aceakash/string-similarity
   * @param  {String} first
   * @param  {String} second
   * @return {Number}
   */
  function compareTwoStrings (first, second) {
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
   * @param  {String} mainString
   * @param  {String[]} targetStrings
   * @return {Number}
   */
  function findBestMatch (mainString, targetStrings) {
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
})()
