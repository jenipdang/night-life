import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import './event.css';
import EditEvent from './EditEvent';
import NewComment from '../comments/NewComment';
import dateformat from 'dateformat'

const EventCard = ({ user, event, setEvents }) => {
	const [eventObj, setEventObj] = useState(null);
	const [comments, setComments] = useState([]);
	const { eventId } = useParams();
	const history = useHistory();
	const location = useLocation();
	const [isEditing, setIsEditing] = useState(false);


	useEffect(() => {
		if (!event) {
			fetchEvents()
		}
	}, []);

	const fetchEvents = () => {
		fetch(`/api/events/${eventId}`)
				.then((r) => r.json())
				.then((event) => {
					setEventObj(event);
					// setComments(event.comments);
				});
	}
	
	const addNewComment = (commentObj) => {
		setComments((currentComments) => [commentObj, ...currentComments]);
	};

	const finalEvent = event ? event : eventObj;
	if (!finalEvent) return <Loading />;

	const handleDelete = () => {
		fetch(`/api/events/${eventId}`, {
			method: 'DELETE',
		}).then(() => history.push('/events'));
	};

	const handleUpdate = (data) => {
		setIsEditing(true);
		setEvents((currentEvents) => currentEvents.map((event) => (event.id === data.id ? data : event)))
		fetchEvents()
	};

	return (
		<div className='event-container'>
			<div className='event-card'>
				<Card>
					{!isEditing ? (<>
						<Link
						as='h2'
						style={{
							textDecoration: 'none',
							color: 'black',
							textTransform: 'uppercase',
							textAlign: 'center',
						}}
						to={`/events/${finalEvent.id}`}
					>
						<Card.Body>{finalEvent.name}</Card.Body>
						<img
							variant='top'
							src={finalEvent.image_url}
							alt={finalEvent.name}
						/>
						<ListGroup style={{textAlign: "left"}} className='list-group-flush'>
							<ListGroupItem>Date: {finalEvent.date ? dateformat(finalEvent.date, 'dddd, mmmm dS yyyy') : ""}</ListGroupItem>
							<ListGroupItem>
								Start Time: {finalEvent.start_time ? dateformat(finalEvent.start_time, 'hh:MM TT Z') : ""}{' '}
							</ListGroupItem>
							<ListGroupItem>Venue: {finalEvent.venue.name} </ListGroupItem>
							{location.pathname !== '/events' ? (
								<>
									{' '}
									<ListGroupItem>
										Address: {finalEvent.venue.address}
									</ListGroupItem>{' '}
								</>
							) : null}
							<ListGroupItem>
								Location: {finalEvent.venue.city}, {finalEvent.venue.state}
							</ListGroupItem>
							<br />
							{location.pathname !== "/events" ? <>
							<button style={{margin: '5px'}} name='edit' id="edit-btn" onClick={() => setIsEditing((isEditing) => !isEditing)}>Edit</button>
							<button name='delete' id="delte-btn" onClick={handleDelete}>Delete</button> 
							</> :null}
							
						</ListGroup>
						{location.pathname !== '/events' ? (
							<>
							<br />
								<NewComment
									eventId={finalEvent.id}
									addNewComment={addNewComment}
								/>
								<br />
								<hr />
								<ul>
									{finalEvent.comments.map((comment) => (
										<li key={comment.id}>
											<h5>{comment.content}</h5>
										</li>
									))}
								</ul>
							</>
						) : null}
					</Link>
					</>) : (<EditEvent user={user} id={eventId} eventObj={finalEvent} handleUpdate={handleUpdate} />)}
				</Card>
			</div>
		</div>
	);
};

export default EventCard;
