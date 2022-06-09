import { useState, useEffect } from 'react';
import EventsList from './EventsList';
import Search from './Search';

const EventsContainer = () => {
  const [events, setEvents] = useState([]);

	useEffect(() => {
		fetch('/api/events')
			.then((r) => r.json())
			.then((data) => {
        setEvents(data)
      })
			.catch((err) => alert(err));
	}, []);


	return (
		<div className='container '>
			<header className='blog-header py-3'>
				<div className='row flex-nowrap justify-content-between align-items-center'>
					<div className='col-4'>
						<h1>Events</h1>
						<Search events={events} setEvents={setEvents} />
					</div>
				</div>
			</header>
			<EventsList events={events} /> 
		</div>
	);
};

export default EventsContainer;
