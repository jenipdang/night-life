import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button, Error, FormField, Input, Label } from '../styles';

const EditEvent = ({ user, eventObj, handleUpdate }) => {
	const [event, setEvent] = useState({
		name: eventObj.name,
		date: eventObj.date,
		startTime: eventObj.startTime,
	});

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const history = useHistory();

	const handleChange = (e) => {
		setEvent({
			...event,
			[e.target.name]: e.target.value,
		});
	};

	const updatedEvent = {
		name: event.name,
		date: event.date,
		start_time: event.startTime,
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			[
				event.name,
				event.date,
				event.startTime,
			].some((val) => val.trim() === '')
		) {
			alert('All information must be fill out.');
		}

		setIsLoading(true);

		fetch(`/api/events/${eventObj.id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedEvent),
		})
			.then((r) => {
				setIsLoading(false);
				if (r === 201) {
					r.json()
					.then(data => handleUpdate(data))
					history.push('/events')
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
					<FormField>
						<Button color='primary' type='submit'>
							{isLoading ? 'Loading...' : 'Update Event'}
						</Button>
					</FormField>
					<FormField>
						{errors?.map((error) => (
							<Error key={error}>{error}</Error>
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

export default EditEvent;
