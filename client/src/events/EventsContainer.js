import { useState, useEffect } from 'react';
import EventsList from './EventsList';
import Search from './Search';

const EventsContainer = () => {
  const [events, setEvents] = useState([]);
  // const [search, setSearch] = useState('')
  // const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		fetch('/api/events')
			.then((r) => r.json())
			.then((data) => {
        setEvents(data)
        // setSearchResult(data)
      })
			.catch((err) => alert(err));
	}, []);

  // useEffect(() => {
  //   fetch(`/api/search`)
  //   .then((r) => r.json())
  //   .then((data) => {
  //     setEvents(data)
  //     setSearchResult(data)
  //   })
  //   .catch((err) => alert(err))
  // },[])

  // const searchHandler = searchResult?.filter((searchResult) => (
  //   searchResult.name.toLowerCase().includes(search.toLowerCase())
  // ))
  // const searchHandler = (search) => {
  //   setSearch(search)
  //   if(search !== '') {
  //     const newEvent = events.filter((event) => {
  //       return (Object.values(event)
  //         .join(' '))
  //         .toLowerCase()
  //         .includes(search.toLowerCase())
  //     })
  //     setSearchResult(newEvent)
  //   } else {
  //     setSearchResult(events)
  //   }
  // }
  

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
			{/* {events ? <EventsList events={events} /> : null} */}
			<EventsList events={events} /> 
		</div>
	);
};

export default EventsContainer;
