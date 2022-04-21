const {toJSON} = require("./helpers/node.helpers");
const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $('ol',
    {
      id: jNode.id,
      class: ['callout-list', jNode.style, jNode.role]
    },
    $(jNode.items.map(item => $('li', {}, item.text)))
  )
}
