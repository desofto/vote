import { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'
import './index.css'


function User() {
  const dashboard = useSelector(store => store.dashboard)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.dashboard.load(dispatch)()
  }, [dispatch])

  async function vote() {
    await actions.dashboard.vote(dispatch)(dashboard.event.id, dashboard.stage.id, dashboard.team.id)
  }

  return (
    <>
      <Card className="d-flex mb-5">
        <Card.Body className="m-auto fs-5">
          <div>
            <label className="fw-bold me-3">Event:</label>
            {dashboard.event && dashboard.event.title}
          </div>
          <div>
            <label className="fw-bold me-3">Stage:</label>
            {dashboard.stage && dashboard.stage.title}
          </div>
          <div>
            <label className="fw-bold me-3">Team:</label>
            {dashboard.team && dashboard.team.title}
          </div>
        </Card.Body>
      </Card>

      <div className="d-flex">
        <Button className="vote-button rounded-circle m-auto mxy-1" variant="outline-info" size="lg" onClick={vote}>
          <i className="vote-icon far fa-thumbs-up"></i>
        </Button>
      </div>
    </>
  )
}

export default User
