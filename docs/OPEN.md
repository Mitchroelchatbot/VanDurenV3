# Open punten

> Bijgehouden door de agent. Niets wordt verzonnen (CLAUDE.md §0.3).
> Bijgewerkt: 1 september 2026, na CLAUDE.md v3.

## Opgelost sinds v2

`tokens.css` is nagerekend: **alle veertien contrastwaarden kloppen exact** (WCAG 2.1,
sRGB, tot op twee decimalen). De splitsing `--oranje-merk` / `--oranje` lost T2 op.
De redirect-inventaris (`public/_redirects`) vervangt T7.

## Nog open in CLAUDE.md v3 — meegenomen uit v2, niet gerepareerd

| # | Punt | Waar | Blokkeert |
|---|---|---|---|
| T3 | §7.1 punt 2 wil "Bekijk het lesaanbod" **even prominent** naast "Boek een baan"; §12 verbiedt een tweede primaire knop in hetzelfde scherm en §5.1 één oranje knop per scherm. Onopgelost. | regel 496 vs 726 | Fase 1 |
| T4 | §6 belooft een automatische bevestigingsmail aan de aanvrager; B3 zegt "Netlify Forms, geen eigen server". Netlify-notificaties gaan naar een vast adres — een mail terug naar de invuller vereist een Netlify Function of een externe dienst. Onopgelost. | regel 59 vs 373 | Fase 2 |
| T5 | §8 adviseert nog steeds "Plausible of **Vercel Analytics**". Vercel Analytics werkt niet op Netlify-hosting. | regel 640 | Fase 5 |

## Nieuw gevonden in v3

| # | Punt | Blokkeert |
|---|---|---|
| T11 | **`_redirects` bevatte een lus:** `/evenementen → /evenementen 301`. Verwijderd; zes andere regels wezen naar dat pad. | — (opgelost) |
| T12 | **Vier redirect-doelen bestaan niet in de sitemap van §7:** `/privacy`, `/voorwaarden`, `/clinics/bedankt` en `/404.html`. `/privacybeleid → /privacy` levert vandaag een 404 op een pagina die wettelijk verplicht is. Die vier routes moeten in §7 opgenomen worden. | Fase 5 |
| T13 | **§7.2 is structureel verkeerd genest.** De punten "Tarieventabel uit §4.2", "Verwijderen: WPT-blok", "Toevoegen: Babolat" en "Sfeerbeelden onderaan" staan nu binnen de opsomming van het VIP-daluren lidmaatschap. Het zijn pagina-eisen, geen eigenschappen van het lidmaatschap. | Fase 2 |
| T14 | **Kruisverwijzingen wijzen naar het verkeerde punt.** §4.2 en §6.1 verwijzen voor de onbekende clinic-gegevens naar "O19", maar O19 is de foto van Martin en Bennet. De clinic-onbekenden zijn O20. | Fase 3 |
| T15 | §6.4 verwijst naar "(O3)"; O3 is gesloten, bedoeld is O3b. | — |
| T16 | De restlijst meldt aan de eigenaren "alle **47** pagina's krijgen een doorverwijzing". `_redirects` telt 50 regels, waarvan enkele wildcards. Het getal 47 is niet controleerbaar tegen dit bestand. | — |
| T17 | `--oranje-hover` tegen `--blauw` is 1,49:1 — nog lager dan de 1,88:1 van `--oranje`. De witte ring uit regel 3 dekt dit af, maar `box-shadow` verdwijnt in Windows-hoogcontrastmodus. Overweeg een echte `border` in plaats van `box-shadow`. | Fase 1 |

## Blokkerend besluit

| # | Punt | Blokkeert |
|---|---|---|
| T18 | **Woordvolgorde van de bedrijfsnaam.** Gekozen: "Indoor Padel Centrum van Duren". CLAUDE.md §3 regel 102 verbiedt die volgorde expliciet, en KvK ("Van Duren indoor padel centrum BV"), Facebook, de Playtomic-slug en vier directories zetten "Van Duren" vóóraan. In de code raakt dit één bestand (`bedrijf.json`, dankzij de harde regel van §4.1); daarbuiten raakt het elke externe vermelding. Bevestiging nodig vóór `bedrijf.json`. | `bedrijf.json` |

## Fase 1 — stand van het beeldmateriaal

Uit `Fotos van websitesocials` zijn drie foto's verwerkt naar AVIF + WebP in twee
maten en op de homepage gezet: twee halfoto's en de rackets. De hero draait nu op
een poster in plaats van een effen vlak. Bronbestanden worden nooit opgeschaald.

