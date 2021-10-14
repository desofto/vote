import { useEffect, useState } from 'react'
import { Tabs, Tab, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

function Admin() {
  const [selectedEventId, setSelectedEventId] = useState(null)

  function EventSelected() {
    const [tab, setTab] = useState('stages')

    return (
      <>
        <button onClick={() => setSelectedEventId(null)}>&lt;</button>
        <Tabs
          activeKey={tab}
          onSelect={tab => setTab(tab)}
          className="mb-3"
        >
          <Tab eventKey="stages" title="Stages">
            <Stages eventId={selectedEventId} />
          </Tab>
          <Tab eventKey="teams" title="Teams">
            <Teams eventId={selectedEventId} />
          </Tab>
        </Tabs>
      </>
    )
  }

  function EventNotSelected() {
    const [tab, setTab] = useState('events')

    return (
      <Tabs
        activeKey={tab}
        onSelect={tab => setTab(tab)}
        className="mb-3"
      >
        <Tab eventKey="events" title="Events">
          <Events onSelect={id => setSelectedEventId(id)} />
        </Tab>
        <Tab eventKey="users" title="Users">
          <Users />
        </Tab>
      </Tabs>
    )
  }

  return (
    <>
      {
        selectedEventId
        ? <EventSelected />
        : <EventNotSelected />
      }
    </>
  )
}

function Events({ onSelect }) {
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

  function openEvent(e, id) {
    e.preventDefault()
    onSelect(id)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Events</div>
        <div>
          <label className="me-1">New event:</label>
          <input className="me-1" type="text" value={event.title} onChange={e => setEvent({ ...event, title: e.target.value })} />
          <input className="me-1" type="date" value={event.date} onChange={e => setEvent({ ...event, date: e.target.value })} />
          <input type="submit" value="&#xf067;" className="fa" onClick={create} />
        </div>
      </div>

      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              events.map((event, index) => (
                <tr key={event.id}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    <a href="" onClick={e => openEvent(e, event.id)}>
                      {event.title}
                    </a>
                  </td>
                  <td>
                    {new Date(event.date).toLocaleDateString('fr-CA')}
                  </td>
                  <td>
                    <i className="far fa-trash-alt"></i>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

function Stages({ eventId }) {
  const EMPTY_STAGE = { title: '' }
  const stages = useSelector(store => store.stages)
  const [stage, setStage] = useState(EMPTY_STAGE)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.stages.load(dispatch)(eventId)
  }, [dispatch])

  async function create(e) {
    e.preventDefault()
    await actions.stages.add(dispatch)(eventId, stage)
    setStage(EMPTY_STAGE)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Stages</div>
        <div>
          <label className="me-1">New stage:</label>
          <input className="me-1" type="text" value={stage.title} onChange={e => setStage({ ...stage, title: e.target.value })} />
          <input type="submit" value="add" onClick={create} />
        </div>
      </div>

      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Order</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {
              stages.map((stage, index) => (
                <tr key={stage.id}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    {stage.title}
                  </td>
                  <td>
                    {stage.order}
                  </td>
                  <td>
                    {stage.state}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

function Teams({ eventId }) {
  const EMPTY_TEAM = { title: '' }
  const teams = useSelector(store => store.teams)
  const [team, setTeam] = useState(EMPTY_TEAM)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.teams.load(dispatch)(eventId)
  }, [dispatch])

  async function create(e) {
    e.preventDefault()
    await actions.teams.add(dispatch)(eventId, team)
    setTeam(EMPTY_TEAM)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Teams</div>
        <div>
          <label className="me-1">New team:</label>
          <input className="me-1" type="text" value={team.title} onChange={e => setTeam({ ...team, title: e.target.value })} />
          <input type="submit" value="add" onClick={create} />
        </div>
      </div>

      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {
              teams.map((team, index) => (
                <tr key={team.id}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    {team.title}
                  </td>
                  <td>
                    {team.state}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
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
          <input type="submit" value="&#xf234;" className="fa" onClick={create} />
        </div>
      </div>

      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Access Code</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index+1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.accessCode}</td>
                  <td>{user.isAdmin ? 'admin' : 'user'}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Admin
