const asciidoctor = require('@asciidoctor/core')()
// asciidoctor.convertFile('tests/asciidoc/admonition.adoc', { safe: 'safe', backend: 'html5', template_dir: './templates' })
const fs = require('fs')
const path = require('path')
const prettier = require("prettier");
const highlightJsExt = require('asciidoctor-highlight.js')

const attachedColistTreeprocessorExt = require('../attached_colist_treeprocessor')

// Register the extension into custom registry.
const registry = asciidoctor.Extensions.create()
highlightJsExt.register(registry)
attachedColistTreeprocessorExt.register(registry)

const OPTIONS = {
  extension_registry: registry,
  attributes: {'source-highlighter': 'highlightjs-ext'},
  // safe: 'safe',
  backend: 'html',
  template_dir: './templates'
}

function executeTest(input) {
  let data = fs.readFileSync(path.join(__dirname,input), {encoding: 'utf8'})
  const addition = input.replace(/^asciidoc/, 'asciidoc-addition');
  if(fs.existsSync(addition)){
    const addDate = fs.readFileSync(addition, {encoding: 'utf8'})
    data = data + '\n' + addDate
  }

  const reference = input.replace(/\.adoc$/, '.html').replace(/^asciidoc/, 'html5')
  const dataRef = fs.readFileSync(path.join(__dirname,reference), {encoding: 'utf8'})
  const references = [];
  dataRef.split('\n').forEach((line) => {
    if (line.startsWith('<!-- .')) {
      references.push([]);
    }
    references[references.length - 1].push(line);
  });
  const htmlReferences = references.reduce((referencesDic, lines) => {
      referencesDic[lines[0].replace(/^<!-- \./, '')] = lines.join('\n');
      return referencesDic;
    },
    {})



  const exemples = [];
  data.split('\n').forEach((line) => {
    if (line.startsWith('// .')) {
      exemples.push([]);
    }
    exemples[exemples.length - 1].push(line);
  });

  const adocExamples = exemples.reduce((exemplesDic, lines) => {
      exemplesDic[lines[0].replace(/^\/\/ \./, '')] = lines.join('\n');
      return exemplesDic;
    },
    {})

  const results = {};
  Object.keys(adocExamples).forEach(key => {
    const value = adocExamples[key];
    let convertedAdoc = asciidoctor.convert(value, OPTIONS);
    try {
      convertedAdoc = prettier.format(convertedAdoc, {parser: 'html'});
    } catch (error){
      console.error(error);
      console.log("===== value =====")
      console.log(value)
      console.log("===== convertedAdoc =====")
      console.log(convertedAdoc)
    }
    results[key]=convertedAdoc
  })
  // real test
  Object.keys(results).forEach(key => {
    test(`${input} > ${key}`, () => {
      expect(results[key]).toMatchSnapshot();
    });
  })
// init test results
//   Object.keys(htmlReferences).forEach(key => {
//     test(`${input} > ${key}`, () => {
//       expect(htmlReferences[key]).toMatchSnapshot();
//     });
//   })

}

executeTest('asciidoc/admonition.adoc');
executeTest('asciidoc/audio.adoc');
// executeTest('asciidoc/colist.adoc'); // FIXME Erreur
executeTest('asciidoc/dlist.adoc');
// executeTest('asciidoc/document.adoc'); // FIXME sert a rien
executeTest('asciidoc/embedded.adoc');
executeTest('asciidoc/example.adoc');
executeTest('asciidoc/floating_title.adoc');
executeTest('asciidoc/image.adoc');
executeTest('asciidoc/inline_anchor.adoc');
executeTest('asciidoc/inline_break.adoc');
executeTest('asciidoc/inline_button.adoc');
executeTest('asciidoc/inline_callout.adoc'); // FIXME ?
executeTest('asciidoc/inline_footnote.adoc');
executeTest('asciidoc/inline_image.adoc');
executeTest('asciidoc/inline_kbd.adoc');
executeTest('asciidoc/inline_menu.adoc');
executeTest('asciidoc/inline_quoted.adoc');
executeTest('asciidoc/listing.adoc');
executeTest('asciidoc/literal.adoc');
executeTest('asciidoc/olist.adoc');
executeTest('asciidoc/open.adoc');
executeTest('asciidoc/outline.adoc');
executeTest('asciidoc/page_break.adoc');
executeTest('asciidoc/paragraph.adoc');
executeTest('asciidoc/pass.adoc');
executeTest('asciidoc/preamble.adoc');
executeTest('asciidoc/quote.adoc');
executeTest('asciidoc/section.adoc');
executeTest('asciidoc/sidebar.adoc');
executeTest('asciidoc/stem.adoc');
executeTest('asciidoc/table.adoc');
executeTest('asciidoc/thematic_break.adoc');
executeTest('asciidoc/toc.adoc');
executeTest('asciidoc/ulist.adoc');
executeTest('asciidoc/verse.adoc');
executeTest('asciidoc/video.adoc');

