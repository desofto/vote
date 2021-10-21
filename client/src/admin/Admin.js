import { useState } from 'react'

import EventSelected from './eventSelected'
import EventNotSelected from './eventNotSelected'

import './Admin.css'

function Admin() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  return (
    <div>
      {
        selectedEvent
        ? <EventSelected event={selectedEvent} reset={() => setSelectedEvent(null)} />
        : <EventNotSelected onSelect={event => setSelectedEvent(event)} />
      }
    </div>
  )
}

export default Admin