/* The public Guest Hub reads the same JSON that the Host edits. */
(() => {
  'use strict';
  window.OPENDOOR_READY=(async()=>{
    const nonce=new URLSearchParams(location.search).get('opendoor-preview');
    if(nonce&&/^[a-f0-9-]{20,64}$/.test(nonce)&&window.parent!==window){
      await new Promise(resolve=>{
        const receive=event=>{
          if(event.source!==window.parent||event.origin!==location.origin||event.data?.type!=='opendoor-preview-content'||event.data.nonce!==nonce)return;
          const data=event.data.content;
          if(!data?.strings?.it||!Array.isArray(data.languages))return;
          window.OPENDOOR=data;
          window.OPENDOOR_PREVIEW_LANGUAGE=event.data.language;
          window.removeEventListener('message',receive);resolve();
        };
        window.addEventListener('message',receive);
        window.parent.postMessage({type:'opendoor-preview-ready',nonce},location.origin);
      });
      return;
    }
    if(location.protocol==='file:')return;
    try {
      const response=await fetch('assets/content.json',{cache:'no-cache',credentials:'omit'});
      if(!response.ok)return;
      const data=await response.json();
      if(data?.strings?.it&&Array.isArray(data.languages))window.OPENDOOR=data;
    }catch{/* Keep the bundled content available offline. */}
  })();
})();
