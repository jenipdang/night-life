import { useState, useEffect } from 'react';
import EventsList from './EventsList';
import Search from './Search';


const EventsContainer = () => {
	const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('')
  const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		fetch('/api/events')
			.then((r) => r.json())
			.then((data) => {
        setEvents(data)
        setSearchResult(data)
      })
			.catch((err) => alert(err));
	}, []);

  // const eventsToDisplay = events.sort((event1, event2) => {
  //   if (sortBy === "date") {
  //     return event1.date - event2.date
  //   } else {
  //     return event1.name.localeCompare(event2.name)
  //   } 
  // })

  const searchHandler = (search) => {
    setSearch(search)
    if(search !== '') {
      const newEvent = events.filter((event) => {
        return (Object.values(event)
          .join(' '))
          .toLowerCase()
          .includes(search.toLowerCase())
      })
      setSearchResult(newEvent)
    } else {
      setSearchResult(events)
    }
  }

	return (
		<div className='container '>
			<header className='blog-header py-3'>
				<div className='row flex-nowrap justify-content-between align-items-center'>
          <div className='col-4 d-flex justify-content-end align-items-center'>
							<Search events={events} term={search} searchKeyword={searchHandler}/>
						</div>
					<div className='col-4 text-center'>
						<h1 style={{ margin: "20px"}}>Events</h1>
					</div>
				</div>
			</header>
			<EventsList events={search.length < 1 ? events : searchResult} />
		</div>
	);
};

export default EventsContainer;
