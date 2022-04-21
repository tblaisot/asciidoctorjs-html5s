const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithTitle, $div} = require("./helpers/html.helpers");

/**
 * Returns +true+ if an abstract block is allowed in this document type,
 * otherwise prints warning and returns +false+.
 */
function abstract_allowed(node) {
  const result = (node.parent === node.document && node.document.doctype === 'book')
  if (result)
    console.error('asciidoctor: WARNING: abstract block cannot be used in a document without a title when doctype is book. Excluding block content.')
  return !result
}

/**
 * Returns +true+ if an partintro block is allowed in this document type,
 * otherwise prints warning and returns +false+.
 */
function partintro_allowed(node) {
  const result = (node.getLevel() !== 0 || node.parent.getContext() !== 'section' || node.document.doctype !== 'book')
  if (result)
    console.error('asciidoctor: ERROR: partintro block can only be used when doctype is book and must be a child of a book part. Excluding block content.')
  return !result
}

module.exports = function ({node}) {
  const jNode = toJSON(node);
  if (jNode.style === 'abstract') {
    if (abstract_allowed(node)) {
      return $blockWithTitle({
          title: jNode.title,
          id: jNode.id,
          class: ['quote-block', 'abstract'],
        },
        $('blockquote', {}, jNode.content)
      )
    }
  } else if (jNode.style !== 'partintro' || partintro_allowed(node)) {
    return $blockWithTitle({
        title: jNode.title,
        id: jNode.id,
        class: ['open-block', {[jNode.style]: jNode.style !== 'open'}],
      },
      $div({class: 'content'}, jNode.content)
    )
  }
  console.error('asciidoctor: WARNING: Excluding block content.')
  return ''
}
