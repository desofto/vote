import { combineReducers } from 'redux'
import events from './events'
import users from './users'
import stages from './stages'
import teams from './teams'
import dashboard from './dashboard'

export default combineReducers({
  events,
  users,
  stages,
  teams,
  dashboard
})
