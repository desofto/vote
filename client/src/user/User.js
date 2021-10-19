import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

import StageOpen from './StageOpen'
import StageClosed from './StageClosed'

function User() {
  const dashboard = useSelector(store => store.dashboard)
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setInterval(async () => {
      await actions.dashboard.load(dispatch)()
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
        : "Loading..."
      }
    </>
  )
}

export default User
