/**
 * Return a string with the HTML attribute for the given value.
 * If the value is empty, an empty string is returned
 * @param {string} name the name of the attribute
 * @param {value} value the value of the attribute
 */
const {isEmptyString, isDefined, isArray, isObject, isString} = require("./utils.helpers");
const {VOID_ELEMENTS} = require("./const.helpers");

function toAttribute(name, value) {
  // cas des attributs boolean dont la présence seul suffit
  if (typeof value === "boolean") {
    return value === true ? ` ${name}` : '';
  }

  // cas des classes css
  if (name === 'class') {
    value = toClasses(value)
  }

  // cas des styles css
  if (name === 'style') {
    value = toStyles(value)
  }
  return !isEmptyString(value) ? ` ${name}="${value}"` : ''
}


function toAttributes(attributes) {
  return Object.entries(attributes || {})
    .reduce(
      (acc, [name, value]) => {
        return acc + toAttribute(name, value)
      },
      ''
    );
}

function $(...attrs) {
  if (isArray(attrs[0])) {
    return attrs[0].join('');
  } else if (isString(attrs[0])) {
    const [tag, attributes = {}, ...children] = attrs;
    if(VOID_ELEMENTS.includes(tag)){
      return `<${tag}${toAttributes(attributes)} />`;
    }
    return `<${tag}${toAttributes(attributes)}>${$(children)}</${tag}>`;
  } else {
    throw new Error(`Wrong arguments: ${attrs[0]}`)
  }
}

function createTagFunction(tag) {
  return (attributes, ...children) => $(tag, attributes, ...children);
}

function $wrapIf(condition, tag, attributes, ...children) {
  if (condition) {
    return $(tag, attributes, ...children);
  } else {
    return $(children);
  }
}

function $h({level, ...attributes}, ...children) {
  return $(`h${level}`, attributes, ...children);
}

function toClasses(...args) {
  return args.map(arg => {
    if (isString(arg)) {
      return arg
    } else if (isArray(arg)) {
      return toClasses(...arg)
    } else if (isObject(arg)) {
      return Object.entries(arg)
        .map(([key, value]) => value ? key : '')
        .join(' ')
        .trim()
    } else {
      return '';
    }
  })
    .join(' ')
    .trim()
}


function toStyles(styles) {
  return Object.entries(styles).map(([key, value]) =>
    !isEmptyString(value) ? `${key}: ${value}` : ''
  )
    .filter(value => !isEmptyString(value))
    .join('; ')
    .trim();
}

function $blockWithTitle(attributes, content) {
  const {title, nested, ...attrs} = attributes;
  if (!isDefined(title)) {
    return $wrapIf(!nested, 'div', attrs, content)
  } else {
    return $section(
      attrs,
      $h6({class: "block-title"}, title),
      content
    )
  }
}

function $blockWithCaption(node, attributes, content) {
  const {title, nested, position = 'bottom', ...attrs} = attributes;
  if (!isDefined(title)) {
    return $div(attrs, content)
  } else {
    const _content = [
      content,
      $figcaption({}, node.getCaptionedTitle())
    ]
    if (position === 'top') {
      _content.reverse()
    }
    return $figure(attrs, ..._content)
  }
}

/**
* Returns HTML meta tag if the given +content+ is not +nil+.
*
* @param name [#to_s] the name for the metadata.
* @param content [#to_s, nil] the value of the metadata, or +nil+.
* @return [String, nil] the meta tag, or +nil+ if the +content+ is +nil+.
*/
function $metaIf(name, content){
  return content? `<meta name="${name}" content="${content}">` : ''
    }


const $div = createTagFunction('div');
const $p = createTagFunction('p');
const $span = createTagFunction('span');
const $aside = createTagFunction('aside');
const $section = createTagFunction('section');
const $h6 = createTagFunction('h6');
const $figcaption = createTagFunction('figcaption');
const $figure = createTagFunction('figure');
const $a = createTagFunction('a');
const $br = createTagFunction('br');


module.exports = {
  $,
  $wrapIf,
  $blockWithCaption,
  $blockWithTitle,
  $a,
  $h,
  $div,
  $p,
  $br,
  $span,
  $aside,
  $section,
  $h6,
  $metaIf
}
