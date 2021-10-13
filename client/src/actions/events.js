import { UPDATE } from '../reducers/events'

import actions from '.'
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

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
    const events = body.data.map(e => ({
      title: e.attributes.title,
      date: e.attributes.date
    }))

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
      body: JSON.stringify({
        title: attributes.title,
        date: attributes.date
      })
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
