import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import './event.css'

const EventCard = ({ event }) => {
	const [eventObj, setEventObj] = useState(null);
	const { id } = useParams;
	const history = useHistory();
	const location = useLocation();
	const [isEditing, setIsEditing] = useState(false);
  const options = { weekday: 'long', year: 'numberic', month: 'long', day: 'numberic'}

	useEffect(() => {
		if (!event) {
			fetch(`/api/events/${id}`)
				.then((r) => r.json())
				.then((event) => {
					setEventObj(event);
				});
		}
	}, [event, id]);

  const addNewComment = (commentObj) => {
    setComments(currentComments => [commentObj, ...currentComments])
  }

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
        <Card >
          <Card.Body>
            <Link as='h2' to={`/api/events/${finalEvent.id}`}>
            {finalEvent.name}
          </Link>
          </Card.Body>
					<img
						variant='top'
						src={finalEvent.image_url} alt={finalEvent.name}
					/>
					<ListGroup className='list-group-flush'>
						<ListGroupItem>Date: {finalEvent.date}</ListGroupItem>
						<ListGroupItem>Start Time: {finalEvent.start_time} </ListGroupItem>
						<ListGroupItem>Venue: {finalEvent.venue.name} </ListGroupItem>
						{location.pathname !=='/events' ? (
            <> <ListGroupItem>
							Address: {finalEvent.venue.address}
						</ListGroupItem> </>) : null}
						<ListGroupItem>
							Location: {finalEvent.venue.city}, {finalEvent.venue.state}
						</ListGroupItem>
					</ListGroup>
				</Card>
        </div>
		</div>
	);
};

export default EventCard;
