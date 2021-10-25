import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import actions from 'actions'
import { useHttp } from 'utils/http'

function NewEvent() {
  const [show, setShow] = useState(false)
  const EMPTY_EVENT = { title: '', date: '' }
  const [event, setEvent] = useState(EMPTY_EVENT)
  const dispatch = useDispatch()
  const { request } = useHttp()

  async function create(e) {
    e.preventDefault()
    if (!await actions.events.add(dispatch, request)(event)) return
    setEvent(EMPTY_EVENT)
    setShow(false)
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

export default NewEvent
