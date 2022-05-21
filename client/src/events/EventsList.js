import EventCard from "./EventCard"

const EventsList = ({events, setEvents }) => {
  
  const displayEvents = events?.map((event) => <EventCard setEvents={setEvents} key={event.id} event={event} />)

  return (
    <div>{displayEvents}</div>
  )
}

export default EventsList
