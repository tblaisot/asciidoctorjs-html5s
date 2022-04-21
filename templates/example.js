const {toJSON} = require("./helpers/node.helpers");
const {$div, $,$blockWithCaption} = require("./helpers/html.helpers");
const {isDefined} = require("./helpers/utils.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  if (jNode.options.collapsible) {
    return $('details',
      {
        id: jNode.id,
        class: jNode.role,
        open: jNode.options.open
      },
      isDefined(jNode.title) ? $('summary', {}, jNode.title) : '',
      $div({class: 'content'}, jNode.content),
    )
  } else {
    return $blockWithCaption(
      node,
      {
        position: 'top',
        title: jNode.title,
        id: jNode.id,
        class: ['example-block', jNode.role]
      },
      $div({class: 'example'}, jNode.content)
    )
  }
}
