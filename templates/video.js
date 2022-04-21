const {toJSON} = require("./helpers/node.helpers");
const {$, $blockWithCaption} = require("./helpers/html.helpers");
const {isEmptyString, isDefined} = require("./helpers/utils.helpers");

function url_query(params) {
  const url = new URL('http://example.com')
  Object.entries(params)
    .filter(([key, value]) => isDefined(value))
    .filter(([key, value]) => value !== 0)
    .forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })
  return url.search
}

/**
 * @return [Boolean] +true+ if the video should be embedded in an iframe.
 */
function video_iframe(node) {
  return ['vimeo', 'youtube'].includes(node.getAttribute('poster'))
}

function video_uri(node, jNode) {
  switch (jNode.attributes.poster) {
    case 'vimeo': {
      const params = {
        autoplay: (jNode.options.autoplay ? 1 : 0),
        loop: (jNode.options.loop ? 1 : 0),
        muted: (jNode.options.muted ? 1 : 0)
      }
      let start_anchor = ''
      if (jNode.attributes.start) {
        start_anchor = `#at=${jNode.attributes.start}`
      }
      return `//player.vimeo.com/video/${jNode.attributes.target}${start_anchor}${url_query(params)}`;
    }
    case 'youtube': {
      const [video_id, list_id] = jNode.attributes.target.split('/')
      const params = {
        rel: 0,
        start: jNode.attributes.start,
        end: jNode.attributes.end,
        list: jNode.attributes.list || list_id,
        autoplay: (jNode.options.autoplay ? 1 : 0),
        loop: (jNode.options.loop ? 1 : 0),
        muted: (jNode.options.muted ? 1 : 0),
        controls: (jNode.options.nocontrols ? 0 : 1)
      }
      return `//www.youtube.com/embed/${video_id}${url_query(params)}`;
    }
    default: {
      let anchor = [
        jNode.attributes.start?.trim(),
        jNode.attributes.end?.trim()
      ]
        .filter(s => !isEmptyString(s))
        .join(',');
      if (!isEmptyString(anchor)) {
        anchor = '#t=' + anchor
      }
      return node.getMediaUri(`${jNode.attributes.target}${anchor}`)
    }
  }
}

module.exports = function ({node}) {
  const jNode = toJSON(node);

  let block = '';
  if (video_iframe(node)) {
    block = $(
      'iframe',
      {
        src: video_uri(node, jNode),
        width: jNode.attributes.width,
        height: jNode.attributes.height,
        frameborder: 0,
        allowfullscreen: !jNode.options.nofullscreen
      }
    )
  } else {
    block = $(
      'video',
      {
        src: video_uri(node, jNode),
        width: jNode.attributes.width,
        height: jNode.attributes.height,
        poster: (isDefined(jNode.attributes.poster) ? node.getMediaUri(jNode.attributes.poster) : ''),
        autoplay: jNode.options.autoplay,
        muted: jNode.options.muted,
        controls: !jNode.options.nocontrols,
        loop: jNode.options.loop
      },
      'Your browser does not support the video tag.'
    )
  }
  return $blockWithCaption(node,
    {
      id: jNode.id,
      title: jNode.title,
      position: 'bottom',
      class: ['video-block', jNode.role],
    },
    block
  )
}


