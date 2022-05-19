import { useState, useEffect } from 'react'
import EventsList from './EventsList'

const EventsContainer = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch("/api/events")
        .then(r => r.json())
        .then(data => setEvents(data))
        .catch(err => alert(err))
    }, [])

  return (
    <div>
       <EventsList events={events} />
    </div>
  )
}

export default EventsContainer