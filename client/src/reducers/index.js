import { combineReducers } from 'redux'
import currentUser from './current-user'
import events from './events'
import users from './users'
import stages from './stages'
import teams from './teams'

export default combineReducers({
  currentUser,
  events,
  users,
  stages,
  teams
})
