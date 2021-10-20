import { useState } from "react"
import { Tab, Tabs } from "react-bootstrap"
import Events from "./Events"
import Users from "./Users"


function EventNotSelected() {
  const [setSelectedEvent] = useState(null)
  const [tab, setTab] = useState('events')

  return (
    <Tabs
      activeKey={tab}
      onSelect={tab => setTab(tab)}
      className="mb-3"
    >
      <Tab eventKey="events" title="Events">
        <Events onSelect={event => setSelectedEvent(event)} />
      </Tab>
      <Tab eventKey="users" title="Users">
        <Users />
      </Tab>
    </Tabs>
  )
}

export default EventNotSelected
