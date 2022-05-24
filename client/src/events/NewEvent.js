import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Button, Error, FormField, Input, Label } from '../styles';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const NewEvent = ({ user }) => {
	const [event, setEvent] = useState({
		name: '',
		date: '',
		imageUrl: '',
		startTime: '',
		venue: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const history = useHistory();
	const [venues, setVenues] = useState([]);
	const [value, setValue] = useState('')

	useEffect(() => {
		fetch('/api/venues')
			.then((r) => r.json())
			.then((data) => setVenues(data))
			.catch((err) => alert(err));
	}, []);


	const venueOption = venues?.map((venue) => (
		[<Dropdown.Item key={venue.id} eventKey={venue.id} value={venue}>
			{venue.name}
		</Dropdown.Item>]
	));

	console.log(venueOption)

	const handleSelect = (e) => {
		setValue(e);
	};

	const handleChange = (e) => {
		setEvent({
			...event,
			[e.target.name]: e.target.value,
		});
	};

	const newEvent = {
		name: event.name,
		date: event.date,
		start_time: event.startTime,
		image_url: event.imageUrl,
		venue_id: value,
		user_id: user.id,
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			[
				event.name,
				event.date,
				event.imageUrl,
				event.startTime,
				// event.venue.id,
			].some((val) => val.trim() === '')
		) {
			alert('All information must be fill out.');
		}

		setIsLoading(true);

		fetch('/api/events', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newEvent),
		})
			.then((r) => {
				setIsLoading(false);
				if (r.status === 201) {
					history.push('/events');
				} else {
					r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.message));
	};

	return (
		<Wrapper>
			<WrapperChild>
				<h2>Create an Event</h2>
				<form onSubmit={handleSubmit}>
					<FormField>
						<Label htmlFor='name'>Event Name</Label>
						<Input
							type='text'
							name='name'
							value={event.name}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='name'>Image URL</Label>
						<Input
							type='text'
							name='imageUrl'
							value={event.imageUrl}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='date'>Event Date</Label>
						<Input
							type='date'
							name='date'
							value={event.date}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='startTime'>Start Time</Label>
						<Input
							type='time'
							name='startTime'
							value={event.startTime}
							onChange={handleChange}
						/>
					</FormField>
					{/* <FormField>
						<Label htmlFor='venue'>Venue</Label>
						<select
							name='venue'
							value={venues}
							onSelect={handleSelect}
						> {venuesOption}
						</select>
					</FormField> */}
					<DropdownButton
						alignRight
						title='Venue List'
						id='dropdown-menu-align-right'
						onSelect={handleSelect}
					> 
						{venueOption}
						<Dropdown.Divider />
						<Dropdown.Item as={Link} to='/venues/new'>New Venue</Dropdown.Item>
					</DropdownButton>

					<br />
					<FormField>
						<Button color='primary' type='submit'>
							{isLoading ? 'Loading...' : 'Submit Event'}
						</Button>
					</FormField>
					<FormField>
						{errors?.map((err) => (
							<Error key={err}>{err}</Error>
						))}
					</FormField>
				</form>
			</WrapperChild>
			<WrapperChild>
				<h1>{event.name}</h1>
				<h5>
					{event.date} || {event.startTime}
				</h5>

				<img src={event.imageUrl} alt={event.name} />
				<p>
					<cite>By {user.username}</cite>
				</p>
				<ReactMarkdown>{event.venue}</ReactMarkdown>
			</WrapperChild>
		</Wrapper>
	);
};

const Wrapper = styled.section`
	max-width: 1000px;
	margin: 40px auto;
	padding: 16px;
	display: flex;
	gap: 24px;
`;

const WrapperChild = styled.div`
	flex: 1;
`;

export default NewEvent;
