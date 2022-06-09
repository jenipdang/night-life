import {useState, useEffect} from 'react'
import UpcomingEventsList from '../events/UpcomingEventsList'

const UpcomingEventsContainer = () => {
    const [futureEvents, setFutureEvents] = useState([])

    useEffect(() => {
        fetch('/api/upcoming-events')
        .then((r) => r.json())
        .then((data) => {
          setFutureEvents(data)
        })
      })


	return (
		<div className='container '>
			<header className='blog-header py-3'>
				<div className='row flex-nowrap justify-content-between align-items-center'>
					<div className='col-4'>
						<h1>Upcoming Events</h1>
					</div>
				</div>
			</header>
        <UpcomingEventsList futureEvents={futureEvents} />
		</div>
	);
};

export default UpcomingEventsContainer