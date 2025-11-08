// ==UserScript==
// @name         WME E50 Fetch POI Data
// @name:uk      WME 🇺🇦 E50 Fetch POI Data
// @name:ru      WME 🇺🇦 E50 Fetch POI Data
// @version      0.11.0
// @description  Fetch information about the POI from external sources
// @description:uk Скрипт дозволяє отримувати інформацію про POI зі сторонніх ресурсів
// @description:ru Скрипт для получения информации о POI с внешних ресурсов
// @license      MIT License
// @author       Anton Shevchuk
// @namespace    https://greasyfork.org/users/227648-anton-shevchuk
// @supportURL   https://github.com/AntonShevchuk/wme-e50/issues
// @match        https://*.waze.com/editor*
// @match        https://*.waze.com/*/editor*
// @exclude      https://*.waze.com/user/editor*
// @icon         data:image/png;base64,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ICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczpHSU1QPSJodHRwOi8vd3d3LmdpbXAub3JnL3htcC8iCiAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIKICAgeG1wTU06RG9jdW1lbnRJRD0iZ2ltcDpkb2NpZDpnaW1wOmE5OWYwNzEyLTc5ZDctNDY5Ni05MWUyLTE5YmEzNjM2NTIzYiIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpjZGIzMGE2ZS00M2RkLTQ0MzktYTQ0Ny05ODc4YTc0MWZhZWYiCiAgIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiMjBiMWUzNS1mZjE3LTRjZjgtODk5My0wMTYwNTc0OGY5MDkiCiAgIGRjOkZvcm1hdD0iaW1hZ2UvcG5nIgogICBHSU1QOkFQST0iMi4wIgogICBHSU1QOlBsYXRmb3JtPSJNYWMgT1MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjczNDMzNzgwNTU3NzE0IgogICBHSU1QOlZlcnNpb249IjIuMTAuMzIiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIgogICB4bXA6TWV0YWRhdGFEYXRlPSIyMDIzOjAxOjExVDExOjQzOjAwKzAxOjAwIgogICB4bXA6TW9kaWZ5RGF0ZT0iMjAyMzowMToxMVQxMTo0MzowMCswMTowMCI+CiAgIDx4bXBNTTpIaXN0b3J5PgogICAgPHJkZjpTZXE+CiAgICAgPHJkZjpsaQogICAgICBzdEV2dDphY3Rpb249InNhdmVkIgogICAgICBzdEV2dDpjaGFuZ2VkPSIvIgogICAgICBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmI4N2M2YmI2LTJmZGItNDdlMi05MjYzLWE3ZjNmMjY0ZDYyOSIKICAgICAgc3RFdnQ6c29mdHdhcmVBZ2VudD0iR2ltcCAyLjEwIChNYWMgT1MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTAxLTExVDExOjQzOjAwKzAxOjAwIi8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PgpaVBgAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAQsKKwBWE1eUAAAGfklEQVR42u2ae0zTVxTHv7R1yuRVymgrdMYhGh9oYDQBCzPMByYm4hAfU1E0IjjjIBKVxEqJIz7+ULFRJEq0hGCFzdDEaEBNAGkZERcnL3EMUXC0gIUCE9BSuj+wP/qzrZSHSy2/T0L4nXvPuXDP795z7rn5ARQUFBQUFBQUFBQUUxEH4ikFNDjgJwCbAIRAb9RnHzPVA5ADyIcDMpCKoZFOEbgQQSG5K9Er1Uq9vaJUK/WSuxI9RFBABK6xA+SV9ZX6qUJlfaUeIsiHF4YIcdcE1zJjVsUAAMprypFTkYPMfzLtagfEe8UjOigayxYvAwBI7kmwS7ErzgEilCp/Vn7HcedAUa1AyM0Quw568g1yCPwEUHWqwBVzH9DooIdy3DkAgCx5lt1HfcMcOe4c0EEPpXHpXCLaS9okdu8A4zly6VwH2lQ/BzCsUYpkRmKhx8Jx/YGetz0QN4sJeb3beiz+arHV9vdb7qNioMJsn9BXiOC5wfB088SgbhC1zbXI+jPLov64HbAtYBsiQyPH5YDW160QXxhxwL7QfVj97WrrB8gFKhrIEwp2DEbO9hz4ePmQ2oMWBmFr2FaIb4mRXJNs1fD/+xZwd3KfkD0NNOTtyjOZvAHH6Y5I+iEJQl+hbTpgotxcdRM8T97HlzWdgYS1CZO3BT5E3a1Gk6rJKt2O7o6P9h/LPTZqDDBm+ZLlJLmosghlz8rAnMlE7OpYuMx0AQB4uHngtN9pHKk+MvkOaFI1gS/lj+sNGv5BA2kNaVbbJs5OBNOZSci1TbVYc3sNIQ/ph3Ao8hAhhy4IBaptbAu4OI44YODdwJhsw+aHkeTy+nKSfLjqMPrf9hPyPK95th0DNP9qxqTvxfIiyXWqOtPt2aMmnlmuLLjR3GzMAca3DPrhX18zvobQVwihrxC7ObstmnJZXJKc/jLdREfVqSLJ+7/ZP/kxYCI4OTqR5BthN7AuaB0cpzsSbSe6TuDy3ctIeZpCflu0sb8vOp0++Q5gu7GRF5Y3+hJ/o0HcwziLDuCwONi8fLPp+Ew2hJuF4BZxEft7LNHu6uRKCnjmGBoity/gLgCeTbIDeGweeGzeqHoqtcrEAdbvFAfsXLETd+rvoKCrYPiQ88XIKul602XWrq2njbwCHOi2EwMczFwzage1qGqswqNnj6DuVpP6pjGmIen7JLNj6bQ6s+1arXbyi6HJYovnFpI88G4AybnJOP/yPNH2JPoJlvgsIWTjZ9Kbo5t/d3QG/dM7oKW9BRVPR6+4Plym0nYppCKp+YzwHtEtEQoSCwjZ+UtnRHtGI6c9BwPaAcyYNgMA4OZkPr2xXdjkmGAhVkzIAW1dbdhUvGniadAMMo0MKrUKHBaHaJvtOhtoBzS9Ghhurxg0hsU6gHRWUNZ9fsVQR4/5+kE3pBvzWDqd7vNzANOJaTGrGHOAd8BsCjXmXOM523FAtiAblT9W4nnccygPKCGaLzKrZ5zvAeBVzysAQHNHM6l9EXeRia2Hqwepau3T99mOA2axZiFwfiDmcOeAw+IgIjDCROci/yKcHZ0Jube/l7jILPmrhKQb6BNIkk8uOkk6UdY1132aLMBmspEflm+1/vXH1yHTyFD6tBQrA1YS7f6+/ihcW4i04jTI++TICs7CjhU7SLbVjSP1rLhZjJTuFLBcWQCApb5Lke6fjsTHiYhiRSFmRQzJtri2+NM4gOfJG/VWxpiqV1WQaWRIa0jD3va9JNtwfjjC+eHmDzWDWlwovUBqK6kuwYaQDUQmSIhIQEJEgtlULaoX2V45fPb2WWgHrTut5T/Ih7RDSj5M3d+C1tetH7XTDmqRUZRhm3eC6S/TceK3E+js7bSo0/+uH1eLrmL7g+0mfYMYxNFfj5qUvcaTPyM7g1ONpybvJCj/Wz6uHGygpqOGJKfWp0LaKMVB/4MI8AkAx50DBo0BZacSDa0NuPTwEkrelFgcT9ImgUQswZWgK+DP5YPNZKO7rxsvVC+QqciETCOz/lzmfdxb33KsZVhIta9vIiyhTx2+ieH9wgNNqVPqDR0x7Bi7n7zxHJU6pZ6mg67MsJ/2hOyxewcY5qjqVEEHXRkNQG7hH4UAAIGfAIooBeK944eLFjv6ifeOhyJKAYGfAADwfs6572vQqfuJjCENbuRL+eXZ97Itphd7QNWpQva9bPCl/HIAG8nV+VT6TE6PDBzHECgoKCgoKCgoKCgopiz/AYtz5BmJvxgCAAAAAElFTkSuQmCC
// @connect      revgeocode.search.hereapi.com
// @connect      api.visicom.ua
// @connect      nominatim.openstreetmap.org
// @connect      dev.virtualearth.net
// @connect      maps.googleapis.com
// @connect      stat.waze.com.ua
// @grant        GM.xmlHttpRequest
// @grant        GM.setClipboard
// @require      https://update.greasyfork.org/scripts/389765/1090053/CommonUtils.js
// @require      https://update.greasyfork.org/scripts/450160/1691572/WME-Bootstrap.js
// @require      https://update.greasyfork.org/scripts/450221/1691071/WME-Base.js
// @require      https://update.greasyfork.org/scripts/450320/1688694/WME-UI.js
//
// @require      https://cdn.jsdelivr.net/npm/@turf/turf@7.2.0/turf.min.js
// ==/UserScript==

