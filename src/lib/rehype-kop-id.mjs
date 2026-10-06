// Koppen in Markdown kunnen een eigen anker krijgen met "{#id}" aan het eind,
// bijvoorbeeld "## Reserveren {#reserveren}" in voorwaarden.md (de redirect
// /reserveringsvoorwaarden wijst naar /voorwaarden#reserveren). De markering
// wordt uit de tekst gehaald en wordt het id van de kop.
export default function rehypeKopId() {
  const loop = (knoop) => {
    if (knoop.type === 'element' && /^h[1-6]$/.test(knoop.tagName)) {
      const laatste = knoop.children[knoop.children.length - 1];
      const m = laatste?.type === 'text' ? laatste.value.match(/\s*\{#([\w-]+)\}\s*$/) : null;
      if (m) {
        laatste.value = laatste.value.slice(0, m.index);
        knoop.properties = { ...knoop.properties, id: m[1] };
      }
    }
    knoop.children?.forEach(loop);
  };
  return (boom) => loop(boom);
}
