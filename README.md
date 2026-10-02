# OPENDOOR Guest Hub

Static guest hub for OPENDOOR in Pegognaga. The permanent QR URL remains https://manubaba108.github.io/opendoor/.

## Review and publication

Repository scope is **manubaba108/opendoor** only. Work on `guest-hub-v1` and do not merge into `main` without the owner's explicit approval. GitHub Pages publishes the existing URL after the approved merge. This branch does not change the current QR destination.

## Guest experience

Four primary areas are Home, House, Explore and Help. Direct routes cover check-in, Wi-Fi, parking, dining, local services, health, waste, check-out, emergency assistance, the photo gallery, reviews and private suggestions.

House is a directory of fourteen clickable icons. Each opens a dedicated guide, including oven, hob, heating, air conditioning, TV, hot water, lights, appliances, kitchen, access, rules, safety, balcony and waste. Device guides support model details, translated step-by-step instructions, a control-panel photograph and a video. Content that has not yet been supplied is clearly labelled; no appliance-specific operating sequence is invented.

Check-in includes a separate A22 motorway section and at least two video positions, for the building entrance and apartment door. Home and House show a four-room photo strip with a link to the full gallery. Real photographs open in an accessible dialog. Empty photo and video positions do not masquerade as playable media.

Host contact buttons are concentrated on Help, the Home contact banner and arrival troubleshooting. Wi-Fi, parking, waste, House and both checklists do not repeat host phone or WhatsApp buttons. The help icon contains SOS, while check-in uses a conventional key icon. The owner's name is not displayed.

Italian, English, German, French, Dutch, Polish and Romanian have matching translation dictionaries. Fonts and images are local. Language is the only localStorage value. Checklists and the unsent suggestion draft remain in memory and reset on reload. There is no backend, analytics, tracking, login or guest-data storage.

## Files

- `index.html`: entry point and semantic landmarks
- `assets/styles.css`: responsive layouts and interaction states
- `assets/app.js`: hash navigation, language controls, media, photo dialog and checklists
- `assets/content.js`: configuration, destinations, media slots and seven dictionaries
- `assets/images/`: official logos, favicon and licensed landmark photograph
- `ASSET-CREDITS.md`: licences and factual sources
- `LINK-AUDIT.md`: the twelve destination addresses reconciled to the supplied guide

## Adding apartment photographs

The gallery belongs to the property. Add real photos to `assets/images/` and set each entry in `modules.gallery.items` to its relative `src`, for example `assets/images/living-room.webp`. The existing positions are living room, bedroom, kitchen and bathroom; more entries can be added. Each entry has a unique `id`, translated `altKey` and placeholder `icon`. Use real OPENDOOR photos, not the interiors in design reference screenshots. No public upload control is exposed on the guest site.

## Adding videos and appliance guides

Add MP4 files to `assets/videos/` or use owner-approved HTTPS MP4 URLs. Set `src` and optionally `thumbnail` on entries in `modules.videos.items`. More entries can be added to publish more than two arrival videos. `titleKey` and `descriptionKey` refer to translated keys. Optional captions use `{ "src": "assets/videos/entry-it.vtt", "lang": "it" }` entries in `captions`. Videos do not autoplay.

Each `houseManual` device supports `model`, `instructions` (an ordered array of translated keys), `photo`, `video`, `videoPoster` and `captions`. The oven, hob, heating, hot-water system and other appliances still need their exact models and operating instructions. Known house guidance is preserved.

## Reviews and suggestions

The review page asks which platform the guest booked through. Airbnb opens the guest's Trips at https://www.airbnb.it/trips, where the eligible stay can be reviewed. Booking opens its verified public website at https://www.booking.com/ and explains how to use the guest's reservation or post-stay review invitation. No guest-specific direct review URL is fabricated.

`reviews.google` is unset until the owner supplies the exact OPENDOOR Google review link. Setting it adds the Google option without changing the Airbnb or Booking paths.

The suggestions page lets a guest draft a private message. `host.email` is currently unset. The working fallback opens WhatsApp with the message prefilled; the guest reviews and sends it in their own app. Setting the owner's email switches the button to an addressed `mailto:` draft. No message is sent automatically or stored on a server.

## Configuration still needed

- Exact apartment and parking addresses, arrival and departure times
- Fire extinguisher location and external waste drop-off point
- Verified pharmacy, out-of-hours medical service and emergency department
- Real apartment photographs and entry videos
- Device models, control-panel photos and specific instructions
- Suggestions email and the exact Google review link, if wanted

Entry codes, Wi-Fi passwords, guest documents and secrets must never be committed to this public repository. Guests receive them separately in their private check-in information.

## Local use

Open `index.html` or serve the folder with a static HTTP server. Hash routes (`#/checkin`, `#/house/oven`) allow refreshes under `/opendoor/` with GitHub Pages. Assets use relative paths. The standalone review HTML embeds the assets for offline preview.

## Validation

Local Chromium checks cover all 32 routes, seven languages and six viewport widths, enlarged text, WhatsApp hover/focus contrast, icon navigation, video positions, media rendering, the photo dialog, review destinations, suggestion handoff, checklists and language switching. Maps destinations are compared exactly with the twelve full addresses supplied in the PDF. Calls and messages are not initiated during QA. Lighthouse is not measured.
