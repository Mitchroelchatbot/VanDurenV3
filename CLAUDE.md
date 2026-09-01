# CLAUDE.md — Bouwopdracht website Van Duren Indoor Padel Centrum

> Dit bestand is de **enige bron van waarheid** voor de bouw van de nieuwe website.
> Claude Code leest dit bestand automatisch bij elke sessie zolang het in de root van
> de projectmap staat. Wijk hier niet van af zonder dat de wijziging eerst in dit
> bestand is vastgelegd.
>
> Laatst bijgewerkt: 1 september 2026 (v2 — open punten O1 t/m O9 gesloten)
> Opdrachtgever: Mitch Bastiaans (Mr Hostly) · Klant: Martin & Bennet van Duren

---

## 0. Hoe je als agent te werk gaat

1. **Lees eerst `docs/feedback-eigenaren.md`** (de letterlijke wensen van Bennet &
   Martin). Dit bestand is de vertaling daarvan naar bouwinstructies; bij twijfel
   wint de letterlijke feedback.
2. **Bouw in fases** (zie §10). Lever elke fase apart op en wacht op akkoord.
   Bouw niet de hele site in één keer.
3. **Verzin geen content.** Alles wat je niet zeker weet komt uit §11 (open punten)
   en zet je in de code als `<!-- TODO: … -->` plus een regel in `docs/OPEN.md`.
   Placeholder-content die er echt uitziet is verboden — dat is precies hoe de
   vorige versie met een nep-KvK-nummer en verzonnen toernooidata live dreigde te gaan.
4. **Elke commit is klein en beschrijft één ding.** Nederlands commit-bericht.
5. **Na elke fase:** draai de checklist uit §9 en rapporteer wat faalt.

---

## 1. Wat we bouwen en waarom

Een nieuwe publieke website voor het padelcentrum van Martin en Bennet van Duren in
Son en Breugel. Er staat al een prototype (`03 — Website Bestanden/site/`) én een
live site op `indoorpadelcentrum.nl`. Beide worden **niet verbouwd maar opnieuw
opgebouwd**; teksten, tarieven en foto's worden hergebruikt, de code niet.

**Het doel van de site in één zin:** zoveel mogelijk boekingen en aanvragen
afhandelen zónder dat Martin of Bennet een mail hoeven te beantwoorden.

Dat is de meetlat. Elke keuze in het ontwerp beantwoord je met: *scheelt dit
mailverkeer, of veroorzaakt het juist mailverkeer?*

**Succesmaatstaven (na 3 maanden live):**

| Maatstaf | Nu | Doel |
|---|---|---|
| Aanvragen die binnenkomen als volledig ingevuld formulier i.p.v. losse mail | 0% | > 80% |
| Gemiddeld aantal mails heen-en-weer per clinic-aanvraag | 4–6 | ≤ 1 |
| Lighthouse Performance (mobiel) | onbekend | ≥ 90 |
| Vindbaarheid op "padelbaan huren Son" / "indoor padel Eindhoven" | onbekend | pagina 1 |

---

## 2. Vaste beslissingen (niet meer ter discussie)

| # | Beslissing | Toelichting |
|---|---|---|
| B1 | **Alleen Nederlands in v1.** EN/ES later. | Architectuur wordt wél nu al meertalig-klaar gemaakt (§4). |
| B2 | **Opnieuw bouwen**, content en tarieven uit de bestaande sites hergebruiken. | De feedback raakt navigatie, kleuren, informatiearchitectuur én contentstructuur. |
| B3 | **Aanvragen lopen via een formulier met doorvraagstappen**, niet via `mailto:`. | Zie §6. Backend: Netlify Forms. Geen eigen server. |
| B4 | **Twee namen, strikt gescheiden.** Bedrijf = *Van Duren Indoor Padel Centrum*. Lesprogramma = *Padel Academy van Duren*. | Akkoord eigenaren. Onderbouwing en schrijfregels in §3. |
| B5 | **Geen groen/lime meer.** Palet komt uit het logo én uit de hal. | Zie §5. |
| B6 | **Nieuwsbrief verdwijnt volledig** — pagina, footerblok, alle links. | Expliciete wens eigenaren. |
| B7 | **Geen CMS, wél een redactiebron voor de agenda.** De evenementenagenda komt uit een Google Sheet die Bennet zelf bijhoudt; al het andere staat in bestanden in de repo. | Zie §4.3. Vier tot tien evenementen per jaar rechtvaardigen geen admin-paneel. |
| B8 | **Lessen: alleen openbare groepslessen gaan via Playtomic.** Proefles en privéles lopen via een aanvraagformulier. | Playtomic ondersteunt alleen open inschrijving; 1-op-1 en proeflessen niet. Zie §6.3. |

