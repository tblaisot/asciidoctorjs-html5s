const {$, $span} = require("./helpers/html.helpers");
const {tocTemplate} = require("./_toc");

module.exports.templateHeader = function (node) {
  let content = ''
  if (node.hasHeader()) {
    if (!node.hasAttribute('notitle-option')) {
      content += $('h1', {}, node.getHeader().getTitle())
    }
    if (['author', 'revnumber', 'revdate', 'revremark'].some(a => node.hasAttribute(a))) {
      let div_content = '';
      if (node.hasAttribute('author')) {
        div_content += $span({class: 'author', id: 'author'}, node.getAttribute('author'));
        div_content += $('br');
      }
      if (node.hasAttribute('email')) {
        div_content += $span({class: 'email', id: 'email'}, node.getAttribute('email')); //FIXME sub_macro
        div_content += $('br');
      }
      const authorcount = node.getAttribute('authorcount')
      if (parseInt(authorcount) > 1) {
        for (let idx = 2; idx < authorcount; idx++) {
          div_content += $span({class: 'author', id: `author${idx}`}, node.getAttribute(`author_${idx}`));
          div_content += $('br');
          if (node.hasAttribute(`email_${idx}`)) {
            div_content += $span({class: 'email', id: `author${idx}`}, node.getAttribute(`email_${idx}`)); //FIXME sub_macro
          }
        }
      }
      content += $('div', {class: 'details'}, div_content)
      if (node.hasAttribute('revnumber')) {
        content += $span({id: 'revnumber'}, `${(node.getAttribute('version-label') || '').toLowerCase()} ${node.getAttribute('revnumber')} ${node.hasAttribute('revdate') ? ',' : ''}`)
        content += '\''
      }
      if (node.hasAttribute('revdate')) {
        content += $('time', {
            id: 'revdate',
            datetime: new Date(node.getAttribute('revdate')).toISOString()
          },
          node.getAttribute('revdate')
      )
      }
      if (node.hasAttribute('revremark')) {
        content += $('br');
        content += $span({id: 'revremark'}, node.getAttribute('revremark'));
      }
    }
    if (node.hasAttribute('toc') && node.getAttribute('toc-placement') === 'auto') {
      tocTemplate(node)
    }
  }
  return content;
}
