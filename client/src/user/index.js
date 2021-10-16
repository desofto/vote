import { useEffect } from 'react'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'
import './index.css'

function User() {
  const dashboard = useSelector(store => store.dashboard)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.dashboard.load(dispatch)()
  }, [dispatch])

  function StageOpen() {
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
              <div>
                <label className="fw-bold me-3">Votes:</label>
                {dashboard.team && dashboard.team.votes}
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

  function StageClosed() {
    let max = 0

    for(let i = 0; i < dashboard.teams.length; i++) {
      if (dashboard.teams[i].votes > max) max = dashboard.teams[i].votes
    }

    const teams = dashboard.teams.sort((team1, team2) => team2.votes - team1.votes)

    return (
      <>
        <div className="p-5">
          <div>
            <div className="text-center mb-3">
              <label className="fs-4 fw-bold">Teams:</label>
            </div>

            <div className="dashboard-table p-3 fs-2">
              {
                teams.map(team => (
                  <div className="d-flex m-1 p-3" key={team.id}>
                    <div className="w-50 me-2">
                      <div className="dasboard-team-title text-nowrap text-end px-5 py-3">
                        {team.title}
                      </div>
                    </div>
                    <div className="w-50 ms-2">
                      <div className="dasboard-team-progress d-flex align-items-center px-5 py-3">
                        <ProgressBar className="w-100 fs-3" variant="info" now={team.votes} max={max} label={`${team.votes}`} />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>          
        </div>
      </>
    )
  }

  function Dashboard() {
    return (
      <>
        {
          dashboard.stage && dashboard.team
          ? <StageOpen />
          : <StageClosed />
        }
      </>
    )
  }

  return (
    <>
      {
        dashboard.event
        ? <Dashboard />
        : "Loading..."
      }
    </>
  )
}

export default User
