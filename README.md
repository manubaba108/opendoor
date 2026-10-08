# OPENDOOR Guest Hub

Static guest hub for OPENDOOR in Pegognaga. The permanent QR URL remains https://manubaba108.github.io/opendoor/.

## Review and publication

Repository scope is **manubaba108/opendoor** only. Work on `guest-hub-v1` and do not merge into `main` without the owner's explicit approval. GitHub Pages publishes the existing URL after the approved merge. This branch does not change the current QR destination.

## Guest journey update, 6 October 2026

The current Home prioritizes the full address and native Maps navigation, then four stages: travel/arrival, settling in, nearby breaks and departure. Food is accessible before arrival, from persistent navigation and again through breakfast/ice-cream shortcuts. There is no clock-based hiding or assumed guest schedule. Reviews follow departure; assistance and emergency access remain available throughout.

`assets/guest-journey.js` adds missing defaults without replacing Host edits, including seven-language labels, researched local-food metadata and the first-aid location field. `assets/journey.css` supplies consistent functional icon colours. Both public content files are synchronized. The Host panel also normalizes older drafts, so later saves retain the additions. Public source notes are linked within each food card; research decisions are recorded in `docs/LOCAL-FOOD-SOURCES.md`.

Maps and WhatsApp retain the corrected same-tab navigation, touch manipulation and mouse-only hover effects. Door closing now has its own route and uses the existing `door-closing` video slot. The video source and first-aid location still require Host-supplied content; no operational detail or private access code has been invented.

## Guest experience

Four primary areas are Home, House, Explore and Help. Direct routes cover check-in, Wi-Fi, parking, dining, local services, health, waste, check-out, emergency assistance, the photo gallery, reviews and private suggestions.

Home follows four clear stages: arrival (check-in first, parking and Wi-Fi), the stay (House, waste and support), the surroundings, and departure (check-out last). Reviews follow departure. Every internal page has a named, deterministic parent link; browser Back still follows browsing history. The House directory groups access, rules and safety first, daily equipment second, and waste and departure guidance at the end.

House is a directory of fourteen clickable icons. Each opens a dedicated guide, including oven, hob, heating, air conditioning, TV, hot water, lights, appliances, kitchen, access, rules, safety, balcony and waste. Device guides support model details, translated step-by-step instructions, a control-panel photograph and a video. Content that has not yet been supplied is clearly labelled; no appliance-specific operating sequence is invented.

Check-in includes a separate A22 motorway section, an access photograph and three video positions, in order: opening the door, closing the door and using the intercom. Home and House show a four-room photo strip in the order living room and kitchen together, bedroom, bathroom and balcony, with a link to the full gallery. Real photographs open in an accessible dialog. Empty photo and video positions do not masquerade as playable media.

Access, waste, balcony and safety guides have dedicated photo positions beside their relevant information. Both waste routes use the same content and container photograph. All four places to visit have matching photo positions; the licensed abbey photograph is retained. House Rules are grouped into guests and access, neighbours and shared spaces, and smoking and pets. Safety groups devices, clear passages, windows and balcony, and the 112 emergency action without inventing equipment locations.

Host contact buttons are concentrated on Help, the Home contact banner and arrival troubleshooting. Wi-Fi, parking, waste, House and both checklists do not repeat host phone or WhatsApp buttons. The help icon contains SOS, while check-in uses a conventional key icon. Public Host names are freely editable in the management panel.

Italian, English, German, French, Dutch, Polish and Romanian have matching translation dictionaries. Fonts and images are local. Language is the only localStorage value in the public Guest Hub. Checklists and the unsent suggestion draft remain in memory and reset on reload. There is no analytics, tracking or guest-data storage. The separate Host editor uses GitHub authentication and repository storage for content and media.

All 293 text entries in each language have been reviewed for meaning, grammar, tone and guest-facing terminology. French consistently uses `vous`; Italian, German, Dutch, Polish and Romanian use a friendly direct form, with gender-neutral phrasing where practical. English consistently uses apartment, lift, motorway, car park and rubbish. Localized terms for the host replace unnatural English loanwords. Host names are preserved as entered by the owner in every language. Arrival and departure instructions, quiet hours, guest limits and house policies retain their meaning. Street addresses and platform names remain unchanged.

A strip above the footer displays the owner-supplied logos for the platforms in Prenotazioni. The initial selection is Airbnb, Booking.com, Trip.com and Agoda. Platforms without a listing URL show a translated Coming soon label. The marks have accessible names and no additional links. The strip appears on every page and adapts from four columns on desktop to two on tablet and mobile.

## Files

- `index.html`: entry point and semantic landmarks
- `assets/styles.css`: responsive layouts and interaction states
- `assets/app.js`: hash navigation, language controls, media, photo dialog and checklists
- `assets/content.js`: configuration, destinations, media slots and seven dictionaries
- `assets/images/`: official logos, favicon, owner-supplied platform logos and licensed landmark photograph
- `ASSET-CREDITS.md`: licences and factual sources
- `LINK-AUDIT.md`: the twelve destination addresses reconciled to the supplied guide

