import { UPDATE } from '../reducers/events'

import store from '../store'

function load(dispatch) {
  return async function () {
    const state = store.getState()

    const res = await fetch('/events', {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    const body = await res.json()
    const events = body.data.map(e => e.attributes)

    dispatch({ type: UPDATE, payload: events })
  }
}

function add(dispatch) {
  return async function (attributes) {
    const state = store.getState()

    await fetch('/events', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attributes)
    })

    load(dispatch)()
  }
}

function remove(dispatch) {
  return async function (id) {
    const state = store.getState()

    await fetch(`/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    load(dispatch)()
  }
}

export { load, add, remove }
