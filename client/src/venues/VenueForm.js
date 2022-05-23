import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { Button, Error, FormField, Input, Label } from '../styles';

const VenueForm = ({ user }) => {
	const [venue, setVenue] = useState({
		name: '',
		address: '',
		city: '',
		state: '',
		zipCode: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const history = useHistory();


	const handleChange = (e) => {
		setVenue({
			...venue,
			[e.target.name]: e.target.value,
		});
	};

	const newVenue = {
		name: venue.name,
		address: venue.address,
		city: venue.city,
		state: venue.state,
		zip_code: venue.zipCode,
		user_id: user.id,
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (
			[
				venue.name,
				venue.address,
				venue.city,
				venue.state,
				venue.zipCode,
			].some((val) => val.trim() === '')
		) {
			alert('All information must be fill out.');
		}

		setIsLoading(true);

		fetch('/api/venues', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newVenue),
		})
			.then((r) => {
				setIsLoading(false);
				if (r === 201) {
                } else {
                    r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.message));
            history.push('/events/new');
	};

	return (
		<Wrapper>
			<WrapperChild>
				<h2>Create a New Venue</h2>
				<form onSubmit={handleSubmit}>
					<FormField>
						<Label htmlFor='name'>Venue Name</Label>
						<Input
							type='text'
							name='name'
							value={venue.name}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='address'>Address</Label>
						<Input
							type='text'
							name='address'
							value={venue.address}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='city'>City</Label>
						<Input
							type='text'
							name='city'
							value={venue.city}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='state'>State</Label>
						<Input
							type='text'
							name='state'
							value={venue.state}
							onChange={handleChange}
						/>
					</FormField>
					<FormField>
						<Label htmlFor='zipCode'>Zip Code</Label>
						<Input
							type='text'
							name='zipCode'
							value={venue.zipCode}
							onChange={handleChange}
						/>
					</FormField>
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
				<h1>{venue.name}</h1>
				<h5>
					{venue.address}
				</h5>
				<h5>
					{venue.city}, {venue.state} || {venue.zipCode}
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

export default VenueForm;