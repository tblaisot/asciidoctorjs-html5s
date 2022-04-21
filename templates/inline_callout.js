const {toJSON} = require("./helpers/node.helpers");
const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $('b',
    {class: 'conum', 'data-value': jNode.text},
    jNode.text
  )
}
