# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WME E50 Fetch POI Data is a TamperMonkey/GreaseMonkey userscript for Waze Map Editor (WME). It fetches information about POIs from multiple external sources (HERE, Visicom, OpenStreetMap, Bing, Google) and allows applying address data to selected venues with one click.

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/WME-E50.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch` (rebuild on changes)
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts              # userscript header (comment block, not TS code)
├── style.css            # plain CSS, imported as string
├── globals.d.ts         # declares WME runtime globals + GM API
├── translations.ts      # NAME constant, TRANSLATION (en, uk, ru, fr)
├── types.ts             # TYPES (road types), LOCALE (country mapping)
├── settings.ts          # SETTINGS defaults (options, providers, API keys)
├── layers.ts            # layerConfig (style rules for distance vectors)
├── normalize.ts         # string normalization (name, city, street, number)
│                        #   + compareTwoStrings, findBestMatch (fuzzy matching)
├── detect.ts            # detectCity, detectStreet (WmeSDK lookups)
├── providers/
│   ├── base.ts          # Provider base class (makeRequest, search, element, render)
│   ├── magic.ts         # MagicProvider — local WmeSDK segments (no API)
│   ├── ua-addresses.ts  # UaAddressesProvider — Ukrainian address DB
│   ├── visicom.ts       # VisicomProvider — Visicom geocoding
│   ├── osm.ts           # OsmProvider — OpenStreetMap Nominatim
│   ├── here.ts          # HereProvider — HERE reverse geocoding
│   ├── bing.ts          # BingProvider — Bing Maps (disabled by default)
│   └── google.ts        # GoogleProvider — Google Maps Places
├── e50.ts               # E50 class (extends WMEBase) — main logic
├── helpers.ts           # event handlers (applyData, showLayer, hideLayer)
└── index.ts             # bootstrap: translations, CSS, event bindings
```

**Build output:** `dist/WME-E50.user.js` — IIFE with userscript header prepended as banner. Version is read from `package.json` via `{{version}}` placeholder in `meta.ts`.

**Key external dependencies** (loaded via `@require`, not bundled):
- WME-Bootstrap.js, WME-Base.js, WME-UI.js, CommonUtils.js
- TurfJS v7.2.0

## Provider Pattern

Each provider extends the `Provider` base class and implements:
- `request(lat, lon, radius)` — fetches data (via `GM.xmlHttpRequest` or local WmeSDK)
- `item(data)` — transforms a single response item into a normalized element

The base class provides `search()` (with caching via SimpleCache), `element()` (normalizes address data and detects city/street IDs), and `render()` (creates DOM elements).

To add a new provider: create a file in `src/providers/`, extend `Provider`, import it in `src/e50.ts`'s `onVenue()` method.

## Key Design Notes

- Uses `@grant GM.xmlHttpRequest` (not `@grant none`) for cross-origin API calls
- Provider instances are created per-venue-selection, not at startup
- `E50Cache` (SimpleCache) is shared across providers via `setCache()` setter
- `helpers.ts` event handlers reference E50 instance via `setE50Instance()` setter
- Fuzzy string matching (Sorensen-Dice) is used for city/street detection
- GitHub Actions auto-builds `dist/` on push to master

## Coding Conventions

- TypeScript with `strict: false` — minimal type annotations, `any` for WME SDK types
- Road types use the `TYPES` constant from `types.ts`, not raw numbers