## Adding apartment photographs

The gallery belongs to the property. Add real photos to `assets/images/` and set each entry in `modules.gallery.items` to its relative `src`, for example `assets/images/living-kitchen.webp`. The existing positions, in order, are `living-kitchen`, `bedroom`, `bathroom` and `balcony`; more entries can be added. Each entry has a unique `id`, translated `altKey` and placeholder `icon`. Use real OPENDOOR photos, not the interiors in design reference screenshots. No public upload control is exposed on the guest site.

For access, waste, balcony and safety, set the corresponding `houseManual` entry's `photo`. `photoTitleKey`, `photoHintKey` and `photoAltKey` describe the specific scene in all seven languages. The access image also appears in check-in. Set each `explore` place's `image.src` to add its photograph; optional `credit`, `source` and `license` retain attribution. A missing source produces a labelled photo position, never an empty or broken image.

## Adding videos and appliance guides

Add MP4 files to `assets/videos/` or use owner-approved HTTPS MP4 URLs. Set `src` and optionally `thumbnail` on the three entries in `modules.videos.items`: `door-opening`, `door-closing` and `intercom`. More entries can be added when needed. `titleKey` and `descriptionKey` refer to translated keys. Optional captions use `{ "src": "assets/videos/entry-it.vtt", "lang": "it" }` entries in `captions`. Videos do not autoplay. Both departure checklists link to the door-closing guide.

Each `houseManual` device supports `model`, `instructions` (an ordered array of translated keys), `photo`, `video`, `videoPoster` and `captions`. The oven, hob, heating, hot-water system and other appliances still need their exact models and operating instructions. Known house guidance is preserved.

## Reviews and suggestions

The review page asks which platform the guest booked through. Airbnb opens the guest's Trips at https://www.airbnb.it/trips, where the eligible stay can be reviewed. Booking opens its verified public website at https://www.booking.com/ and explains how to use the guest's reservation or post-stay review invitation. No guest-specific direct review URL is fabricated.

`reviews.google` is unset until the owner supplies the exact OPENDOOR Google review link. Setting it adds the Google option without changing the Airbnb or Booking paths.

The suggestions page lets a guest draft a private message. It uses the primary Host's email, with WhatsApp as the fallback; the guest reviews and sends it in their own app. No message is sent automatically or stored on a server.

## Configuration still needed

- Exact apartment and parking addresses, arrival and departure times
- Fire extinguisher location and external waste drop-off point
- Verified pharmacy, out-of-hours medical service and emergency department
- Real apartment, access, balcony, waste and safety photographs, remaining destination photographs and the three entry videos
- Device models, control-panel photos and specific instructions
- Suggestions email and the exact Google review link, if wanted

Entry codes, Wi-Fi passwords, guest documents and secrets must never be committed to this public repository. Guests receive them separately in their private check-in information.

## Local use

Open `index.html` or serve the folder with a static HTTP server. Hash routes (`#/checkin`, `#/house/oven`) allow refreshes under `/opendoor/` with GitHub Pages. Assets use relative paths. The standalone review HTML embeds the assets for offline preview.

## Host content editor

**Profili Host** supports adding, editing and removing multiple profiles, each with a freely editable public name, photograph, phone number, WhatsApp link and email. The selected primary Host appears first and receives Home/check-in quick contacts and suggestions. All profiles appear as separate contact cards on Help. One profile is retained as the minimum. Additional drafts may have blank names, but publication requires a public name for every profile. Existing singular `host` data is migrated in memory without changing stored photos or contacts. The first save records the canonical `hosts` array and a synchronized legacy `host` mirror; code updates do not overwrite guest content or saved drafts.

`admin.html` is the separate management workspace. It preserves the static GitHub Pages site and permanent QR address. It includes 22 initial photo positions, extra gallery photos and ordering, one looping Home banner video, three entrance videos plus nine appliance videos, video covers, all guest-facing text entries in seven languages, appliance instructions, property information, all twelve place addresses and Maps URLs, review URLs and the Host profile photograph and contacts. Changing a place address also updates its Maps destination. Changing Italian text marks six translations for review; publication requires complete, reviewed language content.

**Social e Google** edits the two optional public channel links under `social.instagram` and `social.google`. Empty fields hide the respective footer button; both empty hide the entire strip. The three footer labels are editable in all seven languages. Instagram accepts HTTPS profile URLs on instagram.com; Google accepts its public pages and Maps share links, with no invented destination. The panel checks the platform domain and provides an open-link control and draft preview. These links round-trip through the same atomic draft and publication flow as other content; managing posts or external accounts remains on each platform. Google reviews retain their separate field and page. Google Business Profile eligibility excludes vacation rental properties; the separate Google vacation-rental listing path may be available through an integrated booking partner. No external account or profile is created by the panel.

