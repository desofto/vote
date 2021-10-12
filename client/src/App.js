import { useSelector } from 'react-redux'

import Login from './Login'

function App() {
  const currentUser = useSelector(store => store.currentUser)

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

function Dashboard() {
  return (
    <></>
  )
}

export default App
