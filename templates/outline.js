const {$, $a} = require("./helpers/html.helpers");
const {DEFAULT_TOCLEVELS} = require("./helpers/const.helpers");
const {sectionTitle, sectionLevel} = require("./helpers/render.helpers");


function child_toc(sec, toclevels) {
  let result = ''
  if (sec.getLevel() < toclevels) {
    result = renderOutline({node: sec})
  }
  return result;
}

function renderOutline({node, toclevels: _toclevels}) {
  if (node.getSections().length === 0) {
    return ''
  }
  const toclevels = node.getAttribute('toclevels-option') || _toclevels || node.document.getAttribute('toclevels', DEFAULT_TOCLEVELS)
  const slevel = sectionLevel(node.getSections()[0]);

  return $('ol', {
      class: ['toc-list', `level-${slevel}`]
    },
    ...node.getSections().map(sec => {
      return $('li', {},
        $a({
            href: `#${sec.getId()}`,
          },
          sectionTitle(sec, true)
        ),
        child_toc(sec, toclevels)
      )
    })
  )


}

module.exports = renderOutline
