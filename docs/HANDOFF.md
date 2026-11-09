# Handoff — Van Duren Indoor Padel Centrum

> Voor een nieuwe Claude Code-sessie. Stand van 9 november 2026.
> Lees dit eerst, daarna `CLAUDE.md` (v17, de enige bron van waarheid) en
> `docs/OPEN.md` (bevindingen F1–F60 en open punten). Bij twijfel wint `CLAUDE.md`.

## Waar staan we

**De site is live** op `https://indoorpadelcentrum.nl` (sinds 21 oktober 2026).

| | |
|---|---|
| Repo | `Mitchroelchatbot/VanDurenV3` |
| Branch | `claude/uipro-design-skill-aat7jc` — de enige branch; Netlify bouwt elke push hiervan naar productie |
| Laatste commit | `ba34498` (favicon-besluit, 21 oktober) |
| Hosting | Netlify, project `vandurenv4`, siteId `16d95c35-6f73-4c60-bda3-83729c4f36a6` |
| Domein | `indoorpadelcentrum.nl` primary, `www` stuurt door; certificaat via Let's Encrypt |
| DNS | Bij TransIP. Alleen `@` A → `75.2.60.5` en `www` CNAME → `vandurenv4.netlify.app.` zijn van ons. **MX, SPF, DKIM, `_dmarc`, `mail`, `autoconfig`, `autodiscover` nooit aanraken** — dat is de mailbox |
| Mail | `vanduren@indoorpadelcentrum.nl` bij TransIP; alle formulieren landen daar via Netlify Forms |
| Opdrachtgever | Mitch (Mr Hostly). Klant: Martin & Bennet van Duren |

Er is ook een oud project `vandurenv3-uitgeschakeld`; `netlify.toml` slaat daar builds over.
Mitch moet het nog met de hand verwijderen in de Netlify-UI.

## Werkwijze die je moet aanhouden

- **Nederlands**: commits, documentatie, antwoorden. Kleine commits, één ding per commit.
- **Geen zichtbare tekst, prijs of datum in `src/pages` of `src/components`.** Alles uit `src/content/nl/*.json|md`.
- **Verzin niets.** Ontbreekt content: niet renderen, `_todo` in de JSON en een regel in `docs/OPEN.md`.
- **Repo is leidend (§11.1).** Levert Mitch een contentbestand aan: eerst diffen tegen de repo en elk veld melden dat zou verdwijnen. `socialStrook.toegankelijkLabel` en `feitenbalk.toegankelijkLabel` in `home.json` zijn in het verleden vier keer gesneuveld.
- **Veiligheidsslot:** `npm run build` faalt zolang `[BEVESTIGEN` ergens in `src/content/` staat. Die markeringen haalt alleen Mitch weg, na akkoord van de eigenaren. Nu: nul markeringen.
- **Na elke push** de Netlify-deploy controleren (commit_ref van de current deploy). Netlify bouwde eerder niet door een leeg credit-saldo; dat zag je alleen doordat de deploy op een oude commit bleef staan.
- **Leg elk besluit vast** in `CLAUDE.md` (met datum en wie) en een F-regel in `docs/OPEN.md`.
- Gebruiker wil een ruthless mentor: zeg het als iets een slecht idee is, met reden, en bouw daarna wat gevraagd is.

## Lokaal draaien en meten

```bash
npm ci
npm run build              # incl. [BEVESTIGEN-check
npx serve dist -p 4321     # nooit `serve -s`; nooit `pkill -f "serve dist"` (doodt je shell)
```

- Playwright: niet in `package.json`. Installeer tijdelijk met
  `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm install --no-save playwright` en start Chromium met
  `executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'`. Scripts in de repo-map
  zetten (anders vindt Node `playwright` niet) en daarna weer verwijderen.
- Deze Chromium decodeert geen H.264: video's zie je alleen als poster.
- Lighthouse: `CHROME_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npx lighthouse …`.
  Laatste meting homepage mobiel: 98/100/100/100, LCP 2,0 s (poster).
- De cloudcontainer kan `*.netlify.app`, `drive.google.com` en externe DNS niet bereiken.
  Live controleren gaat via de Netlify-koppeling (moet geautoriseerd zijn) of via Mitch.

## Architectuur in het kort

