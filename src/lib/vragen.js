// Vertaalt het vragen-schema uit jeugd.json en lessen.json (ids, opties met
// waarde/label/sub, toonBij per id, vervolgTekstBij, toelichtingBij,
// aanmoediging, skip, velden als objecten) naar de stappen die
// Formulier.astro kent. De ingestuurde waarde is altijd het leesbare label;
// de codes (6-8, 15plus, proefles) komen niet in de mail.
export function stappenUit(vragen) {
  const nrVan = (id) => vragen.findIndex((v) => v.id === id) + 1;
  const labelVan = (id, w) => vragen.find((v) => v.id === id)?.opties?.find((o) => o.waarde === w)?.label ?? w;
  const conditie = (tb) => {
    if (!tb) return undefined;
    const [id, w] = Object.entries(tb)[0];
    return { stap: nrVan(id), waarden: [].concat(w).map((x) => labelVan(id, x)) };
  };
  return vragen.map((vr, i) => {
    const st = { nr: i + 1, vraag: vr.vraag, type: vr.type, toelichting: vr.toelichting ?? vr.aanmoediging, toonBij: conditie(vr.toonBij) };
    if (vr.type === 'tekst') Object.assign(st, { label: vr.label, hint: vr.hint });
    if (vr.opties) st.opties = vr.opties.map((o) => ({
      waarde: o.label, sub: o.sub,
      noot: vr.toelichtingBij?.[o.waarde],
      toonBij: conditie(o.toonBij),
    }));
    if (vr.vervolgTekstBij) Object.assign(st, {
      type: 'keuze-plus-tekst', vervolgDirect: true,
      tekstveldBij: vr.vervolgTekstBij.map((w) => labelVan(vr.id, w)),
      tekstveldLabel: vr.vervolgLabel,
    });
    if (vr.type === 'meerkeuze') st.verderKnop = true;
    if (vr.type === 'contact') Object.assign(st, { velden: vr.velden, verzendKnop: vr.verzendKnop });
    return st;
  });
}
