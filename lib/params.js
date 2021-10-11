function permit(unpermitted, permitted = []) {
  const attributes = {}
  permitted.forEach(attr => attributes[attr] = unpermitted[attr])
  return attributes
}

module.exports = { permit }
