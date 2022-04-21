module.exports.register = function register(registry) {
  registry.treeProcessor(function () {
    const self = this
    self.process(function (document) {
      document.findBy({'context': 'colist'}, (colist)=>{
        const blocks = colist.getParent().getBlocks()
        const colist_idx = blocks.indexOf(colist)
        if(colist_idx) {
          const prev_block = blocks[colist_idx - 1];
          if (prev_block && prev_block.getNodeName() == 'listing')
            prev_block['callout_list']=colist
            // console.log("Including callout", prev_block)
            blocks[colist_idx] = self.createBlock(colist.parent, 'empty', '', {});
        }
      });
      return document;
    })
  })
}
