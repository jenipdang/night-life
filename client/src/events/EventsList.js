import EventCard from "./EventCard"

const EventsList = ({events }) => {
  
  const displayEvents = events?.map((event) => <EventCard key={event.id} event={event} />)

  return (
    <div>{displayEvents}</div>
  )
}

export default EventsList
