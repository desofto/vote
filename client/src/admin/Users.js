import graphql from '../graphql'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Form, Modal, Table } from 'react-bootstrap'

function Users() {
  const [users, setUsers] = useState([])
  const dispatch = useDispatch()

  async function usersLoad() {
    const { User } = await graphql(`
      query users {
        User {
          all { id fullName accessCode isAdmin }
        }
      }
    `)

    setUsers(User.all)
  }

  useEffect(async function() {
    usersLoad()
  }, [dispatch])

  function NewUser() {
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
      usersLoad()
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

  async function remove(id) {
    await graphql(`
      query Users($id: ID!) {
        User {
          destroy(id: $id)
        }
      }
    `, {
      id: id
    })
    usersLoad()
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Users</div>
        <div className="mb-3">
          <NewUser />
        </div>
      </div>

      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Access Code</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index+1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.accessCode}</td>
                  <td>{user.isAdmin ? 'admin' : 'user'}</td>
                  <td>
                    <Button variant="outline-dark" onClick={() => remove(user.id)}>
                      <i className="far fa-trash-alt"></i>
                    </Button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Users