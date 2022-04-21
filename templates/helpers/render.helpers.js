const {calcSectionNumber} = require("./node.helpers");
const {DEFAULT_SECTNUMLEVELS, BLOCK_MATH_DELIMITERS, INLINE_MATH_DELIMITERS} = require("./const.helpers");
const {$wrapIf, $} = require("./html.helpers");
const {isEmptyString} = require("./utils.helpers");
/**
* Returns corrected section level.
*
* @param sec [Asciidoctor::Section] the section node (default: self).
* @return [Integer]
*/
 function sectionLevel(sec) {
  return (sec.level == 0 && sec.special) ? 1 : sec.level
}


function sectionTitle(section, drop_anchors = false) {
  const document = section.getDocument();
  let title = section.getTitle();
  if (section.getCaption()) {
    title = section.getCaptionedTitle();
  } else if (section.isNumbered() && section.getLevel() <= parseInt(document.getAttribute('sectnumlevels', DEFAULT_SECTNUMLEVELS))) {
    title = `${calcSectionNumber(section)}. ${section.getTitle()}`;
  }
  if (drop_anchors && title.includes('<a')) {
    return title.replace(/<a[^>+]+>/, '').replace(/<\/a>/, '')
  } else {
    return title
  }
}

function $printItemContent(item) {
  // wrap only if list as a child
  const wrap = item.hasBlocks// && !item.blocks.every((b)=>b.blockType === 'list') FIXME
  const txt = item.hasText ? $wrapIf(wrap, 'p', {}, item.text) : '';
  return $([txt, item.content]);
}

/**
 * return rel attribute value for a jNode
 * @param node
 * @returns {string}
 */
function linkRel(node) {
  return [
    node.hasAttribute('nofollow-option') ? 'nofollow' : '',
    (node.hasAttribute('noopener-option') || node.getAttribute('window') === '_blank') ? 'noopener' : '',
  ]
    .filter(value => !isEmptyString(value))
    .join(' ')
    .trim();
}

/**
 *  @return [String, nil] a label/title of the image link.
 */
function imageLinkLabel(node) {
  if (node.getImageUri(node.getAttribute('target')) == imageLink(node)) {
    return node.document.getAttribute('html5s-image-self-link-label', 'Open the image in full size')
  }
}

/**
 *  # @return [String, nil] an URL for the image's link.
 */
function imageLink(node) {
  const link = node.getAttribute('link')
  switch (link) {
    case 'none':
    case 'false':
      return '';
    case 'self':
      return node.getImageUri(node.getAttribute('target'));
    case '':
    case undefined:
    case null:
      return node.document.getAttribute('html5s-image-default-link') === 'self' ? node.getImageUri(node.getAttribute('target')) : '';
    default:
      return link;
  }
}

function xrefText(node) {
  let str = ''
  if (node.getText()) {
    str = node.getText();
  } else if (node.getAttribute('path')) {
    str = node.getAttribute('path')
  } else {
    let ref = node.getDocument().getReferences().refs['$$smap'][node.getAttribute('refid')]
    if (ref && ref.getReftext) {
      // console.log(ref.getReftext())
      // ref.xreftext(attr(:xrefstyle, nil, true))
      str = ref.getReftext(node.getAttribute('xrefstyle'))
    }
  }
  //     (str || "[#{attr :refid}]").tr_s("\n", ' ')
  return (str || `[${node.getAttribute('refid')}]`) // FIXME
}

function bibrefText(node) {
  return `[${node.getReftext() || node.getId()}]`
}

/**
 * @param index [Integer] the footnote's index.
 * @return [String] footnote id to be used in a link.
 */
function footnoteId(jNode) {
  let index = 0
  if (typeof jNode === 'number') {
    index = jNode
  } else {
    index = jNode.attributes.index
  }
  return `_footnote_${index}`
}


/**
 * @param index (see #footnote_id)
 * @return [String] footnoteref id to be used in a link.
 */
function footnoteRefId(jNode) {
  let index = 0
  if (typeof jNode === 'number') {
    index = jNode
  } else {
    index = jNode.attributes.index
  }
  return `_footnoteref_${index}`
}

/**
 *@return [String] language of STEM block or inline node (tex or asciimath).
 */
function stemLang(jNode) {
  const value = (jNode.isInline ? jNode.type : jNode.style)
  return value === 'latexmath' ? 'tex' : value
}


/**
 * Delimite the given equation as a STEM of the specified type.
 *
 * Note: This is not needed nor used for KaTeX, but keep this for the case
 * user wants to use a different method.
 *
 * @param equation [String] the equation to delimite.
 * @param type [#to_sym] the type of the STEM renderer (latexmath, or asciimath).
 * @return [String] the delimited equation.
 */
function delimitStem(jNode, equation, type) {
  const _html5s_stem_type = jNode.__node__.document.getAttribute('html5s-force-stem-type')
  if (_html5s_stem_type) {
    type = _html5s_stem_type
  }

  let open, close;
  if (jNode.isBlock) {
    [open,close] = BLOCK_MATH_DELIMITERS[type]
  } else {
    [open,close] = INLINE_MATH_DELIMITERS[type]
  }

  if (!equation.startsWith(open) || !equation.endsWith(close)) {
    equation = [open, equation, close].join('')
  }
  return equation
}

module.exports = {
  sectionTitle,
  sectionLevel,
  $printItemContent,
  linkRel,
  imageLink,
  imageLinkLabel,
  xrefText,
  bibrefText,
  footnoteId,
  footnoteRefId,
  stemLang,
  delimitStem
}
