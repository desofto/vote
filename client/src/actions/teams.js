import { UPDATE } from '../reducers/teams'

import actions from '.'
import store from '../store'

function load(dispatch) {
  return async function () {
    const state = store.getState()

    const res = await fetch('/teams', {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
    const teams = body.data.map(e => ({
      id: e.attributes.id,
      title: e.attributes.title,
      state: e.attributes.state
    }))

    dispatch({ type: UPDATE, payload: teams })
  }
}

function add(dispatch) {
  return async function (attributes) {
    const state = store.getState()

    await fetch('/teams', {
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

    load(dispatch)()
  }
}

function remove(dispatch) {
  return async function (id) {
    const state = store.getState()

    await fetch(`/teams/${id}`, {
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
