/* OPENDOOR only. GitHub enforces authentication and write authorization. */
(() => {
  'use strict';
  const REPOSITORY='manubaba108/opendoor';
  const API='https://api.github.com/repos/'+REPOSITORY;
  const DRAFT='content-draft';
  const CONTENT='assets/content.json';
  const EDITORIAL='assets/editorial.json';
  const LANGUAGES=['it','en','de','fr','nl','pl','ro'];
  const UPLOAD=/^assets\/uploads\/[a-z0-9-]+\.(?:jpg|jpeg|png|webp|mp4|webm)$/;
  const clone=value=>JSON.parse(JSON.stringify(value));
  const serialize=value=>JSON.stringify(value,null,2)+'\n';
  const scriptContent=value=>'window.OPENDOOR = '+JSON.stringify(value,null,2).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029')+';\n';
  function decodeBase64(value) {
    const binary=atob(value.replace(/\s/g,''));
    return new TextDecoder().decode(Uint8Array.from(binary,char=>char.charCodeAt(0)));
  }
  function encodeBytes(bytes) {
    let binary='';
    for(let index=0;index<bytes.length;index+=32768)binary+=String.fromCharCode(...bytes.subarray(index,index+32768));
    return btoa(binary);
  }
  function httpsURL(value) {
    if(!value)return true;
    try {const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false;}
  }
  function channelURL(value,channel) {
    if(!value)return true;
    if(typeof value!=='string'||value.length>2000||!httpsURL(value))return false;
    const url=new URL(value),host=url.hostname.toLowerCase();
    if(channel==='instagram')return ['instagram.com','www.instagram.com'].includes(host)&&url.pathname!=='/';
    if(channel==='google')return (url.pathname!=='/'||Boolean(url.search))&&(/^(?:(?:www|maps|travel)\.)?google\.(?:com|[a-z]{2}|co\.[a-z]{2}|com\.[a-z]{2})$/.test(host)||['maps.app.goo.gl','g.page'].includes(host)||(host==='g.co'&&url.pathname.startsWith('/kgs/'))||(host==='goo.gl'&&url.pathname.startsWith('/maps/')));
    return false;
  }
  function mediaURL(value,video=false) {
    if(!value)return true;
    if(/^assets\/(images|uploads)\/[a-zA-Z0-9_./-]+\.(jpg|jpeg|png|webp|mp4|webm)$/.test(value)&&!value.includes('..'))return !video||/\.(mp4|webm)$/i.test(value);
    return httpsURL(value)&&(!video||/\.(mp4|webm)$/i.test(new URL(value).pathname));
  }
  function pendingCount(editorial) {
    return Object.values(editorial?.pending||{}).reduce((total,list)=>total+(Array.isArray(list)?list.length:0),0);
  }
  function changeText(data,editorial,key,language,value) {
    if(!LANGUAGES.includes(language)||!Object.hasOwn(data.strings.it,key))throw new Error('Testo non disponibile.');
    if(data.strings[language][key]===value)return;
    data.strings[language][key]=value;
    editorial.pending??={};
    if(language==='it')editorial.pending[key]=LANGUAGES.filter(code=>code!=='it');
    else if(editorial.pending[key])editorial.pending[key]=editorial.pending[key].filter(code=>code!==language);
    if(!editorial.pending[key]?.length)delete editorial.pending[key];
  }
  function validateContent(data,{publishing=false,editorial={}}={}) {
    const errors=[];
    if(!data||typeof data!=='object'||!data.strings||!Array.isArray(data.languages))return ['Contenuti non validi.'];
    if(JSON.stringify(data.languages.map(item=>item.code))!==JSON.stringify(LANGUAGES))errors.push('Devono essere presenti le sette lingue del sito.');
    const keys=Object.keys(data.strings.it||{}).sort();
    for(const key of ['name','slogan','town','province'])if(typeof data.property?.[key]!=='string'||!data.property[key].trim())errors.push('Completa nome, slogan, comune e provincia della casa.');
    for(const code of LANGUAGES){
      const strings=data.strings[code];
      if(!strings||JSON.stringify(Object.keys(strings).sort())!==JSON.stringify(keys)){errors.push('Testi incompleti in '+code.toUpperCase()+'.');continue;}
      for(const key of keys)if(typeof strings[key]!=='string'||strings[key].length>12000||(publishing&&!strings[key].trim())){errors.push('C’è un testo vuoto o non valido in '+code.toUpperCase()+'. Controlla Testi e lingue.');break;}
    }
    if(data.host?.name!=='Host')errors.push('Il nome pubblico del profilo deve essere Host.');
    if(data.host?.phone&&!/^\+?\d[\d ()-]{6,22}$/.test(data.host.phone))errors.push('Controlla il numero di telefono dell’Host.');
    if(data.host?.email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.host.email))errors.push('Controlla l’indirizzo email dell’Host.');
    for(const value of [data.host?.whatsapp,data.property?.airbnb,...Object.values(data.reviews||{})])if(!httpsURL(value))errors.push('I collegamenti devono iniziare con https://.');
    for(const channel of ['instagram','google'])if(!channelURL(data.social?.[channel],channel))errors.push('Controlla il link '+(channel==='instagram'?'Instagram':'Google')+' in Social e Google. Usa l’indirizzo pubblico completo della tua pagina.');
    if(data.emergency?.number!=='112')errors.push('Il numero di emergenza deve restare 112.');
    const photos=[data.host?.photo,...(data.modules?.gallery?.items||[]).map(item=>item.src),...(data.houseManual||[]).map(item=>item.photo),...(data.explore||[]).map(item=>item.image?.src)];
    if(photos.some(value=>!mediaURL(value)))errors.push('Una foto ha un indirizzo non valido.');
    const videos=[...(data.modules?.videos?.items||[]).map(item=>item.src),...(data.houseManual||[]).map(item=>item.video)];
    if(videos.some(value=>!mediaURL(value,true)))errors.push('Usa un video MP4 o WebM, oppure un link diretto al file.');
    if((data.modules?.videos?.items||[]).length!==3)errors.push('Mantieni i tre video di apertura, chiusura e citofono.');
    for(const place of [...(data.localFood||[]),...(data.nearbyServices||[]),...(data.explore||[])])if(!httpsURL(place.mapUrl))errors.push('Controlla il link Maps di '+(place.name||'un luogo')+'.');
    for(const manual of data.houseManual||[])for(const key of manual.instructions||[])if(!keys.includes(key))errors.push('Un’istruzione non è collegata ai testi tradotti.');
    const serialized=JSON.stringify(data);
    if(/github_pat_|ghp_[A-Za-z0-9]{15,}|"(?:password|wifiPassword|doorCode|accessToken|token)"\s*:/i.test(serialized))errors.push('Non inserire chiavi di accesso, password o codici privati nei contenuti pubblici.');
    if(publishing&&pendingCount(editorial))errors.push('Rivedi le traduzioni segnalate prima di pubblicare.');
    return [...new Set(errors)];
  }
  class GitHubStore {
    #token='';
    #fetch;
    constructor(fetcher=globalThis.fetch.bind(globalThis)){this.#fetch=fetcher;this.snapshot=null;}
    get authenticated(){return Boolean(this.#token);}
    async api(method,path,body,optional=false) {
      if(!this.#token)throw new Error('Accedi prima di salvare.');
      if(path!==''&&!/^\/(?:git\/(?:ref\/heads\/(?:main|guest-hub-v1|content-draft)|refs(?:\/heads\/(?:main|content-draft))?|commits(?:\/[a-f0-9]{40,64})?|trees(?:\/[a-f0-9]{40,64}(?:\?recursive=1)?)?|blobs)|contents\/assets\/(?:content\.(?:json|js)|editorial\.json|admin-release\.json)\?ref=[a-f0-9]{40,64})$/.test(path))throw new Error('Operazione non consentita.');
      let response;
      const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),method==='GET'?45000:180000);
      try {response=await this.#fetch(API+path,{method,headers:{Accept:'application/vnd.github+json',Authorization:'Bearer '+this.#token,'X-GitHub-Api-Version':'2022-11-28',...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{}),cache:'no-store',redirect:'error',signal:controller.signal});}catch{throw new Error('Connessione non riuscita. Le modifiche restano aperte nel pannello. Riprova quando sei online.');}finally{clearTimeout(timer);}
      if(optional&&response.status===404)return null;
      if(!response.ok){
        if(response.status===401){this.logout();throw new Error('Accesso scaduto o chiave non valida. Accedi di nuovo; le modifiche aperte non sono state cancellate.');}
        if(response.status===403)throw new Error('GitHub non autorizza questa operazione. Controlla scadenza e permesso Contents: Read and write per il solo repository opendoor, oppure riprova più tardi.');
        if([409,422].includes(response.status))throw new Error('La bozza è cambiata oppure il ramo è protetto. Le tue modifiche sono ancora aperte. Ricarica i contenuti prima di salvare; nessun aggiornamento viene forzato.');
        throw new Error('Il salvataggio non è riuscito (risposta '+response.status+'). Le modifiche restano aperte.');
      }
      return response.status===204?null:response.json();
    }
    async login(token) {
      if(!/^github_pat_[A-Za-z0-9_]{20,}$/.test(token.trim()))throw new Error('Inserisci una chiave GitHub fine-grained, creata solo per opendoor.');
      this.#token=token.trim();
      try {
        const repo=await this.api('GET','');
        if(repo.full_name!==REPOSITORY||repo.permissions?.push===false)throw new Error('Questo accesso non consente di gestire OPENDOOR.');
        return await this.load();
      }catch(error){this.#token='';throw error;}
    }
    logout(){this.#token='';}
    async ref(branch,optional=false){return (await this.api('GET','/git/ref/heads/'+branch,undefined,optional))?.object?.sha||null;}
    async file(path,sha,optional=false) {
      const item=await this.api('GET','/contents/'+path+'?ref='+sha,undefined,optional);
      if(!item)return null;
      if(item.encoding!=='base64'||typeof item.content!=='string')throw new Error('Questo contenuto non può essere aperto nel pannello.');
      const value=decodeBase64(item.content);
      return path.endsWith('.js')?JSON.parse(value.replace(/^\s*window\.OPENDOOR\s*=\s*/,'').replace(/;\s*$/,'')):JSON.parse(value);
    }
    async tree(sha) {
      const commit=await this.api('GET','/git/commits/'+sha);
      const result=await this.api('GET','/git/trees/'+commit.tree.sha+'?recursive=1');
      if(result.truncated)throw new Error('Il progetto è troppo grande per questo pannello. Nessuna modifica è stata fatta.');
      return {sha:commit.tree.sha,files:new Map(result.tree.filter(item=>item.type==='blob').map(item=>[item.path,item.sha]))};
    }
    async load() {
      const main=await this.ref('main');
      const released=await this.file('assets/admin-release.json',main,true);
      const draft=await this.ref(DRAFT,true);
      const source=draft||(released?.version===1?main:await this.ref('guest-hub-v1'));
      const [tree,mainTree,data,editorial]=await Promise.all([this.tree(source),this.tree(main),this.file(CONTENT,source,true),this.file(EDITORIAL,source,true)]);
      const content=data||await this.file('assets/content.js',source);
      this.snapshot={main,draft,source,tree,mainTree,released:released?.version===1,data:content,editorial:editorial||{pending:{}},mainContent:mainTree.files.get(CONTENT)||null};
      return this.snapshot;
    }
    async assertCurrent() {
      if(await this.ref(DRAFT,true)!==this.snapshot.draft)throw new Error('La bozza è stata aggiornata da un’altra sessione. Le tue modifiche restano aperte. Ricarica prima di salvare.');
    }
    async save(data,editorial,uploads=[],onProgress=()=>{}) {
      const errors=validateContent(data);if(errors.length)throw new Error(errors.join(' '));
      if(!this.snapshot)throw new Error('Apri i contenuti prima di salvare.');
      if(uploads.reduce((total,item)=>total+item.bytes.byteLength,0)>100*1024*1024)throw new Error('Salva al massimo 100 MB di nuovi file alla volta.');
      for(const item of uploads)if(!UPLOAD.test(item.path))throw new Error('Nome del file non valido.');
      await this.assertCurrent();
      const entries=[];
      const files=[{path:CONTENT,content:serialize(data),encoding:'utf-8'},{path:'assets/content.js',content:scriptContent(data),encoding:'utf-8'},{path:EDITORIAL,content:serialize(editorial),encoding:'utf-8'},...uploads.map(item=>({path:item.path,content:encodeBytes(item.bytes),encoding:'base64'}))];
      for(let index=0;index<files.length;index++){
        onProgress(index+1,files.length);
        const file=files[index],blob=await this.api('POST','/git/blobs',{content:file.content,encoding:file.encoding});
        entries.push({path:file.path,mode:'100644',type:'blob',sha:blob.sha});
      }
      const tree=await this.api('POST','/git/trees',{base_tree:this.snapshot.tree.sha,tree:entries});
      const commit=await this.api('POST','/git/commits',{message:'Save OPENDOOR content draft',tree:tree.sha,parents:[this.snapshot.source]});
      await this.assertCurrent();
      if(this.snapshot.draft)await this.api('PATCH','/git/refs/heads/'+DRAFT,{sha:commit.sha,force:false});
      else await this.api('POST','/git/refs',{ref:'refs/heads/'+DRAFT,sha:commit.sha});
      const nextFiles=new Map(this.snapshot.tree.files);for(const entry of entries)nextFiles.set(entry.path,entry.sha);
      this.snapshot={...this.snapshot,draft:commit.sha,source:commit.sha,tree:{sha:tree.sha,files:nextFiles},data:clone(data),editorial:clone(editorial)};
      return this.snapshot;
    }
    async publish() {
      const snapshot=this.snapshot;if(!snapshot?.draft)throw new Error('Salva una bozza prima di pubblicare.');
      const errors=validateContent(snapshot.data,{publishing:true,editorial:snapshot.editorial});if(errors.length)throw new Error(errors.join(' '));
      const main=await this.ref('main');
      const release=await this.file('assets/admin-release.json',main,true);
      if(release?.version!==1)throw new Error('La prima pubblicazione del Guest Hub deve essere approvata e attivata prima di usare questo pulsante. La bozza è al sicuro.');
      const mainTree=await this.tree(main);
      if((mainTree.files.get(CONTENT)||null)!==snapshot.mainContent)throw new Error('I contenuti online sono cambiati. Ricarica la versione aggiornata prima di pubblicare.');
      await this.assertCurrent();
      const allowed=[CONTENT,'assets/content.js',EDITORIAL,...[...snapshot.tree.files.keys()].filter(path=>UPLOAD.test(path))];
      const entries=allowed.filter(path=>snapshot.tree.files.has(path)).map(path=>({path,mode:'100644',type:'blob',sha:snapshot.tree.files.get(path)}));
      const tree=await this.api('POST','/git/trees',{base_tree:mainTree.sha,tree:entries});
      const commit=await this.api('POST','/git/commits',{message:'Publish OPENDOOR content',tree:tree.sha,parents:[...new Set([main,snapshot.draft])]});
      if(await this.ref('main')!==main)throw new Error('Il sito è cambiato durante il controllo. Ricarica prima di pubblicare.');
      await this.assertCurrent();
      await this.api('PATCH','/git/refs/heads/main',{sha:commit.sha,force:false});
      let draftSynchronized=true;
      try {if(await this.ref(DRAFT)!==snapshot.draft)draftSynchronized=false;else await this.api('PATCH','/git/refs/heads/'+DRAFT,{sha:commit.sha,force:false});}catch{draftSynchronized=false;}
      this.snapshot=null;
      return {sha:commit.sha,draftSynchronized};
    }
  }
  globalThis.OpendoorCMS={GitHubStore,clone,serialize,scriptContent,validateContent,changeText,pendingCount,mediaURL,httpsURL,channelURL,encodeBytes,LANGUAGES,REPOSITORY,UPLOAD};
})();
