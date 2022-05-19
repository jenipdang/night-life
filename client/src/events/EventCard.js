import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';

const EventCard = ({ event }) => {
	const [eventObj, setEventObj] = useState(null);
	const { id } = useParams;
	const history = useHistory();
	const location = useLocation();
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (!event) {
			fetch(`/api/events/${id}`)
				.then((r) => r.json())
				.then((event) => {
					setEventObj(event);
				});
		}
	}, [event, id]);

	const finalEvent = event ? event : eventObj;

	if (!finalEvent) return <Loading />;

	const handleDelete = () => {
		fetch(`/suggessions/${id}`, {
			method: 'DELETE',
		}).then(() => history.push('/events'));
	};

	const handleUpdate = () => {
		setIsEditing(true);
	};

	return (
		<Card style={{ width: '18rem', margin: '10px'}}>
			<Card.Img variant='top' style={{height: '200px', width: '300px'}} src={event.image_url} />
			<Card.Body>
				<Card.Title>{event.name}</Card.Title>
				{/* <Card.Text>
					Some quick example text to build on the card title and make up the
					bulk of the card's content.
				</Card.Text> */}
			</Card.Body>
			<ListGroup className='list-group-flush'>
				<ListGroupItem>Date: {event.date}</ListGroupItem>
				<ListGroupItem>Start Time: {event.start_time}</ListGroupItem>
				<ListGroupItem>Location: {event.venue.name} || {event.venue.city}</ListGroupItem>
			</ListGroup>
			{/* <Card.Body>
				<Card.Link href='#'>Card Link</Card.Link>
				<Card.Link href='#'>Another Link</Card.Link>
			</Card.Body> */}
		</Card>
	);
};

export default EventCard;
