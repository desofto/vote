import { useEffect } from "react"
import { Button, Table } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import actions from 'actions'

import ControlledState from 'shared/ControlledState'
import NewTeam from "./NewTeam"

function Teams({ eventId }) {
  const teams = useSelector(store => store.teams)
  const dispatch = useDispatch()

  useEffect(() => {
    actions.teams.load(dispatch)(eventId)
  }, [dispatch, eventId])

  function remove(id) {
    actions.teams.remove(dispatch)(eventId, id)
  }

  function update(id, change) {
    actions.teams.update(dispatch)(eventId, id, change)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Teams</div>
        <div className="mb-3">
          <NewTeam eventId={eventId} />
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