The editor shell and the guest information are public, as is this repository. The editor's login gates management actions; GitHub authenticates and authorizes every write. The key is a fine-grained personal access token created by the owner, with **Only select repositories → opendoor** and **Contents → Read and write**, plus automatic Metadata access. The guided link pre-fills the owner, name, expiry and Contents permission; GitHub does not support pre-selecting the repository in that URL, so the owner must select only opendoor. Classic tokens are rejected. No key is included in source or stored in localStorage, sessionStorage, cookies or saved content. It stays only in memory, is cleared on sign-out/page exit/30 minutes of inactivity and is sent only to `https://api.github.com/repos/manubaba108/opendoor`. No repository picker, account inventory or other repository endpoint exists.

`assets/content.json` is the canonical editable data. `assets/content-loader.js` loads it before the public app renders. `assets/content.js` remains an offline fallback, regenerated atomically with JSON by the editor. `assets/editorial.json` records translation reviews without personal information. The native preview uses a fresh nonce and validates the parent's source and origin before receiving draft content. Uploaded draft media is previewed locally before save and from the exact saved commit after reopening. The Host photo is rendered in Help. Only JPG/PNG/WebP photos up to 12 MB and MP4/WebM videos up to 40 MB are accepted; file signatures are checked, and batches of new uploads are limited to 100 MB. Larger videos can use a direct HTTPS MP4/WebM URL. Binary files are encoded and sent one at a time; their JSON request body uses Blob parts to avoid a second full Base64 string in memory. If a save fails, the panel names the file and GitHub API step and keeps the open draft available for retry.

**Save draft** commits content, translation state and media together on `content-draft`. It never changes `main`. If that branch does not exist, the editor starts from the released Guest Hub or, before first activation, `guest-hub-v1`. It compares branch heads before writes and never forces updates. Conflicts, connection failures and expired authorization preserve open edits. Inputs are frozen while saving so edits cannot be silently lost during an in-flight operation.

**Publish** requires an explicit in-panel confirmation. It copies only content, editorial state and uploaded media into a commit based on the current `main`; it preserves the live application code. It checks for competing main-content changes, uses non-forced updates and preserves a newer draft from another session. GitHub Pages publication may take a few minutes after the successful main update. Git history retains previous versions; this editor does not implement an automatic rollback control or delete old media from history.

The first Guest Hub publication is deliberately blocked until `assets/admin-release.json` exists on `main`. It arrives only with the separately approved initial merge. **The current task does not authorize that merge.** After approval, the permanent management entry will be `https://manubaba108.github.io/opendoor/admin.html`; the owner creates the key directly on GitHub and enters it in this panel, never in chat. Future content updates can then be reviewed and published by the owner from the panel.

For local development of the authenticated editor, serve this folder over HTTP. The standalone `OPENDOOR-pannello-anteprima.html` is a clearly labelled offline interface demonstration: file and text changes can be tried, but online saves and publication are disabled. It neither prompts for nor contains a key.

Run the meaningful integration checks with `node tests/admin-core.test.mjs`. The GitHub simulation is imported only by tests, never by production source. Checks cover authorization, persistent draft recovery, media/content atomicity, failures, competing edits, first-publication blocking, seven-language review, content-only publication, secret rejection and repository confinement. Browser checks additionally cover the real editor controls, uploaded image/video preview, expired-session recovery, publication confirmation, 320–1440 px layouts and 200% text. They should also verify the looping Home banner and its title overlay with reduced motion enabled and disabled. Tests use simulated API responses, without publishing or sending credentials to GitHub. The live key-based session can be exercised after initial activation with the owner's own key.

## Validation

Local Chromium checks cover all 32 routes, seven languages and six viewport widths, enlarged text, journey and gallery ordering, parent navigation, the new photo positions, three video positions, rules and safety, WhatsApp hover/focus contrast, media rendering, the photo dialog, review destinations, suggestion handoff, checklists, language switching and the six platform logos with their translated heading. Maps destinations are compared exactly with the twelve full addresses supplied in the PDF. Calls and messages are not initiated during QA. Lighthouse is not measured.

## Booking links

The Home hero and header include a translated Book button opening `#/book`. The page shows named platforms in the owner's list. A valid public HTTPS listing URL enables the booking button, opening it in a new tab with `noopener noreferrer`. Otherwise the card displays a translated Coming soon label without a link. No booking or payment is processed by OPENDOOR.

The Prenotazioni editor section lets the owner edit platform names and listing URLs, add platforms and remove them. Airbnb uses the existing property listing; Booking.com, Trip.com and Agoda start with empty URLs and show Coming soon. Removing a platform hides its card. `assets/booking-links.js` supplies backward-compatible defaults and seven-language labels when an older content draft is loaded. Explicitly empty lists and removed destinations stay empty. The labels become editable through Testi e lingue.

Calendar synchronization remains a separate OTA/account setting. Listing URLs are public destinations, not iCal feeds; ICS URLs are rejected. No channel-manager account or calendar connection is created by this change.

The four-platform preparation was checked in local Chromium at 1440 and 390 px in all seven languages: four cards, one active Airbnb link, three non-linked Coming soon labels, matching footer marks and no horizontal overflow. Targeted checks also cover Home navigation, enabling a listing URL, rejecting an unsafe URL, preserving an explicitly empty platform list, retaining Host/social data and editing/adding/removing platforms in the editor demo. No test writes to GitHub or external booking accounts.
