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
  const EMPTY_USER = { fullName: '', isAdmin: '' }
  const users = useSelector(store => store.users)
  const [user, setUser] = useState(EMPTY_USER)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.users.load(dispatch)()
  }, [dispatch])

  async function create(e) {
    e.preventDefault()
    await actions.users.add(dispatch)(user)
    setUser(EMPTY_USER)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Users</div>
        <div>
          <label className="me-1">New user:</label>
          <input className="me-1" type="text" value={user.fullName} onChange={e => setUser({ ...user, fullName: e.target.value })} />
          <label className="me-1">Admin?</label>
          <input className="me-1" type="checkbox" value={user.isAdmin} onChange={e => setUser({ ...user, isAdmin: e.target.value })} />
          <input type="submit" value="add" onClick={create} />
        </div>
      </div>

      <div>
        {
          users.map(user => (
            <div>
              {user.fullName}
              {user.accessCode}
              {user.isAdmin}
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Admin
