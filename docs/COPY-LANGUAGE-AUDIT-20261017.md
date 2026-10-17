# OPENDOOR · Revisione editoriale multilingue · 17 ottobre 2026

## Scopo
Controllo sistematico di **463 chiavi testuali** del Guest Hub, per ciascuna delle **7 lingue** (italiano, inglese, tedesco, francese, neerlandese, polacco e rumeno): **3.241 campi verificati**. La revisione riguarda i messaggi visibili dagli ospiti e le versioni di backup utilizzate dal pannello Admin.

## Linea editoriale
- Voce: un host che si rivolge direttamente all'ospite, con un tono naturale, amichevole e mai burocratico. Contatto in prima persona singolare (*scrivimi, chiamami*).
- Informazioni operative: frasi brevi, verbi chiari, ordine coerente con la navigazione.
- Traduzioni: adattamenti idiomatici, non traduzioni letterali; si mantiene il *vous* in francese e il registro informale nelle altre lingue.
- Sicurezza e dati: non rivelare codici di accesso, non inventare ubicazioni di dispositivi, prezzi, orari o date non confermate.
- Identità: OPENDOOR e i nomi ufficiali dei luoghi invariati.

## Interventi
**53 chiavi editoriali aggiornate** (tra 52 e 53 per lingua, in base alle formulazioni già corrette), riguardanti:
1. Contatto con l'host: eliminato il contrasto fra prima persona singolare, plurale e diciture impersonali.
2. Arrivo e Check-in: istruzioni più dirette, citofono al civico 12, ascensore e piano quinto; eliminato il riferimento superato alle “due foto”.
3. Parcheggio e Wi-Fi: indicazioni pratiche coerenti con OPENDOOR; password indicata all'ingresso dell'appartamento, senza mostrarla sul sito.
4. Sicurezza: 112 esplicito, indicazione più chiara dell'armadio con il pronto soccorso, informazioni sul sensore ancora prive di foto/ubicazione non inventate.
5. Guide: distinzione netta tra bollitore elettrico e acqua calda del bagno; foto generiche e messaggi sui video in preparazione meno meccanici.
6. Check-out: asciugamani nel cestone, letto lasciato all'host, controllo degli effetti personali e saluto naturale.
7. Cibo e dintorni: consigli personali, prezzi indicativi, possibilità di chiedere aiuto; eventi annuali senza date 2027 fisse se non confermate.
8. Recensioni e feedback: richiesta più cordiale, personale e volontaria.

## Salvaguardie
- Nessuna foto, video, posizione GPS, prezzo, link di prenotazione o impostazione del pannello modificata.
- Nessun codice di accesso inserito.
- Dizionari e fallback `assets/content.js` allineati a `assets/content.json`.
- Aggiornata la versione della risorsa traduzioni su `index.html` e `admin.html` per evitare cache obsoleta.
- Aggiunto `tests/copy-language.test.mjs` per controllare l'integrità dei 3.241 campi dopo gli aggiornamenti futuri.

## Verifiche
- Test di integrità traduzioni: **7 lingue × 463 chiavi = 3.241 campi, nessuna mancanza**.
- Test amministrazione: **49 controlli superati**.
- Test Chrome mobile: **161 prove di navigazione** in sette lingue senza errori; layout del parcheggio controllato anche nel caso in cui l'immagine sia già caricata.
- Solo modifiche editoriali e test. Nessuna sostituzione di media.

## Note da verificare sul posto
La foto e la posizione esatta del sensore di monossido di carbonio restano da documentare. Le istruzioni pubblicate non ne inventano l'ubicazione. La presenza del cestone per gli asciugamani è basata sulle istruzioni già definite dall'host.

