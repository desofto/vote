import { request } from 'utils/http'
import { UPDATE } from 'reducers/users'

function load(dispatch) {
  return async function () {
    const body = await request('/users')
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
    await request('/users', 'POST', {
      full_name: attributes.fullName,
      is_admin: attributes.isAdmin
    })

    await load(dispatch)()

    return true
  }
}

function remove(dispatch) {
  return async function (id) {
    await request(`/users/${id}`, 'DELETE')

    load(dispatch)()
  }
}

export { load, add, remove }
