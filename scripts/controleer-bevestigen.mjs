// Veiligheidsslot (Mitch, 6 oktober 2026, A5): zolang de tekenreeks
// "[BEVESTIGEN" ergens in src/content/ voorkomt, zijn er regels in de
// juridische teksten die de eigenaren nog niet hebben goedgekeurd. Dan mag er
// niets live: de build faalt. Mitch haalt de markeringen weg zodra er akkoord is.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const MARKERING = '[BEVESTIGEN';
const wortel = 'src/content';
const treffers = [];
const loop = (map) => {
  for (const naam of readdirSync(map)) {
    const pad = join(map, naam);
    if (statSync(pad).isDirectory()) { loop(pad); continue; }
    readFileSync(pad, 'utf8').split('\n').forEach((regel, i) => {
      if (regel.includes(MARKERING)) treffers.push(`${pad}:${i + 1}`);
    });
  }
};
loop(wortel);
if (treffers.length) {
  console.error(`\nBUILD GEBLOKKEERD: ${treffers.length}× "${MARKERING}" in src/content/ — nog niet goedgekeurd door de eigenaren.\n`);
  treffers.forEach((t) => console.error('  ' + t));
  console.error('');
  process.exit(1);
}
