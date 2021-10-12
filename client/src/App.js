import { useDispatch, useSelector } from 'react-redux'

import Login from './Login'
import User from './User'
import Admin from './Admin'
import actions from './actions'

function App() {
  const currentUser = useSelector(store => store.currentUser)
  const dispatch = useDispatch()

  function Dashboard() {
    return (
      <>
        <button onClick={() => actions.currentUser.logout(dispatch)()}>Logout</button>
        {
          currentUser.isAdmin
          ? <Admin />
          : <User />
        }
      </>
    )
  }

  return (
    <>
      {
        currentUser.token
        ? <Dashboard />
        : <Login />
      }
    </>
  )
}

export default App
