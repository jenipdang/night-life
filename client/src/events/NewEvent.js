import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { Button, Error, FormField, Input, Label } from '../styles';

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

	const handleChange = (e) => {
		setEvent({
			...event,
			[e.tartget.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			[
				event.name,
				event.date,
				event.imageUrl,
				event.startTime,
				event.venue,
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
			body: JSON.stringify({
				name: event.name,
				date: event.date,
				start_time: event.startTime,
				image_url: event.imageUrl,
				venue: event.venue,
			}),
		})
			.then((r) => {
				setIsLoading(false);
				if (r === 201) {
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
							id='name'
							value={event.name}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='name'>Image URL</Label>
						<Input
							type='text'
							id='imageUrl'
							value={event.imageUrl}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='date'>Event Date</Label>
						<Input
							type='date'
							id='date'
							value={event.date}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='startTime'>Start Time</Label>
						<Input
							type='time'
							id='startTime'
							value={event.startTime}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='venue'>Venue</Label>
						<Input
							type='text'
							id='venue'
							value={event.venue}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Button color='primary' type='submit'>
							{isLoading ? 'Loading...' : 'Submit Event'}
						</Button>
					</FormField>
					<FormField>
						{errors.map((err) => (
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
