import { combineReducers } from 'redux'
import currentUser from './current-user'
import events from './events'
import users from './users'

export default combineReducers({
  currentUser,
  events,
  users
})