---

## 3. Merk, naam en schrijfwijze

Bennet & Martin twijfelden tussen drie namen en vroegen om SEO-onderzoek. De
uitkomst is geen keuze tussen de drie maar een splitsing, en die is akkoord:

| Wat | Naam | Waar |
|---|---|---|
| Het bedrijf | **Van Duren Indoor Padel Centrum** | `<title>`, header-wordmark, footer, schema.org, alle externe vermeldingen |
| Het lesprogramma | **Padel Academy van Duren** | Uitsluitend op `/lessen` en in les-gerelateerde CTA's |

**Waarom het bedrijf "Indoor Padel Centrum" heet:**

1. **Die naam draagt de vindbaarheid.** Domein `indoorpadelcentrum.nl`, e-mailadres
   `vanduren@indoorpadelcentrum.nl`, Playtomic-slug `van-duren-indoor-padel-centrum`,
   Facebook "Van Duren indoor padelcentrum", KvK "Van Duren indoor padel centrum BV",
   plus padelgids.nl, padelguide.eu, actu-padel.com en uitjesenactiviteiten.nl. Voor
   lokale SEO telt NAP-consistentie (Name, Address, Phone) over al die vermeldingen
   zwaar mee.
2. **Zoekintentie zit in "indoor padel", niet in "academy".** Mensen zoeken op
   `padelbaan huren`, `indoor padel [plaats]`, `padel Son en Breugel`. "Academy" is
   een merkwoord zonder zoekvolume.
3. **Het beschrijft de hoofdomzet.** Baanhuur, niet lessen.

**Nuance, eerlijk gehouden:** de huidige *eigen* website presenteert zich wél als
"Padel Academy van Duren", en in de hal hangt het bord "PADEL ACADEMY VAN DUREN —
powered by Babolat". Online is het beeld dus niet zo eenduidig als de directory-lijst
suggereert. Precies daarom de splitsing hierboven: het bord hangt boven de lesbanen
en klopt daar, en de commerciële naam waar de eigenaren aan hechten voor het
verkopen van lessen blijft in stand — zonder de vindbaarheid van de baanhuur op te
offeren.

**Schrijfregels (hard, controleerbaar met grep):**

- Bedrijfsnaam altijd voluit: `Van Duren Indoor Padel Centrum`.
  Niet "vanDuren", niet "Padel Centrum van Duren", niet "Indoorpadel Centrum".
- Lesprogramma altijd: `Padel Academy van Duren` — in die woordvolgorde, "van" klein.
  Niet "Van Duren Padel Academy".
- `Padel Academy` mag alleen voorkomen in `src/content/nl/lessen.*` en in de
  navigatielabel van `/lessen`. Nergens anders in `src/`.
- Header-wordmark: **Van Duren** groot, **Indoor Padel Centrum** klein eronder.
- `<title>` homepage: `Van Duren Indoor Padel Centrum — Padelbaan huren in Son en Breugel`
- `<title>` lessen: `Padel Academy van Duren — Padellessen in Son en Breugel`

Leg dit vast in `docs/schrijfwijze.md`.

---

## 3.1 Bedrijfsgegevens (geverifieerd, gebruik exact deze)

Deze gegevens komen van de live site `indoorpadelcentrum.nl` en zijn leidend voor
footer, contactpagina, schema.org en Google Business Profile.

```
Bedrijfsnaam   Van Duren Indoor Padel Centrum
Bezoekadres    Rooijse weg 7, 5691 PA Son en Breugel
Parkeeradres   Vlielandlaan 12, 5691 ZK Son en Breugel
Telefoon       06-19154409          (voorlopig; zie O3)
E-mail         vanduren@indoorpadelcentrum.nl
KvK            82978344
BTW            NL862678274B01
Openingstijden ma t/m vr  09:00 – 23:00
               za en zo   09:00 – 17:00
Playtomic      https://playtomic.io/van-duren-indoor-padel-centrum/a52205f6-6954-4d82-bda0-b2040fc82dc4
```

**Let op:** het prototype in `03 — Website Bestanden/site/` bevat op elk van deze
punten fouten — adres Wolverstraat 2, KvK 12345678, openingstijden 08:00–23:00 en
weekend tot 22:00. Neem daar niets van over. Het parkeeradres is een apart adres en
hoort zichtbaar op `/over-ons`; bezoekers die op Rooijse weg 7 navigeren staan
verkeerd.

