import EventCard from "./EventCard"

const EventList = ({events}) => {
  const displayEvents = events.map(event => <EventCard key={event.id} event={event}/>)

  return (
    <div>{displayEvents}</div>
  )
}

export default EventList
