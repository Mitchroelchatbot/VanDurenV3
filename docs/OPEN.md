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

## Fase 1 — beeldmateriaal beoordeeld

Alle 16 bestanden uit `Fotos van Bennet` en de 5 uit `Fotos van websitesocials` zijn
stuk voor stuk bekeken. Zeven staan nu op de homepage: de hero-poster plus zes
foto's in het blok "In de hal", als AVIF met WebP-terugval in twee maten.

### Uitgesloten, met reden

| Bestand | Reden |
|---|---|
| `4776981e….MP4` | Klein kind spelend in het net. Bevestigd door de eigenaren dat deze eruit gaat. |
| `IMG_6981.HEIC` | Ongeveer twintig spelers in **PSV / Brainport Eindhoven**-tenue. Portretrecht van profsporters loopt doorgaans via de club, en het clublogo staat prominent in beeld. Op een commerciële site suggereert dat een samenwerking die er niet is. Toestemming nodig van PSV, niet van de eigenaren. |
| `b715ac8b….JPG` | 640 × 480 — te klein voor de site. Bevat bovendien een groep waarin minstens één persoon jong oogt; op deze resolutie niet te beoordelen. Beide redenen op zich al genoeg. |
| `16efa1d5….JPG` | Geen foto maar een **schermafdruk van een telefoon** (statusbalk, batterij 39%), van de galerij `jessicaphotography36.pixieset.com`. |
| `martin-van-duren.png` | Vervormde letters op poloshirt en racket — patroon van een gegenereerd of zwaar opgeschaald beeld. |
| `D-ALTIJD-PADELLEN-IN-DE-SON.jpg` | 607 × 331, te klein, en draagt ingebakken tekst plus het logo Padel Academy van Duren. |

### Bevindingen die om een besluit vragen

| # | Punt |
|---|---|
| F8 | **Opgelost door het beeld zelf.** `41995c41….JPG` toont het bord "Welkom · HTC SON TENNIS · PADEL ACADEMY VAN DUREN powered by Babolat". Het padelcentrum ligt dus op het terrein van HTC Son Tennis, wat ook het aparte parkeeradres uit §3.1 verklaart. `kantine-htc-son.jpg` is daarmee vrijwel zeker de gedeelde horeca — één bevestiging en hij kan erop, en dan hoort die samenwerking ook op `/over-ons` te staan. |
| F9 | **Auteursrecht Jessica Photography is nu concreet.** De schermafdruk hierboven wijst naar een Pixieset-klantgalerij: dat is een betaalde shoot met een fotograaf. Portretrecht is geregeld door de eigenaren, auteursrecht ligt bij de maker tenzij overgedragen. Die twee foto's zijn daarom **van de homepage gehaald**; de hero draait nu op een eigen foto van Bennet. Zodra webgebruik bevestigd is kunnen ze terug. |
| F14 | **§3 is niet te handhaven op foto's.** Op vrijwel elke halfoto hangt het fysieke bord "PADEL ACADEMY VAN DUREN". §3 staat die naam alleen toe in `lessen.*`, maar erkent zelf dat het bord in de hal klopt. Voorstel: de regel geldt voor **tekst**, niet voor beeld — anders kun je je eigen hal niet laten zien. Nu zo uitgevoerd. |
| F1 | **Foto van Martin en Bennet samen (O19) blijft open.** In `IMG_0321.HEIC` staan twee mannen in Padel Academy-shirt, maar op de rug gezien, dus onbruikbaar voor het persoonlijke blok. Nodig: een foto van jullie tweeën, minimaal ~1200 px breed. |
| F11 | **Hero-video.** `Van_Duren_Versie_1a.mp4` (254 MB) komt niet door de Drive-koppeling. De staande clip `e75c590e….MP4` is 8,8 MB en wél op te halen; die kan als los blok, nooit als desktop-hero. |
| F6 | **De tekst van het persoonlijke blok is mijn concept**, geen verzonnen feiten maar niet hun woorden. `conceptGoedgekeurd` staat op `false`. |

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
