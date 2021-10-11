class ForbiddenError extends Error {
  name = 'ForbiddenError'
}

const rules = []

function can(action, klass, callback = null) {
  rules.push({ action, klass, callback })
}

function authorize(action, object) {
  let allowed = rules.some((rule) => {
    if (rule.action !== action) return
    if (rule.klass !== object && !(object instanceof rule.klass)) return
    if (rule.callback && !rule.callback(object)) return

    return true
  })
  if (!allowed) throw new ForbiddenError()
}

require('./permissions')(can)

module.exports = {
  authorize,
  ForbiddenError
}
