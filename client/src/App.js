import { useSelector } from 'react-redux'

import Login from './Login'
import User from './User'
import Admin from './Admin'

function App() {
  const currentUser = useSelector(store => store.currentUser)

  function Dashboard() {
    return (
      <>
        {
          currentUser.is_admin
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
