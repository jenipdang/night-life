import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import './event.css'

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
		<div className='event-container'>
      <div className='event-card'>
        <Card>
          <Card.Body>
            <h2>{event.name}</h2>
          </Card.Body>
					<img
						variant='top'
						src={event.image_url}
					/>
					<ListGroup className='list-group-flush'>
						<ListGroupItem>Date: {event.date}</ListGroupItem>
						<ListGroupItem>Start Time: {event.start_time}</ListGroupItem>
						<ListGroupItem>Venue: {event.venue.name}</ListGroupItem>
						<ListGroupItem>
							Location: {event.venue.city}, {event.venue.state}
						</ListGroupItem>
					</ListGroup>
				</Card>
        </div>
		</div>
	);
};

export default EventCard;
