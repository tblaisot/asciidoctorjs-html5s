// = block_with_title :class=>'verse-block'
//   - if attr?(:attribution) || attr?(:citetitle)
//     blockquote.verse
//       pre.verse =content
//       include _attribution.html
//   - else
//     pre.verse =content

const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithTitle} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);

return $blockWithTitle({
  title: jNode.title,
  id: jNode.id,
  class: 'verse-block',
},
  jNode.content
  )
}
