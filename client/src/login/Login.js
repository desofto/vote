import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { request } from 'utils/http'
import { setCurrentUser } from '../context'
import './Login.css'

function Login() {
  const [code, setCode] = useState('')

  async function login(e) {
    const { token, id, full_name, is_admin } = await request('/auth', 'POST', { code: code })

    setCurrentUser({ token, id, fullName: full_name, isAdmin: is_admin })
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
