const {toJSON} = require("./helpers/node.helpers");
const {$, $a} = require("./helpers/html.helpers");
const {xrefText, linkRel, bibrefText} = require("./helpers/render.helpers");


// FIXME case .xref-resolved-text
// FIXME case .xref-xrefstyle
module.exports = function ({node}) {
  const jNode = toJSON(node);

  switch (jNode.type) {
    case 'xref':
      return $a({href: jNode.target, class: jNode.role}, xrefText(node));
    case 'ref':
      return $a({id: jNode.id, 'aria-hidden': 'true'})
    case 'bibref':
      return $a({id: jNode.id, 'aria-hidden': 'true'})+bibrefText(node)
    default:
      return $a({
          id: jNode.id,
          class: jNode.role,
          href: jNode.target,
          target: jNode.attributes.window,
          rel: linkRel(node),
          title: jNode.attributes.title
        },
        jNode.text
      )
  }
}
