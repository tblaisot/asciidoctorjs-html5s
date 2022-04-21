const {toJSON} = require("./helpers/node.helpers");
const {$, $a} = require("./helpers/html.helpers");
const {footnoteId, footnoteRefId} = require("./helpers/render.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  const index = jNode.attributes.index;
  if (index) {
    return $a({
        id: (jNode.type === 'xref' ? '' : footnoteRefId(jNode)),
        href: `#${footnoteId(jNode)}`,
        class: ['footnote-ref', jNode.role],
        title: `View footnote ${index}`,
        role: 'doc-noteref'
      }, `[${index}]`
    )
  } else {
    return $a({class: ['footnote-ref', 'broken'], title: "Unresolved footnote reference."}, `[${jNode.text}]`)
  }
}