---

## 4. Techniek

**Stack:** Astro 5 + eigen CSS (design tokens als CSS-variabelen). Geen Tailwind,
geen React, geen build-complexiteit die niemand later kan onderhouden.

Waarom Astro terwijl v1 alleen Nederlands is: het levert platte statische HTML op
(dus dezelfde snelheid en SEO als nu), maar layout en content zijn gescheiden. Eén
prijswijziging = één regel in één bestand in plaats van elf HTML-pagina's. En als
EN/ES er later bij komen is dat een contentmap erbij, geen herbouw.

### 4.1 Mapstructuur

```
/
├── CLAUDE.md                  ← dit bestand
├── docs/
│   ├── feedback-eigenaren.md  ← letterlijke wensen Bennet & Martin
│   ├── schrijfwijze.md        ← naam, tone of voice, terminologie
│   └── OPEN.md                ← open punten, bijgewerkt door de agent
├── src/
│   ├── content/nl/            ← ALLE teksten, prijzen, FAQ (md/json)
│   │   ├── bedrijf.json       ← §3.1, één bron voor footer + schema
│   │   ├── tarieven.json      ← §4.2
│   │   ├── lessen.json
│   │   ├── faq.json
│   │   ├── sponsoren.json
│   │   └── evenementen.json   ← gegenereerd, zie §4.3
│   ├── components/            ← Header, Footer, Hero, PrijsKaart, Wizard, …
│   ├── layouts/BasisLayout.astro
│   ├── pages/                 ← routes, bevatten géén losse tekst
│   └── styles/tokens.css      ← design tokens, single source of truth
└── public/
    ├── beeld/                 ← geoptimaliseerde foto's (webp/avif)
    └── video/
```

**Harde regel:** in `src/pages/` en `src/components/` staat **geen** zichtbare
Nederlandse tekst, geen prijs en geen datum. Alles komt uit `src/content/nl/`.
Dit is wat meertaligheid later goedkoop maakt. Wijk hier niet van af.

### 4.2 Tarieven — geverifieerd, in `tarieven.json`

Overgenomen van `indoorpadelcentrum.nl/tarieven/` en `/tarieven-lessen/`, door
Mitch bevestigd op 1 september 2026.

**Baanhuur**

| | Per uur | Per 1,5 uur |
|---|---|---|
| Daluren (vanaf 09:00) | € 28 | € 42 |
| Piekuren (ma–vr 18:30–22:30) | € 36 | € 54 |

Baan 1 en 2 zijn te huren per 1,5 uur; baan 3 en 4 alleen per heel uur, startend
op het hele uur. Dit is praktische informatie die op `/banen` hoort.

**Contractbaan**

| | 6 maanden (20–26×) | 12 maanden (45–52×) |
|---|---|---|
| Daluren, 1 uur | € 450 | € 850 |
| Daluren, 1,5 uur | € 675 | € 1.275 |
| Piekuren, 1 uur | € 650 | € 1.250 |
| Piekuren, 1,5 uur | € 975 | € 1.875 |

**Lessen** — alle prijzen incl. baanhuur, materiaal en trainer, 60 minuten,
altijd vooraf betalen.

| Lesvorm | Prijs | Groepsgrootte | Reeksen |
|---|---|---|---|
| Proefles | € 100 per les | 1 tot 4 personen | eenmalig |
| Privéles | € 90 per les | 1-op-1 | 5, 8 of 10 lessen |
| Groepsles | € 70 daluren / € 90 piekuren | 2, 3 of 4 personen | 5, 8 of 10 lessen |

### 4.3 Wie past de agenda aan — antwoord op O7

De vraag was of een simpele redactiepagina te bouwen is. Kan wel, maar een
admin-paneel met login, gebruikersbeheer en een database voor **vier tot tien
evenementen per jaar** is niet in verhouding. Gekozen oplossing:

**Bennet houdt de agenda bij in een Google Sheet.** Kolommen: `datum`, `eindtijd`,
`type`, `titel`, `omschrijving`, `inschrijflink`, `zichtbaar`. Bij elke build haalt
Astro dat blad op (gepubliceerd als CSV) en schrijft het naar `evenementen.json`.
Een dagelijkse rebuild op Netlify plus een handmatige "publiceer nu"-knop is genoeg.

