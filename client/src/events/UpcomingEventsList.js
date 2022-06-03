import UpcomingEventCard from "./UpcomingEventCard"

const UpcomingEventsList = ({futureEvents }) => {
  
  const displayUpcomingEvents = futureEvents?.map((futureEvent) => <UpcomingEventCard key={futureEvent.id} futureEvent={futureEvent} />)

  return (
    <div>
      {displayUpcomingEvents}
    </div>
  )
}

export default UpcomingEventsList