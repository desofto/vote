import { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import { useDispatch } from "react-redux"
import actions from 'actions'

function NewTeam({ eventId }) {
  const [show, setShow] = useState(false)
  const EMPTY_TEAM = { title: '' }
  const [team, setTeam] = useState(EMPTY_TEAM)
  const dispatch = useDispatch()

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

export default NewTeam