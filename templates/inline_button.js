const {toJSON} = require("./helpers/node.helpers");
const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $('kbd',
    {class: 'button'},
    $('samp', {}, jNode.text)
  )
}
