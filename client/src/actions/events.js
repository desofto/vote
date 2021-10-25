import { UPDATE } from 'reducers/events'

function load(dispatch, request) {
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

function add(dispatch, request) {
  return async function (attributes) {
    await request('/events', 'POST', {
        title: attributes.title,
        date: attributes.date
    })

    await load(dispatch, request)()

    return true
  }
}

function remove(dispatch, request) {
  return async function (id) {
    await request(`/events/${id}`, 'DELETE')

    load(dispatch, request)()
  }
}

export { load, add, remove }