/* jshint esversion: 8 */
/* global require */
/* global $, jQuery */
/* global I18n */
/* global WMEBase, WMEUI, WMEUIHelper, WMEUIHelperFieldset */
/* global Container, Settings, SimpleCache, Tools  */
/* global Node$1, Segment, Venue, VenueAddress, WmeSDK */
/* global turf */

(function () {
  'use strict'

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
      ranges: {
        title: 'Additional',
        radius: 'Radius for search',
        collapse: 'Collapse the lists longer than',
      },
      providers: {
        title: 'Providers',
        magic: 'Closest Segments',
        osm: 'Open Street Map',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        visicom: 'Visicom',
        ua: 'UA Addresses',
      },
      questions: {
        changeName: 'Are you sure to change the name?',
        changeCity: 'Are you sure to change the city?',
        changeStreet: 'Are you sure to change the street name?',
        changeNumber: 'Are you sure to change the house number?',
        notFoundCity: 'City not found in the current location, are you sure to create a new one?',
        notFoundStreet: 'Street not found in the current location, are you sure to create a new one?'
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
      ranges: {
        title: 'Додаткові',
        radius: 'Радіус для пошуку',
        collapse: 'Складати перелік, більший за',
      },
      providers: {
        title: 'Джерела',
        magic: 'Сегменти поруч',
        osm: 'Open Street Map',
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
        notFoundCity: 'Ми не знайшли такого міста у поточному місці, ви впевнені, що треба його додати?',
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
      ranges: {
        title: 'Дополнительно',
        radius: 'Радиус поиска',
        collapse: 'Складывать списки, которые больше',
      },
      providers: {
        title: 'Источники',
        magic: 'Ближайшие сегменты',
        osm: 'Open Street Map',
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
      ranges: {
        title: 'Supplémentaire',
        radius: 'Rayon de recherche',
        collapse: 'Réduire les listes plus grandes que',
      },
      providers: {
        title: 'Sources',
        magic: 'Au plus proche du segment',
        osm: 'Open Street Map',
        bing: 'Bing',
        here: 'HERE',
        google: 'Google',
        visicom: 'Visicom',
        ua: 'UA Addresses',
      },
      questions: {
        changeName: 'Êtes-vous sûr de changer le nom ?',
        changeCity: 'Êtes-vous sûr de changer la ville ?',
        changeStreet: 'Êtes-vous sûr de changer la rue ?',
        changeNumber: 'Êtes-vous sûr de changer le numéro de rue ?',
        notFoundCity: 'City not found in the current location, are you sure to create a new one?',
        notFoundStreet: 'Street not found in the current location, are you sure to create a new one?'
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

  const STYLE =
    '.form-group.e50 .header h5 { padding: 16px 16px 0; font-size: 16px }' +
    '.form-group.e50 .body { overflow-x: auto; max-height: 420px; padding: 4px 0; }' +

    '#venue-edit-general .e50 fieldset { border: 0; padding: 0; margin: 0; }' +
    '#venue-edit-general .e50 legend { width: 100%; text-align: left; }' +

    '#venue-edit-general .e50 fieldset legend,        .wme-ui-panel.e50 fieldset legend { cursor:pointer; font-size: 12px; font-weight: bold; margin: 0; padding: 0 8px; background-color: #f6f7f7; border: 1px solid #e5e5e5 }' +
    '#venue-edit-general .e50 fieldset legend::after, .wme-ui-panel.e50 fieldset legend::after { display: inline-block; text-rendering: auto; content: "↑"; float: right; font-size: 10px; line-height: inherit; position: relative; right: 3px; } ' +
    '#venue-edit-general .e50 fieldset legend span,   .wme-ui-panel.e50 fieldset legend span { font-weight: bold; background-color: #fff; border-radius: 5px; color: #ed503b; display: inline-block; font-size: 12px; line-height: 14px; max-width: 30px; padding: 1px 5px; text-align: center; } ' +
    '#venue-edit-general .e50 fieldset ul,            .wme-ui-panel.e50 fieldset ul { border: 1px solid #ddd; } ' +
    '#venue-edit-general .e50 fieldset.collapsed ul,  .wme-ui-panel.e50 fieldset.collapsed ul { display: none } ' +
    '#venue-edit-general .e50 fieldset.collapsed legend::after, .wme-ui-panel.e50 fieldset.collapsed legend::after { content: "↓" }' +

    '#venue-edit-general .e50 ul, .wme-ui-panel.e50 ul { padding: 8px; margin: 0 }' +
    '#venue-edit-general .e50 li, .wme-ui-panel.e50 li { padding: 0; margin: 0; list-style: none; margin-bottom: 2px }' +
    '#venue-edit-general .e50 li a, .wme-ui-panel.e50 li a { display: block; padding: 2px 4px; text-decoration: none; border: 1px solid #e4e4e4; }' +
    '#venue-edit-general .e50 li a:hover, .wme-ui-panel.e50 li a:hover { background: rgba(255, 255, 200, 1) }' +
    '#venue-edit-general .e50 li a.nonumber, .wme-ui-panel.e50 li a.nonumber { background: rgba(250, 250, 200, 0.5) }' +
    '#venue-edit-general .e50 li a.nonumber:hover, .wme-ui-panel.e50 li a.nonumber:hover { background: rgba(250, 250, 200, 1) }' +
    '#venue-edit-general .e50 li a.noaddress, .wme-ui-panel.e50 li a.noaddress { background: rgba(250, 200, 100, 0.5) }' +
    '#venue-edit-general .e50 li a.noaddress:hover, .wme-ui-panel.e50 li a.noaddress:hover { background: rgba(250, 200, 100, 1) }' +

    '.form-group.e50 legend { cursor:pointer; font-size: 12px; font-weight: bold; width: auto; text-align: right; border: 0; margin: 0; padding: 0 8px; }' +
    '.form-group.e50 fieldset { border: 1px solid #ddd; padding: 8px; }' +

    '.form-group.e50 div.controls { padding: 8px; }' +
    '.form-group.e50 div.controls:empty, #panel-container .archive-panel .body:empty { min-height: 20px; }' +
    '.form-group.e50 div.controls:empty::after, #panel-container .archive-panel .body:empty::after { color: #ccc; padding: 0 8px; content: "' + I18n.t(NAME).notFound + '" }' +
    '.form-group.e50 div.controls label { white-space: normal; font-weight: normal; margin-top: 5px; line-height: 18px; font-size: 13px; }' +
    '.form-group.e50 div.controls input[type="text"] { float:right; }' +
    '.form-group.e50 div.controls input[type="number"] { float:right; width: 60px; text-align:right; }' +

    'p.e50-info { border-top: 1px solid #ccc; color: #777; font-size: x-small; margin-top: 15px; padding-top: 10px; text-align: center; }' +
    '#sidebar p.e50-blue { background-color:#0057B8;color:white;height:32px;text-align:center;line-height:32px;font-size:24px;margin:0; }' +
    '#sidebar p.e50-yellow { background-color:#FFDD00;color:black;height:32px;text-align:center;line-height:32px;font-size:24px;margin:0; }'

  WMEUI.addStyle(STYLE)

  const layerConfig = {
    defaultRule: {
      styleContext: {
        label: (context) => {
          const style = context?.feature?.properties?.style;
          if (!style)
            return style;
          return style?.label;
        },
      },
      styleRules: [
        {
          predicate: (properties) => properties.styleName === "styleNode",
          style: {
            pointRadius: 8,
            fillOpacity: 0.5,
            fillColor: '#fff',
            strokeColor: '#fff',
            strokeWidth: 2,
            strokeLinecap: 'round',
            graphicZIndex: 9999,
          },
        },
        {
          predicate: (properties) => properties.styleName === "styleLine",
          style: {
            strokeWidth: 4,
            strokeColor: '#fff',
            strokeLinecap: 'round',
            strokeDashstyle: 'dash',
            label: "${label}",
            labelOutlineColor: '#000',
            labelOutlineWidth: 3,
            labelAlign: 'cm',
            fontColor: '#fff',
            fontSize: '24px',
            fontFamily: 'Courier New, monospace',
            fontWeight: 'bold',
            labelYOffset: 24,
            graphicZIndex: 9999,
          }
        }
      ],
    },
  };

  let E50Instance, E50Cache, E50Layer = false

  class E50 extends WMEBase {
    constructor (name, settings) {
      super(name, settings)
      this.initHelper()
      this.initTab()
      this.initLayer()
    }

    initHelper () {
      this.helper = new WMEUIHelper(this.name)

      this.modal = this.helper.createModal(I18n.t(this.name).title)

      this.panel = this.helper.createPanel(I18n.t(this.name).title)
    }

    initTab () {
      let tab = this.helper.createTab(
        I18n.t(this.name).title,
        {
          sidebar: this.wmeSDK.Sidebar,
          image: GM_info.script.icon
        }
      )

      // Setup options
      /** @type {WMEUIHelperFieldset} */
      let fsOptions = this.helper.createFieldset(I18n.t(this.name).options.title)
      let options = this.settings.get('options')
      for (let item in options) {
        if (options.hasOwnProperty(item)) {
          fsOptions.addCheckbox(
            item,
            I18n.t(this.name).options[item],
            (event) => this.settings.set(['options', item], event.target.checked),
            this.settings.get('options', item)
          )
        }
      }
      tab.addElement(fsOptions)

      // Setup ranges
      /** @type {WMEUIHelperFieldset} */
      let fsRanges = this.helper.createFieldset(I18n.t(this.name).ranges.title)
      let ranges = this.settings.get('ranges')
      for (let item in ranges) {
        if (ranges.hasOwnProperty(item)) {
          fsRanges.addNumber(
            'settings-ranges-' + item,
            I18n.t(NAME).ranges[item],
            event => this.settings.set(['ranges', item], event.target.value),
            this.settings.get('ranges', item),
            (item === 'radius') ? 100 : 0,
            (item === 'radius') ? 1000 : 10,
            (item === 'radius') ? 50 : 1
          )
        }
      }
      tab.addElement(fsRanges)

      // Setup providers settings
      /** @type {WMEUIHelperFieldset} */
      let fsProviders = this.helper.createFieldset(I18n.t(this.name).providers.title)
      let providers = this.settings.get('providers')
      for (let item in providers) {
        if (providers.hasOwnProperty(item) && SETTINGS.providers.hasOwnProperty(item)) {
          fsProviders.addCheckbox(
            item,
            I18n.t(this.name).providers[item],
            (event) => this.settings.set(['providers', item], event.target.checked),
            this.settings.get('providers', item)
          )
        }
      }
      tab.addElement(fsProviders)

      // Setup providers key's
      /** @type {WMEUIHelperFieldset} */
      let fsKeys = this.helper.createFieldset(I18n.t(this.name).options.keys)
      let keys = this.settings.get('keys')
      for (let item in keys) {
        if (keys.hasOwnProperty(item) && SETTINGS.keys.hasOwnProperty(item)) {
          fsKeys.addInput(
            'key-' + item,
            I18n.t(this.name).providers[item],
            (event) => this.settings.set(['keys', item], event.target.value),
            this.settings.get('keys', item)
          )
        }
      }
      tab.addElement(fsKeys)

      tab.addText(
        'info',
        '<a href="' + GM_info.scriptUpdateURL + '">' + GM_info.script.name + '</a> ' + GM_info.script.version
      )

      tab.addText('blue', 'made in')
      tab.addText('yellow', 'Ukraine')

      tab.inject()
    }

    initLayer () {
      this.wmeSDK.Map.addLayer({
        layerName: this.name,
        styleRules: layerConfig.defaultRule.styleRules,
        styleContext: layerConfig.defaultRule.styleContext
      });
      // this.wmeSDK.LayerSwitcher.addLayerCheckbox({ name: this.name });
      this.wmeSDK.Map.setLayerZIndex({ layerName: this.name, zIndex: 9999 });
      this.wmeSDK.Map.setLayerVisibility({ layerName: this.name, visibility: true });

      E50Layer = true
    }

    /**
     * Handler for `none.wme` event
     * @param {jQuery.Event} event
     * @return {Null}
     */
    onNone (event) {
      if (this.settings.get('options', 'modal')) {
        this.modal.html().remove()
      }
    }

    /**
     * Handler for `venue.wme` event
     *  - create and fill the modal panel
     *
     * @param {jQuery.Event} event
     * @param {HTMLElement} element
     * @param {Venue} model
     * @return {null|void}
     */
    onVenue (event, element, model) {
      let container, parent
      if (this.settings.get('options', 'modal')) {
        parent = this.modal.html()
        container = parent.querySelector('.wme-ui-body')
      } else {
        parent = this.panel.html()
        container = parent.querySelector('.controls')
      }

      // Clear container
      try {
        if (container)
        while (container.hasChildNodes()) {
          container.removeChild(container.lastChild)
        }
      } catch (e) {
        console.error(e)
      }

      let poi = model

      if (!poi) {
        return
      }

      let feature = turf.centroid(poi.geometry)

      let [lon, lat] = feature.geometry.coordinates;

      let providers = []

      let country = this.wmeSDK.DataModel.Countries.getTopCountry().id

      let settings = LOCALE[country]

      this.group(
        '📍' + lon + ' ' + lat
      )

      let radius = this.settings.get('ranges', 'radius')

      if (this.settings.get('providers', 'magic')) {
        let Magic = new MagicProvider(container, settings)
        let providerPromise = Magic
          .search(lon, lat, radius)
          .then(() => Magic.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'ua')) {
        let UaAddresses = new UaAddressesProvider(container, settings, this.settings.get('keys', 'ua'))
        let providerPromise = UaAddresses
          .search(lon, lat, radius)
          .then(() => UaAddresses.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'osm')) {
        let Osm = new OsmProvider(container, settings)
        let providerPromise = Osm
          .search(lon, lat, radius)
          .then(() => Osm.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'visicom')) {
        let Visicom = new VisicomProvider(container, settings, this.settings.get('keys', 'visicom'))
        let providerPromise = Visicom
          .search(lon, lat, radius)
          .then(() => Visicom.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'here')) {
        let Here = new HereProvider(container, settings, this.settings.get('keys', 'here'))
        let providerPromise = Here
          .search(lon, lat, radius)
          .then(() => Here.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'bing')) {
        let Bing = new BingProvider(container, settings, this.settings.get('keys', 'bing'))
        let providerPromise = Bing
          .search(lon, lat, radius)
          .then(() => Bing.render())
          .catch(() => this.log(':('))
        providers.push(providerPromise)
      }

      if (this.settings.get('providers', 'google')) {
        let Google = new GoogleProvider(container, settings, this.settings.get('keys', 'google'))
        let providerPromise = Google
          .search(lon, lat, radius)
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
      this.uid = uid.trim().toLowerCase().replace(/\s/g, '-')
      this.name = uid
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

      console.log(url)

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
     * @param  {Number} radius
     * @return {Promise<array>}
     */
    async request (lon, lat, radius) {
      throw new Error('Abstract method')
    }

    /**
     * @param  {Number} lon
     * @param  {Number} lat
     * @param  {Number} radius
     * @return {Promise<void>}
     */
    async search (lon, lat, radius = 1000) {
      let key = this.uid + ':' + lon + ',' + lat

      if (E50Cache.has(key)) {
        this.response = E50Cache.get(key)
      } else {
        this.response = await this.request(lon, lat, radius).catch(e => console.error(this.uid, 'search return error', e))
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
     * @return {{number: *, cityId: Number, cityName: *, streetId: Number, streetName: *, name: *, raw: *, lon: *, title: *, lat: *}}
     */
    element (lon, lat, city, street, number, name = '') {
      // Raw data from provider
      let raw = [city, street, number, name].filter(x => !!x).join(', ')

      {
        city = normalizeCity(city)
        street = normalizeStreet(street)
        number = normalizeNumber(number)
        name = normalizeName(name)
      }

      let [cityId, cityName] = detectCity(city)
      let [streetId, streetName] = detectStreet(street)

      if (!cityId && streetId) {
        let streetModel = E50Instance.wmeSDK.DataModel.Streets.getById( { streetId: streetId } )
        let cityModel = E50Instance.wmeSDK.DataModel.Cities.getById( { cityId: streetModel.cityId } )

        cityId = cityModel.id
        cityName = cityModel.name
      }

      let title = [street, number, name].filter(x => !!x).join(', ')
      return {
        lat: lat,
        lon: lon,
        cityId: cityId,
        cityName: cityName,
        streetId: streetId,
        streetName: streetName,
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
      div.id = NAME.toLowerCase() + '-' + this.name
      div.className = NAME.toLowerCase()
      return div
    }

    /**
     * Build fieldset with the list of the response items
     * @return {HTMLFieldSetElement}
     * @protected
     */
    _fieldset () {
      let fieldset = document.createElement('fieldset')
      let list = document.createElement('ul')

      let collapse = parseInt(E50Instance.settings.get('ranges', 'collapse'))

      if (collapse && this.response.length > collapse) {
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
      legend.innerHTML = this.name + ' <span>' + this.response.length + '</span>'
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
      a.dataset.cityId = item.cityId || ''
      a.dataset.cityName = item.cityName
      a.dataset.streetId = item.streetId || ''
      a.dataset.streetName = item.streetName
      a.dataset.number = item.number
      a.dataset.name = item.name
      a.innerText = item.title
      a.title = item.raw
      a.className = NAME + '-link'
      if (!item.cityId || !item.streetId) {
        a.className += ' noaddress'
      }
      if (!item.number) {
        a.className += ' nonumber'
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

    async request (lon, lat, radius) {
      let segments = E50Instance.getAllSegments(
        [TYPES.boardwalk, TYPES.stairway, TYPES.railroad, TYPES.runway, TYPES.parking]
      )

      let streets = {}

      console.groupCollapsed(this.uid)

      for (let key in segments) {
        let segment = segments[key]
        let address = E50Instance.wmeSDK.DataModel.Segments.getAddress({ segmentId: segment.id })

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

      let result = []

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
      console.groupEnd(this.uid)
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

    async request (lon, lat, radius) {
      let result = []
      let url = 'https://stat.waze.com.ua/address_map/address_map.php'
      let data = {
        lon: lon,
        lat: lat,
        radius: radius,
        limit: 20,
        script: this.key
      }
      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      console.groupCollapsed(this.uid)
      if (response?.result && response.result === 'success') {
        result = this.collection(response.data.polygons.Default)
      } else {
        console.info('No response returned')
      }
      console.groupEnd(this.uid)
      return result
    }

    item (res) {

      let data = res.name.split(",")

      data = data.map(part => part.trim())

      let number = data.length ? data.pop() : null
      let street = data.length ? data.pop() : null
      let city = data.length ? data.pop() : null

      // https://cdn.jsdelivr.net/npm/wellknown@0.5.0/wellknown.min.js
      // let element = wellknown.parse(res.polygon);
      // let center = turf.centroid(element)
      //  center.geometry.coordinates[0],
      //  center.geometry.coordinates[1],

      let [lat, lon] = res.center.split(';')

      return this.element(
        lon,
        lat,
        city,
        street,
        number
      )
    }
  }

  /**
   * visicom.ua
   */
  class VisicomProvider extends Provider {
    constructor (container, settings, key) {
      super(I18n.t(NAME).providers.visicom, container, settings)
      this.key = key
    }

    async request (lon, lat, radius) {
      let result = []
      let url = 'https://api.visicom.ua/data-api/5.0/uk/geocode.json'
      let data = {
        near: lon + ',' + lat,
        categories: 'adr_address',
        order: 'distance',
        radius: radius,
        limit: 10,
        key: this.key,
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      console.groupCollapsed(this.uid)
      if (response?.features?.length > 0) {
        result = this.collection(response.features)
      } else {
        console.info('No response returned')
        if (response?.status) {
          console.info('Status:', response.status)
        }
      }
      console.groupEnd(this.uid)
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
   * OpenStreetMap
   */
  class OsmProvider extends Provider {
    constructor (container, settings) {
      super(I18n.t(NAME).providers.osm, container, settings)
    }

    async request (lon, lat, radius) {
      let result = []
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

      console.groupCollapsed(this.uid)
      if (response?.address) {
        result = [this.item(response)]
      } else {
        console.info('No response returned')
      }
      console.groupEnd(this.uid)
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
   * Here Maps
   * @link https://developer.here.com/documentation/geocoder/topics/quick-start-geocode.html
   * @link https://www.here.com/docs/bundle/geocoder-api-developer-guide/page/topics/resource-reverse-geocode.html
   */
  class HereProvider extends Provider {
    constructor (container, settings, key) {
      super(I18n.t(NAME).providers.here, container, settings)
      this.key = key
    }

    async request (lon, lat, radius) {
      let result = []
      let url = 'https://revgeocode.search.hereapi.com/v1/revgeocode'
      let data = {
        apiKey: this.key,
        at: lat + ',' + lon,
        types: 'address',
        limit: 20
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      console.groupCollapsed(this.uid)
      if (response?.items?.length) {
        result = this.collection(
          response.items.filter(x => x.resultType === 'houseNumber')
        )
      } else {
        console.info('No response returned')
      }
      console.groupEnd(this.uid)
      return result
    }

    item (res) {
      console.log(res)
      return this.element(
        res.position.lng,
        res.position.lat,
        res.address.city,
        res.address.street,
        res.address.houseNumber
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
      super(I18n.t(NAME).providers.bing, container, settings)
      this.key = key
    }

    async request (lon, lat, radius) {
      let result = []
      let url = 'https://dev.virtualearth.net/REST/v1/Locations/' + lat + ',' + lon
      let data = {
        includeEntityTypes: 'Address',
        c: this.settings.country,
        key: this.key,
      }

      let response = await this.makeRequest(url, data).catch(e => console.error(this.uid, 'return error', e))

      console.groupCollapsed(this.uid)
      if (response?.resourceSets?.[0]?.resources?.length) {
        result = this.collection(
          response.resourceSets[0].resources.filter(
            el => el.address?.addressLine?.includes(',')
          )
        );
      } else {
        console.info('No response returned')
      }
      console.groupEnd(this.uid)
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
      super(I18n.t(NAME).providers.google, container, settings)
      this.key = key
    }

    async request (lon, lat, radius) {
      let result = []
      let response = await this.makeAPIRequest(lat, lon, radius)
        .catch(e => null)
        //.catch(e => console.error(this.uid, 'return error', e))

      console.groupCollapsed(this.uid)
      if (response?.length) {
        result = this.collection(response)
      } else {
        console.info('No response returned')
      }
      console.groupEnd(this.uid)
      return result
    }

    async makeAPIRequest (lat, lon, radius) {
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
    .on('mouseenter', '.' + NAME + '-link', showLayer)
    .on('mouseleave', '.' + NAME + '-link', hideLayer)
    .on('none.wme', hideLayer)

  function ready () {
    E50Instance = new E50(NAME, SETTINGS)
    E50Cache = new SimpleCache()
  }

  /**
   * Get Selected Venue, if it not the NATURAL_FEATURES
   * @return {null|Object}
   */
  function getSelectedPOI () {
    let venue = E50Instance.getSelectedVenues().shift()
    if (!venue) {
      return null
    }
    let except = ['NATURAL_FEATURES']
    if (except.indexOf(venue.categories[0]) === -1) {
      return venue
    }
    return null
  }

  /**
   * Apply data to current selected POI
   * @param event
   */
  function applyData (event) {
    event.preventDefault()

    let venue = getSelectedPOI()

    if (!E50Instance.wmeSDK.DataModel.Venues.hasPermissions({ venueId: venue.id })) {
      E50Instance.log('You don\'t have permissions to edit this venue')
      return
    }

    let address = E50Instance.wmeSDK.DataModel.Venues.getAddress({ venueId: venue.id })

    E50Instance.group('Apply data')

    let lat = parseFloat(this.dataset.lat)
    let lon = parseFloat(this.dataset.lon)
    let name = this.dataset.name
    let cityId = isNaN(parseInt(this.dataset.cityId)) ? null : parseInt(this.dataset.cityId)
    let cityName = this.dataset.cityName
    let streetId = isNaN(parseInt(this.dataset.streetId)) ? null : parseInt(this.dataset.streetId)
    let streetName = this.dataset.streetName
    let number = this.dataset.number

    if (E50Instance.settings.get('options', 'copyData')) {
      toClipboard([name, number, streetName, cityName].filter(x => !!x).join(' '))
    }

    // Apply new Name
    let newName
    // If exists name, ask user to replace it or not
    // If not exists - use name or house number as name
    if (venue.name) {
      if (name && name !== venue.name) {
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n«' + venue.name + '» ⟶ «' + name + '»?')) {
          newName = name
        }
      } else if (number && number !== venue.name) {
        if (window.confirm(I18n.t(NAME).questions.changeName + '\n«' + venue.name + '» ⟶ «' + number + '»?')) {
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
        let aliases = venue.aliases?.slice() || []
        if (aliases.indexOf(alias) === -1) {
          aliases.push(alias)
          E50Instance.wmeSDK.DataModel.Venues.updateVenue({
            venueId: venue.id,
            aliases: aliases
          })
        }
      }
    }
    if (newName) {
      E50Instance.wmeSDK.DataModel.Venues.updateVenue({
        venueId: venue.id,
        name: newName
      })
    }

    // Apply a City name
    if (!cityId && cityName) {
      // Ask to create new City
      if (window.confirm(I18n.t(NAME).questions.notFoundCity + '\n«' + cityName + '»?')) {
        cityId = getCity(cityName).id
      } else {
        cityId = getCity().id
      }
    } else if (!cityId && !cityName) {
      // empty city
      cityId = getCity().id
    }

    let city = getCityById(cityId)

    // Apply a Street name
    if (streetId && streetId !== address.street.id && '' !== address.street.name) {
      // Ask to replace street with new one
      if (window.confirm(I18n.t(NAME).questions.changeStreet + '\n«' + address.street.name + '» ⟶ «' + streetName + '»?')) {
        E50Instance.wmeSDK.DataModel.Venues.updateAddress({
          venueId: venue.id,
          streetId: streetId
        })
      }
    } else if (streetId) {
      // Apply new street if street is not assigned or name is empty
      E50Instance.wmeSDK.DataModel.Venues.updateAddress({
        venueId: venue.id,
        streetId: streetId
      })
    } else if (!streetId) {
      // We don't found the street
      // - ask to create new one
      let street
      if (streetName) {
        if (window.confirm(I18n.t(NAME).questions.notFoundStreet + '\n«' + streetName + '»?')) {
          // create new street
          street = getStreet(city.id, streetName)
        } else {
          // use empty street
          street = getStreet(city.id, '')
        }
      } else {
        // use empty street
        street = getStreet(city.id, '')
      }
      E50Instance.wmeSDK.DataModel.Venues.updateAddress({
        venueId: venue.id,
        streetId: street.id
      })
    }

    // Apply a House Number
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
      } else if (address.houseNumber) {
        if (address.houseNumber !== number &&
          window.confirm(I18n.t(NAME).questions.changeNumber + '\n«' + address.houseNumber + '» ⟶ «' + number + '»?')) {

          E50Instance.wmeSDK.DataModel.Venues.updateAddress({
            venueId: venue.id,
            houseNumber: number
          })
        }
      } else {
        E50Instance.wmeSDK.DataModel.Venues.updateAddress({
          venueId: venue.id,
          houseNumber: number
        })
      }
    }

    // Lock to level 2
    if (E50Instance.settings.get('options', 'lock')
      && venue.lockRank < 1
      && E50Instance.wmeSDK.State.getUserInfo().rank > 0) {

      E50Instance.wmeSDK.DataModel.Venues.updateVenue({
        venueId: venue.id,
        lockRank: 1
      })
    }

    // If no an entry point, we would create it
    if (E50Instance.settings.get('options', 'entryPoint')
        && venue.navigationPoints?.length === 0) {

      let point = turf.point([lon, lat])

      if (turf.pointsWithinPolygon(point, venue.geometry).features?.length > 0) {
        // new point is inside the venue geometry
        E50Instance.log('use the point as coordinates for new Navigation Point')
      } else {
        // point is outside the venue geometry
        E50Instance.log('use the intersection of venue and vector as coordinates for new Navigation Point')
        let centroid = turf.centroid(venue.geometry);
        let line = turf.lineString([
          centroid.geometry.coordinates,
          point.geometry.coordinates,
        ]);
        let featureCollection = turf.lineIntersect(venue.geometry, line);
        point = featureCollection.features?.pop()
      }

      // create navigation point
      let navigationPoint =  {
        isEntry: true,
        isExit: false,
        isPrimary: true,
        name: "",
        point: point.geometry
      }

      E50Instance.wmeSDK.DataModel.Venues.replaceNavigationPoints({
        venueId: venue.id,
        navigationPoints: [navigationPoint]
      })
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
   * @return {[Number,String]}
   */
  function detectCity(city) {
    // Get the list of all available cities
    let cities = E50Instance.wmeSDK.DataModel.Cities.getAll()
      .filter(city => city.name)

    // More than one city, use city with best matching score
    // Remove text in the "()", Waze puts region name to the pair brackets
    let best = findBestMatch(city, cities.map(city => city.name.replace(/( ?\(.*\))/gi, '')))

    if (best > -1) {
      console.info('✅ City detected')
      return [cities[best]['id'], cities[best]['name']]
    /*} else if (cities.length === 1) {
      console.info('❎ City doesn\'t found, uses default city')
      return [cities[0]['id'], cities[0]['name']]*/
    } else {
      console.info('❌ City doesn\'t found')
      return [null, city]
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
    // Remove text in the "()", OSM puts alternative name to the pair brackets
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
   * @return {[Number,String]}
   */
  function detectStreet (street) {

    // Get all streets
    let streets = E50Instance.wmeSDK.DataModel.Streets.getAll()
      .filter(street => street.name)

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
    let filteredStreets = streets.filter(street => types.some(type => street.name.indexOf(type) > -1))

    // Matching names without type(s)
    let best = findBestMatch(
      street.replace(reTypes, '').toLowerCase().trim(),
      filteredStreets.map(street => street.name.replace(reTypes, '').toLowerCase().trim())
    )

    if (best > -1) {
      return [filteredStreets[best]['id'], filteredStreets[best]['name']]
    } else {
      return [null, street]
    }
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
   * Show vector from the center of the selected POI to point by lon and lat
   */
  function showLayer () {
    let poi = getSelectedPOI()
    if (!poi) {
      return
    }

    const lon = parseFloat(this.dataset.lon)
    const lat = parseFloat(this.dataset.lat)

    const from = turf.centroid(poi.geometry)
    const to = turf.point([lon, lat], { styleName: "styleNode" }, { id: `node_${lon}_${lat}` });

    const distance = Math.round( turf.distance(to, from)  * 1000)

    E50Instance.wmeSDK.Map.addFeatureToLayer({ layerName: NAME, feature: to });

    const lineCoordinates = [
      from.geometry.coordinates,
      to.geometry.coordinates,
    ];

    // https://www.waze.com/editor/sdk/interfaces/index.SDK.FeatureStyle.html
    const line = turf.lineString(lineCoordinates, {
      styleName: "styleLine",
      style: {
        label: distance + 'm',
      },
    }, { id: `line_${lon}_${lat}` });

    E50Instance.wmeSDK.Map.addFeatureToLayer({ layerName: NAME, feature: line });
    E50Instance.wmeSDK.Map.setLayerVisibility({ layerName: NAME, visibility: true });
  }

  /**
   * Hide and clear all vectors
   */
  function hideLayer () {
    if (E50Layer) {
      E50Instance.wmeSDK.Map.removeAllFeaturesFromLayer({ layerName: NAME });
      E50Instance.wmeSDK.Map.setLayerVisibility({ layerName: NAME, visibility: false });
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

  function getCityById (cityID) {
    if (!cityID || isNaN(parseInt(cityID))) {
      return null
    }
    return E50Instance.wmeSDK.DataModel.Cities.getById({
      cityId: cityID
    })
  }

  function getCity (cityName = '') {
    return E50Instance.wmeSDK.DataModel.Cities.getCity({
        countryId: E50Instance.wmeSDK.DataModel.Countries.getTopCountry().id,
        cityName: cityName
      })
      || E50Instance.wmeSDK.DataModel.Cities.addCity({
        countryId: E50Instance.wmeSDK.DataModel.Countries.getTopCountry().id,
        cityName: cityName
      })
  }

  function getStreet (cityId, streetName = '') {
    return E50Instance.wmeSDK.DataModel.Streets.getStreet({
        cityId: cityId,
        streetName: streetName,
      })
      || E50Instance.wmeSDK.DataModel.Streets.addStreet({
        cityId: cityId,
        streetName: streetName
      })
  }
})()
