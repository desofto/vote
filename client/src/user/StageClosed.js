import { ProgressBar } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function StageClosed() {
  const dashboard = useSelector(store => store.dashboard)

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

export default StageClosed