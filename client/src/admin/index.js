import { useEffect, useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

function Admin() {
  const [tab, setTab] = useState('events')

  return (
    <Tabs
      activeKey={tab}
      onSelect={tab => setTab(tab)}
      className="mb-3"
    >
      <Tab eventKey="events" title="Events">
        <Events />
      </Tab>
      <Tab eventKey="users" title="Users">
        <Users />
      </Tab>
    </Tabs>
  )
}

function Events() {
  const EMPTY_EVENT = { title: '', date: '' }
  const events = useSelector(store => store.events)
  const [event, setEvent] = useState(EMPTY_EVENT)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.events.load(dispatch)()
  }, [dispatch])

  async function create(e) {
    e.preventDefault()
    await actions.events.add(dispatch)(event)
    setEvent(EMPTY_EVENT)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Events</div>
        <div>
          <label className="me-1">New event:</label>
          <input className="me-1" type="text" value={event.title} onChange={e => setEvent({ ...event, title: e.target.value })} />
          <input className="me-1" type="date" value={event.date} onChange={e => setEvent({ ...event, date: e.target.value })} />
          <input type="submit" value="add" onClick={create} />
        </div>
      </div>

      <div>
        {
          events.map(event => (
            <div>
              {event.title}
            </div>
          ))
        }
      </div>
    </div>
  )
}

function Stages() {
  return (
    <div>Stages</div>
  )
}

function Teams() {
  return (
    <div>Teams</div>
  )
}

function Users() {
  return (
    <div>Users</div>
  )
}

export default Admin
