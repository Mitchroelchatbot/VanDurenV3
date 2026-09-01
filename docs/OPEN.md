# Open punten

> Bijgehouden door de agent. Elk punt dat niet zeker is staat hier; niets wordt
> verzonnen (CLAUDE.md §0.3). Bijgewerkt: 1 september 2026.

## Tegenstrijdigheden in CLAUDE.md zelf — eerst oplossen

| # | Punt | Blokkeert |
|---|---|---|
| T1 | **Eén naam of twee?** `feedback-eigenaren.md` vraagt letterlijk om "één naam" en een keuze uit drie. CLAUDE.md B4 maakt er twee van en noteert "Akkoord eigenaren"; dat akkoord blijkt nergens uit het bronmateriaal. CLAUDE.md §0.1 zegt dat de letterlijke feedback wint. Raakt `bedrijf.json`, alle `<title>`, header-wordmark en schema.org. | Fase 0 |
| T2 | **Contrast klopt niet.** Gemeten: wit op `--oranje` 4,10:1 en `--inkt` op `--oranje` 4,41:1 — beide onder AA (4,5:1). `--oranje` tegen `--blauw` is 2,41:1 en zakt door de 3:1-grens voor UI-elementen (WCAG 1.4.11), terwijl §5.1 + §7.1 juist een oranje CTA op een blauw hero-vlak voorschrijven. Enige combinatie uit het eigen palet die beide haalt: `#f0682f` als knopvlak met `--inkt` als tekst (5,79:1 en 3,17:1). | Fase 0 |
| T3 | **§7.1 vs §12.** §7.1 wil "Bekijk het lesaanbod" *even prominent* naast "Boek een baan"; §12 en §5.1 verbieden een tweede primaire knop in hetzelfde scherm. | Fase 1 |
| T4 | **Bevestigingsmail kan niet met alleen Netlify Forms.** §6 belooft een automatische bevestigingsmail aan de aanvrager; Netlify-notificaties gaan naar een vast adres. Vereist een Netlify Function of externe dienst — B3 zegt "geen eigen server". | Fase 2 |
| T5 | **Vercel Analytics werkt niet op Netlify** (§8). Plausible is het enige valide advies uit dat rijtje. | Fase 5 |
| T6 | **`/privacy` ontbreekt in de sitemap** (§7) terwijl §8 hem eist. Idem algemene voorwaarden en een 404-pagina. | Fase 5 |
| T7 | **Geen inventaris van oude URL's.** "Geen enkele 404" (§8) is niet te controleren zonder een crawl van `indoorpadelcentrum.nl`. | Fase 5 |
| T8 | **O1 gesloten zonder bewijs.** De feedback zegt "navragen playtomic?"; §11 vinkt O1 af. Is Playtomic daadwerkelijk benaderd? | Fase 2 |
| T9 | **Hero-video zonder doellengte.** §5.2 stelt max 6 MB op 1920×1080 maar noemt geen duur. Bij padel (veel beweging) is dat scherp tot ±12 s en daarna pap. | Fase 1 |
| T10 | **Contractbaan 20–26× / 45–52×** (§4.2) geeft 30% prijsverschil per sessie zonder uitleg waar dat van afhangt. Elke lezer gaat hierover mailen — precies wat §1 wil voorkomen. | Fase 2 |

## Openstaand bij Bennet & Martin

Zie `wat-we-nog-nodig-hebben.md` voor de volledige vragenlijst. Kort:

| # | Punt | Blokkeert |
|---|---|---|
| O10 | Portretrecht foto's en video; herkenbaar kind in beeld, toestemming ouder verplicht. | Fase 1 |
| O14 | Rechten en makerschap `Van_Duren_Versie_1a.mp4`. Technische specs kunnen wij zelf meten. | Fase 1 |
| O15 | Wat is het VIP-daluren lidmaatschap: prijs, tijden, hoe word je lid. | Fase 2 |
| O6b | Definitieve sponsorlijst + logo's in vectorformaat; `Martin Glas` bevestigen. | Fase 4 |
| O16 | Facebook- en Instagram-URL's. | Fase 5 |
| O3b | Blijft het telefoonnummer 06-19154409? | — |
| — | Foto van Martin en Bennet samen, in de hal. | Fase 1 |
| — | Aantal trainers, en of hun namen op de site mogen. | Fase 2 |
| — | Horeca-opties, kinderfeestjes (leeftijd, aantal), min/max groepsgrootte clinic. | Fase 3 |
| — | Op welk mailadres komen de aanvragen binnen. | Fase 2 |

## Openstaand bij Mitch

| # | Punt | Blokkeert |
|---|---|---|
| O11 | Privacyverklaring en algemene voorwaarden. | Fase 5 |
| — | Netlify-project, build hook en het EU-datagebied voor formulieren. | Fase 0 |
| — | Google Sheet voor de agenda + gepubliceerde CSV-URL. | Fase 3 |
| — | Toegang tot het Google-bedrijfsprofiel voor de NAP-controle. | Fase 5 |
