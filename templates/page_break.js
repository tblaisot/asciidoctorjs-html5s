const {toJSON} = require("./helpers/node.helpers");
const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  return $('div', {
    role: 'doc-pagebreak',
    style: {
      'page-break-after': 'always'
    }
  })
}
