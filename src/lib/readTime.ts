/**
 * Calculates estimated reading time.
 * Average adult reading speed: 238 words per minute (source: research by Brysbaert 2019).
 */
const WORDS_PER_MINUTE = 238;

/**
 * Strips HTML tags from a string and returns plain text.
 */
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

/**
 * Counts words in a string.
 */
function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

/**
 * Returns a human-readable read time string (e.g. "3 min read").
 * Accepts raw HTML or plain text — HTML tags are stripped automatically.
 * Returns at minimum "1 min read".
 */
export function getReadTime(content: string): string {
  const plain = stripHtml(content);
  const words = countWords(plain);
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}

