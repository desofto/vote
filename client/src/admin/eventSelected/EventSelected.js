import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Stages from './stages'
import Teams from './teams'

function EventSelected({ event, reset }) {
  const [tab, setTab] = useState('stages')

  function back(e) {
    e.preventDefault()
    reset()
  }

  return (
    <>
      <div className="mb-3 d-flex">
        <div className="me-3">
          <a href="/" onClick={back}>
            <i className="fas fa-backspace"></i>
          </a>
        </div>

        <div>
          <strong>
            Event: {event.title}
          </strong>
        </div>
      </div>

      <Tabs
        activeKey={tab}
        onSelect={tab => setTab(tab)}
        className="mb-3"
      >
        <Tab eventKey="stages" title="Stages">
          <Stages eventId={event.id} />
        </Tab>
        <Tab eventKey="teams" title="Teams">
          <Teams eventId={event.id} />
        </Tab>
      </Tabs>
    </>
  )
}

export default EventSelected