- Astro 5, eigen CSS (`src/styles/tokens.css` = kleuren/contrastregels, `basis.css`). Geen Tailwind, geen React.
- `src/layouts/BasisLayout.astro` → `Header.astro` (vier uitklapmenu's, werkt zonder JS) en `Footer.astro`.
- Homepage-volgorde uit `home.json._sectievolgorde`: hero → feitenbalk → mogelijkheden → kernpunten → zoWerktHet → informatie → socialStrook.
- `Formulier.astro`: één component voor alle zes formulieren (contractbaan, les, jeugd, clinic, contact, sponsor). Wizard met JS, gewoon formulier zonder. `wizard={false}` maakt hem altijd plat (contact op `/over-ons`). Onder elke verzendknop de privacyregel.
- `src/lib/vragen.js` vertaalt het id-schema van `jeugd.json`/`lessen.json` naar stappen.
- `src/lib/beeld.js` + `Beeld.astro`: een beeldslot rendert alleen als het bestand in `public/beeld/` bestaat.
- Juridisch: `src/content/nl/privacy.md` en `voorwaarden.md`, routes `/privacy` en `/voorwaarden`. `{#id}` in Markdown-koppen via `src/lib/rehype-kop-id.mjs`.
- `public/_redirects`: 50 regels voor de oude site.
- Playtomic-kalender op `/banen` laadt pas na een klik (privacyverklaring belooft dat).

## Recente besluiten om te kennen

- **Logo** (1 en 6 oktober): het Padel Academy-logo staat in header en footer op een wit vlak, met de bedrijfsnaam als tekst ernaast (zichtbaar vanaf 1024 px). Niet in schema.org en niet als og:image. Alt-tekst is de derde uitzondering op de "Padel Academy"-grepregel. Nieuw eigen logo wordt gemaakt.
- **Favicon** (21 oktober): het dot-grid uit het logo, `public/favicon.svg` + ico/png. Op 16 px een vlek, geaccepteerd.
- **Contracttarieven** (24 september): per boeking van 60 min; 12 maanden "prijs op aanvraag". Piekuren 17–23 bij contracten, 18:30–22:30 bij losse huur — bewust niet gelijkgetrokken (O33).
- **Juridische teksten** vrijgegeven 13 oktober; lesannulering "tot 7 dagen, daarna geen restitutie" is geformuleerd als "dan krijg je je geld terug", afgeleid. Verzetten van een les staat er niet in.

## Openstaand (details in `docs/OPEN.md` en `CLAUDE.md` §11)

**Bij Mitch, direct na livegang**
1. Zes formulieren één keer versturen op het live domein en de TransIP-mailbox controleren (DoD §9, nooit gedaan).
2. Oude URL's steekproefsgewijs nalopen (`/tarieven/`, `/bedrijfsclinics/`, `/nieuwsbrief/`, `/privacybeleid`).
3. O26: website-URL in Playtomic Manager op `https://indoorpadelcentrum.nl`, anders blijft het kalendervlak op `/banen` leeg. Daarna `banen.playtomic.websiteUrlGeregeld` op `true`.
4. O22: Google Business Profile, Facebook, Playtomic gelijktrekken met §3.1.
5. Project `vandurenv3-uitgeschakeld` verwijderen in Netlify.

**Bij Bennet & Martin (content)**
- O33 contractbanen: prijs 12 maanden, welke piekurendefinitie, contract op 1,5 uur, aantal boekingen en betaalmoment.
- O27 racketverhuur via de automaat: prijs (nu bewust zonder prijs vermeld).
- O20 clinics: min/max personen, duur, geldt € 29 ook voor kinderfeestjes.
- O21 bevestigen dat de oude € 20/€ 15-prijzen echt weg zijn.
- O6b sponsorlijst met logo's; zolang `sponsoren.json` leeg is renderen grid en footerbalk niet.
- O3b telefoonnummer definitief?
- Nieuw logo + witte knock-outversie; Babolat-logo.
- O29 opnamedag: er is geen beeld van klanten, lessen, clinics of horeca.

**Fase 3 nog niet gebouwd**
- Agenda-import uit de Google Sheet (§4.3) en `Event`-schema op `/evenementen`. Wacht op de gepubliceerde CSV-URL van Bennet. De lege staat staat er al.

## Eerste stappen in een nieuwe sessie

1. `git fetch origin claude/uipro-design-skill-aat7jc && git status` — zit je op de juiste branch en up-to-date?
2. Lees `CLAUDE.md` en de laatste tien F-regels bovenaan `docs/OPEN.md`.
3. `npm ci && npm run build` — slaagt hij?
4. Vraag Mitch wat er sinds 21 oktober veranderd is (formulieren getest? Playtomic-URL gezet? nieuwe content van Bennet?).
