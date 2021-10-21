import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'actions'

import ControlledState from 'shared/ControlledState'
import NewStage from './NewStage'

function Stages({ eventId }) {
  const stages = useSelector(store => store.stages)
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      await actions.stages.load(dispatch)(eventId)
    })()
  }, [dispatch, eventId])

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
          <NewStage eventId={eventId} />
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