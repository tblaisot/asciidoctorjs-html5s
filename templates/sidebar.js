const {toJSON} = require("./helpers/node.helpers");
const {$aside, $h6,} = require("./helpers/html.helpers");
const {isDefined} = require("./helpers/utils.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $aside({
      class: ['sidebar', jNode.role],
      id: jNode.id,
    },
    isDefined(jNode.title) ? $h6({class: 'block-title'}, jNode.title) : '',
    jNode.content
  )
}
