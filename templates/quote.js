const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithTitle, $wrapIf} = require("./helpers/html.helpers");
const {attributionTemplate} = require("./_attribution");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  let attribution = '';
  if (jNode.attributes.attribution || jNode.attributes.citetitle) {
    attribution = attributionTemplate(jNode)
  }
  return $blockWithTitle({
      title: jNode.title,
      id: jNode.id,
      class: ['quote-block', jNode.role]

    },
    $('blockquote', {},
      $wrapIf(!jNode.hasBlocks, 'p', {}, jNode.content),
      attribution
    )
  )
}
