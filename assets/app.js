(() => {
  'use strict';
  const config = window.OPENDOOR;
  const supported = config.languages.map(item => item.code);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const paths = {
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    key:'<circle cx="8" cy="8" r="5"/><path d="m11.5 11.5 9 9M16 16l3-3m-6 9 3-3"/>',
    wifi:'<path d="M2 8.5a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0m-11 3.5a6 6 0 0 1 8 0"/><circle cx="12" cy="19" r=".5"/>',
    car:'<path d="m5 6-2 6v7m2-13h14l2 6v7M3 12h18M3 16h18M6 19v2m12-2v2M6 14h1m10 0h1"/>',
    utensils:'<path d="M5 3v7m4-7v7M3 3v5a4 4 0 0 0 8 0V3M7 12v9m11 0V3c-3 2-4 5-4 9h4"/>',
    basket:'<path d="m8 3-4 6m12-6 4 6M2 9h20l-3 12H5ZM8 13v4m4-4v4m4-4v4"/>',
    cross:'<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m16 8-2 6-6 2 2-6Z"/>',
    trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
    logout:'<path d="M9 3H4v18h5m3-9h10m-4-4 4 4-4 4"/>',
    siren:'<path d="M5 21h14M6 21v-7a6 6 0 0 1 12 0v7M12 2v2M3 5l2 2m14 0 2-2M2 12h2m16 0h2M12 11v3"/>',
    message:'<path d="M21 11.5a9 9 0 0 1-9.5 9A10 10 0 0 1 7 19.5L3 21l1.5-4A10 10 0 0 1 3 12a9 9 0 0 1 18-.5Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/>',
    phone:'<path d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"/>',
    down:'<path d="m5 9 7 7 7-7"/>',
    check:'<path d="m5 12 4 4L19 6"/>',
    back:'<path d="m14 5-7 7 7 7"/>',
    pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    users:'<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4v3"/>',
    lift:'<rect x="4" y="2" width="16" height="20" rx="2"/><path d="m7 8 2-2 2 2m2 8 2 2 2-2M9 6v5m6 7v-5"/>',
    road:'<path d="m5 3-3 18m17-18 3 18M12 3v3m0 4v4m0 4v3"/>',
    shield:'<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Z"/><path d="m8 12 3 3 5-6"/>',
    list:'<path d="M9 5h12M9 12h12M9 19h12M3 5h.01M3 12h.01M3 19h.01"/>',
    snowflake:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 3l3 3 3-3M9 21l3-3 3 3M3 10l4-1-1-4m12 14-1-4 4-1M3 14l4 1-1 4M18 5l-1 4 4 1"/>',
    tv:'<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    copy:'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H3V3h12v2"/>',
    info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
    bed:'<path d="M3 5v16m18-10v10M3 16h18M3 9h16a2 2 0 0 1 2 2v5M7 9V6h5v3"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>',
    play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.info}</svg>`;
  let lang = 'it';
  try {
    const saved = localStorage.getItem('opendoor.language');
    const browser = navigator.language?.split('-')[0];
    lang = supported.includes(saved) ? saved : supported.includes(browser) ? browser : 'it';
  } catch { const browser = navigator.language?.split('-')[0]; if (supported.includes(browser)) lang = browser; }
  const t = key => config.strings[lang]?.[key] ?? config.strings.it[key] ?? key;
  const navItems = [{route:'home',key:'navHome',icon:'home'},{route:'house',key:'navHouse',icon:'key'},{route:'explore',key:'navExplore',icon:'compass'},{route:'help',key:'navHelp',icon:'message'}];
  const cards = [
    ['checkin','key','checkin','checkinDesc','featured'],['wifi','wifi','wifi','wifiDesc',''],['house','home','house','houseDesc',''],['parking','car','parking','parkingDesc',''],
    ['food','utensils','food','foodDesc',''],['services','basket','services','servicesDesc',''],['health','cross','health','healthDesc',''],['explore','compass','explore','exploreDesc',''],
    ['waste','trash','waste','wasteDesc',''],['checkout','logout','checkout','checkoutDesc',''],['emergency','siren','emergency','emergencyDesc','danger'],['help','message','help','helpDesc','']
  ];
  const routes = ['home','house','explore','help','checkin','wifi','parking','food','services','health','waste','checkout','emergency','leaving','videos'];
  let route = 'home';
  let toastTimer;
  const checks = new Map();
  const whatsappURL = () => `${config.host.whatsapp}?text=${encodeURIComponent(t('greeting'))}`;
  const external = (url, text, iconName, cls='button') => `<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${iconName ? icon(iconName) : ''}<span>${esc(text)}</span></a>`;
  const call = (number, text, cls='button outline') => `<a class="${cls}" href="tel:${esc(number)}">${icon('phone')}<span>${esc(text)}</span></a>`;
  const helpButtons = () => `<div class="actions">${external(whatsappURL(),t('whatsapp'),'message')}${call(config.host.phone,t('callHost'))}</div>`;
  const mapURL = address => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const tile = ([url,iconName,title,desc,cls='']) => `<a class="tile ${cls}" href="#/${url}"><span class="icon-box">${icon(iconName)}</span><span><span class="tile-title">${esc(t(title))}</span><span class="tile-description">${esc(t(desc))}</span></span></a>`;
  const activeArea = () => ['food','services','parking'].includes(route) ? (route==='parking'?'house':'explore') : ['checkin','wifi','waste','checkout','leaving','videos'].includes(route) ? 'house' : ['health','emergency'].includes(route) ? 'help' : route;
  const heading = (title, intro, section) => `<a href="#/${section || 'home'}" class="back-link" data-back>${icon('back')}${esc(t('back'))}</a><div class="page-header"><div class="eyebrow">OPENDOOR · ${esc(t('propertyIntro'))}</div><h1>${esc(t(title))}</h1>${intro ? `<p>${esc(t(intro))}</p>` : ''}</div>`;
  const info = key => `<div class="info-line">${icon('info')}<p>${esc(t(key))}</p></div>`;
  const section = (title, text, iconName='info') => `<div class="panel"><div class="panel-heading"><span class="icon-box">${icon(iconName)}</span><h2>${esc(t(title))}</h2></div><p>${esc(t(text))}</p></div>`;
  function renderChrome() {
    const area = activeArea();
    document.documentElement.lang = lang;
    document.title = route==='home' ? 'OPENDOOR · Guest Hub' : `${t(route==='leaving'?'leaving':route)} · OPENDOOR`;
    document.querySelector('.skip-link').textContent = t('skip');
    document.getElementById('header').innerHTML = `<div class="header-inner"><a class="brand" href="#/home" aria-label="OPENDOOR · ${esc(t('navHome'))}"><img src="assets/images/logo-opendoor-black.png" width="176" height="28" alt="OPENDOOR"></a><nav class="desktop-nav" aria-label="${esc(t('hubTitle'))}">${navItems.map(item=>`<a href="#/${item.route}" ${area===item.route?'class="active" aria-current="page"':''}>${esc(t(item.key))}</a>`).join('')}</nav><div class="header-actions"><a class="emergency-link" href="#/emergency" aria-label="${esc(t('emergency'))}">${icon('siren')}<span>${esc(t('emergency'))}</span></a><div class="lang"><button type="button" class="lang-trigger" id="language-trigger" aria-label="${esc(t('language'))}" aria-haspopup="true" aria-expanded="false" aria-controls="language-menu">${icon('globe')}<span>${lang.toUpperCase()}</span><span class="chevron">${icon('down')}</span></button><div id="language-menu" class="lang-menu" hidden>${config.languages.map(item=>`<button type="button" data-language="${item.code}" lang="${item.code}" ${item.code===lang?'class="selected" aria-current="true"':''}>${esc(item.name)}${item.code===lang?icon('check'):''}</button>`).join('')}</div></div></div></div>`;
    const mobile = document.getElementById('mobile-nav');
    mobile.setAttribute('aria-label',t('hubTitle'));
    mobile.innerHTML = navItems.map(item=>`<a href="#/${item.route}" ${area===item.route?'class="active" aria-current="page"':''}>${icon(item.icon)}<span>${esc(t(item.key))}</span></a>`).join('');
    document.getElementById('footer').innerHTML = `<div class="footer-inner"><div class="footer-brand"><a href="#/home" aria-label="OPENDOOR · ${esc(t('navHome'))}"><img src="assets/images/logo-opendoor-black.png" width="142" height="23" alt="OPENDOOR"></a><p class="footer-slogan">${esc(config.property.slogan)}</p></div><div class="footer-info">Pegognaga, Mantova, ${esc(t('italy'))}<div class="cin">CIN ${esc(config.property.cin)}</div></div>${external(config.property.airbnb,t('airbnb'),null,'airbnb-link')}</div>`;
  }
  function home() {
    const dashboard = [...cards];
    if(config.modules.videos.enabled && config.modules.videos.items.length) dashboard.splice(3,0,['videos','play','videos','videosDesc','']);
    return `<section class="home-hero"><div><div class="eyebrow">PEGOGNAGA · MANTOVA</div><h1>COME IN.<br>YOU'RE <span class="home-word">HOME.</span></h1><p class="hero-copy">${esc(t('subtitle'))}</p></div><aside class="hero-aside"><div class="mini-fact">${icon('users')}<div><strong>${esc(t('guests'))}</strong><span>${esc(t('guestsSub'))}</span></div></div><div class="mini-fact">${icon('lift')}<div><strong>${esc(t('floor'))}</strong><span>${esc(t('elevator'))}</span></div></div><div class="mini-fact">${icon('road')}<div><strong>${esc(t('nearA22'))}</strong><span>${esc(t('nearA22Sub'))}</span></div></div></aside></section><section aria-labelledby="hub-title"><div class="section-heading"><div><h2 id="hub-title">${esc(t('hubTitle'))}</h2><p>${esc(t('hubSubtitle'))}</p></div><span class="section-note">${esc(t('quickAccess'))}</span></div><div class="tile-grid">${dashboard.map(tile).join('')}</div></section><section class="help-banner"><div><h2>${esc(t('help'))}</h2><p>${esc(t('host'))} · Manu</p></div>${external(whatsappURL(),t('whatsapp'),'message')}</section>${gallery()}`;
  }
  function gallery() {
    const data=config.modules.gallery;
    if(!data.enabled || !data.items.length) return '';
    return `<section><div class="section-heading"><h2>${esc(t('photos'))}</h2></div><div class="gallery">${data.items.map(item=>`<img src="${esc(item.src)}" alt="${esc(t(item.altKey))}" loading="lazy" width="400" height="300">`).join('')}</div></section>`;
  }
  function checkin() {
    const steps=[['arriveTitle',`<p>${esc(t('arriveText'))}</p><details class="accordion"><summary>${esc(t('train'))}</summary><div class="accordion-body"><p>${esc(t('trainText'))}</p></div></details>${config.property.address?external(mapURL(config.property.address),t('maps'),'pin','inline-link'):''}`],['parkingTitle',`<p>${esc(t('parkingText'))}</p><p>${esc(t('evText'))}</p><a class="inline-link" href="#/parking">${esc(t('parking'))}</a>`],['buildingTitle',`<p>${esc(t('buildingText'))}</p>`],['apartmentTitle',`<p>${esc(t('apartmentText'))}</p>${info('codeInfo')}`]];
    return `${heading('checkin','checkinIntro')}<div class="content-grid"><div class="panel"><ol class="steps">${steps.map(([title,body],i)=>`<li class="step"><span class="step-number">${i+1}</span><div><h2>${esc(t(title))}</h2>${body}</div></li>`).join('')}</ol>${config.property.checkInTime?`<div class="info-line"><p>${esc(t('checkinTime'))} ${esc(config.property.checkInTime)}</p></div>`:''}</div><aside><div class="panel teal-panel"><div class="panel-heading"><span class="icon-box">${icon('message')}</span><h2>${esc(t('arrivalTrouble'))}</h2></div><p>${esc(t('hostReply'))}</p>${helpButtons()}</div></aside></div>`;
  }
  function wifi() {
    return `${heading('wifi','wifiIntro')}<div class="content-narrow"><section class="panel"><div class="network"><div><div class="label">${esc(t('network'))}</div><strong id="network-name">${esc(config.property.wifiNetwork)}</strong></div><button class="copy-button" data-copy type="button">${icon('copy')}<span>${esc(t('copy'))}</span></button></div><div class="panel-heading"><span class="icon-box">${icon('shield')}</span><h2>${esc(t('passwordLabel'))}</h2></div><p>${esc(t('passwordInfo'))}</p></section><div class="panel teal-panel"><h2>${esc(t('wifiNeedHelp'))}</h2>${helpButtons()}</div></div>`;
  }
  function safetyBody() {
    return `<p>${esc(t('safetyText'))}</p>${config.property.fireExtinguisherLocation?`<p><strong>${esc(t('extinguisher'))}</strong> ${esc(config.property.fireExtinguisherLocation)}</p>`:''}<ul class="rule-list"><li><strong>${esc(t('balcony'))}</strong><p>${esc(t('balconyText'))}</p></li><li><strong>${esc(t('childrenTitle'))}</strong><p>${esc(t('childrenText'))}</p></li></ul><div class="actions">${call(config.emergency.number,t('call112'),'button danger')}</div>`;
  }
  function house() {
    const body={safety:safetyBody(),access:`<p>${esc(t('buildingText'))}</p><p>${esc(t('apartmentText'))} ${esc(t('codeInfo'))}</p><div class="actions"><a class="button secondary" href="#/checkin">${icon('key')}${esc(t('checkin'))}</a></div>`,rules:`<ul class="rule-list">${config.houseRules.map(rule=>`<li><strong>${esc(t(rule+'Title'))}</strong><p>${esc(t(rule+'Text'))}</p></li>`).join('')}</ul>`,kitchen:`<p>${esc(t('kitchenDesc'))}</p><p>${esc(t('kitchenClean'))}</p>`,climate:`<p>${esc(t('climateText'))}</p><p>${esc(t('malfunction'))}</p>`,tv:`<p>${esc(t('tvText'))}</p><p>${esc(t('malfunction'))}</p>`,waste:`<p>${esc(t('wasteText'))}</p>${config.property.wasteDropoffLocation?`<p>${esc(config.property.wasteDropoffLocation)}</p>`:''}`};
    return `${heading('house','houseIntro')}<div class="content-grid"><div><div class="fact-grid"><div class="fact">${icon('users')}<strong>${esc(t('guests'))}</strong></div><div class="fact">${icon('lift')}<strong>${esc(t('floor'))}</strong><span>${esc(t('elevator'))}</span></div><div class="fact">${icon('bed')}<strong>${esc(t('beds'))}</strong></div></div><section class="panel"><h2>${esc(t('houseAboutTitle'))}</h2><p>${esc(t('houseAbout'))}</p><div class="amenities">${[['utensils','kitchen'],['wifi','wifi'],['tv','tv'],['snowflake','climate'],['sun','balcony']].map(([i,k])=>`<span class="amenity">${icon(i)}${esc(t(k))}</span>`).join('')}</div></section><div class="section-heading"><h2>${esc(t('houseDesc'))}</h2></div>${config.houseManual.filter(item=>item.enabled&&body[item.id]).map(item=>`<details class="accordion" ${item.id==='safety'?'open':''}><summary>${icon(item.icon)}${esc(t(item.id))}</summary><div class="accordion-body">${body[item.id]}</div></details>`).join('')}${gallery()}</div><aside><div class="panel teal-panel"><div class="panel-heading"><span class="icon-box">${icon('logout')}</span><h2>${esc(t('leavingQuestion'))}</h2></div><p>${esc(t('leavingDesc'))}</p><div class="actions"><a class="button" href="#/leaving">${esc(t('leaving'))}</a></div></div><div class="panel"><h2>${esc(t('damage'))}</h2><p>${esc(t('damageText'))}</p><div class="actions">${external(whatsappURL(),t('whatsapp'),'message')}</div></div></aside></div>`;
  }
  function parking() {
    return `${heading('parking','parkingTitle')}<div class="content-narrow"><section class="panel"><div class="panel-heading"><span class="icon-box">${icon('car')}</span><h2>${esc(t('parkingTitle'))}</h2></div><p>${esc(t('parkingText'))}</p>${config.property.parkingAddress?`<div class="actions">${external(mapURL(config.property.parkingAddress),t('maps'),'pin')}</div>`:''}</section><section class="panel"><div class="panel-heading"><span class="icon-box">${icon('road')}</span><h2>${esc(t('ev'))}</h2></div><p>${esc(t('evText'))}</p><div class="actions">${external(mapURL(config.nearbyServices[1].address),t('maps'),'pin','button secondary')}</div></section><section class="panel teal-panel"><h2>${esc(t('help'))}</h2>${helpButtons()}</section></div>`;
  }
  function checklist(mode) {
    const keys=mode==='checkout'?['towels','checkoutWaste','checkoutPower','checkoutWindows','closeDoor','belongings']:['leaveLights','leaveTv','leaveClimate','closeWindows','closeBalcony','closeDoor'];
    const state=checks.get(mode)||new Set();checks.set(mode,state);
    return `${heading(mode,mode==='checkout'?'checkoutIntro':'leavingDesc')}<div class="content-narrow"><section class="panel">${config.property.checkOutTime&&mode==='checkout'?`<div class="label">${esc(t('checkoutTime'))} ${esc(config.property.checkOutTime)}</div>`:''}<div class="checklist">${keys.map((key,i)=>`<label class="check-item"><input type="checkbox" data-check="${mode}:${i}" ${state.has(i)?'checked':''}><span>${esc(t(key))}${key==='towels'?`<small>${esc(t('towelsNote'))}</small>`:''}</span></label>`).join('')}</div><p class="check-progress" aria-live="polite">${state.size} / ${keys.length} ${esc(t('checklistProgress'))}</p>${mode==='checkout'?`<p class="thank-you">${esc(t('thankyou'))}</p>`:''}</section><section class="panel teal-panel"><h2>${esc(t('help'))}</h2>${helpButtons()}</section></div>`;
  }
  function waste() {
    return `${heading('waste','wasteIntro')}<div class="content-narrow"><section class="panel waste-panel"><span class="icon-box">${icon('trash')}</span><h2>${esc(t('waste'))}</h2><p>${esc(t('wasteText'))}</p>${config.property.wasteDropoffLocation?`<p>${esc(t('wasteOutside'))} ${esc(config.property.wasteDropoffLocation)}</p>`:''}</section><section class="panel teal-panel"><h2>${esc(t('help'))}</h2>${helpButtons()}</section></div>`;
  }
  function hostPanel(title=false) {
    return `<section class="panel host-panel">${title?`<h2>${esc(t('apartmentProblem'))}</h2>`:''}<div class="host-identity"><div class="host-avatar" aria-hidden="true">M</div><div><p>${esc(t('host'))}</p><h2>${esc(config.host.name)}</h2></div></div>${helpButtons()}</section>`;
  }
  function help() {
    return `${heading('help','hostReply')}${hostPanel()}<div class="help-secondary">${tile(['emergency','siren','emergency','emergencyDesc','danger'])}${tile(['checkin','key','checkin','checkinDesc',''])}</div><section class="panel content-narrow" style="margin-top:20px"><h2>${esc(t('damage'))}</h2><p>${esc(t('damageText'))}</p></section>`;
  }
  function emergency(health=false) {
    return `${heading(health?'health':'emergency',health?'healthIntro':'emergencyIntro')}<div class="content-grid"><section class="panel emergency-panel"><div class="eyebrow">${esc(t('emergency'))}</div><span class="emergency-number">112</span><h2>${esc(t('emergencyNumber'))}</h2>${call('112',t('call112'),'button danger')}<p class="emergency-note">${esc(t('emergencyUse'))}</p></section><aside>${hostPanel(true)}</aside></div><section class="panel content-narrow emergency-safety"><div class="panel-heading"><span class="icon-box">${icon('shield')}</span><h2>${esc(t('safety'))}</h2></div>${safetyBody()}</section>`;
  }
  function placeCard(place) {
    const imageData=place.image;
    const distance=`<span class="distance">${icon('pin')}${esc(t('aboutDistance'))} ${esc(lang==='en'?place.distance.replace(',','.'):place.distance)}</span>`;
    return `<article class="place-card">${imageData?`<div class="place-photo"><img src="${esc(imageData.src)}" alt="${esc(place.name)}" width="1000" height="415" loading="lazy">${distance}</div>`:''}<div class="place-body"><div class="place-meta"><span class="place-category">${esc(t(place.category))}</span>${!imageData?distance:''}</div><h2>${esc(place.nameKey?t(place.nameKey):place.name)}</h2><p>${esc(t(place.description))}</p><div class="place-address">${icon('pin')}<span>${esc(place.address)}</span></div><div class="button-space"></div>${external(mapURL(place.address),t('maps'),'pin','button secondary')}</div>${imageData?.credit?`<div class="photo-credit"><a href="${esc(imageData.source)}" target="_blank" rel="noopener noreferrer">${esc(imageData.credit)}</a> · <a href="${esc(imageData.license)}" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a><br>${esc(t('photoChanges'))}</div>`:''}</article>`;
  }
  function places(kind) {
    const isExplore=kind==='explore';
    const data=kind==='food'?config.localFood:kind==='services'?config.nearbyServices:config.explore;
    return `${heading(kind,kind+'Intro')} ${isExplore?`<div class="category-links">${tile(['food','utensils','food','foodDesc',''])}${tile(['services','basket','services','servicesDesc',''])}${tile(['parking','car','parking','parkingDesc',''])}</div>`:''}<p class="local-note">${esc(t('approximate'))}</p><div class="place-grid ${kind==='food'?'food-grid':''}">${data.filter(item=>item.enabled).map(placeCard).join('')}</div>`;
  }
  function videos() {
    if(!config.modules.videos.enabled||!config.modules.videos.items.length) return unavailable();
    return `${heading('videos','videosDesc')}<div class="place-grid">${config.modules.videos.items.map(item=>`<article class="panel"><h2>${esc(t(item.titleKey))}</h2><p>${esc(t(item.descriptionKey))}</p><video controls preload="none" poster="${esc(item.thumbnail)}" style="width:100%;margin-top:20px;border-radius:14px"><source src="${esc(item.src)}" type="video/mp4"></video></article>`).join('')}</div>`;
  }
  function unavailable() { return `<div class="page-header" style="padding-top:65px"><h1>${esc(t('unavailableTitle'))}</h1><p>${esc(t('unavailableText'))}</p><div class="actions"><a class="button" href="#/home">${esc(t('goHome'))}</a></div></div>`; }
  const renderers={home,checkin,wifi,house,parking,checkout:()=>checklist('checkout'),leaving:()=>checklist('leaving'),waste,help,emergency:()=>emergency(),health:()=>emergency(true),food:()=>places('food'),services:()=>places('services'),explore:()=>places('explore'),videos};
  function render({navigation=false}={}) {
    route=location.hash.replace(/^#\/?/,'').split('?')[0] || 'home';
    renderChrome();
    document.getElementById('main').innerHTML=routes.includes(route)?renderers[route]():unavailable();
    if(navigation){window.scrollTo({top:0,behavior:'instant'});document.getElementById('main').focus({preventScroll:true});}
  }
  function closeLanguage() {
    document.getElementById('language-menu').hidden=true;
    document.getElementById('language-trigger').setAttribute('aria-expanded','false');
  }
  function toast(message) {
    document.querySelector('.toast')?.remove();clearTimeout(toastTimer);
    const element=document.createElement('div');element.className='toast';element.setAttribute('role','status');element.textContent=message;document.body.append(element);
    toastTimer=setTimeout(()=>element.remove(),3500);
  }
  document.addEventListener('click',async event=>{
    const languageButton=event.target.closest('#language-trigger');
    if(languageButton){const menu=document.getElementById('language-menu');menu.hidden=!menu.hidden;languageButton.setAttribute('aria-expanded',String(!menu.hidden));if(!menu.hidden)menu.querySelector('button').focus();return;}
    const choice=event.target.closest('[data-language]');
    if(choice){lang=choice.dataset.language;try{localStorage.setItem('opendoor.language',lang);}catch{}render();document.getElementById('language-trigger').focus();return;}
    if(!event.target.closest('.lang'))closeLanguage();
    if(event.target.closest('[data-copy]')){
      try{await navigator.clipboard.writeText(config.property.wifiNetwork);toast(t('copied'));}
      catch{const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(document.getElementById('network-name'));selection.removeAllRanges();selection.addRange(range);toast(t('copyFail'));}
    }
  });
  document.addEventListener('keydown',event=>{
    const menu=document.getElementById('language-menu');
    if(event.key==='Escape'&&!menu.hidden){closeLanguage();document.getElementById('language-trigger').focus();}
    if(!menu.hidden&&['ArrowDown','ArrowUp','Home','End'].includes(event.key)){
      const buttons=[...menu.querySelectorAll('button')];let position=buttons.indexOf(document.activeElement);
      position=event.key==='Home'?0:event.key==='End'?buttons.length-1:(position+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
      buttons[position].focus();event.preventDefault();
    }
  });
  document.addEventListener('change',event=>{
    const id=event.target.dataset.check;if(!id)return;
    const [mode,index]=id.split(':');const state=checks.get(mode);event.target.checked?state.add(Number(index)):state.delete(Number(index));
    const count=document.querySelectorAll('[data-check]').length;
    document.querySelector('.check-progress').textContent=`${state.size} / ${count} ${state.size===count?t('allSet'):t('checklistProgress')}`;
  });
  document.addEventListener('click',event=>{
    const back=event.target.closest('[data-back]');
    if(back && history.state?.opendoorFrom){event.preventDefault();history.back();}
  });
  window.addEventListener('hashchange',()=>{
    const next=location.hash.replace(/^#\/?/,'').split('?')[0] || 'home';
    if(history.state?.opendoorRoute!==next)history.replaceState({...history.state,opendoorRoute:next,opendoorFrom:true},'');
    render({navigation:true});
  });
  render();
  if(history.state?.opendoorRoute!==route)history.replaceState({...history.state,opendoorRoute:route,opendoorFrom:false},'');
})();
