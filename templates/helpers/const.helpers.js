// Defaults
const DEFAULT_HIGHLIGHTJS_THEME = 'github'
const DEFAULT_LANG = 'en'
const DEFAULT_SECTNUMLEVELS = 3
const DEFAULT_TOCLEVELS = 2

const CURLY_QUOTES = [
  [["af", "en", "eo", "ga", "hi", "ia", "id", "ko", "mt", "th", "tr", "zh"], ['&#x2018;', '&#x2019;', '&#x201c;', '&#x201d;']],  // ‘…’ “…”
  [["bs", "fi", "sv"], ['&#x2019;', '&#x2019;', '&#x201d;', '&#x201d;']],  // ’…’ ”…”
  [["cs", "da", "de", "is", "lt", "sl", "sk", "sr"], ['&#x201a;', '&#x2018;', '&#x201e;', '&#x201c;']],  // ‚…‘ „…“
  [["nl"], ['&#x201a;', '&#x2019;', '&#x201e;', '&#x201d;']],  // ‚…’ „…”
  [["hu", "pl", "ro"], ['&#x00ab;', '&#x00bb;', '&#x201e;', '&#x201d;']],  // «…» „…”
].reduce((previousValue, currentValue) => {
    currentValue[0].forEach((lang) => {
      previousValue[lang] = currentValue[1];
    })
    return previousValue;
  },
  {}
)
CURLY_QUOTES['default'] = CURLY_QUOTES[DEFAULT_LANG]

const VOID_ELEMENTS = ["area", "base", "br", "col", "command", "embed", "hr", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

const BLOCK_MATH_DELIMITERS = {
  'asciimath': ['\\$', '\\$'],
  'latexmath': ['\\[', '\\]'],
}
const INLINE_MATH_DELIMITERS = {
  'asciimath': ['\\$', '\\$'],
  'latexmath': ['\\(', '\\)'],
}

module.exports = {
  CURLY_QUOTES,
  VOID_ELEMENTS,
  DEFAULT_HIGHLIGHTJS_THEME,
  DEFAULT_LANG,
  DEFAULT_SECTNUMLEVELS,
  DEFAULT_TOCLEVELS,
  BLOCK_MATH_DELIMITERS,
  INLINE_MATH_DELIMITERS
}
