(() => {
  'use strict';
  const C=window.OpendoorCMS;
  const demo=window.OPENDOOR_ADMIN_DEMO===true;
  const store=new C.GitHubStore();
  const root=document.getElementById('admin-root');
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const shapes={home:'<path d="m3 10 9-7 9 7v11H4V10m5 11v-8h6v8"/>',camera:'<path d="M3 6h4l2-3h6l2 3h4v15H3Z"/><circle cx="12" cy="13" r="4"/>',video:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="m10 8 6 4-6 4Z"/>',text:'<path d="M4 4h16M12 4v16M8 20h8"/>',book:'<path d="M12 5v16M3 3c3 0 6 0 9 2 3-2 6-2 9-2v16c-3 0-6 0-9 2-3-2-6-2-9-2Z"/>',pin:'<path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',user:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',lock:'<rect x="5" y="10" width="14" height="12" rx="2"/><path d="M8 10V6a4 4 0 1 1 8 0v4m-4 5v2"/>',up:'<path d="m5 14 7-7 7 7"/>',down:'<path d="m5 10 7 7 7-7"/>',close:'<path d="m6 6 12 12M6 18 18 6"/>',trash:'<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15m-9 4v7m4-7v7"/>',check:'<path d="m5 12 4 4L19 6"/>',back:'<path d="m14 5-7 7 7 7"/>',oven:'<rect x="3" y="3" width="18" height="19" rx="2"/><path d="M3 8h18M7 5h.01m4 0h.01M7 12h10v6H7Z"/>',key:'<circle cx="7" cy="12" r="5"/><path d="M12 12h10m-2 0v4m-4-4v3"/>',plus:'<path d="M12 4v16M4 12h16"/>'};
  const icon=name=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name]||shapes.book}</svg>`;
  shapes.globe='<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a17 17 0 0 1 0 18 17 17 0 0 1 0-18Z"/>';
  const nav=[['overview','home','Panoramica'],['photos','camera','Foto'],['videos','video','Video'],['texts','text','Testi e lingue'],['guides','book','Guide della casa'],['info','pin','Informazioni e link'],['booking','book','Prenotazioni'],['channels','globe','Social e Google'],['host','user','Profili Host']];
  const deviceIds=['kitchen','oven','hob','appliances','climate','heating','hotWater','lights','tv'];
  const state={content:null,editorial:{pending:{}},view:'overview',language:'it',search:'',reviewOnly:false,page:0,guide:null,dirty:false,busy:false,online:false,uploads:new Map(),media:new Map(),preview:null,lastSaved:null};
  let noticeTimer,idleTimer,headerObserver;
  const baseLabels={subtitle:'Sottotitolo della Home',hubTitle:'Titolo del Guest Hub',hubSubtitle:'Introduzione del Guest Hub',whatsapp:'Pulsante WhatsApp',greeting:'Messaggio WhatsApp',hostReply:'Disponibilità dell’Host',passwordInfo:'Come ricevere la password Wi-Fi',codeInfo:'Come ricevere il codice di ingresso',openingVideo:'Titolo del video di apertura',closingVideo:'Titolo del video di chiusura',intercomVideo:'Titolo del video del citofono',bookingPlatformsTitle:'Titolo dei partner nel footer',socialTitle:'Titolo dei canali online nel footer',instagramLink:'Pulsante Instagram nel footer',googleLink:'Pulsante Google nel footer'};
  const t=key=>state.content?.strings?.it[key]||key;
  function getPath(path){return path.split('.').reduce((value,key)=>value?.[key],state.content);}
  function setPath(path,value){const keys=path.split('.');if(keys.some(key=>['__proto__','prototype','constructor'].includes(key)))return;const last=keys.pop(),parent=keys.reduce((object,key)=>object[key],state.content);parent[last]=/^(?:hosts|bookingLinks)\.\d+\.name$/.test(path)?value??'':value;if(path.startsWith('hosts.'))C.normalizeHosts(state.content);}
  const textLabel=key=>baseLabels[key]||t(key).replace(/\s+/g,' ').slice(0,90)+(t(key).length>90?'…':'');
  const currentPending=key=>(state.editorial.pending[key]||[]).includes(state.language);
  function notice(message,error=false){clearTimeout(noticeTimer);const target=document.getElementById('admin-notice');target.innerHTML=`<div class="admin-notification ${error?'error':''}" role="${error?'alert':'status'}">${esc(message)}${error?'<button type="button" data-action="dismiss" aria-label="Chiudi avviso">×</button>':''}</div>`;if(!error)noticeTimer=setTimeout(()=>target.innerHTML='',6500);}
  function field(path,label,{type='text',hint='',disabled=false,required=false}={}) {
    return `<label class="admin-field"><span>${esc(label)}</span><input data-path="${esc(path)}" type="${type}" value="${esc(getPath(path))}" ${disabled?'disabled':''} ${required?'required':''} ${type==='text'?'maxlength="1000"':''}>${hint?`<small>${esc(hint)}</small>`:''}</label>`;
  }
  function textField(key,label,rows=3) {return `<label class="admin-field"><span>${esc(label)}</span><textarea rows="${rows}" maxlength="12000" data-text-key="${esc(key)}" data-language="${state.language}">${esc(state.content.strings[state.language][key])}</textarea></label>`;}
  function languages() {return `<div class="admin-language-tabs" aria-label="Lingua dei testi">${state.content.languages.map(item=>`<button type="button" data-edit-language="${item.code}" class="${state.language===item.code?'active':''}" aria-pressed="${state.language===item.code}">${item.name}${Object.values(state.editorial.pending).some(list=>list.includes(item.code))?' · !':''}</button>`).join('')}</div>`;}
  function authHeader(){return `<header class="admin-top"><div class="admin-top-inner"><div class="admin-brand-wrap"><img class="admin-brand" src="assets/images/logo-opendoor-black.png" alt="OPENDOOR"><span>Gestione del Guest Hub</span></div><div class="admin-session">${demo?'<span>Anteprima</span>':state.online?`<button class="plain-button" data-action="reload" type="button">Ricarica</button><button class="plain-button" data-action="logout" type="button">Esci</button>`:'<span>Accesso riservato</span>'}</div></div></header>`;}
  function login(message='') {
    document.querySelectorAll('dialog.admin-dialog').forEach(element=>element.close());
    root.innerHTML=`${authHeader()}<main class="admin-login" id="admin-main"><section class="admin-login-card"><div class="lock-mark">${icon('lock')}</div><h1>Gestisci OPENDOOR</h1><p>Accedi per caricare i tuoi contenuti e aggiornare il Guest Hub.</p><form id="admin-login-form"><label class="admin-field"><span>Chiave di accesso</span><input id="access-key" type="password" autocomplete="off" spellcheck="false" required placeholder="Incolla la tua chiave GitHub" aria-describedby="access-hint access-error"></label><small id="access-hint">La chiave resta in questa sessione. Non viene salvata sul sito o nel browser.</small><p class="login-error" id="access-error" role="alert">${esc(message)}</p><button class="button" type="submit" ${state.busy?'disabled':''}>${state.busy?'Accesso in corso…':'Accedi'}</button></form><details><summary>Primo accesso</summary><ol><li>Apri <a href="https://github.com/settings/personal-access-tokens/new?name=OPENDOOR+Gestione&description=Gestione+contenuti+solo+opendoor&target_name=manubaba108&expires_in=90&contents=write" target="_blank" rel="noopener noreferrer">Crea la chiave su GitHub</a> con il tuo account.</li><li>In <strong>Repository access</strong> scegli <strong>Only select repositories</strong>, poi soltanto <strong>opendoor</strong>.</li><li>In <strong>Permissions</strong> lascia solo <strong>Contents · Read and write</strong>, oltre a Metadata che GitHub aggiunge automaticamente.</li><li>Crea la chiave, conservala nel tuo gestore di password e incollala qui. Alla scadenza ne potrai creare una nuova.</li></ol></details></section></main>`;
  }
  function heading(title,copy,extra=''){return `<div class="admin-heading"><div><h1>${esc(title)}</h1>${copy?`<p>${esc(copy)}</p>`:''}</div>${extra}</div>`;}
  function toolbar(){const target=document.getElementById('admin-toolbar');if(!target)return;for(const element of document.querySelectorAll('.admin-content,.admin-sidebar,.admin-session'))element.inert=state.busy;const pending=C.pendingCount(state.editorial);const status=demo?'Anteprima del pannello. Le prove qui non si salvano online.':state.busy?'Operazione in corso. Attendi la conferma.':state.dirty?'Hai modifiche da salvare nella bozza.':state.lastSaved?'Bozza salvata online alle '+state.lastSaved+'.':'Contenuti caricati dalla bozza online.';target.innerHTML=`<p id="save-status" aria-live="polite">${esc(status)}</p><div class="toolbar-actions"><button class="button outline" type="button" data-action="preview" ${state.busy?'disabled':''}>Anteprima</button><button class="button" type="button" data-action="save" ${demo||state.busy||!state.dirty?'disabled':''}>Salva bozza</button><button class="button secondary" type="button" data-action="publish" ${demo||state.busy||state.dirty||pending||!store.snapshot?.released||!store.snapshot?.draft?'disabled':''}>Pubblica</button></div>`;}
  function markDirty(){state.dirty=true;toolbar();}
  function overview(){
    const photoSlots=slots('photo'),videoSlots=slots('video'),pending=C.pendingCount(state.editorial),photos=photoSlots.filter(slot=>getPath(slot.path)).length,videos=videoSlots.filter(slot=>getPath(slot.path)).length;
    return `${heading('La tua casa, aggiornata','Carica i contenuti, controlla l’anteprima e pubblica quando è pronta.',`<span class="admin-badge ${state.dirty?'amber':''}">${state.dirty?'Modifiche aperte':demo?'Anteprima':'Bozza online'}</span>`)}${!demo&&!store.snapshot?.released?'<div class="admin-note amber">Il Guest Hub è ancora in bozza. La prima pubblicazione va approvata e attivata prima di poter usare Pubblica.</div>':''}<div class="admin-grid"><section class="admin-card"><div class="admin-stat">${photos}<small> / ${photoSlots.length} spazi foto</small></div><h2>Foto della casa e dei dintorni</h2><p>Galleria, accesso, rifiuti, balcone, apparecchi e luoghi da visitare.</p><div class="admin-card-actions"><button class="button secondary" type="button" data-view="photos">Gestisci foto</button></div></section><section class="admin-card"><div class="admin-stat">${videos}<small> / ${videoSlots.length} spazi video</small></div><h2>Video e istruzioni</h2><p>Apertura, chiusura, citofono e uso degli apparecchi.</p><div class="admin-card-actions"><button class="button secondary" type="button" data-view="videos">Gestisci video</button></div></section><section class="admin-card"><div class="admin-stat">7<small> lingue</small></div><h2>Testi e traduzioni</h2><p>${pending?`${pending} traduzioni da rivedere dopo le modifiche.`:'Le traduzioni non hanno revisioni in sospeso.'}</p><div class="admin-card-actions"><button class="button secondary" type="button" data-view="texts">${pending?'Rivedi i testi':'Modifica i testi'}</button></div></section><section class="admin-card"><h2>Profili Host</h2><p>Nomi, foto e contatti degli Host. Scegli il riferimento principale.</p><div class="admin-card-actions"><button class="button secondary" type="button" data-view="host">Gestisci gli Host</button></div><ul class="admin-task-list"><li>${icon('check')}<span>Indirizzo e orari in Informazioni e link</span></li><li>${icon('check')}<span>Istruzioni nelle Guide della casa</span></li></ul></section></div>`;
  }
  function slots(kind) {
    const result=[];
    if(kind==='photo') {
      result.push({id:'first-aid',title:t('firstAid')+' · foto del mobile',group:'Sicurezza ed emergenze',path:'property.firstAidPhoto'});
      state.content.modules.checkinPhotos.items.forEach((item,index)=>result.push({id:'checkin-'+item.id,title:t(item.titleKey),group:'Check-in · ingresso e appartamento',path:'modules.checkinPhotos.items.'+index+'.src'}));
      state.content.modules.gallery.items.forEach((item,index)=>result.push({id:'gallery-'+item.id,title:t(item.altKey),group:'Galleria della casa',path:'modules.gallery.items.'+index+'.src',gallery:index}));
      state.content.houseManual.forEach((item,index)=>{if(item.id!=='rules')result.push({id:'guide-'+item.id,title:t(item.id),group:'Guide della casa',path:'houseManual.'+index+'.photo'});});
      state.content.explore.forEach((item,index)=>result.push({id:'place-'+index,title:item.name||t(item.nameKey),group:'Luoghi da visitare',path:'explore.'+index+'.image.src',place:index}));
      state.content.hosts.forEach((host,index)=>result.push({id:'host-'+index,title:'Foto di '+(host.name||'Host '+(index+1)),group:'Profili Host',path:'hosts.'+index+'.photo',hostIndex:index}));
    }else {
      state.content.modules.videos.items.forEach((item,index)=>result.push({id:item.id,title:t(item.titleKey),group:'Ingresso e accesso',path:'modules.videos.items.'+index+'.src',poster:'modules.videos.items.'+index+'.thumbnail',mime:'modules.videos.items.'+index+'.mime',route:'checkin'}));
      state.content.houseManual.forEach((item,index)=>{if(deviceIds.includes(item.id))result.push({id:'video-'+item.id,title:t(item.id),group:'Guide della casa',path:'houseManual.'+index+'.video',poster:'houseManual.'+index+'.videoPoster',mime:'houseManual.'+index+'.videoMime',route:'house/'+item.id});});
    }
    return result;
  }
  function mediaSource(value) {
    if(!value)return '';
    if(state.media.has(value))return state.media.get(value);
    if(value.startsWith('assets/uploads/')&&store.snapshot?.source)return 'https://raw.githubusercontent.com/'+C.REPOSITORY+'/'+store.snapshot.source+'/'+value;
    return window.OPENDOOR_ADMIN_ASSETS?.[value]||value;
  }
  function uploadButton(path,kind,label='Carica file',mimePath='') {return `<label class="upload-button">${esc(label)}<input type="file" data-upload="${esc(path)}" data-kind="${kind}" ${mimePath?`data-mime-path="${esc(mimePath)}"`:''} accept="${kind==='video'?'video/mp4,video/webm,.mp4,.webm':'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp'}"></label>`;}
  function mediaCard(slot,kind) {
    const src=mediaSource(getPath(slot.path)),video=kind==='video';
    const index=slot.gallery,extra=index!==undefined?`<button class="icon-button" type="button" data-move="${index}:-1" aria-label="Sposta ${esc(slot.title)} prima" ${index===0?'disabled':''}>${icon('up')}</button><button class="icon-button" type="button" data-move="${index}:1" aria-label="Sposta ${esc(slot.title)} dopo" ${index===state.content.modules.gallery.items.length-1?'disabled':''}>${icon('down')}</button>`:'';
    return `<article class="admin-card media-card"><div class="media-frame ${slot.hostIndex!==undefined?'avatar':''}">${src?(video?`<video src="${esc(src)}" ${getPath(slot.poster)?`poster="${esc(mediaSource(getPath(slot.poster)))}"`:''} controls playsinline preload="none" aria-label="${esc(slot.title)}"></video>`:`<img src="${esc(src)}" alt="${esc(slot.title)}" loading="lazy">`):icon(video?'video':'camera')}</div><div class="media-body"><h3>${index!==undefined?(index+1)+'. ':''}${esc(slot.title)}</h3><p>${src?'File inserito':'Nessun file inserito'}</p><div class="media-tools">${uploadButton(slot.path,kind,src?'Sostituisci':'Carica '+(video?'video':'foto'),slot.mime)}${src?`<button class="icon-button" data-remove-media="${esc(slot.path)}" type="button" aria-label="Rimuovi ${esc(slot.title)}">${icon('trash')}</button>`:''}${extra}${index!==undefined&&state.content.modules.gallery.items[index].id.startsWith('photo-')?`<button class="plain-button" data-remove-gallery="${index}" type="button">Elimina foto dalla galleria</button>`:''}</div><details class="admin-field"><summary class="admin-label">${video?'Oppure collega un video':'Oppure collega una foto'}</summary><label class="admin-field"><span>Link diretto al file</span><input data-media-link="${esc(slot.path)}" data-kind="${kind}" type="url" placeholder="https://…" value="${esc(getPath(slot.path)?.startsWith('https://')?getPath(slot.path):'')}"></label></details>${video?`<div class="media-tools">${uploadButton(slot.poster,'photo','Copertina')}${getPath(slot.poster)?`<button class="plain-button" data-remove-media="${esc(slot.poster)}" type="button">Rimuovi copertina</button>`:''}</div>`:''}${slot.place!==undefined&&state.content.explore[slot.place].image.credit?`<p class="admin-field">Foto attuale · ${esc(state.content.explore[slot.place].image.credit)}</p>`:''}</div></article>`;
  }
  function mediaPage(kind) {
    const items=slots(kind),groups=[...new Set(items.map(item=>item.group))];
    return `${heading(kind==='photo'?'Le tue foto':'I tuoi video',kind==='photo'?'Inserisci le foto negli spazi giusti. Riordina la galleria con i pulsanti accanto a ogni immagine.':'Tre video per l’accesso, poi le guide degli apparecchi. Puoi aggiungere una copertina a ogni video.')}<div class="admin-note">${kind==='photo'?'Foto JPG, PNG o WebP, fino a 12 MB per file.':'Video MP4 o WebM, fino a 40 MB per file. Per video più grandi usa un link diretto al file.'} Salva la bozza per conservare i caricamenti online.</div>${groups.map(group=>`<section class="media-section"><div class="admin-heading"><h2>${esc(group)}</h2>${kind==='photo'&&group==='Galleria della casa'?'<button class="button outline" data-action="add-gallery" type="button">Aggiungi foto</button>':''}</div><div class="admin-media-grid">${items.filter(item=>item.group===group).map(item=>mediaCard(item,kind)).join('')}</div></section>`).join('')}`;
  }
  function textList() {
    const query=state.search.toLocaleLowerCase('it');
    const all=Object.keys(state.content.strings.it).filter(key=>(!state.reviewOnly||currentPending(key))&&(!query||[textLabel(key),state.content.strings[state.language][key],state.content.strings.it[key]].some(value=>value.toLocaleLowerCase('it').includes(query))));
    state.page=Math.min(state.page,Math.max(0,Math.ceil(all.length/18)-1));
    const rows=all.slice(state.page*18,state.page*18+18);
    return `<div class="text-list">${rows.map(key=>`<section class="admin-card text-card"><div class="text-card-top"><h3>${esc(textLabel(key))}</h3>${currentPending(key)?'<span class="admin-badge amber">Da rivedere</span>':''}</div>${state.language!=='it'?`<p class="original"><strong>Italiano</strong><br>${esc(state.content.strings.it[key])}</p>`:''}<label><span class="admin-label">${esc(state.content.languages.find(item=>item.code===state.language).name)}</span><textarea rows="3" data-text-key="${esc(key)}" data-language="${state.language}" aria-label="${esc(textLabel(key))}" maxlength="12000">${esc(state.content.strings[state.language][key])}</textarea></label>${currentPending(key)?`<button class="plain-button reviewed" type="button" data-review="${esc(key)}">Conferma questa traduzione</button>`:''}</section>`).join('')||'<div class="admin-card admin-empty">Nessun testo trovato con questi filtri.</div>'}</div><div class="admin-pagination"><button class="button outline" type="button" data-page="-1" ${state.page===0?'disabled':''}>Precedenti</button><span>${all.length?state.page*18+1:0}–${Math.min(state.page*18+18,all.length)} di ${all.length} testi</span><button class="button outline" type="button" data-page="1" ${(state.page+1)*18>=all.length?'disabled':''}>Successivi</button></div>`;
  }
  function texts() {
    return `${heading('Ogni parola, nella lingua giusta','Cerca un titolo o una frase. Le modifiche in italiano segnalano le altre sei traduzioni da rivedere.')}<div class="admin-filter-row"><label class="admin-field"><span>Cerca in tutto il sito</span><input id="text-search" type="search" value="${esc(state.search)}" placeholder="Prova forno, check-in, balcone…"></label><label class="admin-field small-filter"><span>Lingua</span><select id="text-language">${state.content.languages.map(item=>`<option value="${item.code}" ${state.language===item.code?'selected':''}>${item.name}</option>`).join('')}</select></label><label class="admin-field small-filter"><span>Mostra</span><select id="text-filter"><option value="all" ${!state.reviewOnly?'selected':''}>Tutti i testi</option><option value="pending" ${state.reviewOnly?'selected':''}>Da rivedere</option></select></label></div><div id="text-results">${textList()}</div>`;
  }
  function guides() {
    if(state.guide===null)return `${heading('Guide della casa','Scegli una guida per aggiornare le istruzioni, il modello e i contenuti.')}<div class="admin-guide-list">${state.content.houseManual.map((item,index)=>`<button class="guide-edit" type="button" data-guide="${index}">${icon(item.id==='access'?'key':deviceIds.includes(item.id)?'oven':item.id==='waste'?'trash':'book')}<strong>${esc(t(item.id))}</strong><small>${item.instructions?.length?item.instructions.length+' istruzioni':item.id==='rules'?'Regole della casa':item.id==='safety'?'Informazioni di sicurezza':'Istruzioni da inserire'}</small></button>`).join('')}</div>`;
    const index=state.guide,item=state.content.houseManual[index];
    const keys=item.id==='rules'?state.content.houseRules.flatMap(key=>[key+'Title',key+'Text']):item.id==='safety'?['safetyIntro','safetyText','safetyPassagesText','balconyText','childrenText','safetyEmergencyText']:item.instructions||[];
    return `<button class="plain-button admin-back" data-action="back-guides" type="button">${icon('back')}Tutte le guide</button>${heading(t(item.id),'Scrivi istruzioni chiare, nell’ordine in cui l’ospite deve seguirle.')}${languages()}<div class="admin-grid"><section class="admin-card admin-card-wide">${deviceIds.includes(item.id)?field('houseManual.'+index+'.model','Marca e modello dell’apparecchio'):''}${item.id==='access'?'<div class="admin-note">Inserisci qui le indicazioni di accesso. I codici personali della porta si comunicano privatamente agli ospiti.</div>':''}${keys.map((key,position)=>`<div class="step-row"><span class="step-number">${position+1}</span>${textField(key,item.id==='rules'?'Regola '+(Math.floor(position/2)+1)+(position%2?' · testo':' · titolo'):keys.length>1?'Istruzione '+(position+1):'Istruzioni',3)}${deviceIds.includes(item.id)?`<button class="icon-button" data-remove-step="${position}" type="button" aria-label="Rimuovi istruzione ${position+1}">${icon('trash')}</button>`:''}</div>`).join('')||'<p>Inserisci la prima istruzione per questo apparecchio.</p>'}${deviceIds.includes(item.id)?'<div class="admin-card-actions"><button class="button secondary" type="button" data-action="add-step">Aggiungi istruzione</button></div>':''}</section>${slots('photo').find(slot=>slot.path==='houseManual.'+index+'.photo')?mediaCard(slots('photo').find(slot=>slot.path==='houseManual.'+index+'.photo'),'photo'):''}${slots('video').find(slot=>slot.path==='houseManual.'+index+'.video')?mediaCard(slots('video').find(slot=>slot.path==='houseManual.'+index+'.video'),'video'):''}</div>`;
  }
  function info() {
    const places=[['explore','Luoghi da visitare'],['localFood','Mangiare e bere'],['nearbyServices','Servizi vicini']];
    const categories=['restaurant','traditional','cafe','takeaway','icecream'];
    const filters=[['meals','foodMeals'],['takeaway','foodTakeaway'],['coffee','foodCoffee'],['treat','foodTreat']];
    return `${heading('Informazioni e collegamenti','Indirizzi, orari e destinazioni. Modifica qui i dati visibili agli ospiti.')}<div class="admin-note">Scegli la lingua da modificare. Da questa pagina aggiorni anche la posizione del kit e le schede dei locali.</div>${languages()}<div class="admin-grid"><section class="admin-card"><h2>Arrivo e partenza</h2>${field('property.address','Indirizzo dell’appartamento')}${field('property.parkingAddress','Indirizzo del parcheggio')}<div class="field-pair">${field('property.checkInTime','Check-in dalle',{type:'time'})}${field('property.checkOutTime','Check-out entro le',{type:'time'})}</div>${field('property.wifiNetwork','Nome della rete Wi-Fi',{hint:'La password si comunica agli ospiti privatamente.'})}</section><section class="admin-card"><h2>Informazioni sulla casa</h2>${field('property.slogan','Slogan principale della Home')}${field('property.town','Comune')}${field('property.province','Provincia')}${field('property.fireExtinguisherLocation','Dove si trova l’estintore')}${textField('firstAidLocationText','Dove si trova il kit di pronto soccorso',3)}${field('property.wasteDropoffLocation','Dove portare i rifiuti all’esterno')}${field('property.cin','CIN')}${field('property.cir','CIR')}</section><section class="admin-card admin-card-wide"><h2>Prenotazioni e recensioni</h2>${field('property.airbnb','Annuncio Airbnb',{type:'url'})}${field('reviews.airbnb','Recensione della prenotazione Airbnb',{type:'url'})}${field('reviews.booking','Recensione della prenotazione Booking.com',{type:'url'})}${field('reviews.google','Google Recensioni OPENDOOR',{type:'url',hint:'Lascia vuoto se non hai ancora il link esatto della tua struttura.'})}</section></div>${places.map(([group,title])=>`<section class="editor-place-section"><h2 class="editor-place-title">${title}</h2>${group==='localFood'?'<div class="admin-note">Descrizioni e orari si modificano qui nella lingua scelta sopra. Prezzi, contatti e valutazioni si modificano nei campi.</div>':''}<div class="admin-grid">${state.content[group].map((place,index)=>{
      const choices=group==='localFood'&&place.category&&!categories.includes(place.category)?[place.category,...categories]:categories;
      return `<section class="admin-card"><h3>${esc(place.name||t(place.nameKey))}</h3>${place.name?field(group+'.'+index+'.name','Nome'):textField(place.nameKey,'Nome')}${field(group+'.'+index+'.address','Indirizzo completo')}${field(group+'.'+index+'.distance','Distanza indicativa')}${field(group+'.'+index+'.mapUrl','Indicazioni su Maps',{type:'url'})}${group==='localFood'?`<label class="admin-field"><span>Tipo di locale</span><select data-path="localFood.${index}.category">${choices.map(category=>`<option value="${esc(category)}" ${place.category===category?'selected':''}>${esc(t(category))}</option>`).join('')}</select></label>`:''}${place.guide?`<h4>Descrizione per gli ospiti</h4>${textField(place.guide.summary||place.description,'Descrizione breve',3)}${textField(place.guide.hours,'Pranzo, cena e orari',3)}<div class="field-pair">${field(group+'.'+index+'.guide.price','Prezzo medio indicativo a persona',{hint:'Per esempio €15–25. Lascia vuoto se non verificato.'})}${field(group+'.'+index+'.guide.phone','Telefono del locale',{type:'tel'})}</div>${field(group+'.'+index+'.guide.menu','Menu del locale',{type:'url'})}<h4>Valutazione pubblica</h4><div class="field-pair"><label class="admin-field"><span>Stelle su 5</span><input data-path="localFood.${index}.guide.rating.value" type="number" min="0" max="5" step="0.1" required value="${esc(place.guide.rating?.value)}"></label><label class="admin-field"><span>Numero di recensioni</span><input data-path="localFood.${index}.guide.rating.count" type="number" min="0" step="1" value="${esc(place.guide.rating?.count)}"></label></div>${field(group+'.'+index+'.guide.rating.provider','Fonte della valutazione')}${field(group+'.'+index+'.guide.rating.url','Link alle recensioni',{type:'url'})}<fieldset class="admin-field"><legend>Mostra il locale in queste categorie</legend><div class="admin-check-list">${filters.map(([id,key])=>`<label class="admin-check"><input type="checkbox" data-food-group-path="localFood.${index}.guide.groups" data-group="${id}" ${place.guide.groups?.includes(id)?'checked':''}> ${esc(t(key))}</label>`).join('')}</div></fieldset>`:''}<label class="admin-check"><input type="checkbox" data-path="${group}.${index}.enabled" ${place.enabled?'checked':''}>Visibile nel Guest Hub</label></section>`;
    }).join('')}</div></section>`).join('')}`;
  }
  function host() {
    return `${heading('I tuoi Host','Ogni profilo appare nella pagina Aiuto. L’Host principale riceve i contatti rapidi e i suggerimenti.', '<button class="button" data-action="add-host" type="button">'+icon('plus')+'Aggiungi Host</button>')}<div class="admin-host-profiles">${state.content.hosts.map((profile,index)=>`<section class="admin-host-card" data-host-card="${index}"><div class="host-card-heading"><h2 data-host-name="${index}">${esc(profile.name||'Host '+(index+1))}</h2><div class="host-card-actions">${index===0?'<span class="admin-badge">Host principale</span>':`<button class="button outline" data-primary-host="${index}" type="button">Imposta come principale</button>`}<button class="icon-button" data-remove-host="${index}" type="button" aria-label="Rimuovi questo Host" ${state.content.hosts.length===1?'disabled':''}>${icon('trash')}</button></div></div><div class="host-editor">${mediaCard(slots('photo').find(slot=>slot.hostIndex===index),'photo')}<section class="admin-card"><h3>Nome e contatti</h3>${field('hosts.'+index+'.name','Nome pubblico',{required:true})}${field('hosts.'+index+'.phone','Telefono',{type:'tel',hint:'Usa il prefisso internazionale, per esempio +39.'})}${field('hosts.'+index+'.whatsapp','WhatsApp',{type:'url',hint:'Link nel formato https://wa.me/39… senza spazi o simboli.'})}${field('hosts.'+index+'.email','Email',{type:'email',hint:index===0?'Questa casella riceve anche i suggerimenti degli ospiti.':'Gli ospiti potranno contattare questo Host via email.'})}</section></div></section>`).join('')}</div>`;
  }
  function channelStatus(channel) {
    const value=state.content.social?.[channel];
    if(!value)return '<p>Il pulsante resta nascosto finché non inserisci il link.</p>';
    if(!C.channelURL(value,channel))return '<p role="status">Controlla l’indirizzo. Usa un link pubblico completo di '+(channel==='instagram'?'Instagram':'Google')+'.</p>';
    return `<p>Il pulsante apparirà vicino al footer.</p><a class="button secondary" href="${esc(value)}" target="_blank" rel="noopener noreferrer">Apri collegamento</a>`;
  }
  function bookingStatus(index) {
    const item=state.content.bookingLinks[index];
    if(!item.url)return '<p class="admin-note">Questo portale appare con la scritta «Prossimamente», senza un collegamento. Inserisci il link quando l’annuncio sarà pronto.</p>';
    if(!window.OpendoorBooking.validURL(item.url))return '<p class="admin-note amber">Inserisci il link pubblico HTTPS dell’annuncio. Non usare un link al calendario.</p>';
    return `<a class="inline-link" href="${esc(item.url)}" target="_blank" rel="noopener noreferrer">Apri l’annuncio</a>`;
  }
  function booking() {
    return `${heading('Dove prenotare OPENDOOR','Prepara le piattaforme e aggiungi i link quando gli annunci sono pronti. Senza un link, il portale mostra «Prossimamente».','<button class="button" data-action="add-booking" type="button">'+icon('plus')+'Aggiungi piattaforma</button>')}<div class="admin-grid">${state.content.bookingLinks.map((item,index)=>`<section class="admin-card"><div class="host-card-heading"><h2 data-booking-name="${index}">${esc(item.name||'Nuova piattaforma')}</h2><button class="icon-button" type="button" data-remove-booking="${index}" aria-label="Rimuovi questa piattaforma">${icon('trash')}</button></div>${field('bookingLinks.'+index+'.name','Nome della piattaforma')}${field('bookingLinks.'+index+'.url','Link pubblico dell’annuncio',{type:'url',hint:'Copia il link della pagina di OPENDOOR su questo portale. Lascia vuoto per mostrare «Prossimamente». Per nascondere il portale, rimuovi la piattaforma.'})}<div data-booking-status="${index}">${bookingStatus(index)}</div></section>`).join('')}</div><p class="admin-note">I pulsanti aprono gli annunci in una nuova scheda. La sincronizzazione dei calendari si configura sui portali e non dipende da questi collegamenti.</p>`;
  }
  function channels() {
    return `${heading('OPENDOOR, anche online','Collega le pagine ufficiali della struttura. Puoi lasciare vuoto un campo per nascondere il relativo pulsante.')}<div class="admin-grid"><section class="admin-card"><h2>Instagram</h2><p>Foto, video e aggiornamenti di OPENDOOR.</p>${field('social.instagram','Link al profilo Instagram',{type:'url',hint:'Apri il tuo profilo e copia l’indirizzo completo, che inizia con https://www.instagram.com/.'})}<div class="channel-status" data-channel-status="instagram">${channelStatus('instagram')}</div></section><section class="admin-card"><h2>Google</h2><p>La pagina pubblica di OPENDOOR su Google.</p>${field('social.google','Link a OPENDOOR su Google',{type:'url',hint:'Copia il link pubblico della struttura su Maps o Travel. Il link per le recensioni si gestisce in Informazioni e link.'})}<div class="channel-status" data-channel-status="google">${channelStatus('google')}</div></section></div><p class="admin-note">Usa Anteprima per vedere i pulsanti nel footer. Il pannello aggiorna i collegamenti sul sito; i contenuti di Instagram e Google si gestiscono nei rispettivi account.</p>`;
  }
  const pages={overview,photos:()=>mediaPage('photo'),videos:()=>mediaPage('video'),texts,guides,info,booking,channels,host};
  function render({focus=false}={}) {
    if(!state.online&&!demo){login();return;}
    root.innerHTML=`${demo?'<div class="admin-demo-strip">Anteprima interattiva del pannello. Puoi provare foto, video e testi; i salvataggi online e la pubblicazione sono disattivati.</div>':''}${authHeader()}<div class="admin-layout"><aside class="admin-sidebar"><nav class="admin-nav" aria-label="Gestione OPENDOOR">${nav.map(([id,symbol,label])=>`<button data-view="${id}" class="${state.view===id?'active':''}" ${state.view===id?'aria-current="page"':''} type="button">${icon(symbol)}${label}</button>`).join('')}</nav><small>I contenuti salvati fanno parte di un progetto pubblico. Foto della casa e istruzioni generali, senza dati degli ospiti o codici di accesso.</small></aside><main class="admin-content" id="admin-main" tabindex="-1">${pages[state.view]()}</main></div><div class="admin-toolbar" id="admin-toolbar"></div>`;
    toolbar();headerObserver?.disconnect();headerObserver=new ResizeObserver(entries=>document.body.style.setProperty('--admin-header-height',entries[0].target.getBoundingClientRect().height+'px'));headerObserver.observe(document.querySelector('.admin-top'));if(focus){document.getElementById('admin-main').focus({preventScroll:true});window.scrollTo({top:0});}
  }
  function clearLocalMedia(){for(const url of state.media.values())URL.revokeObjectURL(url);state.media.clear();state.uploads.clear();}
  function setSnapshot(snapshot){clearLocalMedia();state.content=window.OpendoorJourney.normalize(window.OpendoorBooking.normalize(C.normalizeHosts(C.clone(snapshot.data))));state.content.social??={instagram:null,google:null};state.editorial=C.clone(snapshot.editorial);state.dirty=false;state.online=true;state.lastSaved=null;}
  function dialog(title,body,buttons) {
    return new Promise(resolve=>{
      const element=document.createElement('dialog');element.className='admin-dialog';element.innerHTML=`<h2>${esc(title)}</h2>${body}<div class="actions">${buttons.map(([value,label,style])=>`<button class="button ${style||''}" type="button" data-choice="${esc(value)}">${esc(label)}</button>`).join('')}</div>`;
      const source=document.activeElement;document.body.append(element);element.showModal();element.addEventListener('click',event=>{const choice=event.target.closest('[data-choice]');if(choice){resolve(choice.dataset.choice);element.close();}});element.addEventListener('cancel',()=>resolve(null));element.addEventListener('close',()=>{resolve(null);element.remove();source?.focus();});
    });
  }
  async function discardDecision(title='Ricaricare la bozza online?'){if(!state.dirty)return true;return await dialog(title,'<p>Le modifiche non salvate in questa sessione verranno eliminate. La bozza già salvata online resta disponibile.</p>',[['cancel','Continua a modificare','outline'],['yes','Conferma']])==='yes';}
  function previewData() {
    const data=C.clone(state.content);
    const resolveMedia=object=>{
      if(!object||typeof object!=='object')return;
      for(const [key,value] of Object.entries(object))if(typeof value==='string'&&value.startsWith('assets/')){
        object[key]=state.media.get(value)||(value.startsWith('assets/uploads/')&&store.snapshot?.source?'https://raw.githubusercontent.com/'+C.REPOSITORY+'/'+store.snapshot.source+'/'+value:window.OPENDOOR_ADMIN_ASSETS?.[value]||new URL(value,location.href).href);
      }else if(value&&typeof value==='object')resolveMedia(value);
    };
    resolveMedia(data);return data;
  }
  function showPreview() {
    const element=document.createElement('dialog');element.className='admin-dialog preview-dialog';let nonce=crypto.randomUUID();
    element.innerHTML=`<div class="preview-top"><h2>Anteprima della bozza</h2><button class="icon-button" type="button" data-preview-close aria-label="Chiudi anteprima">${icon('close')}</button><div class="preview-controls"><select aria-label="Lingua dell’anteprima" id="preview-language">${state.content.languages.map(item=>`<option value="${item.code}" ${item.code===state.language?'selected':''}>${item.name}</option>`).join('')}</select><button class="button outline" data-preview-size="mobile" type="button" aria-pressed="false">Telefono</button><button class="button secondary" data-preview-size="desktop" type="button" aria-pressed="true">Computer</button></div></div><iframe title="Guest Hub OPENDOOR · anteprima" sandbox="allow-scripts allow-same-origin allow-popups" referrerpolicy="no-referrer"></iframe>`;
    const source=document.activeElement,frame=element.querySelector('iframe');
    const route=state.view==='booking'?'book':state.view==='host'?'help':state.view==='videos'?'checkin':state.view==='photos'?'gallery':state.view==='guides'&&state.guide!==null?'house/'+state.content.houseManual[state.guide].id:'home';
    const ready=event=>{if(event.source===frame.contentWindow&&event.origin===location.origin&&event.data?.type==='opendoor-preview-ready'&&event.data.nonce===nonce)frame.contentWindow.postMessage({type:'opendoor-preview-content',nonce,content:previewData(),language:element.querySelector('#preview-language').value},location.origin);};
    window.addEventListener('message',ready);
    const load=()=>{
      nonce=crypto.randomUUID();
      if(demo&&window.OPENDOOR_ADMIN_TEMPLATE){
        const template=window.OPENDOOR_ADMIN_TEMPLATE;
        const html=template.html.replace('<!--OPENDOOR_PREVIEW_SCRIPT-->',`<script>window.OPENDOOR_PREVIEW_LANGUAGE=${JSON.stringify(element.querySelector('#preview-language').value)};${C.scriptContent(previewData()).replace(/<\/script/gi,'<\\/script')}<\/script><script>${template.app.replace(/<\/script/gi,'<\\/script')}<\/script>`);
        frame.srcdoc=html;frame.addEventListener('load',()=>{try{frame.contentWindow.location.hash=route;}catch{}},{once:true});
      }else frame.src='index.html?opendoor-preview='+nonce+'#/'+route;
    };
    document.body.append(element);element.showModal();load();
    element.addEventListener('click',event=>{if(event.target.closest('[data-preview-close]'))element.close();const size=event.target.closest('[data-preview-size]');if(size){element.classList.toggle('mobile',size.dataset.previewSize==='mobile');element.querySelectorAll('[data-preview-size]').forEach(button=>{button.setAttribute('aria-pressed',String(button===size));button.className='button '+(button===size?'secondary':'outline');});}});
    element.querySelector('#preview-language').addEventListener('change',load);
    element.addEventListener('close',()=>{window.removeEventListener('message',ready);element.remove();source?.focus();});
  }
  async function fileUpload(input) {
    const file=input.files?.[0];if(!file)return;const path=input.dataset.upload,video=input.dataset.kind==='video',limit=(video?40:12)*1024*1024;
    if(file.size>limit)throw new Error(video?'Il video supera 40 MB. Usa un file più piccolo o un link diretto.':'La foto supera 12 MB. Usa un file più piccolo.');
    const bytes=new Uint8Array(await file.arrayBuffer()),head=String.fromCharCode(...bytes.subarray(0,16));
    let extension,mime;
    if(!video&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255){extension='jpg';mime='image/jpeg';}
    else if(!video&&head.startsWith('\x89PNG\r\n\x1a\n')){extension='png';mime='image/png';}
    else if(!video&&head.startsWith('RIFF')&&head.slice(8,12)==='WEBP'){extension='webp';mime='image/webp';}
    else if(video&&head.slice(4,8)==='ftyp'){extension='mp4';mime='video/mp4';}
    else if(video&&bytes[0]===26&&bytes[1]===69&&bytes[2]===223&&bytes[3]===163){extension='webm';mime='video/webm';}
    else throw new Error(video?'Scegli un file video MP4 o WebM.':'Scegli una foto JPG, PNG o WebP. Per HEIC, esporta prima la foto in JPG.');
    const filename='assets/uploads/'+path.replace(/\./g,'-').toLowerCase()+'-'+crypto.randomUUID()+'.'+extension;
    state.uploads.set(filename,{path:filename,bytes});state.media.set(filename,URL.createObjectURL(new Blob([bytes],{type:mime})));setPath(path,filename);
    if(input.dataset.mimePath)setPath(input.dataset.mimePath,mime);
    if(path.startsWith('explore.')&&path.endsWith('.image.src')){const image=state.content.explore[Number(path.split('.')[1])].image;image.credit=null;image.source=null;image.license=null;}
    markDirty();render();notice(file.name+' inserito. Salva la bozza per conservarlo online.');
  }
  async function save() {
    if(demo||state.busy||!state.dirty)return;
    state.busy=true;toolbar();
    try {
      const serialized=JSON.stringify(state.content),uploads=[...state.uploads.values()].filter(item=>serialized.includes(item.path));
      await store.save(state.content,state.editorial,uploads,(done,total)=>{document.getElementById('save-status').textContent='Salvataggio online · '+done+' di '+total+' file';});
      clearLocalMedia();state.dirty=false;state.lastSaved=new Intl.DateTimeFormat('it-IT',{hour:'2-digit',minute:'2-digit'}).format(new Date());notice('Bozza salvata online. Il sito per gli ospiti resta invariato.');render();
    }catch(error){if(!store.authenticated){state.busy=false;state.online=false;login(error.message);}else notice(error.message,true);}finally{state.busy=false;toolbar();}
  }
  async function publish() {
    if(demo||state.busy||state.dirty)return;
    const errors=C.validateContent(state.content,{publishing:true,editorial:state.editorial});if(errors.length){notice(errors.join(' '),true);return;}
    const result=await dialog('Pubblicare questa bozza?',`<p>Questa versione sostituirà i contenuti visibili agli ospiti, nelle sette lingue.</p><p>Puoi controllarla con Anteprima prima di continuare. Le versioni precedenti restano nella cronologia del progetto.</p>`,[['cancel','Torna alla bozza','outline'],['publish','Pubblica']]);
    if(result!=='publish')return;state.busy=true;toolbar();
    try{const result=await store.publish();setSnapshot(await store.load());render();notice(result.draftSynchronized?'Pubblicazione avviata. GitHub Pages aggiornerà il Guest Hub; può richiedere qualche minuto.':'Pubblicazione avviata. Una seconda sessione ha aggiornato la bozza; i suoi contenuti sono stati conservati.');}catch(error){if(!store.authenticated){state.busy=false;state.online=false;login(error.message);}else notice(error.message,true);}finally{state.busy=false;toolbar();}
  }
  function resetIdle(){if(demo||!state.online)return;clearTimeout(idleTimer);idleTimer=setTimeout(()=>{store.logout();state.online=false;login('Sessione sospesa dopo 30 minuti di inattività. Accedi di nuovo per continuare; le modifiche aperte sono conservate.');},30*60*1000);}
  document.addEventListener('submit',async event=>{
    if(event.target.id!=='admin-login-form')return;event.preventDefault();if(state.busy)return;
    const input=document.getElementById('access-key'),token=input.value;input.value='';state.busy=true;login();
    const retained=state.dirty&&state.content,previous=store.snapshot;
    try{const snapshot=await store.login(token);if(retained&&previous){store.snapshot=previous;state.online=true;}else setSnapshot(snapshot);render();resetIdle();}catch(error){login(error.message);}finally{state.busy=false;const button=document.querySelector('#admin-login-form button');if(button){button.disabled=false;button.textContent='Accedi';}toolbar();}
  });
  document.addEventListener('input',event=>{
    const input=event.target;resetIdle();
    if(input.id==='text-search'){state.search=input.value;state.page=0;document.getElementById('text-results').innerHTML=textList();return;}
    if(input.dataset.textKey){C.changeText(state.content,state.editorial,input.dataset.textKey,input.dataset.language,input.value);markDirty();return;}
    if(input.dataset.path&&input.type!=='checkbox'){
      setPath(input.dataset.path,input.type==='number'?(input.value===''?null:Number(input.value)):(input.value||null));
      const hostName=input.dataset.path.match(/^hosts\.(\d+)\.name$/);if(hostName){const heading=document.querySelector(`[data-host-name="${hostName[1]}"]`);if(heading)heading.textContent=input.value||'Host '+(Number(hostName[1])+1);}
      if(input.dataset.path.startsWith('social.')){const channel=input.dataset.path.split('.')[1];document.querySelector(`[data-channel-status="${channel}"]`).innerHTML=channelStatus(channel);}
      const bookingField=input.dataset.path.match(/^bookingLinks\.(\d+)\.(name|url)$/);
      if(bookingField){const index=bookingField[1];const heading=document.querySelector(`[data-booking-name="${index}"]`);if(heading)heading.textContent=state.content.bookingLinks[index].name||'Nuova piattaforma';document.querySelector(`[data-booking-status="${index}"]`).innerHTML=bookingStatus(Number(index));}
      const match=input.dataset.path.match(/^(explore|localFood|nearbyServices)\.(\d+)\.address$/);
      if(match){const place=state.content[match[1]][Number(match[2])];place.mapUrl='https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(input.value);const maps=document.querySelector(`[data-path="${match[1]}.${match[2]}.mapUrl"]`);if(maps)maps.value=place.mapUrl;}
      markDirty();
    }
  });
  document.addEventListener('change',async event=>{
    const input=event.target;resetIdle();
    if(input.dataset.upload){state.busy=true;toolbar();try{await fileUpload(input);}catch(error){input.value='';notice(error.message,true);}finally{state.busy=false;toolbar();}return;}
    if(input.dataset.mediaLink){if(!C.mediaURL(input.value,input.dataset.kind==='video')){input.setCustomValidity('Usa un indirizzo https valido'+(input.dataset.kind==='video'?' con un file MP4 o WebM.':'.'));input.reportValidity();input.addEventListener('input',()=>input.setCustomValidity(''),{once:true});return;}setPath(input.dataset.mediaLink,input.value||null);if(input.dataset.mediaLink.startsWith('explore.')&&input.dataset.mediaLink.endsWith('.image.src')){const image=state.content.explore[Number(input.dataset.mediaLink.split('.')[1])].image;image.credit=null;image.source=null;image.license=null;}markDirty();render();return;}
    if(input.dataset.foodGroupPath){const groups=getPath(input.dataset.foodGroupPath)||[],next=input.checked?[...new Set([...groups,input.dataset.group])]:groups.filter(group=>group!==input.dataset.group);setPath(input.dataset.foodGroupPath,next);markDirty();return;}
    if(input.dataset.path&&input.type==='checkbox'){setPath(input.dataset.path,input.checked);markDirty();return;}
    if(input.id==='text-language'){state.language=input.value;state.page=0;render();return;}
    if(input.id==='text-filter'){state.reviewOnly=input.value==='pending';state.page=0;render();}
  });
  document.addEventListener('click',async event=>{
    resetIdle();const target=event.target.closest('button');if(!target)return;
    if(state.busy&&!target.dataset.choice&&!target.dataset.previewClose)return;
    if(target.dataset.view){state.view=target.dataset.view;state.guide=null;render({focus:true});return;}
    if(target.dataset.guide!==undefined){state.guide=Number(target.dataset.guide);render({focus:true});return;}
    if(target.dataset.editLanguage){state.language=target.dataset.editLanguage;render();return;}
    if(target.dataset.page){state.page+=Number(target.dataset.page);document.getElementById('text-results').innerHTML=textList();document.getElementById('text-search').scrollIntoView({block:'center'});return;}
    if(target.dataset.review){state.editorial.pending[target.dataset.review]=(state.editorial.pending[target.dataset.review]||[]).filter(code=>code!==state.language);if(!state.editorial.pending[target.dataset.review].length)delete state.editorial.pending[target.dataset.review];markDirty();document.getElementById('text-results').innerHTML=textList();return;}
    if(target.dataset.removeMedia){setPath(target.dataset.removeMedia,null);markDirty();render();return;}
    if(target.dataset.primaryHost!==undefined){const index=Number(target.dataset.primaryHost);if(index>0&&index<state.content.hosts.length){state.content.hosts.unshift(...state.content.hosts.splice(index,1));C.normalizeHosts(state.content);markDirty();render();notice('Host principale aggiornato nella bozza.');}return;}
    if(target.dataset.removeHost!==undefined){
      const index=Number(target.dataset.removeHost);if(state.content.hosts.length<2||!state.content.hosts[index])return;
      const choice=await dialog('Rimuovere questo Host?',`<p>Il profilo di <strong>${esc(state.content.hosts[index].name||'Host '+(index+1))}</strong> verrà rimosso dalla bozza.</p>`,[['cancel','Annulla','outline'],['remove','Rimuovi Host']]);
      if(choice==='remove'){state.content.hosts.splice(index,1);C.normalizeHosts(state.content);markDirty();render();}return;
    }
    if(target.dataset.removeBooking!==undefined){const index=Number(target.dataset.removeBooking);if(state.content.bookingLinks[index]){state.content.bookingLinks.splice(index,1);markDirty();render();}return;}
    if(target.dataset.removeGallery!==undefined){state.content.modules.gallery.items.splice(Number(target.dataset.removeGallery),1);markDirty();render();return;}
    if(target.dataset.removeStep!==undefined){const item=state.content.houseManual[state.guide],removed=item.instructions.splice(Number(target.dataset.removeStep),1)[0];if(removed.startsWith('guide_')&&!state.content.houseManual.some(guide=>guide.instructions?.includes(removed))){for(const code of C.LANGUAGES)delete state.content.strings[code][removed];delete state.editorial.pending[removed];}markDirty();render();return;}
    if(target.dataset.move){const [index,direction]=target.dataset.move.split(':').map(Number),items=state.content.modules.gallery.items;[items[index],items[index+direction]]=[items[index+direction],items[index]];markDirty();render();return;}
    const action=target.dataset.action;
    if(action==='dismiss'){document.getElementById('admin-notice').innerHTML='';return;}
    if(action==='back-guides'){state.guide=null;render({focus:true});return;}
    if(action==='preview'){showPreview();return;}
    if(action==='save'){await save();return;}
    if(action==='publish'){await publish();return;}
    if(action==='reload'){if(!await discardDecision())return;state.busy=true;toolbar();try{setSnapshot(await store.load());render();notice('Bozza online ricaricata.');}catch(error){if(!store.authenticated){state.busy=false;state.online=false;login(error.message);}else notice(error.message,true);}finally{state.busy=false;toolbar();}return;}
    if(action==='logout'){if(!await discardDecision('Uscire dal pannello?'))return;store.logout();clearLocalMedia();state.content=null;state.dirty=false;state.online=false;clearTimeout(idleTimer);login();return;}
    if(action==='add-booking'){state.content.bookingLinks.push({id:'portal-'+crypto.randomUUID(),name:'',url:null});markDirty();render();document.querySelector(`[data-path="bookingLinks.${state.content.bookingLinks.length-1}.name"]`)?.focus();return;}
    if(action==='add-host'){state.content.hosts.push({name:'',photo:null,phone:null,whatsapp:null,email:null});C.normalizeHosts(state.content);markDirty();render();const input=document.querySelector(`[data-path="hosts.${state.content.hosts.length-1}.name"]`);input?.focus({preventScroll:true});input?.scrollIntoView({block:'center',behavior:'smooth'});return;}
    if(action==='add-gallery'){
      const key=await dialog('Quale ambiente fotografi?','<p>La nuova foto si aggiunge alla galleria. Puoi riordinarla dopo il caricamento.</p>',[['livingKitchen','Soggiorno e cucina'],['bedroom','Camera'],['bathroom','Bagno'],['balcony','Balcone'],['cancel','Annulla','outline']]);
      if(!key||key==='cancel')return;state.content.modules.gallery.items.push({id:'photo-'+crypto.randomUUID(),altKey:key,icon:'camera',src:null});markDirty();render();return;
    }
    if(action==='add-step'){
      const item=state.content.houseManual[state.guide],key='guide_'+item.id+'_'+crypto.randomUUID().replace(/-/g,'');
      item.instructions??=[];item.instructions.push(key);for(const language of C.LANGUAGES)state.content.strings[language][key]='';state.editorial.pending[key]=C.LANGUAGES.filter(code=>code!=='it');markDirty();render();return;
    }
  });
  window.addEventListener('beforeunload',event=>{if(state.dirty&&!demo){event.preventDefault();event.returnValue='';}});
  window.addEventListener('pagehide',()=>{store.logout();state.online=false;});
  window.addEventListener('pageshow',event=>{if(event.persisted&&!demo)login('Accedi di nuovo per riprendere la sessione.');});
  if(demo){state.content=window.OpendoorJourney.normalize(window.OpendoorBooking.normalize(C.normalizeHosts(C.clone(window.OPENDOOR))));state.content.social??={instagram:null,google:null};state.online=true;render();}else login();
})();
