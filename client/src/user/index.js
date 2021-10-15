import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
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
      <div className="mb-4">
        <div>
          Event: {dashboard.event && dashboard.event.title}
        </div>
        <div>
          Stage: {dashboard.stage && dashboard.stage.title}
        </div>
        <div>
          Team: {dashboard.team && dashboard.team.title}
        </div>
      </div>
      <div className="d-flex">
        <Button className="vote-button rounded-circle m-auto mxy-1" variant="outline-info" size="lg" onClick={vote}>
          <i className="vote-icon far fa-thumbs-up"></i>
        </Button>
      </div>
    </>
  )
}

export default User
