import { request } from 'utils/http'
import { UPDATE } from 'reducers/stages'

function load(dispatch) {
  return async function (eventId) {
    const body = await request(`/events/${eventId}/stages`)
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
    await request(`/events/${eventId}/stages`, 'POST', {
      title: attributes.title,
      order: attributes.order,
      state: attributes.state
    })

    await load(dispatch)(eventId)

    return true
  }
}

function remove(dispatch) {
  return async function (eventId, id) {
    await request(`/events/${eventId}/stages/${id}`, 'DELETE')

    load(dispatch)(eventId)
  }
}

function update(dispatch) {
  return async function (eventId, id, change) {
    await request(`/events/${eventId}/stages/${id}`, 'PUT', change)

    load(dispatch)(eventId)
  }
}

export { load, add, update, remove }
