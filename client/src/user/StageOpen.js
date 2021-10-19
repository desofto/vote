import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'
import './index.css'
  
function StageOpen() {
  const dashboard = useSelector(store => store.dashboard)
  const dispatch = useDispatch()

  async function vote() {
    await actions.dashboard.vote(dispatch)(dashboard.event.id, dashboard.stage.id, dashboard.team.id)
  }

  return (
    <>
      <div className="p-4">
        <Card className="d-flex mb-5">
          <Card.Body className="m-auto fs-5">
            <div>
              <label className="fw-bold me-3">Event:</label>
              {dashboard.event.title}
            </div>
            <div>
              <label className="fw-bold me-3">Stage:</label>
              {dashboard.stage.title}
            </div>
            <div>
              <label className="fw-bold me-3">Team:</label>
              {dashboard.team.title}
            </div>
            <div>
              <label className="fw-bold me-3">Votes:</label>
              {dashboard.team.votes}
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="d-flex mb-5">
          <Button className="vote-button rounded-circle m-auto mxy-1" variant="outline-info" size="lg" onClick={vote}>
          <i className="vote-icon far fa-thumbs-up"></i>
        </Button>
      </div>
    </>
  )
}

export default StageOpen