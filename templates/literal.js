const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithTitle} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $blockWithTitle(
    {
      title: jNode.title,
      id: jNode.id,
      class: ['literal-block', jNode.role]
    },
    $('pre',
      {class: {'nowrap': jNode.options.nowrap}},
      jNode.content
    )
  )
}
