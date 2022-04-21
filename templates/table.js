const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithCaption, $p} = require("./helpers/html.helpers");
const {debug} = require("./helpers/debug.helpers");

function cellContent(cell, tblsec) {
  if (tblsec === 'head') {
    return cell.getText()
  } else {
    switch (cell.getStyle()) {
      case 'asciidoc':
        return cell.getContent();
      case 'literal':
        return $('div', {class: 'literal'}, $('pre', {}, cell.getText()))
      default:
        const content = cell.getContent()
        if (content.length === 1) {
          return content[0]
        } else {
          return content.map(text => $p({}, text))
        }
    }
  }
}

module.exports = function ({node}) {
  const jNode = toJSON(node);
  // console.log(debug(node));
  let rows = '';
  if (jNode.attributes.rowcount > 0) {
    rows = $([
      $('colgroup', {},
        ...(jNode.options.autowidth
          ? node.getColumns().map(c => $('col'))
          : node.getColumns().map(c => $('col', {
              style: {
                width: `${c.getAttribute('colpcwidth')}%`
              }
            })
          )
        )
      ),
      ['head', 'foot', 'body']
        .filter(tblsec => node.getRows()[tblsec].length > 0)
        .map(tblsec => $(`t${tblsec}`, {},
            ...node.getRows()[tblsec].map(row => $('tr', {},
              ...row.map(cell => $(
                tblsec === 'head' || cell.getStyle() === 'header' ? 'th' : 'td',
                {
                  class: [
                    `halign-${cell.getAttribute('halign')}`,
                    `valign-${cell.getAttribute('valign')}`
                  ],
                  colspan: cell.colspan,
                  rowspan: cell.rowspan,
                  style: {'background-color': node.document.getAttribute('cellbgcolor')}
                },
                cellContent(cell, tblsec)
              ))
            ))
          )
        )
    ])
  }

// FIXME title et stretch
  return $blockWithCaption(
    node,
    {
      position: 'bottom',
      title: jNode.title,
      id: jNode.id,
      class: ['table-block', jNode.role],
    },
    $('table',
      {
        class: [
          `frame-${node.getAttribute('frame', 'all')}`,
          `grid-${node.getAttribute('grid', 'all')}`,
          jNode.options.stretch ? 'stretch' : '',
          jNode.attributes.stripes ? `stripes-${jNode.attributes.stripes}` : '',

        ],
        style: {
          with: (!jNode.options.autowidth && !jNode.options.stretch) ? `${jNode.attributes.tablepcwidth}%` : jNode.attributes.width,
          float: node.getAttribute('float')
        }
      },
      rows
    )
  )
}
