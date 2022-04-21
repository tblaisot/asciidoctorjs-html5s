const {$, $section, $a} = require("./helpers/html.helpers");
const {footnoteId, footnoteRefId} = require("./helpers/render.helpers");

module.exports.footnotesTemplate = function (node) {
  return $section({
      class: 'footnotes',
      'aria-label': 'Footnotes',
      role: 'doc-endnotes'
    },
    $('hr'),
    $('ol', {class: 'footnotes'},
      ...node.getFootnotes().map(fn => $('li', {
          id: footnoteId(fn.getIndex()),
          class: 'footnote',
          role: 'doc-endnote'
        },
        fn.getText(),
        $a({
            class: 'footnote-backref',
            href: `#${footnoteRefId(fn.getIndex())}`,
            role: 'doc-backlink',
            title: 'Jump to the first occurrence in the text',
          },
          '&#8617;'
        )
      ))
    )
  )
}
