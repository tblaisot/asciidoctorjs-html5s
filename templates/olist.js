const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithTitle} = require("./helpers/html.helpers");
const {$printItemContent} = require("./helpers/render.helpers");

// FIXME case .with-numeration-styles
// FIXME case .max-nesting
module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $blockWithTitle(
    {
      title: jNode.title,
      id: jNode.id,
      class: ['olist', jNode.style, jNode.role]
    },
    $(
      'ol',
      {
        class: jNode.style,
        start: jNode.attributes.start,
        type: jNode.marker,
        reversed: jNode.options.reversed,
      },
      ...jNode.items.map(item =>
        $(
          'li',
          {id: item.id, class: item.role},
          $printItemContent(item)
        )
      )
    )
  )
}
