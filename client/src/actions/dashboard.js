import { UPDATE } from '../reducers/dashboard'

import actions from '.'
import store from '../store'

function load(dispatch) {
  return async function () {
    const state = store.getState()

    const res = await fetch('/dashboard', {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
    if (!body) return

    dispatch({ type: UPDATE, payload: body })
  }
}

function vote(dispatch) {
  return async function(eventId, stageId, teamId) {
    const state = store.getState()

    const res = await fetch(`/events/${eventId}/stages/${stageId}/vote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ team_id: teamId })
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    load(dispatch)()
  }
}

export { load, vote }