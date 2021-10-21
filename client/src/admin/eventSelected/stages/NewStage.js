import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import actions from 'actions'

function NewStage({ eventId }) {
  const [show, setShow] = useState(false)
  const EMPTY_STAGE = { title: '' }
  const [stage, setStage] = useState(EMPTY_STAGE)
  const dispatch = useDispatch()


  async function create(e) {
    e.preventDefault()
    await actions.stages.add(dispatch)(eventId, stage)
    setStage(EMPTY_STAGE)
    setShow(false)
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

export default NewStage