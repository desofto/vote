import { useCallback, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { graphql } from 'utils/http'

import NewUser from './NewUser'

function Users() {
  const [users, setUsers] = useState([])

  const usersLoad = useCallback(async () => {
    const { User } = await graphql(`
      query users {
        User {
          all { id fullName accessCode isAdmin }
        }
      }
    `)

    setUsers(User.all)
  }, [])

  useEffect(() => {
    usersLoad()
  }, [usersLoad])

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
          <NewUser reload={() => usersLoad()}/>
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
