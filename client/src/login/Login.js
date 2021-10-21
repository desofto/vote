import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import './Login.css'

import actions from 'actions'

function Login() {
  const [code, setCode] = useState('')
  const dispatch = useDispatch()

  function login(e) {
    e.preventDefault()
    actions.currentUser.login(dispatch)(code)
  }

  return (
    <div className="login-card-outer d-flex text-center">
      <div className="login-card-inner m-auto px-5 py-4">
        <Form onSubmit={login}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bolder">Access Code:</Form.Label>
            <div className="d-flex">
              <Form.Control className="me-3" type="text" value={code} onChange={e => setCode(e.target.value)} />
              <Button variant="primary" onClick={login}>
                &gt;
              </Button>
            </div>
          </Form.Group>
        </Form>
      </div>
    </div>
  )
}

export default Login
