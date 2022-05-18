import {useState, useEffect} from 'react'
import EventList from '../../pages/EventList'

const EventsContainer = () => {

    const [events, setEvents] = useState([])

    useEffect(() => {
        fetch('/api/events')
        .then(r => r.json())
        .then(data => setEvents(data))
        .catch(err => alert(err))
    }, [])

    
  return (
   <div>
       <EventList events={events} />
   </div>
  )
}

export default EventsContainer