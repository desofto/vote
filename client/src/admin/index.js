import { useState } from 'react'
import { Tabs, Tab } from 'react-bootstrap'

function Admin() {
  const [tab, setTab] = useState('events')

  return (
    <Tabs
      activeKey={tab}
      onSelect={tab => setTab(tab)}
      className="mb-3"
    >
      <Tab eventKey="events" title="Events">
        <Events />
      </Tab>
      <Tab eventKey="users" title="Users">
        <Users />
      </Tab>
    </Tabs>
  )
}

function Events() {
  return (
    <div>Events</div>
  )
}

function Stages() {
  return (
    <div>Stages</div>
  )
}

function Teams() {
  return (
    <div>Teams</div>
  )
}

function Users() {
  return (
    <div>Users</div>
  )
}

export default Admin
