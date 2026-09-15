// Zet een optielabel om naar een ankerdeel: "Kinderfeestje" → "kinderfeestje",
// "Met z'n tweeën" → "met-z-n-tweeen". Gedeeld door Cta.astro (bouwt de link)
// en Formulier.astro (leest hem terug uit location.hash), zodat beide kanten
// gegarandeerd dezelfde vorm gebruiken.
export const slug = (s) =>
  String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
