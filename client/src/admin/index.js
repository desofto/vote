import { useEffect, useState } from 'react'
import { Tabs, Tab, Table, Button, Modal, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'
import './index.css'

function ControlledState({ state, onChange }) {
  const CAPTIONS = {
    initial: 'Ready',
    started: 'On the stage',
    finished: 'Finished'
  }

  const ICONS = {
    initial: 'fas fa-play',
    started: 'fas fa-stop',
    finished: 'fas fa-redo'
  }

  const NEXT_STATE = {
    initial: 'started',
    started: 'finished',
    finished: 'initial'
  }

  function changeState() {
    onChange(NEXT_STATE[state])
    window.focus()
  }

  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front" style={{ paddingTop: '5px' }}>
            {CAPTIONS[state]}
          </div>
          <div className="flip-card-back">
            <Button className="rounded-circle focus-visible" variant="outline-dark" onClick={changeState}>
              <i className={ICONS[state]}></i>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

function Admin() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  function EventSelected() {
    const [tab, setTab] = useState('stages')

    function back(e) {
      e.preventDefault()
      setSelectedEvent(null)
    }

    return (
      <>
        <div className="mb-3 d-flex">
          <div className="me-3">
            <a href="#" onClick={back}>
              <i class="fas fa-backspace"></i>
            </a>
          </div>

          <div>
            <strong>
              Event: {selectedEvent.title}
            </strong>
          </div>
        </div>

        <Tabs
          activeKey={tab}
          onSelect={tab => setTab(tab)}
          className="mb-3"
        >
          <Tab eventKey="stages" title="Stages">
            <Stages eventId={selectedEvent.id} />
          </Tab>
          <Tab eventKey="teams" title="Teams">
            <Teams eventId={selectedEvent.id} />
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
          <Events onSelect={event => setSelectedEvent(event)} />
        </Tab>
        <Tab eventKey="users" title="Users">
          <Users />
        </Tab>
      </Tabs>
    )
  }

  return (
    <div>
      {
        selectedEvent
        ? <EventSelected />
        : <EventNotSelected />
      }
    </div>
  )
}

function Events({ onSelect }) {
  const events = useSelector(store => store.events)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.events.load(dispatch)()
  }, [dispatch])

  function openEvent(e, event) {
    e.preventDefault()
    onSelect(event)
  }

  function NewEvent() {
    const [show, setShow] = useState(false)
    const EMPTY_EVENT = { title: '', date: '' }
    const [event, setEvent] = useState(EMPTY_EVENT)

    async function create(e) {
      e.preventDefault()
      if (!await actions.events.add(dispatch)(event)) return
      setEvent(EMPTY_EVENT)
    }

    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i>
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Event title</Form.Label>
                <Form.Control type="text" value={event.title} onChange={e => setEvent({ ...event, title: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Event starts</Form.Label>
                <Form.Control type="date" value={event.date} onChange={e => setEvent({ ...event, date: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={create}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  async function remove(id) {
    await actions.events.remove(dispatch)(id)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Events</div>
        <div className="mb-3">
          <NewEvent />
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
                    <a href="#" onClick={e => openEvent(e, event)}>
                      {event.title}
                    </a>
                  </td>
                  <td>
                    {new Date(event.date).toLocaleDateString('fr-CA')}
                  </td>
                  <td>
                    <Button variant="outline-dark" onClick={() => remove(event.id)}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
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
  const stages = useSelector(store => store.stages)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.stages.load(dispatch)(eventId)
  }, [dispatch])

  function NewStage() {
    const [show, setShow] = useState(false)
    const EMPTY_STAGE = { title: '' }
    const [stage, setStage] = useState(EMPTY_STAGE)

    async function create(e) {
      e.preventDefault()
      await actions.stages.add(dispatch)(eventId, stage)
      setStage(EMPTY_STAGE)
    }

    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i>
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new Stage</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New stage:</Form.Label>
                <Form.Control type="text" value={stage.title} onChange={e => setStage({ ...stage, title: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={create}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  async function remove(id) {
    await actions.stages.remove(dispatch)(eventId, id)
  }

  async function update(id, change) {
    await actions.stages.update(dispatch)(eventId, id, change)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Stages</div>
        <div className="mb-3">
          <NewStage />
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
                    {
                      <ControlledState state={stage.state} onChange={state => update(stage.id, { state })} />
                    }
                  </td>
                  <td>
                    <Button variant="outline-dark" onClick={() => remove(stage.id)}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
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
  const teams = useSelector(store => store.teams)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.teams.load(dispatch)(eventId)
  }, [dispatch])

  function NewTeam() {
    const [show, setShow] = useState(false)
    const EMPTY_TEAM = { title: '' }
    const [team, setTeam] = useState(EMPTY_TEAM)

    async function create(e) {
      e.preventDefault()
      await actions.teams.add(dispatch)(eventId, team)
      setTeam(EMPTY_TEAM)
    }

    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i>
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new Team</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>New team:</Form.Label>
                <Form.Control type="text" value={team.title} onChange={e => setTeam({ ...team, title: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={create}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  async function remove(id) {
    await actions.teams.remove(dispatch)(eventId, id)
  }

  async function update(id, change) {
    await actions.teams.update(dispatch)(eventId, id, change)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Teams</div>
        <div className="mb-3">
          <NewTeam />
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
                    {
                      <ControlledState state={team.state} onChange={state => update(team.id, { state })} />
                    }
                  </td>
                  <td>
                    <Button variant="outline-dark" onClick={() => remove(team.id)}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
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
  const users = useSelector(store => store.users)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.users.load(dispatch)()
  }, [dispatch])

  function NewUser() {
    const [show, setShow] = useState(false)
    const EMPTY_USER = { fullName: '', isAdmin: false }
    const [user, setUser] = useState(EMPTY_USER)

    async function create(e) {
      e.preventDefault()
      if (!await await actions.users.add(dispatch)(user)) return
      setUser(EMPTY_USER)
    }

    return (
      <>
        <Button variant="primary" onClick={() => setShow(true)}>
          <i className="fas fa-plus"></i>
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Full name</Form.Label>
                <Form.Control type="text" value={user.fullName} onChange={e => setUser({ ...user, fullName: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check type="checkbox" label="Admin" value={user.isAdmin} onChange={() => setUser({ ...user, isAdmin: !user.isAdmin })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={create}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

  async function remove(id) {
    await actions.users.remove(dispatch)(id)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Users</div>
        <div className="mb-3">
          <NewUser />
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
                  <td>
                    <Button variant="outline-dark" onClick={() => remove(user.id)}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
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

export default Admin
