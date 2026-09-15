// Bouwtijd-hulpjes voor beeld in public/beeld.
// Een beeldveld in de content is een naam ("banen-sfeer-1"); de bestanden heten
// <naam>-<breedte>.webp. Bestaat er geen enkel bestand, dan rendert de
// component niets (§0.3: geen leeg beeldslot). Afmetingen komen uit het
// WebP-bestand zelf, zodat niemand ze hoeft te raden of over te typen.
import fs from 'node:fs';
import path from 'node:path';

const MAP = path.join(process.cwd(), 'public', 'beeld');
const gemeld = new Set();

export function webpAfmetingen(bestand) {
  const b = fs.readFileSync(bestand);
  if (b.length < 30 || b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null;
  const soort = b.toString('ascii', 12, 16);
  if (soort === 'VP8X') return { breedte: 1 + b.readUIntLE(24, 3), hoogte: 1 + b.readUIntLE(27, 3) };
  if (soort === 'VP8L') { const bits = b.readUInt32LE(21); return { breedte: 1 + (bits & 0x3fff), hoogte: 1 + ((bits >> 14) & 0x3fff) }; }
  if (soort === 'VP8 ') return { breedte: b.readUInt16LE(26) & 0x3fff, hoogte: b.readUInt16LE(28) & 0x3fff };
  return null;
}

/** Geeft { bronnen: [{breedte, pad}], breedte, hoogte } of null als niets bestaat. */
export function zoekBeeld(naam, maten = [1536, 768]) {
  if (!naam) return null;
  const bronnen = maten
    .map((w) => ({ w, bestand: path.join(MAP, `${naam}-${w}.webp`) }))
    .filter(({ bestand }) => fs.existsSync(bestand))
    .map(({ w, bestand }) => ({ breedte: w, pad: `/beeld/${naam}-${w}.webp`, bestand }))
    .sort((a, b) => a.breedte - b.breedte);
  if (bronnen.length === 0) {
    if (!gemeld.has(naam)) { gemeld.add(naam); console.warn(`[beeld] ${naam}: geen bestand in public/beeld (verwacht ${maten.map((w) => `${naam}-${w}.webp`).join(', ')}); niets gerenderd.`); }
    return null;
  }
  const grootste = bronnen[bronnen.length - 1];
  const afm = webpAfmetingen(grootste.bestand) ?? { breedte: grootste.breedte, hoogte: null };
  return { bronnen, breedte: afm.breedte, hoogte: afm.hoogte };
}

export function bestaat(pad) {
  return !!pad && fs.existsSync(path.join(process.cwd(), 'public', pad.replace(/^\//, '')));
}
