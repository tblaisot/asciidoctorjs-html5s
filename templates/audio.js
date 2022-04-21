const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithCaption} = require("./helpers/html.helpers");
const {isDefined} = require("./helpers/utils.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  return $blockWithCaption(
    node,
    {
      id: jNode.id,
      position: 'bottom',
      class: ['audio-block', jNode.role],
      title: jNode.title
    },
    $('audio',
      {
        src: node.getMediaUri(jNode.attributes.target),
        autoplay: jNode.options.autoplay,
        controls: !isDefined(jNode.options.nocontrols),
        loop: jNode.options.loop,
      },
      'Your browser does not support the audio tag.'
    )
  )
}
