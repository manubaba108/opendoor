# OPENDOOR Guest Hub

Static, mobile-first guest hub for OPENDOOR in Pegognaga. Official QR URL remains https://manubaba108.github.io/opendoor/.

## Review and publication

Repository scope is **manubaba108/opendoor** only. Development branch is `guest-hub-v1`. Do not merge into `main` without the owner's explicit approval. GitHub Pages will publish the existing URL after approval and merge; no redirect service or paid domain is required.

## Structure

- `index.html`: entry point, noindex metadata and semantic landmarks
- `assets/styles.css`: responsive visual system
- `assets/app.js`: hash routing, language menu and ephemeral checklists
- `assets/content.js`: centralized configuration, optional module flags and complete translations
- `assets/images/`: official logos, derived favicon and licensed landmark photograph
- `ASSET-CREDITS.md`: photograph licensing and factual reference sources

Home, House, Explore and Help contain direct links to check-in, Wi-Fi, parking, dining, nearby services, health, waste, check-out and emergency assistance. Available languages are Italian, English, German, French, Dutch, Polish and Romanian.

Language preference is the only value saved in localStorage. Checklists are kept in memory during the visit and reset when the page reloads. No analytics, tracking, cookies, account creation, forms, databases or backend services.

## Configuration still needed

In `assets/content.js`, the following remain unset or disabled:

- Exact property address and parking location
- Check-in and check-out times
- Exact fire extinguisher location
- External waste disposal point
- Verified nearby pharmacy, out-of-hours medical service and emergency department
- Real apartment photographs
- Video URLs, titles, thumbnails and translated descriptions
- Detailed heating and other appliance instructions

Unknown information is omitted from guest screens. The check-in page directs guests to the exact address in the information already sent to them. The car-park Maps link appears only after `parkingAddress` is configured. The EV charging point has its separate address-based Maps link.

## Private information

Never store door codes, Wi-Fi credentials, guest documents or secrets in this public repository. Guests receive their personal entry code and Wi-Fi password before the stay. The public guest hub displays this instruction rather than credentials.

## Local use

Open `index.html` in a browser or serve this folder using any static HTTP server. Every route uses a hash (`#/checkin` etc.), so refreshes work under `/opendoor/` with GitHub Pages. All site assets use relative paths.

## Extending content

Update data and all seven language dictionaries in `assets/content.js`. A module becomes visible only when its `enabled` flag is true and its content is available. Review supplied URLs before enabling videos or photographs. Keep image attribution with licensed assets.

## Validation of this draft

Automated local Chromium checks passed for 14 routes × 7 languages × 6 viewport widths (320, 375, 390, 430, 768 and 1440 pixels): 588 rendered combinations, with no horizontal overflow or runtime errors. Checked language switching and persistence, browser/back navigation, checklist state and reset, Wi-Fi copy fallback, 112 and host phone links, address-based Maps query syntax, the exact Airbnb URL, local asset loading and 200% text enlargement on the mobile home screen. Desktop, check-in and Explore screens were visually inspected.

Public-source credential scans and complete translation-key checks passed. Lighthouse scores were not measured. External destinations were checked through the provided addresses and link structure; the calling and messaging actions were not sent.
