/* global hexo */

'use strict';

function stripTags(html, keepCode) {
  let text = String(html || '');
  if (!keepCode) {
    text = text.replace(/<figure[\s\S]*?<\/figure>/g, ' ')
      .replace(/<pre[\s\S]*?<\/pre>/g, ' ');
  } else {
    // keep code text, drop line-number gutters if present
    text = text.replace(/<td class="gutter">[\s\S]*?<\/td>/g, ' ');
  }
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

hexo.extend.helper.register('plainExcerpt', function(post, length) {
  const limit = length || (this.theme.excerpt && this.theme.excerpt.length) || 108;
  const text = stripTags(post.content);
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '…';
});

hexo.extend.helper.register('readingMinutes', function(post) {
  const text = stripTags(post.content, true);
  const cjk = (text.match(/[一-鿿㐀-䶿]/g) || []).length;
  const en = (text.replace(/[一-鿿㐀-䶿]/g, ' ').match(/[A-Za-z0-9][A-Za-z0-9'’_-]*/g) || []).length;
  const cfg = this.theme.reading || {};
  const cpm = cfg.cjk_per_minute || 400;
  const epm = cfg.en_per_minute || 180;
  return Math.max(1, Math.ceil(cjk / cpm + en / epm));
});

hexo.extend.helper.register('flowWidth', function(minutes) {
  return Math.min(100, Math.round(minutes * 3.5));
});
