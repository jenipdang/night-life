import {useState, useEffect} from 'react'
import EventList from '../pages/EventList'

const EventsContainer = () => {
    // const [loading, setLoading] = useState()
    // const [events, setEvents] = useState([])


    // const fetchEvents = async () => {
    //     setLoading(true)

    //     try {
    //         const response = await fetch('/api/events')
    //         const data = await response.json()
    //         setLoading(false)
    //         setEvents(data)
    //     } catch {
    //         setLoading(false)
    //         alert(error)
    //     }
    //     useEffect(() => {
    //         fetchEvents()
    //     }, [])

    //     if (loading) {
    //         return (
    //             <div>
    //                 Loading....
    //             </div>
    //         )
    //     }
    // }
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