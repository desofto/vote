import { UPDATE } from '../reducers/stages'

import actions from '.'
import store from '../store'

function load(dispatch) {
  return async function () {
    const state = store.getState()

    const res = await fetch('/stages', {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
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
  return async function (attributes) {
    const state = store.getState()

    await fetch('/stages', {
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

    load(dispatch)()
  }
}

function remove(dispatch) {
  return async function (id) {
    const state = store.getState()

    await fetch(`/stages/${id}`, {
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
