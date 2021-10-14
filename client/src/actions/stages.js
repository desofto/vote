import { UPDATE } from '../reducers/stages'

import actions from '.'
import store from '../store'

function load(dispatch) {
  return async function (eventId) {
    const state = store.getState()

    const res = await fetch(`/events/${eventId}/stages`, {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
    if (!body.data) return

    const stages = body.data.map(e => ({
      id: e.attributes.id,
      title: e.attributes.title,
      order: e.attributes.order,
      state: e.attributes.state
    }))

    dispatch({ type: UPDATE, payload: stages })
  }
}

function add(dispatch) {
  return async function (eventId, attributes) {
    const state = store.getState()

    const res = await fetch(`/events/${eventId}/stages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: attributes.title,
        order: attributes.order,
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

    await fetch(`/events/${eventId}/stages/${id}`, {
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

    await fetch(`/events/${eventId}/stages/${id}`, {
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
