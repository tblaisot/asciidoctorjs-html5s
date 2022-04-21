const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithTitle} = require("./helpers/html.helpers");
const {$printItemContent} = require("./helpers/render.helpers");
const {isDefined} = require("./helpers/utils.helpers");

function renderItem(item, checklist) {
  if (checklist && isDefined(item.attributes.checkbox)) {
    return $(
      'li',
      {id: item.id, class: ["task-list-item",item.role]},
      $('input',
        {
          class: "task-list-item-checkbox",
          type: "checkbox",
          disabled: true,
          checked: isDefined(item.attributes.checked),
        }),
      item.text
    )
  } else
    return $(
      'li',
      {id: item.id, class: item.role},
      $printItemContent(item)
    )
}


module.exports = function ({node}) {
  const jNode = toJSON(node);
  const checklist = jNode.options.checklist ? 'task-list' : null
  return $blockWithTitle(
    {
      title: jNode.title,
      id: jNode.id,
      class: ['ulist', jNode.style, jNode.role]
    },
    $(
      'ul',
      {
        class: checklist || jNode.style,
      },
      ...jNode.items.map(item => renderItem(item, checklist))
    )
  )
}
