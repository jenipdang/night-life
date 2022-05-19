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
        <h1>Upcoming Events</h1>
       <EventsList events={events} />
    </div>
  )
}

export default EventsContainer