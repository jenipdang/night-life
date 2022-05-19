import { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import './event.css';
// import EditEvent from './EditEvent';
import NewComment from '../comments/NewComment';
import CommentsList from '../comments/CommentsList';
import dateformat from 'dateformat'

const EventCard = ({ event }) => {
	const [eventObj, setEventObj] = useState(null);
	const [comments, setComments] = useState([]);
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
					setComments(event.comments);
				});
		}
	}, [event, id]);

	const addNewComment = (commentObj) => {
		setComments((currentComments) => [commentObj, ...currentComments]);
	};

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
					<Link
						as='h2'
						style={{
							textDecoration: 'none',
							color: 'black',
							textTransform: 'uppercase',
						}}
						to={`/api/events/${finalEvent.id}`}
					>
						<Card.Body>{finalEvent.name}</Card.Body>
						<img
							variant='top'
							src={finalEvent.image_url}
							alt={finalEvent.name}
						/>
						<ListGroup className='list-group-flush'>
							<ListGroupItem>Date: {finalEvent.date ? dateformat(finalEvent.date, 'dddd, mmmm dS yyyy') : ""}</ListGroupItem>
							<ListGroupItem>
								Start Time: {finalEvent.start_time ? dateformat(finalEvent.start_time, 'h:MM TT Z') : ""}{' '}
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
						</ListGroup>
						{location.pathname !== '/events' ? (
							<>
								<NewComment
									addNewComment={addNewComment}
									eventId={finalEvent.id}
								/>
								<br />
								<hr />
								<CommentsList comments={comments} />
							</>
						) : null}
					</Link>
				</Card>
			</div>
		</div>
	);
};

export default EventCard;
