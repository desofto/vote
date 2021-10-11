const path = require('path')
const { User, Event, Stage, Vote } = require(path.resolve('models'))

module.exports = function(can) {
  can('read',   User, (record, currentUser) => currentUser.isAdmin || record.id == currentUser.id)
  can('create', User, (_record, currentUser) => currentUser.isAdmin)
  can('update', User, (_record, currentUser) => currentUser.isAdmin)
  can('delete', User, (_record, currentUser) => currentUser.isAdmin)

  can('read',   Event, (_record, currentUser) => currentUser.isAdmin)
  can('create', Event, (_record, currentUser) => currentUser.isAdmin)
  can('delete', Event, (_record, currentUser) => currentUser.isAdmin)

  can('read',   Stage, (_record, currentUser) => currentUser.isAdmin)
  can('create', Stage, (_record, currentUser) => currentUser.isAdmin)
  can('update', Stage, (_record, currentUser) => currentUser.isAdmin)
  can('delete', Stage, (_record, currentUser) => currentUser.isAdmin)

  can('create', Vote)
}
