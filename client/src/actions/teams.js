import { UPDATE } from 'reducers/teams'

function load(dispatch, request) {
  return async function (eventId) {
    const body = await request(`/events/${eventId}/teams`)
    if (!body.data) return

    const teams = body.data.map(e => ({
      id: e.attributes.id,
      title: e.attributes.title,
      state: e.attributes.state
    }))

    dispatch({ type: UPDATE, payload: teams })
  }
}

function add(dispatch, request) {
  return async function (eventId, attributes) {
    await request(`/events/${eventId}/teams`, 'POST', {
      title: attributes.title,
      state: attributes.state
    })

    await load(dispatch, request)(eventId)

    return true
  }
}

function remove(dispatch, request) {
  return async function (eventId, id) {
    await request(`/events/${eventId}/teams/${id}`, 'DELETE')

    load(dispatch, request)(eventId)
  }
}

function update(dispatch, request) {
  return async function (eventId, id, change) {
    await request(`/events/${eventId}/teams/${id}`, 'PUT', change)

    load(dispatch, request)(eventId)
  }
}

export { load, add, update, remove }
