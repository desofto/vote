class NoTokenError extends Error {
  name = 'NoTokenError'
}

class ForbiddenError extends Error {
  name = 'ForbiddenError'
}

const rules = []

function can(action, klass, callback = null) {
  rules.push({ action, klass, callback })
}

function authorize(action, object, currentUser) {
  let allowed = rules.some((rule) => {
    if (rule.action !== action) return
    if (rule.klass !== object && !(object instanceof rule.klass)) return
    if (rule.callback) {
      if (!currentUser) throw new NoTokenError('No token')
      if (!rule.callback(object, currentUser)) return
    }
    return true
  })
  if (!allowed) throw new ForbiddenError()
}

require('./permissions')(can)

module.exports = {
  authorize,
  NoTokenError,
  ForbiddenError
}
