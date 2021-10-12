import { combineReducers } from 'redux'
import currentUser from './current-user'
import events from './events'

export default combineReducers({
  currentUser,
  events
})
