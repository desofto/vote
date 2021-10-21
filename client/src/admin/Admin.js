import { useState } from "react"

import EventSelected from './eventSelected'
import EventNotSelected from './eventNotSelected'

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