/* Public booking destinations only. Calendar connections are managed on each platform. */
(() => {
  'use strict';
  const portals=[['airbnb','Airbnb'],['booking','Booking.com'],['tripcom','Trip.com'],['agoda','Agoda'],['expedia','Expedia'],['holidu','Holidu'],['vrbo','Vrbo']];
  const labels={
    it:{book:'Prenota',bookingIntro:'Scegli dove prenotare il tuo soggiorno a OPENDOOR.',bookingWith:'Prenota con',bookingNote:'Disponibilità, prezzi e condizioni sono indicati sulla piattaforma che scegli. Il collegamento si apre in una nuova scheda.',bookingHomeTitle:'Il tuo prossimo soggiorno',bookingHomeText:'Trova OPENDOOR sulla piattaforma che preferisci.',bookingEmpty:'Per informazioni sulle prenotazioni, contatta l’Host.'},
    en:{book:'Book',bookingIntro:'Choose where to book your stay at OPENDOOR.',bookingWith:'Book with',bookingNote:'Availability, prices and terms are shown on your chosen platform. The link opens in a new tab.',bookingHomeTitle:'Your next stay',bookingHomeText:'Find OPENDOOR on your preferred platform.',bookingEmpty:'Contact your host for booking information.'},
    de:{book:'Buchen',bookingIntro:'Wähle, wo du deinen Aufenthalt bei OPENDOOR buchen möchtest.',bookingWith:'Buchen bei',bookingNote:'Verfügbarkeit, Preise und Bedingungen findest du auf der gewählten Plattform. Der Link öffnet sich in einem neuen Tab.',bookingHomeTitle:'Dein nächster Aufenthalt',bookingHomeText:'Finde OPENDOOR auf deiner bevorzugten Plattform.',bookingEmpty:'Kontaktiere deinen Gastgeber für Informationen zur Buchung.'},
    fr:{book:'Réserver',bookingIntro:'Choisissez où réserver votre séjour à OPENDOOR.',bookingWith:'Réserver sur',bookingNote:'Les disponibilités, les tarifs et les conditions sont indiqués sur la plateforme choisie. Le lien s’ouvre dans un nouvel onglet.',bookingHomeTitle:'Votre prochain séjour',bookingHomeText:'Retrouvez OPENDOOR sur votre plateforme préférée.',bookingEmpty:'Contactez votre hôte pour toute information sur les réservations.'},
    nl:{book:'Boeken',bookingIntro:'Kies waar je jouw verblijf bij OPENDOOR wilt boeken.',bookingWith:'Boek via',bookingNote:'Beschikbaarheid, prijzen en voorwaarden staan op het gekozen platform. De link opent in een nieuw tabblad.',bookingHomeTitle:'Je volgende verblijf',bookingHomeText:'Vind OPENDOOR op je favoriete platform.',bookingEmpty:'Neem contact op met je host voor informatie over boeken.'},
    pl:{book:'Zarezerwuj',bookingIntro:'Wybierz, gdzie chcesz zarezerwować pobyt w OPENDOOR.',bookingWith:'Zarezerwuj przez',bookingNote:'Dostępność, ceny i warunki znajdziesz na wybranej platformie. Link otwiera się w nowej karcie.',bookingHomeTitle:'Twój następny pobyt',bookingHomeText:'Znajdź OPENDOOR na ulubionej platformie.',bookingEmpty:'Skontaktuj się z gospodarzem, aby uzyskać informacje o rezerwacji.'},
    ro:{book:'Rezervă',bookingIntro:'Alege unde să rezervi sejurul la OPENDOOR.',bookingWith:'Rezervă prin',bookingNote:'Disponibilitatea, prețurile și condițiile sunt afișate pe platforma aleasă. Linkul se deschide într-o filă nouă.',bookingHomeTitle:'Următorul tău sejur',bookingHomeText:'Găsește OPENDOOR pe platforma preferată.',bookingEmpty:'Contactează gazda pentru informații despre rezervări.'}
  };
  function validURL(value) {
    if(typeof value!=='string'||!value||value.length>2000)return false;
    try {const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&!url.pathname.toLowerCase().endsWith('.ics')&&(url.pathname!=='/'||Boolean(url.search));}catch{return false;}
  }
  function normalize(data) {
    if(!Object.hasOwn(data,'bookingLinks'))data.bookingLinks=portals.map(([id,name])=>({id,name,url:id==='airbnb'?data.property?.airbnb||null:null}));
    for(const [lang,strings] of Object.entries(labels)) {
      if(!data.strings?.[lang])continue;
      for(const [key,value] of Object.entries(strings))if(!Object.hasOwn(data.strings[lang],key))data.strings[lang][key]=value;
    }
    return data;
  }
  const available=data=>(Array.isArray(data.bookingLinks)?data.bookingLinks:[]).filter(item=>item&&typeof item.name==='string'&&item.name.trim()&&validURL(item.url));
  globalThis.OpendoorBooking={normalize,validURL,available};
})();
