import { UPDATE } from 'reducers/users'

function load(dispatch, request) {
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

function add(dispatch, request) {
  return async function (attributes) {
    await request('/users', 'POST', {
      full_name: attributes.fullName,
      is_admin: attributes.isAdmin
    })

    await load(dispatch, request)()

    return true
  }
}

function remove(dispatch, request) {
  return async function (id) {
    await request(`/users/${id}`, 'DELETE')

    load(dispatch, request)()
  }
}

export { load, add, remove }
