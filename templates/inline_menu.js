const {toJSON} = require("./helpers/node.helpers");
const {$} = require("./helpers/html.helpers");

module.exports = function ({node}) {
  const jNode = toJSON(node);
  if (jNode.attributes.menuitem) {
    const capture = `&#160;<span class="caret">&#8250;</span>&#32;`
    return $('kbd', {class: 'menuseq'},
      $('kbd', {class: 'menu'},
        $('samp', {}, jNode.attributes.menu),
        capture,
        jNode.attributes.submenus.map(submenu => {
          return $([
            $('kbd', {class: 'menu'},
              $('samp', {}, submenu)
            ),
            capture
          ])
        }),
        $('kbd', {class: 'menu'},
          $('samp', {}, jNode.attributes.menuitem)
        ),
      ))
  } else {
    return $('kbd', {class: 'menu'},
      $('samp', {}, jNode.attributes.menu)
    )
  }
}