Waarom dit en geen CMS: geen inlogsysteem om te onderhouden, geen extra
afhankelijkheid, en Bennet werkt in een programma dat hij al kent. Als er later
tóch behoefte is aan meer redactie (bijv. prijzen of teksten), dan pas een
git-gebaseerde CMS overwegen — niet nu, en niet ongevraagd.

Bouw de agenda-import als één apart scriptje met een duidelijke fallback: is het
blad onbereikbaar of leeg, dan rendert de pagina het lege-staat-blok uit §7.5 en
faalt de build niet.

### 4.4 Hosting

Netlify. Automatische deploy vanaf de `main` branch. Domein
`indoorpadelcentrum.nl` blijft. Oude URL's 301-redirecten naar de nieuwe structuur —
inclusief de nieuwsbriefpagina, die naar de homepage gaat.

---

## 5. Design & kleur

### 5.1 Palet

Het logo bevat twee kleuren; die zijn leidend. Het lime `#c3f400` uit het prototype
is **verboden** — dat is precies waar de eigenaren over vielen.

```css
:root {
  /* Merk — direct uit Logo.png gemeten */
  --blauw:        #1d3d90;   /* primair, diep blauw */
  --blauw-diep:   #142a64;   /* hover / donkerder vlak */
  --oranje:       #dd4c13;   /* accent, oranjerood — CTA's */
  --oranje-warm:  #f0682f;   /* hover op oranje */

  /* Neutraal */
  --inkt:         #14161c;
  --grijs-900:    #1e2129;
  --grijs-500:    #6b7280;
  --grijs-100:    #f2f3f5;
  --wit:          #ffffff;
}
```

**Gebruik:**

- Oranje `--oranje` is uitsluitend voor de primaire actie ("Boek een baan").
  Eén oranje knop per scherm — anders werkt hij niet meer.
- Blauw is de dragende kleur: header, vlakken, koppen.
- **Het palet klopt met de hal.** In het videomateriaal is te zien dat de banen
  blauw zijn met een oranje/terracotta omloop. Blauw + oranje is niet alleen het
  logo, het is letterlijk wat de bezoeker ziet als hij binnenloopt.
- Contrast: elke tekst/achtergrond-combinatie haalt WCAG AA (4.5:1). Let op:
  wit op `--oranje` haalt dit **net niet** — gebruik daar `--inkt` als tekstkleur
  of een donkerdere oranje. Controleer dit, ga er niet van uit.

### 5.2 Beeld

De eigenaren willen **veel meer foto's, en het liefst video** — Padel Boxtel is de
referentie. Beeld is hier geen decoratie maar de belangrijkste overtuiging.

**Inventarisatie videomateriaal (gecontroleerd, 1 september 2026):**

| Bestand | Formaat | Duur | Bruikbaar als |
|---|---|---|---|
| `Van_Duren_Versie_1a.mp4` | 254 MB, specificaties nog niet geverifieerd | ? | **Enige kandidaat voor de hero.** Moet eerst gecontroleerd worden, zie O14 |
| `Fotos van Bennet/4776981e….MP4` | 480×864 staand, 1,6 Mbit | 27 s | Niet bruikbaar. Te lage resolutie, en er zit een herkenbaar kind prominent in beeld (O10) |
| `Fotos van Bennet/e75c590e….MP4` | 1280×720 met rotatie −90°, dus **staand** | 25 s | Alleen als staande clip in een mobiel blok. Telefoonopname door het glas. Nooit als desktop-hero |

**Conclusie: er is op dit moment geen bevestigd geschikt hero-materiaal.** Ga er
niet vanuit dat `Van_Duren_Versie_1a.mp4` liggend, scherp en rechtenvrij is —
controleer dat vóór fase 1 begint. Als het niet klopt, is de hero een sterke foto
en wordt er nieuw materiaal geschoten. Bouw de hero-component daarom zo dat
`video` een optioneel veld is en de poster-afbeelding altijd werkt.

**Verwerking van de hero-video (zodra goedgekeurd):**

- comprimeer naar max. 6 MB, 1920×1080, H.264 `.mp4` + `.webm`;
- achtergrondloop: `muted autoplay loop playsinline`, met `poster`-afbeelding zodat
  er nooit een leeg vlak staat;
- respecteer `prefers-reduced-motion` — dan alleen de poster;
- laad hem niet op mobiel onder 768px; daar de poster.

**Foto's:** HEIC converteren naar WebP/AVIF. Alle foto's in twee maten
(mobiel/desktop), `loading="lazy"` behalve de eerste boven de vouw. Elke foto krijgt
een beschrijvende `alt`-tekst. Geen "sfeerbeeld".

