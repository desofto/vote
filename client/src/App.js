import { Suspense, lazy } from 'react'
import { Button } from 'react-bootstrap'

import './App.css'

import { currentUser, setCurrentUser } from './context'

const Login = lazy(() => import('./login'))
const User = lazy(() => import('./user'))
const Admin = lazy(() => import('./admin'))

function App() {
  function Dashboard() {
    return (
      <>
        <div className="mb-4 d-flex">
          <div className="flex-grow-1"></div>
          <div className="m-2">
            <label className="me-2">
              {currentUser.fullName}
            </label>

            <Button variant="primary" onClick={() => setCurrentUser({})}>
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
        currentUser.token
        ? <Dashboard />
        : <Login />
      }
    </Suspense>
  )
}

export default App
