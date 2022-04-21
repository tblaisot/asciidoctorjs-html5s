const {$} = require("./helpers/html.helpers");

module.exports.attributionTemplate = function (jNode) {
  return $('footer', {},
    '&#8212;',
    $('cite', {}, [jNode.attributes.attribution, jNode.attributes.citetitle].join(', '))
  )
}
