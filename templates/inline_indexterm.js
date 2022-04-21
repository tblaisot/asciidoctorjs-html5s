const {toJSON} = require("./helpers/node.helpers");
const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  if (node.getType()) {
    return node.getText()
  }
  return ''
}
