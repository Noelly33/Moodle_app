const ENTITIES: Record<string, string> = {
  '&nbsp;': ' ',
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&ndash;': '–',
};

/** Convierte HTML de Moodle a texto plano (para vistas previas de una o dos líneas). */
export function stripHtml(html?: string | null) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, entity => ENTITIES[entity] ?? ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
