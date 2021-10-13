import { UPDATE } from '../reducers/users'

import actions from '.'
import store from '../store'

function load(dispatch) {
  return async function () {
    const state = store.getState()

    const res = await fetch('/users', {
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      }
    })

    if (!actions.currentUser.checkStatus(dispatch)(res.status)) return

    const body = await res.json()
    if (!body.data) return

    const users = body.data.map(e => ({
      id: e.attributes.id,
      fullName: e.attributes.full_name,
      accessCode: e.attributes.access_code,
      isAdmin: e.attributes.is_admin
    }))

    dispatch({ type: UPDATE, payload: users })
  }
}

function add(dispatch) {
  return async function (attributes) {
    const state = store.getState()

    await fetch('/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${state.currentUser.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: attributes.fullName,
        is_admin: attributes.isAdmin
      })
    })

    load(dispatch)()
  }
}

function remove(dispatch) {
  return async function (id) {
    const state = store.getState()

    await fetch(`/users/${id}`, {
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