| # | Punt | Stand |
|---|---|---|
| F1 | **Foto van Martin en Bennet samen (O19).** De aangeleverde banner `D-ALTIJD-PADELLEN-IN-DE-SON.jpg` is **607 × 331 pixels**. Bijsnijden tot alleen hun twee gezichten levert ongeveer 270 × 230 op — te klein voor een blok dat op desktop zo'n 600 px breed is. Opschalen maakt het zichtbaar zacht. | Blok rendert nog zonder foto. Er is een bruikbare foto nodig van minimaal ~1200 px breed. |
| F2 | **De banner draagt ingebakken tekst en het logo PADEL ACADEMY VAN DUREN.** §3 staat die naam alleen op `/lessen` toe; als beeld op de homepage omzeilt dat de grep uit §9. Los van de resolutie is dat een tweede reden om hem niet integraal te plaatsen. | Niet gebruikt. |
| F8 | **`kantine-htc-son.jpg` is volgens de bestandsnaam de kantine van HTC Son**, een andere vereniging. Als het padelcentrum die horeca deelt is de foto terecht en hoort dat ook zo op de site te staan; zo niet, dan is het het pand van iemand anders. §6.1 belooft clinicdeelnemers "toegang tot de horeca" — dat moet dan wel over deze ruimte gaan. | Niet gebruikt tot dit bevestigd is. |
| F9 | **`JessicaPhotographyHR-93` en `-143` dragen de naam van een fotograaf.** Portretrecht is geregeld door de eigenaren, maar auteursrecht ligt bij de maker tenzij dat is overgedragen. Dat is een andere vraag dan die van O10. | Wel gebruikt, want ze staan al op de eigen socials; bevestigen dat webgebruik afgedekt is. |
| F10 | **`martin-van-duren.png` lijkt synthetisch.** Vervormde letters op poloshirt en racket. | Niet gebruikt. |
| F11 | **Hero-video ontbreekt nog.** `Van_Duren_Versie_1a.mp4` is 254 MB en komt niet door de Drive-koppeling; hij moet sowieso eerst naar max. 6 MB (§5.2). De staande clip `e75c590e….MP4` kan als los blok. `4776981e….MP4` blijft eruit (O10). | Hero draait op de poster; `video` blijft een optioneel veld. |
| F12 | **De map `Fotos van Bennet` (15 stuks) is nog niet verwerkt.** Elke foto moet eerst langs O10 op herkenbare kinderen en daarna naar WebP/AVIF. | Volgende stap. |
| F13 | **De mappen `test/Instagram_files` en `test/Instagram2_files` zijn een ruwe scrape.** Veel bestanden zijn 3 tot 8 KB en dat zijn interface-iconen, geen foto's; de twee mappen overlappen elkaar grotendeels. Niet geschikt als bron zonder selectie. | Niet gebruikt. |
| F6 | **De tekst van het persoonlijke blok is mijn concept.** Geen verzonnen feiten, maar niet hun woorden. `conceptGoedgekeurd` staat op `false`. | Moet goedgekeurd of vervangen worden. |
| F7 | **T3 opgelost.** "Bekijk het lesaanbod" staat even groot naast de primaire knop, maar secundair uitgevoerd; de kop-CTA verschijnt pas na de hero, zodat er nooit twee oranje knoppen tegelijk staan (§5.1). | Gebouwd en gemeten. |

## Openstaand bij Bennet & Martin

| # | Punt | Blokkeert |
|---|---|---|
| O10 | Portretrecht minderjarige in `4776981e….MP4` — clip gaat er sowieso uit. Bevestigen; geldt ook voor foto's met herkenbare kinderen. | Fase 1 |
| O19 | Foto van Martin en Bennet samen, in de hal. Enige resterende blokkade voor fase 1. | Fase 1 |
| O20 | Clinics: minimum/maximum aantal personen, duur, en of € 29,00 p.p. ook voor kinderfeestjes geldt. | Fase 3 |
| O21 | `/mogelijkheden/` adverteert € 20 baanhuur en € 15 proefles tegenover € 28 en € 100 op de tarievenpagina's. Bevestigen dat de tarievenpagina's leidend zijn. | Fase 2 |
| O6b | Sponsorlijst met vectorlogo's; is `Martin Glas` een sponsor? | Fase 4 |
| O3b | Blijft het telefoonnummer 06-19154409? | — |
| O22 | Wie beheert het Google-bedrijfsprofiel? | Fase 5 |

## Openstaand bij Mitch

| # | Punt | Blokkeert |
|---|---|---|
| O11 | Bestaande privacyverklaring, algemene voorwaarden en reserveringsvoorwaarden bijwerken (2021/2022, gaan deels over de vervallen webshop). | Fase 5 |
| — | Netlify-project, build hook, EU-regio voor formulierdata. De Netlify-koppeling is in deze sessie niet verbonden (502). | Fase 0 |
| — | Google Sheet voor de agenda + gepubliceerde CSV-URL. | Fase 3 |
