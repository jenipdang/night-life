import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import './event.css';
import EditEvent from './EditEvent';
import NewComment from '../comments/NewComment';
import dateformat from 'dateformat'
import CommentsList from '../comments/CommentsList';

const EventCard = ({ user, event }) => {
	const [eventObj, setEventObj] = useState(null);
	const [comments, setComments] = useState([]);
	const { eventId } = useParams();
	const history = useHistory();
	const location = useLocation();
	const [isEditing, setIsEditing] = useState(false);

	
	useEffect(() => {
		if (!event) {
			fetch(`/api/events/${eventId}`)
			.then((r) => r.json())
			.then((event) => {
				setEventObj(event);
				setComments(event.comments)
			});
		}
	}, [event, eventId]);

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

	const handleUpdate = (updatedEventObj) => {
		setIsEditing(true)
		setEventObj(updatedEventObj)
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
						<br />
						<img
							variant='top'
							src={finalEvent.image_url}
							alt={finalEvent.name}
						/>
						<ListGroup style={{textAlign: "left"}} className='list-group-flush'>
							<br />
							<ListGroupItem>Date: <em>{finalEvent.date ? dateformat(finalEvent.date, 'dddd, mmmm dS yyyy') : ""}</em></ListGroupItem>
							<ListGroupItem>
								Start Time: <em>{finalEvent.start_time ? dateformat(finalEvent.start_time, 'hh:MM TT Z') : ""}{' '}</em>
							</ListGroupItem>
							<br />
							<ListGroupItem>Venue: <em>{finalEvent.venue.name}</em></ListGroupItem>
							{location.pathname !== '/events' ? (
								<>
									{' '} <br/>
									<ListGroupItem>
										Address: <em>{finalEvent.venue.address}</em>
									</ListGroupItem>{' '}
									<br/>
									<ListGroupItem>
										Location: <em>{finalEvent.venue.city}, {finalEvent.venue.state}</em>
									</ListGroupItem>
								</>
							) : null}
							<br />
							{user?.role === "admin" ? 
							<>
							{location.pathname !== "/events" ? <>
							<button style={{margin: '5px'}} name='edit' id="edit-btn" onClick={() => setIsEditing((isEditing) => !isEditing)}>Edit</button>
							<button name='delete' id="delete-btn" onClick={handleDelete}>Delete</button> 
							</> :null} </>
							: null }
							
						</ListGroup>
						</Link>
						{location.pathname !== '/events' ? (
							<>
							<br />
								<NewComment
									eventId={finalEvent.id}
									addNewComment={addNewComment}
								/>
								<br />
								<ListGroupItem style={{textTransform: 'uppercase'}}>Total Commenters: {finalEvent.total_commenters} </ListGroupItem>
								<hr />
								<CommentsList comments={comments} />
							</>
						) : null}
			
					</>) : (<EditEvent user={user} id={eventId} eventObj={finalEvent} handleUpdate={handleUpdate} />)}
				</Card>
			</div>
		</div>
	);
};

export default EventCard;
