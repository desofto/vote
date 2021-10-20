import { useEffect, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import actions from '../actions'

import ControlledState from './ControlledState'


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

export default Teams