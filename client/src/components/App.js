import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Login from '../pages/Login';
import NewEvent from '../events/NewEvent'
import EventsContainer from '../events/EventsContainer';
import Profile from '../profile/Profile'
import EventCard from '../events/EventCard';
import CommentsList from '../comments/CommentsList';
import CommentCard from '../comments/CommentCard';
import VenueForm from '../venues/VenueForm'


function App() {
	const [user, setUser] = useState();

	useEffect(() => {
		fetch('/api/me').then((r) => {
			if (r.ok) {
				r.json().then((data) => setUser(data));
			}
		});
	}, []);

	if (!user) return <Login onLogin={setUser} />;

	return (
		<>
			<NavBar user={user} setUser={setUser} />
			<main>
				<Switch>
					<Route path='/profile'>
						<Profile user={user} />
					</Route>
					<Route path='/events/new'>
						<NewEvent user={user} />
					</Route> 
					<Route path='/comments/:commentId'>
						<CommentCard user={user} />
					</Route> 
					<Route path='/events/:id/comments'>
						<CommentsList user={user} />
					</Route> 
					<Route path='/events/:eventId'>
						<EventCard user={user}/>
					</Route>
					<Route path='/events'>
						<EventsContainer />
					</Route>
					<Route path='/venues/new'>
						<VenueForm user={user}/>
					</Route>
				</Switch>
			</main>
		</>
	);
}

export default App;
