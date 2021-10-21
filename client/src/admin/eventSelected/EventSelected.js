import { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import Stages from "./stages"
import Teams from "./teams"

function EventSelected() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [tab, setTab] = useState('stages')

  function back(e) {
    e.preventDefault()
    setSelectedEvent(null)
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
            Event: {selectedEvent.title}
          </strong>
        </div>
      </div>

      <Tabs
        activeKey={tab}
        onSelect={tab => setTab(tab)}
        className="mb-3"
      >
        <Tab eventKey="stages" title="Stages">
          <Stages eventId={selectedEvent.id} />
        </Tab>
        <Tab eventKey="teams" title="Teams">
          <Teams eventId={selectedEvent.id} />
        </Tab>
      </Tabs>
    </>
  )
}

export default EventSelected