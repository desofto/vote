import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

import StageOpen from './StageOpen'
import StageClosed from './StageClosed'
import { Spinner } from 'react-bootstrap'

function User() {
  const dashboard = useSelector(store => store.dashboard)
  const dispatch = useDispatch()

  useEffect(() => {
    actions.dashboard.load(dispatch)()
    const timer = setInterval(() => {
      actions.dashboard.load(dispatch)()
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [dispatch])

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
        : <div className="d-flex"><Spinner className="m-auto" animation="grow" variant="info" /></div>
      }
    </>
  )
}

export default User
