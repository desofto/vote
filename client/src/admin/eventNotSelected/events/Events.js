import { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import actions from 'actions'

import NewEvent from './NewEvent'
import { useHttp } from 'utils/http'

function Events({ onSelect }) {
  const events = useSelector(store => store.events)
  const dispatch = useDispatch()
  const { request } = useHttp()

  useEffect(() => {
    actions.events.load(dispatch, request)()
  }, [dispatch, request])

  function openEvent(e, event) {
    e.preventDefault()
    onSelect(event)
  }

  async function remove(id) {
    await actions.events.remove(dispatch, request)(id)
  }

  return (
    <div className="d-flex flex-column px-3">
      <div className="d-flex">
        <div className="flex-grow-1">Events</div>
        <div className="mb-3">
          <NewEvent />
        </div>
      </div>

      <div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              events.map((event, index) => (
                <tr key={event.id}>
                  <td>
                    {index+1}
                  </td>
                  <td>
                    <a href="/" onClick={e => openEvent(e, event)}>
                      {event.title}
                    </a>
                  </td>
                  <td>
                    {new Date(event.date).toLocaleDateString('fr-CA')}
                  </td>
                  <td>
                    <Button variant="outline-dark" onClick={() => remove(event.id)}>
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

export default Events
