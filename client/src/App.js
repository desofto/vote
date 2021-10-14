import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

import './App.css'

import Login from './Login'
import User from './user'
import Admin from './admin'
import actions from './actions'

function App() {
  const currentUser = useSelector(store => store.currentUser)
  const dispatch = useDispatch()

  function Dashboard() {
    return (
      <>
        <div className="mb-4 d-flex">
          <div className="flex-grow-1"></div>
          <div className="m-2">
            <label className="me-2">
              {currentUser.fullName}
            </label>

            <Button variant="primary" onClick={() => actions.currentUser.logout(dispatch)()}>
              Logout
            </Button>
          </div>
        </div>

        <div>
          {
            currentUser.isAdmin
            ? <Admin />
            : <User />
          }
        </div>
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
