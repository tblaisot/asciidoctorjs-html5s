const {toJSON} = require("./helpers/node.helpers");
const {$, $section} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  let toc = '';
  if(node.document.getAttribute('toc') && node.document.getAttribute('toc-placement') === 'preamble'){
    toc = tocTemplate(node)
  }
  return $([
  $section({
    id: 'preamble',
    'aria-label': 'Preamble'
    },
    node.getContent()
  ),
    toc
  ])
}