### 5.3 Typografie

**Lexend** voor koppen, **Inter** voor lopende tekst. Zelf hosten (`.woff2` in
`public/`), niet via Google Fonts — scheelt een cookiebanner-discussie en een
externe request.

---

## 6. Formulieren: het hart van de opdracht

Alles wat nu "mail je aanvraag" is, wordt een korte wizard van 3 tot 4 stappen.
De aanvraag komt bij Bennet en Martin binnen als **één complete mail** met alle
antwoorden, zodat ze kunnen antwoorden met een voorstel in plaats van met een vraag.

**Gedeelde eisen voor alle formulieren:**

- Werkt zonder JavaScript (progressive enhancement); met JS wordt het een wizard.
- Eén vraag of vraaggroep per stap, voortgangsbalk bovenaan.
- Verplichte velden altijd: naam, e-mail, telefoon.
- Honeypot-veld tegen spam. Geen captcha (drempel).
- Bevestigingsscherm mét samenvatting van wat is ingestuurd, plus een
  automatische bevestigingsmail naar de aanvrager.
- Ingestuurde data ook wegschrijven naar de Netlify-formulierinbox, zodat er een
  overzicht is dat niet in een mailbox verdwijnt.

### 6.1 Clinic-aanvraag (`/clinics`)

Startkeuze — drie kaarten: **Bedrijf / Vriendengroep / Kinderfeestje**. De keuze
bepaalt de vervolgvragen.

| Stap | Vraag | Type |
|---|---|---|
| 1 | Wat voor groep? | Bedrijf · Vrienden · Kinderfeestje |
| 2 | Met hoeveel personen? | Aantal (4–48) |
| 3 | Wanneer ongeveer? | Datum + dagdeel + "flexibel" optie |
| 4 | Ervaring in de groep? | Nooit gespeeld · Gemengd · Ervaren |
| 5 | Horeca erbij? | Niets · Borrel · Lunch · Diner |
| 6 | Bij "Bedrijf": factuur op rekening? | Ja/nee + factuurgegevens |
| 7 | Contactgegevens + opmerking (ook: "eigen idee") | Tekst |

**Het blok "Zo werkt het" (stap 1 t/m 4) van de huidige clinicspagina verwijderen** —
dat legt het mailproces uit dat we juist afschaffen.

### 6.2 Contractbaan-aanvraag (`/banen`)

Expliciete wens: eerst doorvragen, dan pas contact. Toon de tarieventabel uit §4.2
naast of boven het formulier, zodat de aanvrager al weet waar hij aan toe is.

| Stap | Vraag |
|---|---|
| 1 | Welke dag(en) van de week heb je in gedachten? |
| 2 | Welk tijdslot? (daluren / piekuren / specifiek tijdstip) |
| 3 | 1 uur of 1,5 uur? (1,5 uur = baan 1 of 2) |
| 4 | 6 of 12 maanden? |
| 5 | Met hoeveel vaste spelers? |
| 6 | Contactgegevens |

### 6.3 Lessen (`/lessen`) — antwoord op O1

Playtomic ondersteunt lesboekingen, **maar alleen voor openbare lessen met open
inschrijving.** Proeflessen en privélessen kunnen daar niet doorheen. Daarom:

| Lesvorm | Route | CTA |
|---|---|---|
| **Groepsles** (openbaar, open inschrijving) | Playtomic | "Bekijk beschikbare groepslessen" → directe Playtomic-link |
| **Proefles** | Aanvraagformulier | "Plan een proefles" |
| **Privéles** | Aanvraagformulier | "Privéles aanvragen" |

Het lesformulier (proefles + privéles) is kort: lesvorm, niveau (nooit gespeeld /
beginner / gevorderd), voorkeursdagdelen, aantal personen, contactgegevens.
**Geen `mailto:` — nergens op deze pagina.**

Bouw de CTA per lesvorm als één veld in `lessen.json`: `playtomicUrl` óf `formulier`.
Verschuift Playtomic later van beleid, dan is omschakelen één regel.

### 6.4 WhatsApp

Zwevende WhatsApp-knop rechtsonder op elke pagina, `wa.me`-link met een
vooringevulde tekst per pagina ("Hoi! Ik heb een vraag over een clinic…").
Op mobiel altijd zichtbaar, op desktop iets kleiner.
Nummer voorlopig **0619154409** (`https://wa.me/31619154409`) — zet het als één
variabele in `bedrijf.json`, want dit nummer wordt mogelijk vervangen (O3).

---

