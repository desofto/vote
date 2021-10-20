import { useEffect, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import actions from '../actions'

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

export default Events