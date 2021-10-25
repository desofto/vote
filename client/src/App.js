import { Suspense, lazy, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import './App.css'

import { Context } from './context'
import actions from './actions'

const Login = lazy(() => import('./login'))
const User = lazy(() => import('./user'))
const Admin = lazy(() => import('./admin'))

function App() {
  const { currentUser } = useContext(Context)
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
    <Suspense fallback={<p>Loading...</p>}>
      {
        currentUser && currentUser.token
        ? <Dashboard />
        : <Login />
      }
    </Suspense>
  )
}

export default App