## 7. Sitemap en wat er per pagina moet gebeuren

Volgorde in de navigatie is een expliciete wens: **Over ons & contact staan
helemaal achteraan.**

```
/                    Home
/banen               Baanhuur
/lessen              Lessen        (= "Padel Academy van Duren")
/clinics             Clinics & bedrijven
/evenementen         Evenementen
/spelregels          FAQ + padelregels (samengevoegd!)
/sponsoren           Sponsoren
/over-ons            Over ons & contact (samengevoegd, laatste item)
```

Vervalt: `/nieuwsbrief` (301 → `/`), losse `/team` (gaat op in `/over-ons`),
losse `/faq` en `/regels` (worden `/spelregels`).

### 7.1 Home

Moet bevatten, in deze volgorde:

1. Hero met **video** en één duidelijke primaire actie: **Boek een baan**.
2. Direct daaronder, even prominent: **Bekijk het lesaanbod**.
3. Kort, persoonlijk stuk over de club en over Martin & Bennet — met foto van
   henzelf, niet met een stockachtig sfeerbeeld. Dit is het onderscheidende
   element ten opzichte van Padel Boxtel: een familiebedrijf.
4. Beeldblok met foto's uit de hal.
5. Subtiele sponsorbalk onderaan (zie §7.9).

Weg: alles wat naar de nieuwsbrief verwijst.

### 7.2 Banen

- **Bovenaan direct de drie opties**: Losse boeking · VIP-daluren lidmaatschap ·
  Contractbaan. Dit is het eerste wat de bezoeker ziet, niet een introtekst.
- Losse boeking → Playtomic. VIP → uitleg + aanmelding (**inhoud onbekend, zie O15**).
  Contractbaan → wizard §6.2.
- Tarieventabel uit §4.2, inclusief de regel dat baan 1–2 per 1,5 uur gaan en
  baan 3–4 per heel uur.
