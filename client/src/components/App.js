import React, { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Login from '../pages/Login';
import NewEvent from '../events/NewEvent'
import EventsList from '../events/EventsList';

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		fetch('/api/me').then((r) => {
			if (r.ok) {
				r.json().then((data) => setUser(data.user));
			}
		});
	}, []);

	if (!user) return <Login onLogin={setUser} />;

	return (
		<>
			<NavBar user={user} setUser={setUser} />
			<main>
				<Switch>
					<Route path='/new'>
						<NewEvent user={user} />
					</Route>
					<Route path='/'>
						<EventsList />
					</Route>
				</Switch>
			</main>
		</>
	);
}

export default App;
