import { useState } from 'react'
import { useDispatch } from 'react-redux'

import actions from './actions'

function Login() {
  const [code, setCode] = useState('')
  const dispatch = useDispatch()

  function login(e) {
    e.preventDefault()
    actions.currentUser.login(dispatch)(code)
  }

  return (
    <div>
      <div>
        <label>AccessCode:</label>
      </div>

      <div>
        <form onSubmit={login}>
          <input type="text" value={code} onChange={e => setCode(e.target.value)} />
          <input type="submit" value="&gt;" />
        </form>
      </div>
    </div>
  )
}

export default Login
