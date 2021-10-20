import { useState } from "react"

import EventSelected from './EventSelected'
import EventNotSelected from './EventNotSelected'

function Admin() {
  const [selectedEvent] = useState(null)

  return (
    <div>
      {
        selectedEvent
        ? <EventSelected />
        : <EventNotSelected />
      }
    </div>
  )
}

export default Admin