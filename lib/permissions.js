const path = require('path')
const { User } = require(path.resolve('models'))

module.exports = function(can) {
  can('read', User, (record, currentUser) => currentUser.isAdmin || record.id == currentUser.id)
  can('create', User, (_record, currentUser) => currentUser.isAdmin)
  can('update', User, (_record, currentUser) => currentUser.isAdmin)
  can('delete', User, (_record, currentUser) => currentUser.isAdmin)
}
