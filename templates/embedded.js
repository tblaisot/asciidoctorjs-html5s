const {$} = require("./helpers/html.helpers");
const {tocTemplate} = require("./_toc");
const {footnotesTemplate} = require("./_footnotes");

module.exports = function ({node}) {
  let content = '';
  if (node.getNotitle() && node.hasHeader()) {
    content += $('h1', {id: node.getId()}, node.getHeader().getTitle())
  }
  if (node.hasSections()
    && node.hasAttribute('toc')
    && node.getAttribute('toc-placement', 'auto') === 'auto'
  ) {
    content += tocTemplate(node)
  }
  content += node.getContent()
  if (node.hasFootnotes() && !node.hasAttribute('nofootnotes')) {
    content += footnotesTemplate(node)
  }
  return content
}