- **Verwijderen:** het uitlegblok over WPT-banen ("Internationale WPT-kwaliteit,
  indoor…") en de statistiekenbalk (`4 Indoor banen · WPT · 7 dagen · 90 min`).
  Letterlijke wens: "mag weg, niet belangrijk."
- **Toevoegen:** blok over de samenwerking met Babolat.
- Sfeerbeelden onderaan.

### 7.3 Lessen

Kop mag luiden: **Padel Academy van Duren**.

- **Verwijderen:** de verwijzing naar "Babolat Padel Academy Madrid" bovenin.
- **Verwijderen:** de zin dat lessen altijd door Martin en Bennet worden gegeven.
  Vervangen door neutraal: "Onze gediplomeerde trainers."
- Drie opties: Proefles · Privéles · Groepsles, met de prijzen uit §4.2 en de
  routing uit §6.3.
- **Onder** de drie opties één balk met praktische info: wat neem je zelf mee,
  materiaal inbegrepen, altijd vooraf betalen. Nu zit die info verspreid mét
  mailadres.
- Trainers **niet** prominent; verwerken in een rustig blok onderaan of doorlinken
  naar `/over-ons`.
- **Lesvideo's (bajada, smash) bestaan niet.** Bouw de lesvorm-component met een
  optioneel `video`-veld dat nu leeg blijft; geen leeg videovlak renderen. Zet op de
  wenslijst voor een toekomstige opnamedag (O5, gesloten maar genoteerd).

### 7.4 Clinics

Zie §6.1. Verder:

- Drie ingangen als kaarten (Bedrijf / Vrienden / Kinderfeestje), niet als tekst.
- "Eigen idee?" blijft, maar als **laatste vraag in het formulier**, niet als
  mailadres. Letterlijke wens: "Eigen idee, mailen!" — betekent: die mogelijkheid
  moet er zijn, maar hij gaat door dezelfde trechter.

### 7.5 Evenementen

- Agenda-overzicht, gevoed vanuit `evenementen.json` (§4.3).
- **Start leeg.** Alle items op het prototype zijn verzonnen en gaan er integraal
  uit. Bouw een fatsoenlijke lege staat: "Er staat op dit moment geen evenement
  gepland. Wil je op de hoogte blijven? Volg ons op Facebook of Instagram." —
  géén nieuwsbrief-aanmelding.
- Onderaan blok: "Zelf een toernooi organiseren?" → formulier (hergebruik §6.1).

### 7.6 Spelregels (FAQ + padelregels)

Eén pagina, twee secties met een ankermenu bovenaan. FAQ als accordeon, met
`FAQPage`-schema (zie §8). Padelregels eronder, met beeld.

### 7.7 Sponsoren

- Babolat als hoofdpartner. `Martin Glas` staat op de baanborden en is dus een
  echte partner — controleer dat bij Bennet voor je hem opneemt.
- Het logogrid werkt met neutrale plaatsen `Sponsor 1` t/m `Sponsor 8` totdat de
  definitieve lijst er is. Duidelijk grijs vlak met de tekst erin, niet gestileerd
  als een echt logo.
- **De sponsorbalk in de footer (§7.9) rendert niet zolang `sponsoren.json` leeg is.**
  Acht lege vakjes onder elke pagina zetten ziet er onaf uit; een sectie die er
  gewoon niet staat valt niemand op. Bouw de component, laat hem verschijnen zodra
  er logo's zijn.
- "Word sponsor" → formulier, geen mailadres.

### 7.8 Over ons & contact

Samenvoeging van `/team` en `/contact`. Verhaal van het familiebedrijf, de coaches,
en verder alle gegevens uit §3.1: bezoekadres, **apart parkeeradres**,
openingstijden, kaart, contactformulier.

### 7.9 Sponsorbalk in de footer

Expliciete wens: **onderaan de homepage én onderaan elke subpagina subtiel de
sponsoren.** Uitvoering: één rij grijswaarde-logo's boven de footer, die op hover
kleur krijgen, klikbaar naar `/sponsoren`. Maximaal 8 logo's, daarna roteren.
Zie de conditie in §7.7.

---

## 8. SEO, techniek, toegankelijkheid, AVG

**SEO**

- Eén `<h1>` per pagina, met het zoekwoord van die pagina.
- `title` en `meta description` per pagina, uit het contentbestand.
- Schema.org JSON-LD:
  - `SportsActivityLocation` op de homepage — naam, adres en telefoon **exact zoals
    §3.1**, openingstijden, geo, `sameAs` naar Facebook/Instagram/Playtomic;
  - `FAQPage` op `/spelregels`;
  - `Event` per item op `/evenementen`.
- `sitemap.xml` en `robots.txt` automatisch genereren.
- Alle oude URL's 301-redirecten. Geen enkele 404 vanuit een bestaande vermelding.
- **Losse actie buiten de site om:** Google Business Profile, Facebook en Playtomic
  nalopen op naam, adres en openingstijden en gelijktrekken met §3.1.

**Performance**

- Lighthouse mobiel: Performance ≥ 90, Accessibility ≥ 95, SEO = 100.
- LCP < 2,5 s. Herovideo mag de LCP niet zijn — de poster wel.
- Geen externe scripts behalve wat strikt nodig is.

**Toegankelijkheid**

- Volledig met toetsenbord bedienbaar, zichtbare focus-outline.
- Wizard-stappen met `aria-live` zodat schermlezers de stapwissel meekrijgen.
- Contrast AA. Video nooit met geluid, nooit zonder pauzemogelijkheid.

**AVG**

- Formuliergegevens gaan naar een EU-regio. Privacyverklaring en
  verwerkingsgrondslag op `/privacy`.
- Geen analytics-cookies zonder toestemming. Advies: gebruik een cookieloze tool
  (Plausible of Vercel Analytics) — dan is een cookiebanner niet nodig.
- Geen Google Fonts vanaf Google's servers (zie §5.3).

---

## 9. Definition of Done — checklist per fase

Draai deze lijst voor je een fase oplevert en rapporteer per punt.

- [ ] Nergens in de repo komt `#c3f400` of een andere groentint voor.
- [ ] `grep -ri "nieuwsbrief"` geeft nul treffers in `src/`.
- [ ] `grep -ri "mailto:"` geeft nul treffers, behalve op `/over-ons`.
- [ ] `grep -ri "Padel Academy"` komt alleen voor in `lessen.*` en het navigatielabel.
- [ ] `grep -ri "Van Duren Padel Academy"` geeft nul treffers (fout woordvolgorde).
- [ ] Geen "Madrid" op `/lessen`.
- [ ] `grep -ri "Wolverstraat\|12345678"` geeft nul treffers.
- [ ] Adres, KvK, BTW, telefoon en openingstijden komen exact overeen met §3.1.
- [ ] Geen zichtbare tekst, prijs of datum hardcoded in `src/pages` of `src/components`.
- [ ] Elke `<img>` heeft een betekenisvolle `alt`.
- [ ] Geen placeholder die er echt uitziet. Alles wat ontbreekt staat in `docs/OPEN.md`.
- [ ] Lighthouse mobiel gedraaid, scores gerapporteerd.
- [ ] Getest op 375px, 768px en 1440px breed.
- [ ] Elk formulier één keer end-to-end ingestuurd en de ontvangen mail
      gecontroleerd op volledigheid.
- [ ] Alle oude URL's redirecten; handmatig gecontroleerd.

---

## 10. Fasering

| Fase | Inhoud | Klaar als |
|---|---|---|
| **0** | Repo opzetten, Astro, tokens, layout, header/footer, contentstructuur, `bedrijf.json` en `tarieven.json` gevuld. Geen pagina-inhoud. | Lege maar deploybare site met correcte kleuren, naam en navigatie. |
| **1** | Homepage compleet, inclusief video en sponsorbalk. | Eigenaren kunnen naar de homepage kijken en reageren. |
| **2** | `/banen` en `/lessen`, inclusief contractbaan-wizard en lesformulier. | De twee omzetpagina's staan. |
| **3** | `/clinics` met de volledige wizard, plus `/evenementen` incl. Sheet-koppeling. | Aanvragen komen compleet binnen, Bennet kan de agenda vullen. |
| **4** | `/spelregels`, `/sponsoren`, `/over-ons`. | Alle pagina's staan. |
| **5** | SEO, schema, redirects, performance, toegankelijkheid, AVG. | DoD-checklist volledig groen. |

Fase 1 is het beslismoment: laat die aan Bennet en Martin zien vóór fase 2 begint.
Als de richting daar niet klopt, is doorbouwen weggegooid werk.

---

## 11. Open punten

**Gesloten op 1 september 2026:** O1 (Playtomic → §6.3), O2 (prijzen → §4.2),
O3 (nummer voorlopig 0619154409), O4 (agenda leeg + Sheet), O5 (geen lesvideo's),
O6 (placeholders, balk verborgen), O7 (Google Sheet → §4.3), O8 (Rooijse weg 7),
O9 (KvK 82978344 / BTW NL862678274B01), O12 (chatbot niet van toepassing),
O13 (naamsplitsing akkoord → §3).

**Nog open:**

| # | Punt | Blokkeert | Wie |
|---|---|---|---|
| O3b | Komt er een zakelijk telefoonnummer in plaats van 0619154409? Zo ja, één regel in `bedrijf.json` én bijwerken op Google/Playtomic/Facebook. | — | Bennet & Martin |
| O6b | Definitieve sponsorlijst met logo's in vectorformaat. `Martin Glas` staat op de baanborden — bevestigen. | Fase 4 | Bennet & Martin |
| O10 | **Portretrecht.** In `4776981e….MP4` zit een herkenbaar kind prominent in beeld, en op de foto's staan spelers. Voor minderjarigen is schriftelijke toestemming van een ouder nodig. Zonder toestemming: niet publiceren. | Fase 1 | Bennet & Martin |
| O11 | Wie levert de privacyverklaring en algemene voorwaarden? | Fase 5 | Mitch |
| O14 | **Hero-video ongecontroleerd.** `Van_Duren_Versie_1a.mp4` (254 MB): resolutie, beeldverhouding, of er groen/oud logo in beeld zit, wie hem gemaakt heeft en of het gebruiksrecht geregeld is. | Fase 1 | Mitch |
| O15 | **Wat is het VIP-daluren lidmaatschap precies?** De eigenaren noemen het als een van de drie baanopties, maar het staat niet op de tarievenpagina. Prijs, voorwaarden, hoe je lid wordt. | Fase 2 | Bennet & Martin |
| O16 | Facebook- en Instagram-URL's voor de footer en `sameAs` in de schema. | Fase 5 | Bennet & Martin |

---

## 12. Wat je juist níét doet

- Geen "Zo werkt het"-uitleg van een mailproces. Dat proces schaffen we af.
- Geen nieuwsbrief, in geen enkele vorm.
- Geen groene of lime accenten.
- Geen tweede primaire knop naast "Boek een baan" in hetzelfde scherm.
- Geen `mailto:`-links als hoofdactie.
- Geen verzonnen data, namen, prijzen of logo's.
- Geen `Van Duren Padel Academy` — de volgorde is `Padel Academy van Duren`.
- Geen Tailwind, geen React, geen headless CMS.
- De site niet één-op-één laten lijken op padelboxtel.nl. Die is de referentie
  voor *structuur en beeldgebruik*, niet voor het ontwerp. Letterlijke wens:
  "mag hierop lijken maar moet wel wat anders zijn."
