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
    if (!body.data) return

    const events = body.data.map(e => ({
      id: e.attributes.id,
      title: e.attributes.title,
      date: e.attributes.date
    }))

    dispatch({ type: UPDATE, payload: events })
  }
}

function add(dispatch) {
  return async function (attributes) {
    const state = store.getState()

    const res = await fetch('/events', {
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

    if (res.status >= 300) {
      const body = await res.json()
      if (body.message) alert(body.message)
      return false
    }

    await load(dispatch)()

    return true
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
