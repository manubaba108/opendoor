(async () => {
  'use strict';
  await (window.OPENDOOR_READY||Promise.resolve());
  const config=window.OpendoorBooking.normalize(window.OPENDOOR);
  const bookingLinks=window.OpendoorBooking.available(config);
  const hosts=Array.isArray(config.hosts)&&config.hosts.length?config.hosts:[config.host];
  const primaryHost=hosts[0];
  const supported=config.languages.map(item=>item.code);
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const paths={
    home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/>',
    key:'<circle cx="7" cy="12" r="5"/><path d="M12 12h10m-2 0v4m-4-4v3"/>',
    sos:'<path d="M21 11.5a9 9 0 0 1-9.5 9A10 10 0 0 1 7 19.5L3 21l1.5-4A10 10 0 0 1 3 12a9 9 0 0 1 18-.5Z"/><text x="12" y="14.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7" font-weight="800" stroke="none" fill="currentColor">SOS</text>',
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
    whatsapp:'<path d="M21 11.5a9 9 0 0 1-9.5 9A10 10 0 0 1 7 19.5L3 21l1.5-4A10 10 0 0 1 3 12a9 9 0 0 1 18-.5Z"/><path d="m8 7 2 3-1.5 1A9 9 0 0 0 13 14.5l1-1.5 3 2c-1 4-10-3-9-8Z"/>',
    phone:'<path d="M5 3h4l2 5-3 2a16 16 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2Z"/>',
    globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"/>',
    instagram:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/>',
    down:'<path d="m5 9 7 7 7-7"/>',check:'<path d="m5 12 4 4L19 6"/>',back:'<path d="m14 5-7 7 7 7"/>',
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
    play:'<circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4Z"/>',
    oven:'<rect x="3" y="3" width="18" height="19" rx="2"/><path d="M3 8h18M7 5.5h.01m4 0h.01m6 0h.01M7 12h10v6H7Z"/>',
    hob:'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="8" cy="16" r="2"/><circle cx="16" cy="16" r="2"/>',
    droplet:'<path d="M12 2s-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13Z"/>',
    thermometer:'<path d="M9 14V5a3 3 0 0 1 6 0v9a5 5 0 1 1-6 0Z"/><path d="M12 7v10"/><circle cx="12" cy="18" r="1"/>',
    bulb:'<path d="M9 18h6m-6 3h6M8 14a6 6 0 1 1 8 0c-1 1-1 2-1 3H9c0-1 0-2-1-3Z"/>',
    appliance:'<rect x="3" y="2" width="18" height="20" rx="2"/><path d="M3 7h18M7 4.5h.01m4 0h.01"/><circle cx="12" cy="14" r="4"/>',
    sofa:'<path d="M5 10V5h14v5M3 10h3v6h12v-6h3v9H3ZM5 19v2m14-2v2"/>',
    shower:'<path d="M5 21V5a3 3 0 0 1 6 0v2M8 10h6l-1-3H9ZM8 14v1m3-1v1m3-1v1M8 18v1m3-1v1m3-1v1"/>',
    camera:'<path d="M3 6h4l2-3h6l2 3h4v15H3Z"/><circle cx="12" cy="13" r="4"/>',
    star:'<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z"/>',
    mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 5 9 7 9-7"/>',
    close:'<path d="m6 6 12 12M6 18 18 6"/>'
  };
  const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]||paths.info}</svg>`;
  let lang=window.OPENDOOR_PREVIEW_LANGUAGE||'it';
  try {const saved=localStorage.getItem('opendoor.language'),browser=navigator.language?.split('-')[0];lang=supported.includes(window.OPENDOOR_PREVIEW_LANGUAGE)?window.OPENDOOR_PREVIEW_LANGUAGE:supported.includes(saved)?saved:supported.includes(browser)?browser:'it';}
  catch {const browser=navigator.language?.split('-')[0];if(!supported.includes(window.OPENDOOR_PREVIEW_LANGUAGE)&&supported.includes(browser))lang=browser;}
  const t=key=>config.strings[lang]?.[key]??config.strings.it[key]??key;
  const navItems=[{route:'home',key:'navHome',icon:'home'},{route:'house',key:'navHouse',icon:'key'},{route:'explore',key:'navExplore',icon:'compass'},{route:'help',key:'navHelp',icon:'sos'}];
  const cards=[['checkin','key','checkin','checkinDesc','featured'],['wifi','wifi','wifi','wifiDesc'],['house','home','house','houseDesc'],['parking','car','parking','parkingDesc'],['food','utensils','food','foodDesc'],['services','basket','services','servicesDesc'],['health','cross','health','healthDesc'],['explore','compass','explore','exploreDesc'],['waste','trash','waste','wasteDesc'],['checkout','logout','checkout','checkoutDesc'],['emergency','siren','emergency','emergencyDesc','danger'],['help','sos','help','helpDesc']];
  const routes=['book','home','house','explore','help','checkin','wifi','parking','food','services','health','waste','checkout','emergency','leaving','videos','gallery','reviews','feedback',...config.houseManual.filter(x=>x.enabled).map(x=>'house/'+x.id)];
  let route='home',toastTimer,feedbackDraft='';
  const checks=new Map();
  const whatsappURL=(message=t('greeting'),host=primaryHost)=>{if(!host.whatsapp)return null;const url=new URL(host.whatsapp);url.searchParams.set('text',message);return url.href;};
  const external=(url,text,iconName,cls='button')=>`<a class="${cls}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${iconName?icon(iconName):''}<span>${esc(text)}</span></a>`;
  const call=(number,text,cls='button outline')=>`<a class="${cls}" href="tel:${esc(number)}">${icon('phone')}<span>${esc(text)}</span></a>`;
  const emailButton=host=>`<a class="button outline" href="mailto:${esc(host.email)}">${icon('mail')}<span>${lang==='de'?'E-Mail':'Email'}</span></a>`;
  const helpButtons=(host=primaryHost)=>`<div class="actions">${host.whatsapp?external(whatsappURL(t('greeting'),host),t('whatsapp'),'whatsapp'):''}${host.phone?call(host.phone,t('callHost')):''}${host.email?emailButton(host):''}</div>`;
  const quickContact=()=>primaryHost.whatsapp?external(whatsappURL(),t('whatsapp'),'whatsapp'):primaryHost.phone?call(primaryHost.phone,t('callHost')):primaryHost.email?emailButton(primaryHost):`<a class="button secondary" href="#/help">${esc(t('contactHost'))}</a>`;
  const mapURL=address=>`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const tile=([url,iconName,title,desc,cls=''])=>`<a class="tile ${cls}" href="#/${url}"><span class="icon-box">${icon(iconName)}</span><span><span class="tile-title">${esc(t(title))}</span><span class="tile-description">${esc(t(desc))}</span></span></a>`;
  const activeArea=()=>route.startsWith('house/')?'house':['food','services'].includes(route)?'explore':['wifi','waste','leaving','gallery'].includes(route)?'house':['book','checkin','parking','videos','checkout','reviews'].includes(route)?'home':['health','emergency','feedback'].includes(route)?'help':route;
  const routeParents={book:'home',house:'home',explore:'home',help:'home',checkin:'home',parking:'checkin',videos:'checkin',wifi:'house',waste:'house',leaving:'house',gallery:'house',food:'explore',services:'explore',health:'help',emergency:'help',checkout:'home',reviews:'checkout',feedback:'help'};
  const parentLabels={home:'backHome',house:'backHouse',explore:'backExplore',help:'backHelp',checkin:'backCheckin',checkout:'backCheckout'};
  const heading=(title,intro,parent=routeParents[route]||'home')=>`<a href="#/${parent}" class="back-link" data-parent-route="${parent}">${icon('back')}${esc(t(parentLabels[parent]||'back'))}</a><div class="page-header"><div class="eyebrow">OPENDOOR · ${esc(t('propertyIntro'))}</div><h1>${esc(t(title))}</h1>${intro?`<p>${esc(t(intro))}</p>`:''}</div>`;
  const info=key=>`<div class="info-line">${icon('info')}<p>${esc(t(key))}</p></div>`;
  function platformLogos() {
    const items=config.bookingPlatforms||[];if(!items.length)return '';
    return `<section class="platform-strip" aria-labelledby="platforms-title"><div class="platform-inner"><h2 id="platforms-title">${esc(t('bookingPlatformsTitle'))}</h2><ul class="platform-logos">${items.map(item=>{const [x,y,width,height]=item.crop,[originalWidth,originalHeight]=item.size;return `<li><span class="platform-mark" style="--mark-width:${item.displayWidth}px;--mark-ratio:${width}/${height}"><img src="${esc(item.src)}" alt="${esc(item.name)}" width="${originalWidth}" height="${originalHeight}" loading="lazy" style="width:${originalWidth/width*100}%;left:${-x/width*100}%;top:${-y/height*100}%"></span></li>`;}).join('')}</ul></div></section>`;
  }
  function socialChannels() {
    const valid=value=>{try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false;}};
    const items=[['instagram','instagram','instagramLink'],['google','globe','googleLink']].filter(([id])=>config.social?.[id]&&valid(config.social[id]));
    if(!items.length)return '';
    return `<section class="social-strip" aria-labelledby="social-title"><div class="social-inner"><h2 id="social-title">${esc(t('socialTitle'))}</h2><div class="social-links">${items.map(([id,symbol,label])=>external(config.social[id],t(label),symbol,'button outline social-link')).join('')}</div></div></section>`;
  }
  function renderChrome() {
    const area=activeArea();document.documentElement.lang=lang;
    const titleKey=route.startsWith('house/')?route.split('/')[1]:route;
    document.title=route==='home'?'OPENDOOR · Guest Hub':`${t(titleKey)} · OPENDOOR`;
    document.querySelector('.skip-link').textContent=t('skip');
    document.getElementById('header').innerHTML=`<div class="header-inner"><a class="brand" href="#/home" aria-label="OPENDOOR · ${esc(t('navHome'))}"><img src="assets/images/logo-opendoor-black.png" width="176" height="28" alt="OPENDOOR"></a><nav class="desktop-nav" aria-label="${esc(t('hubTitle'))}">${navItems.map(item=>`<a href="#/${item.route}" ${area===item.route?'class="active" aria-current="page"':''}>${esc(t(item.key))}</a>`).join('')}</nav><div class="header-actions">${bookingLinks.length?`<a class="header-book button" href="#/book">${esc(t('book'))}</a>`:''}<a class="emergency-link" href="#/emergency" aria-label="${esc(t('emergency'))}">${icon('siren')}<span>${esc(t('emergency'))}</span></a><div class="lang"><button type="button" class="lang-trigger" id="language-trigger" aria-label="${esc(t('language'))}" aria-haspopup="true" aria-expanded="false" aria-controls="language-menu">${icon('globe')}<span>${lang.toUpperCase()}</span><span class="chevron">${icon('down')}</span></button><div id="language-menu" class="lang-menu" hidden>${config.languages.map(item=>`<button type="button" data-language="${item.code}" lang="${item.code}" ${item.code===lang?'class="selected" aria-current="true"':''}>${esc(item.name)}${item.code===lang?icon('check'):''}</button>`).join('')}</div></div></div></div>`;
    const mobile=document.getElementById('mobile-nav');mobile.setAttribute('aria-label',t('hubTitle'));
    mobile.innerHTML=navItems.map(item=>`<a href="#/${item.route}" ${area===item.route?'class="active" aria-current="page"':''}>${icon(item.icon)}<span>${esc(t(item.key))}</span></a>`).join('');
    document.getElementById('footer').innerHTML=`${platformLogos()}${socialChannels()}<div class="footer-inner"><div class="footer-brand"><a href="#/home" aria-label="OPENDOOR · ${esc(t('navHome'))}"><img src="assets/images/logo-opendoor-black.png" width="142" height="23" alt="OPENDOOR"></a><p class="footer-slogan">${esc(config.property.slogan)}</p></div><div class="footer-info">Pegognaga, Mantova, ${esc(t('italy'))}<div class="cin">CIN ${esc(config.property.cin)}</div></div>${external(config.property.airbnb,t('airbnb'),null,'airbnb-link')}</div>`;
  }
  function book() {
    return `${heading('book','bookingIntro')}${bookingLinks.length?`<div class="booking-grid">${bookingLinks.map(item=>`<article class="panel booking-card"><h2>${esc(item.name)}</h2>${external(item.url,t('bookingWith')+' '+item.name,'bed')}</article>`).join('')}</div><p class="booking-note">${esc(t('bookingNote'))}</p>`:`<section class="panel content-narrow"><p>${esc(t('bookingEmpty'))}</p><a class="button" href="#/help">${esc(t('contactHost'))}</a></section>`}`;
  }
  function home() {
    const journey=(number,key,ids,extra='',cls='')=>`<section class="journey-section ${cls}" aria-labelledby="journey-${number}"><div class="journey-heading"><span class="journey-number" aria-hidden="true">0${number}</span><div><h2 id="journey-${number}">${esc(t(key))}</h2><p>${esc(t(key+'Desc'))}</p></div></div><div class="journey-grid">${ids.map(id=>tile(cards.find(card=>card[0]===id))).join('')}</div>${extra}</section>`;
    const support=`<div class="journey-support">${['health','emergency'].map(id=>tile(cards.find(card=>card[0]===id))).join('')}</div>`;
    return `<section class="home-hero"><div><div class="eyebrow">${esc(config.property.town.toUpperCase())} · ${esc(config.property.province.toUpperCase())}</div><h1>${config.property.slogan==="COME IN. YOU'RE HOME."?"COME IN.<br>YOU'RE <span class=\"home-word\">HOME.</span>":esc(config.property.slogan)}</h1><p class="hero-copy">${esc(t('subtitle'))}</p>${bookingLinks.length?`<a class="button home-book" href="#/book">${icon('bed')}<span>${esc(t('book'))}</span></a>`:''} </div><aside class="hero-aside"><div class="mini-fact">${icon('users')}<div><strong>${esc(t('guests'))}</strong><span>${esc(t('guestsSub'))}</span></div></div><div class="mini-fact">${icon('lift')}<div><strong>${esc(t('floor'))}</strong><span>${esc(t('elevator'))}</span></div></div><div class="mini-fact">${icon('road')}<div><strong>${esc(t('nearA22'))}</strong><span>${esc(t('nearA22Sub'))}</span></div></div></aside></section><div class="section-heading hub-heading"><div><h2>${esc(t('hubTitle'))}</h2><p>${esc(t('hubSubtitle'))}</p></div><span class="section-note">${esc(t('quickAccess'))}</span></div>${journey(1,'journeyArrival',['checkin','parking','wifi'])}${journey(2,'journeyStay',['house','waste','help'],support)}<section class="help-banner"><div><h2>${esc(t('contactHost'))}</h2><p>${esc(t('hostReply'))}</p></div>${quickContact()}</section>${gallery()}${journey(3,'journeyExplore',['explore','food','services'])}${journey(4,'journeyDeparture',['checkout'],stayLinks(),'journey-departure')}`;
  }
  function gallery(full=false) {
    const data=config.modules.gallery;if(!data.enabled)return '';
    return `<section class="photo-section" aria-labelledby="photo-title"><div class="section-heading"><div><h2 id="photo-title">${esc(t('galleryTitle'))}</h2><p>${esc(t('galleryIntro'))}</p></div>${!full?`<a class="inline-link" href="#/gallery">${esc(t('viewPhotos'))}</a>`:''}</div><div class="gallery ${full?'gallery-full':''}">${(full?data.items:data.items.slice(0,4)).map(item=>`<figure class="gallery-item">${item.src?`<button type="button" class="photo-button" data-photo="${esc(item.id)}" aria-label="${esc(t(item.altKey))}"><img src="${esc(item.src)}" alt="${esc(t(item.altKey))}" loading="lazy" width="600" height="450"></button>`:`<div class="photo-slot">${icon(item.icon||'camera')}<span>${esc(t('photoPending'))}</span></div>`}<figcaption>${esc(t(item.altKey))}</figcaption></figure>`).join('')}</div></section>`;
  }
  function fullGallery() {return `${heading('gallery','galleryIntro')}${gallery(true)}`;}
  function videoCard(item) {
    return `<article class="video-card"><div class="video-frame">${item.src?`<video controls playsinline preload="none" ${item.thumbnail?`poster="${esc(item.thumbnail)}"`:''} aria-label="${esc(t(item.titleKey))}"><source src="${esc(item.src)}" type="${esc(item.mime||(/\.webm(?:$|\?)/i.test(item.src)?'video/webm':'video/mp4'))}">${(item.captions||[]).map(track=>`<track kind="captions" src="${esc(track.src)}" srclang="${esc(track.lang)}" label="${esc(config.languages.find(x=>x.code===track.lang)?.name||track.lang)}" ${track.lang===lang?'default':''}>`).join('')}</video>`:`<div class="video-slot">${icon('play')}<span>${esc(t('videoPending'))}</span></div>`}</div><div class="video-copy"><h3>${esc(t(item.titleKey))}</h3>${item.descriptionKey?`<p>${esc(t(item.descriptionKey))}</p>`:''}</div></article>`;
  }
  function arrivalVideos() {
    const data=config.modules.videos;if(!data.enabled)return '';
    return `<section class="arrival-videos" aria-labelledby="arrival-video-title"><div class="section-heading"><div><h2 id="arrival-video-title">${esc(t('watchArrival'))}</h2><p>${esc(t('watchArrivalIntro'))}</p></div></div><div class="video-grid">${data.items.map(videoCard).join('')}</div></section>`;
  }
  function checkin() {
    const steps=[['arriveTitle',`<div class="arrival-mode"><span class="icon-box">${icon('road')}</span><h3>${esc(t('motorway'))}</h3></div><p>${esc(t('motorwayText'))}</p><p>${esc(t('localArrivalText'))}</p><details class="accordion"><summary>${esc(t('train'))}</summary><div class="accordion-body"><p>${esc(t('trainText'))}</p></div></details>${config.property.address?external(mapURL(config.property.address),t('maps'),'pin','inline-link'):''}`],['parkingTitle',`<p>${esc(t('parkingText'))}</p><p>${esc(t('evText'))}</p><a class="inline-link" href="#/parking">${esc(t('parking'))}</a>`],['buildingTitle',`<p>${esc(t('buildingText'))}</p>`],['apartmentTitle',`<p>${esc(t('apartmentText'))}</p>${info('codeInfo')}`]];
    const access=config.houseManual.find(item=>item.id==='access');
    return `${heading('checkin','checkinIntro')}<div class="content-grid"><div class="panel"><ol class="steps">${steps.map(([title,body],i)=>`<li class="step"><span class="step-number">${i+1}</span><div><h2>${esc(t(title))}</h2>${body}</div></li>`).join('')}</ol>${config.property.checkInTime?`<div class="info-line"><p>${esc(t('checkinTime'))} ${esc(config.property.checkInTime)}</p></div>`:''}</div><aside>${guidePhoto(access)}<div class="panel teal-panel"><div class="panel-heading"><span class="icon-box">${icon('sos')}</span><h2>${esc(t('arrivalTrouble'))}</h2></div><div class="actions">${quickContact()}</div><a class="inline-link" href="#/help">${esc(t('contactHost'))}</a></div></aside></div>${arrivalVideos()}<div class="next-step"><a class="button secondary" href="#/house">${icon('home')}<span>${esc(t('continueHouse'))}</span></a></div>`;
  }
  function wifi() {
    return `${heading('wifi','wifiIntro')}<div class="content-narrow"><section class="panel"><div class="network"><div><div class="label">${esc(t('network'))}</div><strong id="network-name">${esc(config.property.wifiNetwork)}</strong></div><button class="copy-button" data-copy type="button">${icon('copy')}<span>${esc(t('copy'))}</span></button></div><div class="panel-heading"><span class="icon-box">${icon('shield')}</span><h2>${esc(t('passwordLabel'))}</h2></div><p>${esc(t('passwordInfo'))}</p></section></div>`;
  }
  function safetyBody(showCall=true) {
    const note=(symbol,title,body)=>`<div class="safety-note"><span class="icon-box">${icon(symbol)}</span><div><h3>${esc(t(title))}</h3>${body}</div></div>`;
    return `<div class="safety-notes">${note('shield','safetyDevicesTitle',`<p>${esc(t('safetyText'))}</p>${config.property.fireExtinguisherLocation?`<p><strong>${esc(t('extinguisher'))}</strong> ${esc(config.property.fireExtinguisherLocation)}</p>`:''}`)}${note('key','safetyPassagesTitle',`<p>${esc(t('safetyPassagesText'))}</p>`)}${note('sun','safetyWindowsTitle',`<p>${esc(t('balconyText'))}</p><p>${esc(t('childrenText'))}</p>`)}${showCall?note('siren','safetyEmergencyTitle',`<p>${esc(t('safetyEmergencyText'))}</p><div class="actions">${call(config.emergency.number,t('call112'),'button danger')}</div>`):''}</div>`;
  }
  function house() {
    const manual=config.houseManual.filter(item=>item.enabled);
    const manualTile=item=>`<a class="manual-tile" href="#/house/${item.id}"><span class="icon-box">${icon(item.icon)}</span><strong>${esc(t(item.id))}</strong><span>${esc(t(item.instructions?.length||['rules','safety'].includes(item.id)?'openGuide':'guidePending'))}</span></a>`;
    const groups=[['orientation',['access','rules','safety']],['dailyUse',['kitchen','oven','hob','appliances','climate','heating','hotWater','lights','tv','balcony']],['houseCare',['waste']]];
    return `${heading('house','houseIntro')}<section aria-labelledby="manual-title"><div class="section-heading manual-heading"><div><h2 id="manual-title">${esc(t('manualTitle'))}</h2><p>${esc(t('manualIntro'))}</p></div></div>${groups.map(([key,ids])=>`<div class="manual-group"><h3>${esc(t(key))}</h3><div class="manual-grid ${key==='orientation'?'manual-orientation':key==='houseCare'?'manual-care':''}">${ids.map(id=>manual.find(item=>item.id===id)).filter(Boolean).map(manualTile).join('')}</div></div>`).join('')}</section><section class="panel house-about"><h2>${esc(t('houseAboutTitle'))}</h2><p>${esc(t('houseAbout'))}</p><div class="house-facts"><span>${icon('users')}<span>${esc(t('guests'))}</span></span><span>${icon('lift')}<span>${esc(t('floor'))} · ${esc(t('elevator'))}</span></span><span>${icon('bed')}<span>${esc(t('beds'))}</span></span></div></section>${gallery()}<section class="panel teal-panel house-departure"><h2>${esc(t('leavingQuestion'))}</h2><p>${esc(t('leavingDesc'))}</p><div class="actions"><a class="button" href="#/leaving">${esc(t('leaving'))}</a><a class="button secondary" href="#/checkout">${esc(t('checkout'))}</a></div></section>`;
  }
  function guidePhoto(item) {
    const title=item.photoTitleKey||'controlsPhoto',hint=item.photoHintKey||'guidePhotoPending',alt=item.photoAltKey||title;
    return `<section class="panel guide-photo-panel" data-guide-photo="${esc(item.id)}"><h2>${esc(t(title))}</h2>${item.photo?`<img class="controls-photo" src="${esc(item.photo)}" alt="${esc(t(alt))}" width="600" height="450" loading="lazy">`:`<div class="controls-slot">${icon('camera')}<p>${esc(t(hint))}</p></div>`}</section>`;
  }
  function rulesBody() {
    const groups=[['users','rulesAccess',['visitors','keypad']],['home','rulesNeighbours',['quiet','parties','commonAreas']],['sun','rulesCare',['smoking','pets']]];
    return `<div class="rule-highlights"><span>${icon('users')}${esc(t('guests'))}</span><span>${icon('home')}${esc(t('quietBadge'))}</span><span>${icon('shield')}${esc(t('noPartiesBadge'))}</span></div><div class="rules-groups">${groups.map(([symbol,title,keys])=>`<section class="panel"><div class="panel-heading"><span class="icon-box">${icon(symbol)}</span><h2>${esc(t(title))}</h2></div><ul class="rule-list">${keys.map(key=>`<li><h3>${esc(t(key+'Title'))}</h3><p>${esc(t(key+'Text'))}</p></li>`).join('')}</ul></section>`).join('')}</div>`;
  }
  function applianceGuide(id) {
    const item=config.houseManual.find(x=>x.id===id&&x.enabled);if(!item)return unavailable();
    if(id==='rules')return `${heading(id,'rulesIntro','house')}${rulesBody()}`;
    const device=['heating','climate','tv','kitchen','oven','hob','hotWater','lights','appliances'].includes(id);
    const intro={safety:'safetyIntro',balcony:'balconyIntro',waste:'wasteIntro'}[id];
    let instructions=id==='safety'?safetyBody():id==='balcony'?`<div class="balcony-notes"><h3>${esc(t('balconyUseTitle'))}</h3><p>${esc(t('balconyText'))}</p><h3>${esc(t('balconyChildrenTitle'))}</h3><p>${esc(t('childrenText'))}</p></div>`:id==='waste'?`<p>${esc(t('wasteText'))}</p>`:item.instructions?.length?`<ol class="guide-steps">${item.instructions.map(key=>`<li>${esc(t(key))}</li>`).join('')}</ol>`:`<div class="empty-guide">${icon('list')}<p>${esc(t('guideStepsPending'))}</p></div>`;
    if(id==='waste'&&config.property.wasteDropoffLocation)instructions+=`<div class="waste-location"><h3>${esc(t('wasteOutside'))}</h3><p>${esc(config.property.wasteDropoffLocation)}</p></div>`;
    const hasPhoto=device||Boolean(item.photoTitleKey);
    return `${heading(id,intro,'house')}${device||id==='access'?`<div class="guide-top"><span class="guide-symbol">${icon(item.icon)}</span><div><span class="label">${esc(t('guide'))}</span>${item.model?`<p>${esc(t('modelLabel'))} · ${esc(item.model)}</p>`:`<p>${esc(t(item.instructions?.length?'openGuide':'guidePending'))}</p>`}</div></div>`:''}<div class="guide-layout ${hasPhoto?'':'guide-single'}"><section class="panel">${id==='safety'?'':`<h2>${esc(t(device||id==='access'?'stepsTitle':'guideNotes'))}</h2>`}${instructions}${id==='access'?`<div class="actions"><a class="button secondary" href="#/videos">${icon('play')}<span>${esc(t('watchArrival'))}</span></a><a class="inline-link" href="#/checkin">${esc(t('checkin'))}</a></div>`:''}</section>${hasPhoto?guidePhoto(item):''}</div>${device?`<section class="appliance-video-section"><div class="section-heading"><h2>${esc(t('applianceVideo'))}</h2></div>${item.video?videoCard({src:item.video,mime:item.videoMime,titleKey:id,thumbnail:item.videoPoster,captions:item.captions||[]}):`<div class="appliance-video-slot">${icon('play')}<p>${esc(t('guideVideoPending'))}</p></div>`}</section>`:''}`;
  }
  function parking() {
    const ev=config.nearbyServices.find(x=>x.category==='ev');
    return `${heading('parking','parkingTitle')}<div class="content-narrow"><section class="panel"><div class="panel-heading"><span class="icon-box">${icon('car')}</span><h2>${esc(t('parkingTitle'))}</h2></div><p>${esc(t('parkingText'))}</p>${config.property.parkingAddress?`<div class="actions">${external(mapURL(config.property.parkingAddress),t('maps'),'pin')}</div>`:''}</section><section class="panel"><div class="panel-heading"><span class="icon-box">${icon('road')}</span><h2>${esc(t('ev'))}</h2></div><p>${esc(t('evText'))}</p><p class="place-address">${esc(ev.address)}</p><div class="actions">${external(ev.mapUrl,t('maps'),'pin','button secondary')}</div></section></div>`;
  }
  function checklist(mode) {
    const keys=mode==='checkout'?['towels','checkoutWaste','checkoutPower','checkoutWindows','closeDoor','belongings']:['leaveLights','leaveTv','leaveClimate','closeWindows','closeBalcony','closeDoor'];
    const state=checks.get(mode)||new Set();checks.set(mode,state);
    return `${heading(mode,mode==='checkout'?'checkoutIntro':'leavingDesc')}<div class="content-narrow"><section class="panel">${config.property.checkOutTime&&mode==='checkout'?`<div class="label">${esc(t('checkoutTime'))} ${esc(config.property.checkOutTime)}</div>`:''}<div class="checklist">${keys.map((key,i)=>`<label class="check-item"><input type="checkbox" data-check="${mode}:${i}" ${state.has(i)?'checked':''}><span>${esc(t(key))}${key==='towels'?`<small>${esc(t('towelsNote'))}</small>`:''}</span></label>`).join('')}</div><p class="check-progress" aria-live="polite">${state.size} / ${keys.length} ${esc(state.size===keys.length?t('allSet'):t('checklistProgress'))}</p><a class="inline-link door-guide-link" href="#/videos">${icon('play')}<span>${esc(t('doorVideosLink'))}</span></a>${mode==='checkout'?`<p class="thank-you">${esc(t('thankyou'))}</p>`:''}</section>${mode==='checkout'?stayLinks():''}</div>`;
  }
  function waste() {
    return applianceGuide('waste');
  }
  function hostPanel() {
    return `<div class="host-panels ${hosts.length>1?'multiple':''}">${hosts.map(host=>`<section class="panel host-panel"><div class="host-identity"><div class="host-avatar" ${host.photo?'':'aria-hidden="true"'}>${host.photo?`<img src="${esc(host.photo)}" alt="${esc(host.name||'Host')}" width="72" height="72" loading="lazy">`:icon('users')}</div><div><p>OPENDOOR</p><h2>${esc(host.name||'Host')}</h2></div></div>${helpButtons(host)}</section>`).join('')}</div>`;
  }
  function help() {
    return `${heading('help','hostReply')}${hostPanel()}<div class="help-secondary">${tile(['emergency','siren','emergency','emergencyDesc','danger'])}${tile(['checkin','key','checkin','checkinDesc'])}</div><section class="panel content-narrow help-damage"><h2>${esc(t('damage'))}</h2><p>${esc(t('damageText'))}</p></section>${stayLinks()}`;
  }
  function emergency(health=false) {
    return `${heading(health?'health':'emergency',health?'healthIntro':'emergencyIntro')}<div class="content-grid"><section class="panel emergency-panel"><div class="eyebrow">${esc(t('emergency'))}</div><span class="emergency-number">112</span><h2>${esc(t('emergencyNumber'))}</h2>${call('112',t('call112'),'button danger')}<p class="emergency-note">${esc(t('emergencyUse'))}</p></section><aside><section class="panel"><span class="icon-box">${icon('sos')}</span><h2>${esc(t('apartmentProblem'))}</h2><a class="button secondary" href="#/help">${esc(t('contactHost'))}</a></section></aside></div><section class="panel content-narrow emergency-safety"><div class="panel-heading"><span class="icon-box">${icon('shield')}</span><h2>${esc(t('safety'))}</h2></div>${safetyBody(false)}</section>`;
  }
  function placeCard(place) {
    const imageData=place.image,name=place.nameKey?t(place.nameKey):place.name;
    const distance=`<span class="distance">${icon('pin')}${esc(t('aboutDistance'))} ${esc(lang==='en'?place.distance.replace(',','.'):place.distance)}</span>`;
    return `<article class="place-card">${imageData?`<div class="place-photo">${imageData.src?`<img src="${esc(imageData.src)}" alt="${esc(name)}" width="1000" height="415" loading="lazy">`:`<div class="place-photo-slot" aria-label="${esc(name)}">${icon('camera')}<span>${esc(t('placePhotoPending'))}</span></div>`}${distance}</div>`:''}<div class="place-body"><div class="place-meta"><span class="place-category">${esc(t(place.category))}</span>${!imageData?distance:''}</div><h2>${esc(name)}</h2><p>${esc(t(place.description))}</p><div class="place-address">${icon('pin')}<span>${esc(place.address)}</span></div><div class="button-space"></div>${external(place.mapUrl,t('maps'),'pin','button secondary')}</div>${imageData?.src&&imageData.credit?`<div class="photo-credit"><a href="${esc(imageData.source)}" target="_blank" rel="noopener noreferrer">${esc(imageData.credit)}</a> · <a href="${esc(imageData.license)}" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a><br>${esc(t('photoChanges'))}</div>`:''}</article>`;
  }
  function places(kind) {
    const data=kind==='food'?config.localFood:kind==='services'?config.nearbyServices:config.explore;
    return `${heading(kind,kind+'Intro')}${kind==='explore'?`<div class="category-links explore-links">${tile(['food','utensils','food','foodDesc'])}${tile(['services','basket','services','servicesDesc'])}</div>`:''}<p class="local-note">${esc(t('approximate'))}</p><div class="place-grid ${kind==='food'?'food-grid':''}">${data.filter(item=>item.enabled).map(placeCard).join('')}</div>`;
  }
  function stayLinks() {return `<div class="stay-links">${tile(['reviews','star','reviews','reviewsDesc'])}${tile(['feedback','message','feedback','feedbackDesc'])}</div>`;}
  function reviews() {
    return `${heading('reviews','reviewsIntro')}<section class="review-section"><h2>${esc(t('bookedWith'))}</h2><div class="review-grid"><article class="panel review-card"><span class="platform-label">Airbnb</span><p>${esc(t('airbnbReviewIntro'))}</p>${external(config.reviews.airbnb,t('openAirbnbTrips'),'star')}</article><article class="panel review-card"><span class="platform-label">Booking.com</span><p>${esc(t('bookingReviewIntro'))}</p>${external(config.reviews.booking,t('openBookingTrips'),'star')}</article>${config.reviews.google?`<article class="panel review-card"><span class="platform-label">Google</span><p>${esc(t('googleReviewIntro'))}</p>${external(config.reviews.google,t('googleReviews'),'star')}</article>`:''}</div></section><div class="review-private"><h2>${esc(t('feedback'))}</h2><p>${esc(t('privateFeedback'))}</p><a class="inline-link" href="#/feedback">${esc(t('feedbackDesc'))}</a></div>`;
  }
  function feedback() {
    return `${heading('feedback','feedbackIntro')}<section class="panel content-narrow"><form id="feedback-form"><label class="feedback-label" for="feedback-message">${esc(t('feedbackLabel'))}</label><textarea id="feedback-message" name="message" rows="6" maxlength="2000" required placeholder="${esc(t('feedbackPlaceholder'))}" aria-describedby="feedback-note">${esc(feedbackDraft)}</textarea><p id="feedback-note" class="feedback-note">${esc(t('feedbackLocalNote'))}</p><div class="actions">${primaryHost.email||primaryHost.whatsapp?`<button class="button" type="submit">${icon(primaryHost.email?'mail':'whatsapp')}<span>${esc(t(primaryHost.email?'sendFeedbackEmail':'sendFeedbackWhatsapp'))}</span></button>`:`<a class="button secondary" href="#/help">${esc(t('contactHost'))}</a>`}</div></form></section>`;
  }
  function videos() {return `${heading('videos','watchArrivalIntro')}${arrivalVideos()}`;}
  function unavailable() {return `<div class="page-header unavailable"><h1>${esc(t('unavailableTitle'))}</h1><p>${esc(t('unavailableText'))}</p><div class="actions"><a class="button" href="#/home">${esc(t('goHome'))}</a></div></div>`;}
  const renderers={book,home,checkin,wifi,house,parking,checkout:()=>checklist('checkout'),leaving:()=>checklist('leaving'),waste,help,emergency:()=>emergency(),health:()=>emergency(true),food:()=>places('food'),services:()=>places('services'),explore:()=>places('explore'),videos,gallery:fullGallery,reviews,feedback};
  function render({navigation=false}={}) {
    document.querySelector('.photo-dialog')?.remove();route=location.hash.replace(/^#\/?/,'').split('?')[0]||'home';renderChrome();
    document.getElementById('main').innerHTML=!routes.includes(route)?unavailable():route.startsWith('house/')?applianceGuide(route.split('/')[1]):renderers[route]();
    if(navigation){window.scrollTo({top:0,behavior:'instant'});document.getElementById('main').focus({preventScroll:true});}
  }
  function closeLanguage() {document.getElementById('language-menu').hidden=true;document.getElementById('language-trigger').setAttribute('aria-expanded','false');}
  function toast(message) {
    document.querySelector('.toast')?.remove();clearTimeout(toastTimer);const element=document.createElement('div');element.className='toast';element.setAttribute('role','status');element.textContent=message;document.body.append(element);toastTimer=setTimeout(()=>element.remove(),3500);
  }
  function openPhoto(id) {
    const item=config.modules.gallery.items.find(x=>x.id===id&&x.src);if(!item)return;
    const source=document.querySelector(`[data-photo="${CSS.escape(id)}"]`);
    const dialog=document.createElement('dialog');dialog.className='photo-dialog';dialog.setAttribute('aria-label',t(item.altKey));
    dialog.innerHTML=`<button type="button" class="photo-close" aria-label="${esc(t('closePhoto'))}">${icon('close')}</button><img src="${esc(item.src)}" alt="${esc(t(item.altKey))}"><p>${esc(t(item.altKey))}</p>`;
    dialog.addEventListener('close',()=>{dialog.remove();source?.focus();});dialog.addEventListener('click',event=>{if(event.target===dialog||event.target.closest('.photo-close'))dialog.close();});document.body.append(dialog);dialog.showModal();
  }
  document.addEventListener('click',async event=>{
    if(event.target.closest('.skip-link')){event.preventDefault();document.getElementById('main').focus();return;}
    const languageButton=event.target.closest('#language-trigger');if(languageButton){const menu=document.getElementById('language-menu');menu.hidden=!menu.hidden;languageButton.setAttribute('aria-expanded',String(!menu.hidden));if(!menu.hidden)menu.querySelector('button').focus();return;}
    const choice=event.target.closest('[data-language]');if(choice){lang=choice.dataset.language;try{localStorage.setItem('opendoor.language',lang);}catch{}render();document.getElementById('language-trigger').focus();return;}
    if(!event.target.closest('.lang'))closeLanguage();
    const photo=event.target.closest('[data-photo]');if(photo){openPhoto(photo.dataset.photo);return;}
    if(event.target.closest('[data-copy]')){try{await navigator.clipboard.writeText(config.property.wifiNetwork);toast(t('copied'));}catch{const selection=window.getSelection(),range=document.createRange();range.selectNodeContents(document.getElementById('network-name'));selection.removeAllRanges();selection.addRange(range);toast(t('copyFail'));}}
  });
  document.addEventListener('keydown',event=>{
    const menu=document.getElementById('language-menu');if(event.key==='Escape'&&!menu.hidden){closeLanguage();document.getElementById('language-trigger').focus();}
    if(!menu.hidden&&['ArrowDown','ArrowUp','Home','End'].includes(event.key)){const buttons=[...menu.querySelectorAll('button')];let position=buttons.indexOf(document.activeElement);position=event.key==='Home'?0:event.key==='End'?buttons.length-1:(position+(event.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;buttons[position].focus();event.preventDefault();}
  });
  document.addEventListener('input',event=>{if(event.target.id==='feedback-message')feedbackDraft=event.target.value;});
  document.addEventListener('submit',event=>{
    if(event.target.id!=='feedback-form')return;event.preventDefault();const input=document.getElementById('feedback-message');feedbackDraft=input.value.trim();
    if(!feedbackDraft){input.setCustomValidity(t('feedbackEmpty'));input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}
    const message=t('feedbackGreeting')+'\n\n'+feedbackDraft;
    if(primaryHost.email)location.href=`mailto:${encodeURIComponent(primaryHost.email)}?subject=${encodeURIComponent(t('feedbackSubject'))}&body=${encodeURIComponent(message)}`;
    else if(primaryHost.whatsapp)window.open(whatsappURL(message),'_blank','noopener,noreferrer');
    else location.hash='#/help';
  });
  document.addEventListener('change',event=>{
    const id=event.target.dataset.check;if(!id)return;const [mode,index]=id.split(':'),state=checks.get(mode);event.target.checked?state.add(Number(index)):state.delete(Number(index));const count=document.querySelectorAll('[data-check]').length;document.querySelector('.check-progress').textContent=`${state.size} / ${count} ${state.size===count?t('allSet'):t('checklistProgress')}`;
  });
  window.addEventListener('hashchange',()=>{const next=location.hash.replace(/^#\/?/,'').split('?')[0]||'home';if(history.state?.opendoorRoute!==next)history.replaceState({...history.state,opendoorRoute:next,opendoorFrom:true},'');render({navigation:true});});
  render();if(history.state?.opendoorRoute!==route)history.replaceState({...history.state,opendoorRoute:route,opendoorFrom:false},'');
})();
