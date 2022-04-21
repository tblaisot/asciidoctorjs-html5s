const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const keys = node.getAttribute('keys');
  if (keys.length === 1) {
    return $('kdb', {class: 'key'}, keys[0]);
  } else {
    return $('kdb', {class: 'keyseq'},
      keys.map((key, idx) => {
        $([
          (idx === 0 ? '+' : ''),
          $('kdb', {class: 'key'}, key)
        ])
      })
    )
  }
}
