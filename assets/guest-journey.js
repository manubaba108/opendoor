/* Guest journey defaults. Existing host edits always take precedence. */
(() => {
  'use strict';
  const languages=['it','en','de','fr','nl','pl','ro'];
  const rows={
    maiHours:["Cena 17:30–22, giovedì chiuso secondo Restaurant Guru. Conferma disponibilità e orari al locale.", "Dinner 17:30–22, Thursday closed according to Restaurant Guru. Confirm hours and availability with the venue.", "Abends 17:30–22, laut Restaurant Guru donnerstags geschlossen. Zeiten und Verfügbarkeit beim Lokal bestätigen.", "Dîner 17:30–22, fermé le jeudi selon Restaurant Guru. Confirmez les horaires et disponibilités auprès du local.", "Diner 17:30–22, donderdag gesloten volgens Restaurant Guru. Bevestig tijden en beschikbaarheid bij de zaak.", "Kolacja 17:30–22, według Restaurant Guru w czwartek zamknięte. Potwierdź godziny i dostępność w lokalu.", "Cină 17:30–22, joi închis conform Restaurant Guru. Confirmă programul și disponibilitatea la local."],
    travelStage:['In viaggio e all’arrivo','On your way and on arrival','Unterwegs und bei der Ankunft','En route et à l’arrivée','Onderweg en bij aankomst','W drodze i po przyjeździe','Pe drum și la sosire'],
    travelStageDesc:['Indirizzo, una sosta per mangiare e ingresso in casa.','Directions, a stop for food and getting inside.','Anfahrt, eine Essenspause und der Weg in die Wohnung.','L’itinéraire, une pause repas et l’accès au logement.','De route, een eetpauze en naar binnen gaan.','Dojazd, przerwa na posiłek i wejście do mieszkania.','Traseul, o pauză de masă și accesul în apartament.'],
    settleStage:['Entra e sentiti a casa','Settle in','Ankommen und wohlfühlen','Installez-vous','Voel je thuis','Rozgość się','Simte-te ca acasă'],
    settleStageDesc:['Wi-Fi, TV, cucina e tutto quello che serve per riposare.','Wi-Fi, TV, the kitchen and everything for a restful stay.','WLAN, TV, Küche und alles für eine erholsame Pause.','Wi-Fi, télévision, cuisine et tout pour vous reposer.','Wifi, tv, de keuken en alles voor een rustig verblijf.','Wi-Fi, telewizor, kuchnia i wszystko do odpoczynku.','Wi-Fi, TV, bucătăria și tot ce îți trebuie pentru odihnă.'],
    nearbyStage:['Una pausa nei dintorni','A break nearby','Eine Pause in der Umgebung','Une pause dans les environs','Even de buurt in','Chwila w okolicy','O pauză prin împrejurimi'],
    nearbyStageDesc:['Un gelato, la spesa o un posto da scoprire.','Ice cream, groceries or somewhere to explore.','Ein Eis, Einkäufe oder etwas entdecken.','Une glace, des courses ou un lieu à découvrir.','Een ijsje, boodschappen of iets ontdekken.','Lody, zakupy lub miejsce do odkrycia.','O înghețată, cumpărături sau un loc de descoperit.'],
    departStage:['Prima di ripartire','Before you leave','Vor der Weiterreise','Avant de repartir','Voor je verder reist','Przed dalszą podróżą','Înainte de a porni mai departe'],
    departStageDesc:['Un caffè, gli ultimi controlli e la porta chiusa bene.','Coffee, a final check and a securely closed door.','Ein Kaffee, ein letzter Check und die Tür richtig schließen.','Un café, les dernières vérifications et la porte bien fermée.','Koffie, een laatste controle en de deur goed sluiten.','Kawa, ostatnie sprawdzenie i dobrze zamknięte drzwi.','O cafea, ultimele verificări și ușa închisă bine.'],
    arrival:['Come arrivare','Getting here','Anfahrt','Venir à OPENDOOR','Route naar OPENDOOR','Jak dojechać','Cum ajungi'],
    arrivalDesc:['Indirizzo e navigatore','Address and directions','Adresse und Navigation','Adresse et itinéraire','Adres en navigatie','Adres i nawigacja','Adresa și navigația'],
    navFood:['Cibo','Food','Essen','Manger','Eten','Jedzenie','Mâncare'],
    breakfast:['Colazione e caffè','Breakfast and coffee','Frühstück und Kaffee','Petit-déjeuner et café','Ontbijt en koffie','Śniadanie i kawa','Mic dejun și cafea'],
    breakfastDesc:['Una sosta prima del viaggio','A stop before your journey','Eine Pause vor der Fahrt','Une pause avant le départ','Een stop voor vertrek','Przerwa przed podróżą','O pauză înainte de drum'],
    closing:['Chiudere la porta','Closing the door','Tür schließen','Fermer la porte','De deur sluiten','Zamykanie drzwi','Închiderea ușii'],
    closingDesc:['La guida prima di uscire','Your guide before going out','Die Anleitung vor dem Gehen','Le guide avant de sortir','De uitleg voor je weggaat','Instrukcja przed wyjściem','Ghidul înainte să ieși'],
    firstAid:['Kit di pronto soccorso','First-aid kit','Erste-Hilfe-Set','Trousse de secours','EHBO-set','Apteczka','Trusă de prim ajutor'],
    firstAidDesc:['Dove trovarlo in casa','Where to find it','Wo du es findest','Où la trouver','Waar je die vindt','Gdzie ją znaleźć','Unde o găsești'],
    firstAidUnknown:['Per trovare il kit, contatta l’Host. La posizione non è ancora indicata qui.','Contact your host to locate the kit. Its location has not yet been added here.','Frage deinen Gastgeber nach dem Set. Der Standort ist hier noch nicht angegeben.','Contactez votre hôte pour trouver la trousse. Son emplacement n’est pas encore indiqué ici.','Vraag je host waar de set ligt. De locatie staat hier nog niet vermeld.','Zapytaj gospodarza, gdzie jest apteczka. Jej lokalizacja nie została jeszcze tutaj podana.','Întreabă gazda unde se află trusa. Locul nu este încă indicat aici.'],
    foodGuideIntro:['Scegli in base alla fame, al tempo e a quanto vuoi spendere.','Choose what suits your appetite, time and budget.','Wähle nach Hunger, Zeit und Budget.','Choisissez selon votre faim, votre temps et votre budget.','Kies wat past bij je trek, tijd en budget.','Wybierz według apetytu, czasu i budżetu.','Alege după poftă, timp și buget.'],
    foodNotice:['Prezzi indicativi a persona, non un conto garantito. Orari e valutazioni possono cambiare: controlla la scheda del locale prima di partire.','Prices are indicative per person, not a guaranteed bill. Hours and ratings can change: check the venue before setting off.','Richtpreise pro Person, kein garantierter Endbetrag. Öffnungszeiten und Bewertungen können sich ändern. Prüfe das Lokal vor dem Aufbruch.','Prix indicatifs par personne, sans garantie sur l’addition. Horaires et notes peuvent changer. Vérifiez la fiche avant de partir.','Richtprijzen per persoon, geen gegarandeerde rekening. Tijden en beoordelingen kunnen veranderen. Controleer de zaak voor vertrek.','Orientacyjne ceny za osobę, bez gwarancji wysokości rachunku. Godziny i oceny mogą się zmienić. Sprawdź lokal przed wyjściem.','Prețuri orientative de persoană, nu o notă de plată garantată. Programul și evaluările se pot schimba. Verifică localul înainte să pleci.'],
    foodAll:['Tutti','All','Alle','Tout','Alles','Wszystkie','Toate'],
    foodMeals:['Pranzo e cena','Lunch and dinner','Mittag- und Abendessen','Déjeuner et dîner','Lunch en diner','Obiad i kolacja','Prânz și cină'],
    foodCoffee:['Caffè e colazione','Coffee and breakfast','Kaffee und Frühstück','Café et petit-déjeuner','Koffie en ontbijt','Kawa i śniadanie','Cafea și mic dejun'],
    foodTreat:['Gelato','Ice cream','Eis','Glaces','IJs','Lody','Înghețată'],
    foodTakeaway:['Da asporto','Takeaway','Zum Mitnehmen','À emporter','Afhalen','Na wynos','La pachet'],
    budgetLabel:['Budget indicativo / persona','Indicative budget / person','Richtpreis / Person','Budget indicatif / personne','Richtprijs / persoon','Orientacyjny budżet / osoba','Buget orientativ / persoană'],
    priceUnknown:['Prezzo da verificare','Price to be checked','Preis bitte erfragen','Prix à vérifier','Prijs navragen','Sprawdź cenę','Preț de verificat'],
    sourcesLabel:['Fonti e dettagli','Sources and details','Quellen und Details','Sources et détails','Bronnen en details','Źródła i szczegóły','Surse și detalii'],
    checkedOn:['Consultato il','Consulted on','Abgerufen am','Consulté le','Geraadpleegd op','Sprawdzono','Consultat la'],
    menuLink:['Menu del locale','Venue menu','Speisekarte','Carte du restaurant','Menukaart','Menu lokalu','Meniul localului'],
    hoursLabel:['Quando andare','When to go','Wann hingehen','Quand y aller','Wanneer gaan','Kiedy pójść','Când să mergi'],
    noRatings:['Valutazione non verificata','Rating not verified','Bewertung nicht verifiziert','Note non vérifiée','Beoordeling niet geverifieerd','Ocena niezweryfikowana','Evaluare neverificată'],
    rest:['Camera e divano letto','Bedroom and sofa bed','Schlafzimmer und Schlafsofa','Chambre et canapé-lit','Slaapkamer en slaapbank','Sypialnia i sofa rozkładana','Dormitor și canapea extensibilă'],
    restDesc:['Prepara il tuo riposo','Get ready to rest','Alles für deine Ruhe','Préparez votre repos','Maak je klaar om te rusten','Przygotuj się do odpoczynku','Pregătește-te de odihnă'],
    restText:['Hai una camera matrimoniale e un divano letto. Per la preparazione del divano letto, chiedi all’Host.','There is a double bedroom and a sofa bed. Ask your host about preparing the sofa bed.','Es gibt ein Schlafzimmer mit Doppelbett und ein Schlafsofa. Frage deinen Gastgeber nach der Vorbereitung des Schlafsofas.','Vous disposez d’une chambre double et d’un canapé-lit. Demandez à votre hôte comment préparer le canapé-lit.','Er is een tweepersoonsslaapkamer en een slaapbank. Vraag je host hoe je de slaapbank klaarmaakt.','Do dyspozycji jest sypialnia z łóżkiem dwuosobowym i rozkładana sofa. Zapytaj gospodarza o przygotowanie sofy.','Ai un dormitor cu pat dublu și o canapea extensibilă. Întreabă gazda cum se pregătește canapeaua.'],
    connectGroup:['Wi-Fi e TV','Wi-Fi and TV','WLAN und TV','Wi-Fi et télévision','Wifi en tv','Wi-Fi i telewizor','Wi-Fi și TV'],
    kitchenGroup:['Cucina, caffè e piccoli elettrodomestici','Kitchen, coffee and small appliances','Küche, Kaffee und Kleingeräte','Cuisine, café et petits appareils','Keuken, koffie en kleine apparaten','Kuchnia, kawa i małe urządzenia','Bucătărie, cafea și aparate mici'],
    comfortGroup:['Bagno, comfort e riposo','Bathroom, comfort and rest','Bad, Komfort und Ruhe','Salle de bains, confort et repos','Badkamer, comfort en rust','Łazienka, wygoda i odpoczynek','Baie, confort și odihnă'],
    practicalGroup:['Regole, sicurezza e cura della casa','Rules, safety and looking after the apartment','Regeln, Sicherheit und Ordnung','Règles, sécurité et entretien','Regels, veiligheid en zorg voor het huis','Zasady, bezpieczeństwo i porządek','Reguli, siguranță și îngrijirea locuinței'],
    bathroomGuide:['Bagno e acqua calda','Bathroom and hot water','Bad und Warmwasser','Salle de bains et eau chaude','Badkamer en warm water','Łazienka i ciepła woda','Baie și apă caldă'],
    allHouseGuides:['Tutte le guide della casa','All apartment guides','Alle Wohnungsanleitungen','Tous les guides du logement','Alle huisinstructies','Wszystkie instrukcje','Toate ghidurile locuinței'],
    laterReview:['Dopo il soggiorno','After your stay','Nach deinem Aufenthalt','Après votre séjour','Na je verblijf','Po pobycie','După sejur'],
    sourceRange:['Fascia riportata dalla fonte; menu non verificato.','Range reported by the source; menu not verified.','Preisspanne laut Quelle; Speisekarte nicht verifiziert.','Fourchette indiquée par la source ; carte non vérifiée.','Prijsklasse volgens de bron; menu niet geverifieerd.','Przedział podany przez źródło; menu niezweryfikowane.','Interval indicat de sursă; meniul nu este verificat.'],
    fastidiaGuide:['Caffè e aperitivi in piazza. Le recensioni consultate apprezzano l’accoglienza; verifica l’apertura al mattino.','Coffee and aperitifs on the square. Reviewed feedback praises the welcome; check morning opening.','Kaffee und Aperitifs am Platz. Gelesene Bewertungen loben die Gastfreundschaft; die Morgenöffnung bitte prüfen.','Café et apéritifs sur la place. Les avis consultés apprécient l’accueil ; vérifiez l’ouverture le matin.','Koffie en aperitieven op het plein. Geraadpleegde reviews waarderen de ontvangst; controleer de ochtendopening.','Kawa i aperitif na placu. Sprawdzone opinie chwalą obsługę; upewnij się, czy rano jest otwarte.','Cafea și aperitive în piață. Recenziile consultate apreciază primirea; verifică deschiderea dimineața.'],
    fastidiaHours:['Gli orari del mattino pubblicati online non coincidono. Chiama prima di uscire per colazione.','Published morning hours conflict. Call before going out for breakfast.','Die veröffentlichten Morgenzeiten widersprechen sich. Ruf vor dem Frühstücksbesuch an.','Les horaires du matin publiés diffèrent. Appelez avant de sortir pour le petit-déjeuner.','De vermelde ochtendtijden verschillen. Bel voordat je voor het ontbijt vertrekt.','Podane godziny poranne są sprzeczne. Zadzwoń przed wyjściem na śniadanie.','Programul de dimineață publicat diferă. Sună înainte să pleci la micul dejun.'],
    taninoGuide:['Pizza, pasta mantovana, carne e pesce. Seggioloni disponibili. Recensioni favorevoli su cucina e accoglienza, con alcune segnalazioni di attese.','Pizza, Mantuan pasta, meat and fish. High chairs available. Reviews praise food and hospitality, with some reports of waiting.','Pizza, mantuanische Pasta, Fleisch und Fisch. Hochstühle vorhanden. Bewertungen loben Küche und Empfang; manche berichten von Wartezeiten.','Pizza, pâtes mantouanes, viande et poisson. Chaises hautes disponibles. Cuisine et accueil appréciés, avec quelques signalements d’attente.','Pizza, Mantuaanse pasta, vlees en vis. Kinderstoelen aanwezig. Reviews prijzen eten en ontvangst; soms worden wachttijden gemeld.','Pizza, mantuańskie makarony, mięso i ryby. Dostępne krzesełka dziecięce. Opinie chwalą jedzenie i obsługę, czasem wspominają oczekiwanie.','Pizza, paste mantovane, carne și pește. Scaune pentru copii disponibile. Recenzii bune despre mâncare și primire, unele menționează așteptarea.'],
    taninoHours:['Pranzo 12–15, cena 19–23:30; domenica pranzo fino alle 14:30. Martedì chiuso secondo Tripadvisor.','Lunch 12–15, dinner 19–23:30; Sunday lunch until 14:30. Tuesday closed according to Tripadvisor.','Mittags 12–15, abends 19–23:30; sonntags mittags bis 14:30. Laut Tripadvisor dienstags geschlossen.','Déjeuner 12–15, dîner 19–23:30 ; dimanche midi jusqu’à 14:30. Fermé le mardi selon Tripadvisor.','Lunch 12–15, diner 19–23:30; zondag lunch tot 14:30. Volgens Tripadvisor dinsdag gesloten.','Obiad 12–15, kolacja 19–23:30; w niedzielę obiad do 14:30. Według Tripadvisor we wtorek zamknięte.','Prânz 12–15, cină 19–23:30; duminica prânz până la 14:30. Marți închis conform Tripadvisor.'],
    taninoBudget:['Stima per pizza, bevanda e coperto. Menu lavoro completo €15; verifica coperto ed extra. Cucina alla carta con spesa variabile.','Estimate for pizza, a drink and cover charge. Full workday lunch menu €15; check cover and extras. À la carte spending varies.','Schätzung für Pizza, Getränk und Gedeck. Komplettes Arbeitsmenü mittags €15; Gedeck und Extras prüfen. À-la-carte-Preise variieren.','Estimation pour pizza, boisson et couvert. Menu déjeuner complet à 15 € ; vérifiez couvert et suppléments. À la carte, budget variable.','Raming voor pizza, drankje en couvert. Volledig werkdaglunchmenu €15; controleer couvert en extra’s. À la carte varieert de prijs.','Szacunek za pizzę, napój i nakrycie. Pełne menu lunchowe €15; sprawdź opłatę za nakrycie i dodatki. À la carte ceny się różnią.','Estimare pentru pizza, băutură și copert. Meniu complet de prânz €15; verifică copertul și extraopțiunile. Cost variabil à la carte.'],
    azzoniGuide:['Trattoria con primi, carne e griglia. Porzioni e convenienza ricorrono nelle recensioni consultate; adatta a una sosta informale.','Trattoria serving pasta, meat and grills. Reviews often mention portions and value; an informal meal stop.','Trattoria mit Pasta, Fleisch und Grillgerichten. Gelesene Bewertungen erwähnen Portionen und Preis-Leistung; für eine ungezwungene Pause.','Trattoria proposant pâtes, viande et grillades. Portions et rapport qualité-prix reviennent dans les avis ; pour une pause informelle.','Trattoria met pasta, vlees en grillgerechten. Reviews noemen vaak porties en prijs-kwaliteit; voor een informele eetpauze.','Trattoria z makaronami, mięsem i grillem. Opinie często wspominają porcje i stosunek jakości do ceny; swobodna atmosfera.','Trattoria cu paste, carne și grătar. Porțiile și prețurile apar în recenzii; pentru o masă fără formalități.'],
    azzoniHours:['Pranzo e cena. Giorni e orari discordanti tra le fonti: telefona per conferma, soprattutto nel weekend.','Lunch and dinner. Sources disagree on days and hours: call to confirm, especially at weekends.','Mittag- und Abendessen. Quellen widersprechen sich bei Tagen und Zeiten. Ruf zur Bestätigung an, besonders am Wochenende.','Déjeuner et dîner. Les sources diffèrent sur les jours et horaires ; appelez, surtout le week-end.','Lunch en diner. Bronnen verschillen over dagen en tijden; bel ter bevestiging, vooral in het weekend.','Obiad i kolacja. Źródła podają różne dni i godziny; zadzwoń, zwłaszcza w weekend.','Prânz și cină. Sursele diferă privind zilele și orele; sună pentru confirmare, mai ales în weekend.'],
    maiGuide:["Pizza da asporto e consegna. Le recensioni consultate apprezzano impasto e dimensioni; verifica eventuali costi di consegna.", "Takeaway and delivery pizza. Reviewed feedback praises the dough and size; check any delivery charges.", "Pizza zum Mitnehmen und Liefern. Gelesene Bewertungen loben Teig und Größe; mögliche Lieferkosten prüfen.", "Pizza à emporter et en livraison. Les avis consultés apprécient la pâte et la taille ; vérifiez les frais de livraison.", "Afhaal- en bezorgpizza. Geraadpleegde reviews prijzen het deeg en formaat; controleer eventuele bezorgkosten.", "Pizza na wynos i z dostawą. Opinie chwalą ciasto i wielkość; sprawdź koszty dostawy.", "Pizza la pachet și cu livrare. Recenziile consultate apreciază aluatul și dimensiunea; verifică taxele de livrare."],
    unknownHours:['Orari non verificati. Telefona prima di partire.','Hours not verified. Call before setting off.','Öffnungszeiten nicht verifiziert. Ruf vor dem Aufbruch an.','Horaires non vérifiés. Appelez avant de partir.','Openingstijden niet geverifieerd. Bel voor vertrek.','Godziny niezweryfikowane. Zadzwoń przed wyjściem.','Program neverificat. Sună înainte să pleci.'],
    pinkoGuide:["Pizza da asporto e consegna. Apprezzata in varie recensioni; alcune segnalano problemi con la consegna. Concorda l’orario prima di ordinare.", "Takeaway and delivery pizza. Praised in several reviews; some report delivery problems. Agree a delivery time before ordering.", "Pizza zum Mitnehmen und Liefern. In mehreren Bewertungen gelobt; einige berichten von Lieferproblemen. Lieferzeit vor der Bestellung vereinbaren.", "Pizza à emporter et en livraison. Plusieurs avis favorables ; certains signalent des soucis de livraison. Convenez d’un horaire avant de commander.", "Afhaal- en bezorgpizza. Verschillende positieve reviews; sommige melden bezorgproblemen. Spreek vooraf een bezorgtijd af.", "Pizza na wynos i z dostawą. Kilka pozytywnych opinii, niektóre zgłaszają problemy z dostawą. Ustal godzinę przed zamówieniem.", "Pizza la pachet și cu livrare. Mai multe recenzii bune, unele menționează probleme de livrare. Stabilește ora înainte să comanzi."],
    pinkoHours:['Cena, martedì–domenica 18–22 secondo LocalShop24. Lunedì chiuso; conferma al locale.','Dinner, Tuesday–Sunday 18–22 according to LocalShop24. Monday closed; confirm with the venue.','Abends, Dienstag–Sonntag 18–22 laut LocalShop24. Montag geschlossen; beim Lokal bestätigen lassen.','Dîner, mardi–dimanche 18–22 selon LocalShop24. Fermé le lundi ; confirmez auprès du local.','Diner, dinsdag–zondag 18–22 volgens LocalShop24. Maandag gesloten; bevestig bij de zaak.','Kolacja, wtorek–niedziela 18–22 według LocalShop24. Poniedziałek zamknięte; potwierdź w lokalu.','Cină, marți–duminică 18–22 conform LocalShop24. Luni închis; confirmă la local.'],
    aaronGuide:['Gelato e torte artigianali. Diverse recensioni apprezzano gusti e cortesia, ma i giudizi non sono tutti concordi.','Artisan ice cream and cakes. Several reviews praise flavours and service, though opinions vary.','Handwerkliches Eis und Torten. Mehrere Bewertungen loben Sorten und Freundlichkeit, die Meinungen sind jedoch gemischt.','Glaces et gâteaux artisanaux. Plusieurs avis apprécient les saveurs et l’accueil, mais les opinions varient.','Ambachtelijk ijs en taarten. Verschillende reviews prijzen smaken en service, maar meningen verschillen.','Rzemieślnicze lody i ciasta. Kilka opinii chwali smaki i obsługę, choć zdania są podzielone.','Înghețată și torturi artizanale. Mai multe recenzii apreciază gusturile și amabilitatea, dar părerile diferă.'],
    aaronHours:['Pausa dolce di giorno e la sera. Gli orari pubblicati variano: controlla la scheda, anche per le aperture stagionali.','A sweet break during the day or evening. Published hours vary: check the listing, including seasonal opening.','Eine süße Pause tagsüber oder abends. Veröffentlichte Zeiten variieren; Eintrag und saisonale Öffnung prüfen.','Une pause sucrée en journée ou en soirée. Horaires variables selon les sources ; vérifiez aussi l’ouverture saisonnière.','Een zoete pauze overdag of ’s avonds. Gepubliceerde tijden verschillen; controleer ook seizoensopening.','Słodka przerwa w ciągu dnia lub wieczorem. Podane godziny się różnią; sprawdź także otwarcie sezonowe.','O pauză dulce ziua sau seara. Programul publicat variază; verifică și deschiderea sezonieră.'],
    coffeeNearby:['Altri bar nelle vicinanze','Other nearby cafés','Weitere Cafés in der Nähe','Autres cafés à proximité','Andere cafés in de buurt','Inne kawiarnie w pobliżu','Alte cafenele în apropiere']
  };
  Object.assign(rows,{
  "foodTreat": [
    "Gelateria",
    "Ice cream shop",
    "Eisdiele",
    "Glacier",
    "IJssalon",
    "Lodziarnia",
    "Gelaterie"
  ],
  "buildingEntrancePhoto": [
    "Ingresso del palazzo",
    "Building entrance",
    "Hauseingang",
    "Entrée de l’immeuble",
    "Ingang van het gebouw",
    "Wejście do budynku",
    "Intrarea în clădire"
  ],
  "buildingEntranceHint": [
    "La foto dell’ingresso del palazzo sarà disponibile qui.",
    "The building entrance photo will appear here.",
    "Hier erscheint das Foto des Hauseingangs.",
    "La photo de l’entrée de l’immeuble sera disponible ici.",
    "Hier komt de foto van de ingang van het gebouw.",
    "Tutaj będzie zdjęcie wejścia do budynku.",
    "Fotografia intrării în clădire va apărea aici."
  ],
  "apartmentDoorPhoto": [
    "Porta dell’appartamento",
    "Apartment door",
    "Wohnungstür",
    "Porte de l’appartement",
    "Deur van het appartement",
    "Drzwi do mieszkania",
    "Ușa apartamentului"
  ],
  "apartmentDoorHint": [
    "La foto della porta di OPENDOOR sarà disponibile qui.",
    "The photo of the OPENDOOR door will appear here.",
    "Hier erscheint das Foto der OPENDOOR-Wohnungstür.",
    "La photo de la porte d’OPENDOOR sera disponible ici.",
    "Hier komt de foto van de deur van OPENDOOR.",
    "Tutaj będzie zdjęcie drzwi OPENDOOR.",
    "Fotografia ușii OPENDOOR va apărea aici."
  ],
  "checkinIntro": [
    "Dal portone del palazzo alla porta dell’appartamento.",
    "From the building entrance to your apartment door.",
    "Vom Hauseingang bis zur Wohnungstür.",
    "De l’entrée de l’immeuble à la porte de l’appartement.",
    "Van de ingang van het gebouw tot de deur van het appartement.",
    "Od wejścia do budynku do drzwi mieszkania.",
    "De la intrarea în clădire până la ușa apartamentului."
  ],
  "arrivalIntro": [
    "Indirizzo, percorso e parcheggio per raggiungere OPENDOOR.",
    "Address, directions and parking for OPENDOOR.",
    "Adresse, Anfahrt und Parkmöglichkeiten für OPENDOOR.",
    "Adresse, itinéraire et stationnement pour rejoindre OPENDOOR.",
    "Adres, route en parkeren bij OPENDOOR.",
    "Adres, dojazd i parking przy OPENDOOR.",
    "Adresă, traseu și parcare pentru OPENDOOR."
  ],
  "backArrival": [
    "Torna a Come arrivare",
    "Back to directions",
    "Zurück zur Anfahrt",
    "Retour à l’itinéraire",
    "Terug naar de route",
    "Wróć do dojazdu",
    "Înapoi la indicații"
  ],
  "nobleCategory": [
    "Cucina & cocktail bar",
    "Food & cocktail bar",
    "Küche & Cocktailbar",
    "Cuisine & bar à cocktails",
    "Eten & cocktailbar",
    "Kuchnia i cocktail bar",
    "Bucătărie și cocktail bar"
  ],
  "nobleGuide": [
    "Hamburger creativi, piadine, birre e cocktail. Le recensioni consultate apprezzano cucina e accoglienza. Locale piccolo e informale; per una cena con bambini, verifica disponibilità e proposte.",
    "Creative burgers, piadina flatbreads, beers and cocktails. Reviewed feedback praises the food and welcome. A small, informal venue; check availability and food options when dining with children.",
    "Kreative Burger, Piadine, Bier und Cocktails. Gelesene Bewertungen loben Essen und Gastfreundschaft. Kleines, ungezwungenes Lokal; bei einem Essen mit Kindern Plätze und Speisen erfragen.",
    "Burgers créatifs, piadines, bières et cocktails. Les avis consultés apprécient la cuisine et l’accueil. Petit établissement décontracté ; avec des enfants, vérifiez les places et les plats proposés.",
    "Creatieve burgers, piadina’s, bier en cocktails. Geraadpleegde reviews prijzen het eten en de ontvangst. Kleine, informele zaak; controleer beschikbaarheid en gerechten als je met kinderen eet.",
    "Pomysłowe burgery, piadiny, piwa i koktajle. Sprawdzone opinie chwalą kuchnię i obsługę. Mały, swobodny lokal; na kolację z dziećmi sprawdź dostępność miejsc i dań.",
    "Burgeri creativi, piadine, bere și cocktailuri. Recenziile consultate apreciază mâncarea și primirea. Local mic și informal; pentru cină cu copii, verifică locurile și preparatele disponibile."
  ],
  "nobleHours": [
    "Cena dalle 19. Mercoledì chiuso secondo Restaurant Guru. L’orario di chiusura del locale non coincide necessariamente con quello della cucina: chiama per conferma.",
    "Dinner from 19:00. Closed Wednesday according to Restaurant Guru. Kitchen closing times may differ from bar hours; call to confirm.",
    "Abendessen ab 19 Uhr. Laut Restaurant Guru mittwochs geschlossen. Die Küche kann früher schließen als die Bar; bitte anrufen.",
    "Dîner à partir de 19 h. Fermé le mercredi selon Restaurant Guru. La cuisine peut fermer avant le bar ; appelez pour confirmer.",
    "Diner vanaf 19.00 uur. Volgens Restaurant Guru woensdag gesloten. De keuken kan eerder sluiten dan de bar; bel ter bevestiging.",
    "Kolacja od 19:00. Według Restaurant Guru w środę zamknięte. Kuchnia może zamykać się wcześniej niż bar; zadzwoń, aby potwierdzić.",
    "Cină de la ora 19. Miercuri închis conform Restaurant Guru. Bucătăria se poate închide mai devreme decât barul; sună pentru confirmare."
  ],
  "nobleBudget": [
    "Fascia indicata nelle recensioni recenti. Listino del menu non verificato; bevande ed extra possono cambiare il conto.",
    "Range reported in recent reviews. Menu prices not verified; drinks and extras may change the total.",
    "Preisspanne laut neueren Bewertungen. Speisekartenpreise nicht verifiziert; Getränke und Extras können den Betrag verändern.",
    "Fourchette indiquée dans les avis récents. Prix de la carte non vérifiés ; boissons et suppléments peuvent modifier l’addition.",
    "Prijsklasse uit recente reviews. Menuprijzen niet geverifieerd; drankjes en extra’s kunnen het totaal veranderen.",
    "Przedział z niedawnych opinii. Ceny w menu niezweryfikowane; napoje i dodatki mogą zmienić rachunek.",
    "Interval indicat în recenzii recente. Prețurile meniului nu sunt verificate; băuturile și extraopțiunile pot schimba totalul."
  ]
});
  const previousLabels={"foodTreat": ["Gelato", "Ice cream", "Eis", "Glaces", "IJs", "Lody", "Înghețată"], "checkinIntro": ["Ecco come arrivare ed entrare, passo dopo passo.", "You’re here. Here’s how to get in, step by step.", "Du bist angekommen. So kommst du hinein, Schritt für Schritt.", "Voici comment arriver et accéder au logement, étape par étape.", "Je bent er. Zo kom je binnen, stap voor stap.", "Jesteś na miejscu. Oto jak wejść, krok po kroku.", "Ai ajuns. Iată cum intri, pas cu pas."]};
  const rg='https://restaurantguru.it/';
  const tanino='https://www.tripadvisor.it/Restaurant_Review-g1973849-d3259362-Reviews-Tanino-Pegognaga_Province_of_Mantua_Lombardy.html';
  const azzoni='https://www.tripadvisor.it/Restaurant_Review-g1973849-d4040848-Reviews-Trattoria_Azzoni-Pegognaga_Province_of_Mantua_Lombardy.html';
  const profiles={
    'Fastidia':{id:'fastidia',summary:'fastidiaGuide',hours:'fastidiaHours',price:'€1–10',budget:'sourceRange',phone:'+393286679712',groups:['coffee'],rating:{value:4.5,count:132,provider:'Google · Restaurant Guru',url:rg+'Fastidia-Cafe-Pegognaga'},sources:[{label:'Restaurant Guru',url:rg+'Fastidia-Cafe-Pegognaga'},{label:'TuttiAffari',url:'https://www.tuttiaffari.com/fastidia-328-667-9712'}]},
    'Ristorante Pizzeria Il Tanino':{id:'tanino',summary:'taninoGuide',hours:'taninoHours',price:'€12–22',budget:'taninoBudget',phone:'+390376558346',groups:['meals'],menu:'https://iltanino.it/',rating:{value:4,count:134,provider:'Tripadvisor',url:tanino},sources:[{label:'Il Tanino · menu',url:'https://iltanino.it/ristorante-ok/'},{label:'Il Tanino · pizza',url:'https://iltanino.it/pizzeria/'},{label:'Il Tanino · pranzo',url:'https://iltanino.it/pranzo-di-lavoro/'},{label:'Il Tanino · bevande',url:'https://iltanino.it/bevande/'},{label:'Tripadvisor',url:tanino}]},
    'Trattoria Azzoni':{id:'azzoni',summary:'azzoniGuide',hours:'azzoniHours',price:'€10–20',budget:'sourceRange',phone:'+393456304556',groups:['meals'],rating:{value:3.8,count:87,provider:'Tripadvisor',url:azzoni},sources:[{label:'Restaurant Guru',url:rg+'Trattoria-Azzoni-Zona-Industriale-Polesine'},{label:'Tripadvisor',url:azzoni}]},
    'Mai Dire Pizza':{"id": "mai", "summary": "maiGuide", "hours": "maiHours", "price": "€1–10", "budget": "sourceRange", "phone": "+393441537944", "groups": ["takeaway"], "rating": {"value": 4.7, "count": 81, "provider": "Google · Restaurant Guru", "url": "https://restaurantguru.it/MAI-DIRE-PIZZA-DI-FERRARI-DIEGO-and-PILIERO-DOMENICO-SNC-Pegognaga"}, "sources": [{"label": "Restaurant Guru", "url": "https://restaurantguru.it/MAI-DIRE-PIZZA-DI-FERRARI-DIEGO-and-PILIERO-DOMENICO-SNC-Pegognaga"}]},
    'Pinko 2':{id:'pinko',summary:'pinkoGuide',hours:'pinkoHours',price:'€1–10',budget:'sourceRange',phone:'+393453010444',groups:['takeaway'],rating:{value:4.5,count:132,provider:'Google · Restaurant Guru',url:rg+'Pinko-2-Pegognaga'},sources:[{label:'Restaurant Guru',url:rg+'Pinko-2-Pegognaga'},{label:'LocalShop24',url:'https://www.localshop24.com/it/pegognaga-mn-it/attivita/pizzeria/pizzeria-pinko-2-da-asporto-e-consegna-a-domicilio/'}]},
    'Gelateria Artigianale Aaron':{id:'aaron',summary:'aaronGuide',hours:'aaronHours',price:'€1–10',budget:'sourceRange',groups:['treat'],rating:{value:4.3,count:135,provider:'Google · Restaurant Guru',url:rg+'Gelateria-Artigianale-Pegognaga'},sources:[{label:'Restaurant Guru',url:rg+'Gelateria-Artigianale-Pegognaga'},{label:'TuttiAffari',url:'https://www.tuttiaffari.com/gelateria-artigianale-aaron_1y-0376-559419'}]}
  };
  function normalize(data){
    for(const [key,values] of Object.entries(rows))for(const [i,language] of languages.entries())if(data.strings?.[language]&&!Object.hasOwn(data.strings[language],key))data.strings[language][key]=values[i];
    for(const [key,values] of Object.entries(previousLabels))for(const [i,language] of languages.entries())if(data.strings?.[language]?.[key]===values[i])data.strings[language][key]=rows[key][i];
    data.modules.checkinPhotos??={"items": [{"id": "building-entrance", "titleKey": "buildingEntrancePhoto", "hintKey": "buildingEntranceHint", "src": null}, {"id": "apartment-door", "titleKey": "apartmentDoorPhoto", "hintKey": "apartmentDoorHint", "src": null}]};
    data.property.firstAidLocation??=null;
    for(const place of data.localFood||[])if(!place.guide&&profiles[place.name])place.guide={...JSON.parse(JSON.stringify(profiles[place.name])),checked:'2026-10-06'};
    if(!data.houseManual.some(item=>item.id==='rest'))data.houseManual.push({id:'rest',icon:'bed',enabled:true,instructions:['restText']});
    return data;
  }
  globalThis.OpendoorJourney={normalize};
})();
