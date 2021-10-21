import graphql from 'utils/graphql'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'


function NewUser({ reload }) {
  const [show, setShow] = useState(false)
  const EMPTY_USER = { fullName: '', isAdmin: false }
  const [user, setUser] = useState(EMPTY_USER)

  async function create(e) {
    e.preventDefault()
    await graphql(`
      query User($user: NewUser!) {
        User {
          create(user: $user) { id }
        }
      }
    `, {
      user: user
    })

    reload()

    setShow(false)
  }

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>
        <i className="fas fa-plus"></i>
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create a new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Full name</Form.Label>
              <Form.Control type="text" value={user.fullName} onChange={e => setUser({ ...user, fullName: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check type="checkbox" label="Admin" value={user.isAdmin} onChange={() => setUser({ ...user, isAdmin: !user.isAdmin })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={create}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NewUser
