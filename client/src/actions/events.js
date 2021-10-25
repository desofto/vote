import { request } from 'utils/http'
import { UPDATE } from 'reducers/events'

function load(dispatch) {
  return async function () {
    const body = await request('/events')
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
    await request('/events', 'POST', {
        title: attributes.title,
        date: attributes.date
    })

    await load(dispatch)()

    return true
  }
}

function remove(dispatch) {
  return async function (id) {
    await request(`/events/${id}`, 'DELETE')

    load(dispatch)()
  }
}

export { load, add, remove }
