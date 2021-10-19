import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

import StageOpen from './StageOpen'
import StageClosed from './StageClosed'

function User() {
  const dashboard = useSelector(store => store.dashboard)
  const dispatch = useDispatch()

  useEffect(async function() {
    await actions.dashboard.load(dispatch)()
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
        : "Loading..."
      }
    </>
  )
}

export default User
