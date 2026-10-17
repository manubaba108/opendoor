# OPENDOOR · Guest flow & local guide draft · 17 October 2026

This is a **review-only working branch**. Do not merge into main or alter the existing physical QR until the Host explicitly approves the publication and confirms the actual current QR destination.

## Guest flow
- Check-in: `#/checkin` covers the complete pre-arrival sequence: Maps, A22 access, free parking / EV point, entrance photo and remote intercom, lift and fifth-floor apartment-door photo. No access code is embedded.
- Door QR destination candidate: `https://opendoorstay.it/#/accesso`. This new page shows the existing real door-opening and door-closing videos, then directs guests to safety and the full guest guide. The old `#/videos`, `#/closing` and `#/house/access` display the same single door-help view to reduce duplicated guidance.
- Home: safety and urgent information first, practical in-home instructions second, nearby food/services third, departure fourth. Check-in remains available as a lower-priority link.
- Dedicated emergency/host assistance remains reachable. No codes, access tokens or Wi-Fi passwords have been added.

## New local entries
- Coffee ranking (in the Host's deliberate order): Café Noir (230 m), Mediterraneo Caffè (450 m), Bar Bordo della Stella (1 km). The ranking is the Host's personal recommendation, **not** a platform rating.
- Fastidia moved from coffee to aperitivo.
- Storie di Tavola added to meals + aperitivo, explicitly described as an early-evening option, not a reliable late-night dinner.
- Bar IP added to *Services / Late-night essentials*, not the café guide. Mobile top-up/tobacco services and opening until around midnight are indicative only; call/check before relying on them.
- Mantova's historic centre added to Explore (27 km approx.) with a CC BY-SA 4.0 Wikimedia Commons photo and author credit, linking to Piazza Sordello.

## Sources and caveats
- Coffee and dining locations/menus/hours: Restaurant Guru, Tripadvisor, local directories; individual source URLs and check date are stored on each food guide card.
- Storie di Tavola address independently confirmed by Comune di Pegognaga; 400 m estimated from property and to be confirmed on foot.
- Bar IP / service station listed at Strada Provinciale Ovest 30 (IP Alessandro srl), about 2 km estimated: confirm the exact bar entrance and top-up availability before publication.
- Mantova 27 km road distance is approximate; official municipality website confirms UNESCO and sightseeing descriptions.
- New *fifth-floor* scene uses the existing apartment-door photo. If the photo is not adequately identifying the landing, the Host should provide a clearer real photo.
- The intercom video remains absent; no video was fabricated.
- The existing QR's encoded URL is NOT yet known. Creating the `#/accesso` route alone cannot redirect an already printed QR; the redirect decision requires reading the actual scanned URL.

## Pre-release QA
1. On a phone, open `#/checkin`, verify Map → Parking → #12/citofono → fifth floor in the intended order.
2. Verify `#/accesso` plays both real door videos, with working audio and native controls. A printed QR on the 5th-floor landing must resolve to this route.
3. From `#/accesso` move to `#/health`, check first-aid/photo, extinguisher and 112 details; check that the actual extinguisher location is accurate before publication.
4. Ensure existing old video/access links resolve to the unified help view; test browser Back and tab navigation.
5. Check `#/food?group=coffee` personal 1-2-3 ranking; `#/food?group=aperitivo` Fastidia and Storie di Tavola; `#/services` separate late-service section; `#/explore` Mantova map and photo credit.
6. Check all seven languages, mobile breakpoints, media on cellular connectivity, and no broken photo links.
7. Verify service hours and any unconfirmed walkable distances locally. Only after explicit Host approval merge/publish.


## Automated QA completed on 17 October 2026
- Chrome 155 smartphone emulation (390×844): 10 guest-facing routes × seven languages = **70 route checks**. No JavaScript runtime errors, broken existing local media, missing primary headings or horizontal overflow.
- Additional browser checks at 390 px and 1440 px: the four check-in steps render in order; the new `#/accesso` route contains both real video files and opening→closing instructions; both video metadata tracks loaded successfully (16.38 seconds and 17.77 seconds); access → safety → back returns to Accesso, and home → safety → back returns Home.
- Photo of Mantova from Wikimedia loads at its source and reports natural width 960 px.
- Primary home headline retains its original turquoise word HOME. (computed RGB 0, 166, 153); original banner MP4 is preserved from main. No image/media assets were replaced.
- `node tests/admin-core.test.mjs`: all **46 integration assertions passed**, after fixing the test harness to load the booking link module before validating current content. Actual Booking URL and partner settings were not changed.
- All seven language dictionaries contain identical sets of 412 keys. Repetitive double numbering in arrival steps and door videos removed; initial safety route title now correctly describes emergency and first aid, not an unrelated pharmacy directory.

## Deployment blocker: physical QR
The historic project QR destination recorded in README is `https://manubaba108.github.io/opendoor/`. On 17 October 2026 an HTTP request to it returned **301 to `https://opendoorstay.it/`**, which displays the Guest Hub Home. If the physical sticker encodes this exact address, it cannot resolve directly to `#/accesso` while the identical Home URL continues to show Home for ordinary visitors. Obtain the actual URL from a scan of the sticker and either print a replacement QR for `https://opendoorstay.it/#/accesso` or explicitly approve a Home-page access shortcut. Do not silently redirect every ordinary Home visit to door instructions.

## Final manual checks before publication
- Confirm physical fifth-floor QR URL and intended replacement/shortcut method.
- Visually verify actual parking/entry photos and whether the existing apartment-door photograph adequately identifies the fifth-floor landing.
- Confirm Bar IP tobacco/mobile top-up services and closing time, and check newly listed walking distances.
- Test media playback and touch targets on one real phone, including Wi-Fi/cellular connection.
- Approve deployment; do not merge this draft while the QR choice is unresolved.

This branch is not a live publication.
