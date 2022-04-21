const {toJSON} = require("./helpers/node.helpers");
const {$, $wrapIf, $span} = require("./helpers/html.helpers");
const {CURLY_QUOTES, DEFAULT_LANG} = require("./helpers/const.helpers");
const {stemLang, delimitStem} = require("./helpers/render.helpers");

/**
 * @param text [String] the text to wrap in double quotes.
 * @return [String] quoted *text*.
 */
function double_quoted(jNode) {
  const quotes = CURLY_QUOTES[jNode.__node__.getAttribute('lang', DEFAULT_LANG, true)]
  return `${quotes[2]}${jNode.text}${quotes[3]}`
}


/**
 * @param text [String] the text to wrap in simple quotes.
 * @return [String] quoted *text*.
 */
function single_quoted(jNode) {
  const quotes = CURLY_QUOTES[jNode.__node__.getAttribute('lang', DEFAULT_LANG, true)]
  return `${quotes[0]}${jNode.text}${quotes[1]}`
}

module.exports = function ({node}) {
  const jNode = toJSON(node);

  switch (jNode.type) {
    case 'emphasis':
      return $('em', {id: jNode.id, class: jNode.role}, jNode.text);
    case 'strong':
      return $('strong', {id: jNode.id, class: jNode.role}, jNode.text);
    case 'monospaced':
      return $('code', {id: jNode.id, class: jNode.role}, jNode.text);
    case 'superscript':
      return $('sup', {id: jNode.id, class: jNode.role}, jNode.text);
    case 'subscript':
      return $('sub', {id: jNode.id, class: jNode.role}, jNode.text);
    case 'mark':
      return $('mark', {id: jNode.id, class: jNode.role}, jNode.text);
    case 'double':
      return $wrapIf(jNode.role || jNode.id, 'span', {id: jNode.id, class: jNode.role}, double_quoted(jNode));
    case 'single':
      return $wrapIf(jNode.role || jNode.id, 'span', {id: jNode.id, class: jNode.role}, single_quoted(jNode));
    case 'asciimath':
    case 'latexmath':
      return $span({class: 'math', id: jNode.id, 'data-lang': stemLang(jNode)}, delimitStem(jNode, jNode.text, jNode.type))
    default:
      switch (jNode.role) {
        case 'line-through':
        case'strike':
          return $('s', {id: jNode.id}, jNode.text);
        case 'del':
          return $('del', {id: jNode.id}, jNode.text);
        case 'ins':
          return $('ins', {id: jNode.id}, jNode.text);
        default:
          return $wrapIf(jNode.role || jNode.id, 'span', {id: jNode.id, class: jNode.role}, jNode.text);
      }
  }
}

