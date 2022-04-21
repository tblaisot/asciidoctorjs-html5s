const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithCaption, $wrapIf} = require("./helpers/html.helpers");
const {debug} = require("./helpers/debug.helpers");
const {isDefined, isEmptyString} = require("./helpers/utils.helpers");
const {imageLink, imageLinkLabel, linkRel} = require("./helpers/render.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  const link_rel = linkRel(node)

  let content = '';
  if (jNode.type === 'icon' && node.document.getAttribute('icons') === 'font') {
    content = $('i', {
      class: [...icon_fa_classes, jNode.role],
      title: jNode.attributes.title
    })

  } else if (jNode.type === 'icon' && !node.document.hasAttribute('icons')) {
    content = $('b', {
        class: ['icon', jNode.role],
        title: jNode.attributes.title
      },
      `[${jNode.attributes.alt}]`
    )
  } else {
    content = $('img',
      {
        src: jNode.type === 'icon' ? node.getIconUri(jNode.target) : node.getImageUri(jNode.target),
        alt: jNode.attributes.alt,
        width: jNode.attributes.width,
        height: jNode.attributes.height,
        title: jNode.attributes.title,
        loading: jNode.attributes.loading,
        class: [{[jNode.type]: jNode.type !== 'image'}, jNode.role],
        style: {float: jNode.attributes.float}
      }
    )
  }

  return $wrapIf(isDefined(jNode.attributes.link), 'a', {
      'class': 'image',
      'href': jNode.attributes.link,
      'target': jNode.attributes.window,
      'rel': link_rel
    },
    content
  )
}
