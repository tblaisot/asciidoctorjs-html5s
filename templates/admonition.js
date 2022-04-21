const {toJSON} = require("./helpers/node.helpers");
const {$, $h6, $span, $p} = require("./helpers/html.helpers");

/**
 * @return [Boolean] should be this admonition wrapped in aside element?
 */
function admonition_aside(jNode) {
  return ['note', 'tip'].includes(jNode.attributes.name)
}

/**
 * @return [String, nil] WAI-ARIA role of this admonition.
 */
function admonition_aria(jNode) {
  switch (jNode.attributes.name) {
    case 'note':
      return 'note';  // https://www.w3.org/TR/wai-aria/roles#note
    case 'tip':
      return 'doc-tip';  // https://www.w3.org/TR/dpub-aria-1.0/#doc-tip
    case 'caution':
    case'important':
    case'warning':
      return 'doc-notice';  // https://www.w3.org/TR/dpub-aria-1.0/#doc-notice
    default:
      return '';
  }
}


module.exports = function ({node}) {
  const jNode = toJSON(node);
  const capture = $([
    $h6(
      {
        class: ['block-title', {'label-only': !jNode.title}]
      },
      $span({class: 'title-label'}, jNode.attributes.textlabel+': '),
      jNode.title
    ),
    jNode.hasBlocks ? jNode.content : $p({}, jNode.content)
  ])

  return $(
    admonition_aside(jNode) ? 'aside' : 'section',
    {
      id: jNode.id,
      class: ['admonition-block', jNode.attributes.name, jNode.role],
      role: admonition_aria(jNode),
    },
    capture
  )
}
