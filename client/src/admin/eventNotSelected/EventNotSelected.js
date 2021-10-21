import { Suspense, lazy } from 'react'
import { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

const Events = lazy(() => import('./events'))
const Users = lazy(() => import('./users'))

function EventNotSelected({ onSelect }) {
  const [tab, setTab] = useState('events')

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Tabs
        activeKey={tab}
        onSelect={tab => setTab(tab)}
        className="mb-3"
      >
        <Tab eventKey="events" title="Events">
          <Events onSelect={event => onSelect(event)} />
        </Tab>
        <Tab eventKey="users" title="Users">
          <Users />
        </Tab>
      </Tabs>
    </Suspense>
  )
}

export default EventNotSelected
