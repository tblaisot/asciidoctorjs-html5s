const {toJSON} = require("./helpers/node.helpers");
const {$blockWithCaption, $div} = require("./helpers/html.helpers");
const {stemLang, delimitStem} = require("./helpers/render.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $blockWithCaption(node, {
      position: 'top',
      title: jNode.title,
      id: jNode.id,
      class: ['stem-block', jNode.role]
    },
    $div({
        class: 'math',
        'data-lang': stemLang(jNode)
      },
      delimitStem(jNode, jNode.content, node.getStyle())
    )
  )
}
