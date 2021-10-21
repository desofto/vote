import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Events from './events'
import Users from './users'


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
