import { UPDATE } from '../reducers/teams'

import actions from '.'
import store from '../store'

function load(dispatch) {
  return async function (eventId) {
    const state = store.getState()

    const res = await fetch(`/events/${eventId}/teams`, {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
    if (!body.data) return

    const teams = body.data.map(e => ({
      id: e.attributes.id,
      title: e.attributes.title,
      state: e.attributes.state
    }))

    dispatch({ type: UPDATE, payload: teams })
  }
}

function add(dispatch) {
  return async function (eventId, attributes) {
    const state = store.getState()

    const res = await fetch(`/events/${eventId}/teams`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: attributes.title,
        state: attributes.state
      })
    })

    if (res.status >= 300) {
      const body = await res.json()
      if (body.message) alert(body.message)
      return false
    }

    await load(dispatch)(eventId)

    return true
  }
}

function remove(dispatch) {
  return async function (eventId, id) {
    const state = store.getState()

    await fetch(`/events/${eventId}/teams/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    load(dispatch)(eventId)
  }
}

function update(dispatch) {
  return async function (eventId, id, change) {
    const state = store.getState()

    await fetch(`/events/${eventId}/teams/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(change)
    })

    load(dispatch)(eventId)
  }
}

export { load, add, update, remove }
