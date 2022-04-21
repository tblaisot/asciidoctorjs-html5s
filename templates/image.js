const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithCaption, $wrapIf} = require("./helpers/html.helpers");
const {debug} = require("./helpers/debug.helpers");
const {isDefined, isEmptyString} = require("./helpers/utils.helpers");
const {imageLink, imageLinkLabel, linkRel} = require("./helpers/render.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  const target_url = node.getImageUri(jNode.attributes.target)
  const image_link = imageLink(node)
  const image_link_label = imageLinkLabel(node)
  const link_rel = linkRel(node)
  return $blockWithCaption(node,
    {
      id: jNode.id,
      title: jNode.title,
      position: 'bottom',
      class: ['image-block', jNode.role],
      style: {'text-align': jNode.attributes.align, float: jNode.attributes.float}
    },
    $wrapIf(!isEmptyString(image_link), 'a', {
        'class': ['image', {bare: (image_link === target_url)}],
        'href': image_link,
        'title': image_link_label,
        'aria-label': image_link_label,
        'target': jNode.attributes.window,
        'rel': link_rel
      },
      $('img',
        {
          src: target_url,
          alt: jNode.attributes.alt,
          width: jNode.attributes.width,
          height: jNode.attributes.height,
          loading: jNode.attributes.loading,
        })
    )
  )
}
