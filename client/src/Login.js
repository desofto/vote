import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import actions from './actions'

function Login() {
  const [code, setCode] = useState('')
  const dispatch = useDispatch()

  function login(e) {
    e.preventDefault()
    actions.currentUser.login(dispatch)(code)
  }

  return (
    <div className="d-flex text-center" style={{ width: '100vw', height: '100vh' }}>
      <div className="m-auto px-5 py-4" style={{ border: '1px solid #eee', borderRadius: '2em' }}>
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
