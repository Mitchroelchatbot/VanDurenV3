# Schrijfwijze

> Vastgelegd volgens CLAUDE.md §3. Deze regels zijn met `grep` te controleren en
> staan in de Definition of Done (§9).

## Twee namen, strikt gescheiden

| Wat | Naam | Waar |
|---|---|---|
| Het bedrijf | **Van Duren Indoor Padel Centrum** | `<title>`, header-wordmark, footer, schema.org, alle externe vermeldingen |
| Het lesprogramma | **Padel Academy van Duren** | Uitsluitend op `/lessen` en in les-gerelateerde CTA's |

Het lesprogramma is een onderdeel van het bedrijf, geen los merk. Op `/lessen`
staat het aanbod onder die kop; overal elders is de naam van het bedrijf leidend.

De woordvolgorde **Van Duren** vooraan is bewust en bevestigd op 1 september 2026.
Die volgorde is gelijk aan de KvK-inschrijving ("Van Duren indoor padel centrum
BV"), de Facebookpagina, de Playtomic-slug `van-duren-indoor-padel-centrum` en de
vermeldingen op padelgids.nl, padelguide.eu, actu-padel.com en
uitjesenactiviteiten.nl. Voor lokale vindbaarheid telt die consistentie zwaar mee:
wijk er niet van af zonder al die vermeldingen mee te veranderen.

## Harde regels

- Bedrijfsnaam altijd voluit: `Van Duren Indoor Padel Centrum`.
  Niet "vanDuren", niet "Padel Centrum van Duren", niet "Indoorpadel Centrum".
- Lesprogramma altijd: `Padel Academy van Duren` — die woordvolgorde, "van" klein.
  Niet "Van Duren Padel Academy".
- `Padel Academy` mag alleen voorkomen in `src/content/nl/lessen.*`.
  Daarom staat de paginametadata van `/lessen` in `lessen.json` en niet in
  `paginas.json`, en is het veld `lesprogramma` uit `bedrijf.json` gehaald.
- Header-wordmark: **Van Duren** groot, **Indoor Padel Centrum** klein eronder.
  Staat als `naamKort` en `naamOnder` in `bedrijf.json`.
- `<title>` homepage: `Van Duren Indoor Padel Centrum — Padelbaan huren in Son en Breugel`
- `<title>` lessen: `Padel Academy van Duren — Padellessen in Son en Breugel`

## Tone of voice

- Nederlands, je-vorm, korte zinnen.
- Geen "sfeerbeeld", geen "beleving", geen "unieke ervaring".
- Een prijs staat er voluit, niet als "vanaf al" of "slechts".
- Geen uitleg van een mailproces. Wie iets wil, vult een formulier in.

## Terminologie

| Gebruik | Niet |
|---|---|
| baan huren | court boeken |
| daluren / piekuren | off-peak / peak |
| proefles, privéles, groepsles | trial, private, group |
| clinic | workshop, event |
| spelregels | reglement |
