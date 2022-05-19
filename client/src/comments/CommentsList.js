import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import CommentCard from './CommentCard';

const CommentsList = ({ comments }) => {
	const { eventId } = useParams();
	const [commentsList, setCommentsList] = useState([]);

	useEffect(() => {
		if (!commentsList) {
			fetch(`/api/${eventId}/comments`)
				.then((r) => {
					if (r.status === 200) {
						r.json().then((comments) => setCommentsList(comments));
					} else {
						r.json().then((errorObj) => errorObj.error);
					}
				})
				.catch((error) => error);
		}
	}, [eventId, comments]);

	const finalCommentsList = comments ? comments : commentsList;
	const displayComments = finalCommentsList?.map((comment) => (
		<CommentCard key={comment.id} comment={comment} />
	));
	return <div>{displayComments}</div>;
};

export default CommentsList;
