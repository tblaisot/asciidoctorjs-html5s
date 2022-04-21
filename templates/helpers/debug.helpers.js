function debug(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (['document', 'parent'].includes(key)) {
      return undefined
    }
    return value
  }, 2)
}

module.exports = {
  debug
}
