import { useEffect, useState } from "react"
import { Button, Form, Modal, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import actions from '../actions'

import ControlledState from './ControlledState'

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

export default Stages