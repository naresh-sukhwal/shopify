import { ASSETS_URL } from '@/service/config';

class StringUtils {
  static capitalize(str: string) {
    if (!str) return '';
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  static convertKeyToTitle(key: string) {
    if (!key) return '';
    return key
      ?.trim()
      ?.toLowerCase()
      ?.split(/[_\-]+/)
      ?.map(word => word?.charAt(0)?.toUpperCase() + word?.slice(1))
      ?.join(' ');
  }

  static limitWords(text: string, max: number = 5) {
    if (!text) return '';

    const words = text.trim().split(/\s+/);
    if (words.length <= max) return text;

    return words.slice(0, max).join(' ') + '...';
  }

  static formatKeyToTitle(key: string): string {
    return key
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  static fileNameFromUrl(url: string) {
    if (!url) return '';
    if (url.includes('file://')) return url;

    const split = url?.split('/');
    const lastWord = split?.[split?.length - 1];

    return `${ASSETS_URL}${lastWord}`;
  }

  static convertToFullUrl(url: string) {
    if (!url) return '';
    if (url.includes('file://')) return url;

    return `${ASSETS_URL}${url}`;
  }
  static addString(firstName: string = '', lastName: string = '') {
    if (!firstName || !lastName) return '';
    return `${firstName} ${lastName}`;
  }

  /**
   * Strips HTML tags and decodes common HTML entities from a string.
   * Used to display Shopify policy bodies (which are returned as HTML)
   * as clean, readable plain text.
   *
   * e.g. "<h2>Shipping</h2><p>We ship in <strong>3–7 days</strong>.</p>"
   *   → "Shipping\n\nWe ship in 3–7 days."
   */
  static htmlToPlainText(html: string): string {
    if (!html) return '';

    return html
      // Replace block-level tags with newlines for paragraph spacing
      .replace(/<\/h[1-6]>/gi, '\n\n')
      .replace(/<h[1-6][^>]*>/gi, '')
      .replace(/<\/p>/gi, '\n\n')
      .replace(/<p[^>]*>/gi, '')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/li>/gi, '\n')
      .replace(/<li[^>]*>/gi, '• ')
      .replace(/<\/ul>/gi, '\n')
      .replace(/<ul[^>]*>/gi, '')
      .replace(/<\/ol>/gi, '\n')
      .replace(/<ol[^>]*>/gi, '')
      .replace(/<\/div>/gi, '\n')
      .replace(/<div[^>]*>/gi, '')
      // Strip all remaining HTML tags
      .replace(/<[^>]+>/g, '')
      // Decode common HTML entities
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&ndash;/g, '–')
      .replace(/&mdash;/g, '—')
      .replace(/&lsquo;/g, '\u2018')
      .replace(/&rsquo;/g, '\u2019')
      .replace(/&ldquo;/g, '\u201C')
      .replace(/&rdquo;/g, '\u201D')
      // Collapse excessive blank lines (more than 2 newlines → 2)
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }
}

export default StringUtils;
