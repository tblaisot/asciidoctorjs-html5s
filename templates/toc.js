const {toJSON} = require("./helpers/node.helpers");
const {$, $h} = require("./helpers/html.helpers");
const renderOutline = require("./outline");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  if (node.document.hasAttribute('toc') && node.document.getSections().length > 0) {
    const toc_id = node.getId()
      || ((node.document.isEmbedded() || !node.document.hasAttribute('toc-placement')) ? 'toc' : '');

    return $(
      'nav',
      {
        id: toc_id,
        class: [jNode.role, node.document.getAttribute('toc-class', 'toc')],
        role: 'doc-toc',
      },
      $h({
          level: node.level + 2,
          id: toc_id ? `${toc_id}-title` : ''
        },
        node.title || node.document.getAttribute('toc-title') || 'Table of Contents',
      ),
      renderOutline({node: node.document, toclevels: node.getAttribute('levels')})
    )
  }
  return ''
}
