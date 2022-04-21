const {toJSON} = require("./helpers/node.helpers");
const {$h, $a, $section} = require("./helpers/html.helpers");
const {sectionTitle} = require("./helpers/render.helpers");
const {isDefined} = require("./helpers/utils.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $section({
      class: ['doc-section', `level-${jNode.sectionLevel}`, jNode.role],
    },
    $h({
        level: jNode.sectionLevel + 1,
        id: jNode.id
      },
      isDefined(jNode.id) && jNode.document.hasAttributes.sectanchors
        ? $a({class: "anchor", href: `#${jNode.id}`, 'aria-hidden': "true"})
        : '',
      isDefined(jNode.id) && jNode.document.hasAttributes.sectlinks
        ? $a({class: "link", href: `#${jNode.id}`}, sectionTitle(node))
        : sectionTitle(node),
      !isDefined(jNode.id) ? sectionTitle(node): ''
    ),
    jNode.content
  )
}
