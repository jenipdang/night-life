import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import Loading from '../pages/Loading';
import EditComment from './EditComment';

const CommentCard = ({ user, comment }) => {
	const { commentId } = useParams();
	const [commentObj, setCommentObj] = useState(null);
	const history = useHistory();
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (!comment) {
			fetch(`/api/comments/${commentId}`)
				.then((r) => r.json())
				.then((comment) => setCommentObj(comment));
		}
	}, [comment, commentId]);

	const finalComment = comment ? comment : commentObj;
	if (!finalComment) return <Loading />;


	const handleDelete = () => {
		fetch(`/api/comments/${commentId}`, {
			method: 'DELETE',
		}).then(() => history.push('/events'));
	};

	const handleUpdate = (updatedCommentObj) => {
		setIsEditing(true);
		setCommentObj(updatedCommentObj);
	};

	return (
		<div>
			{!isEditing ? (
				<>
					<Link
						style={{
							textDecoration: 'none',
							color: 'black',
							textTransform: 'uppercase',
							textAlign: 'center',
						}}
						to={`/comments/${finalComment.id}`}
					>
						<h5>|| {finalComment.post_by} || </h5>
						<p>{finalComment.content}</p>
						{/* {user === finalComment.post_by ? (
							<>
								<button
									style={{ margin: '5px' }}
									name='edit'
									id='edit-btn'
									onClick={() => setIsEditing((isEditing) => !isEditing)}
								>
									Edit
								</button>
								<button name='delete' id='delte-btn' onClick={handleDelete}>
									Delete
								</button>
							</>
						) : null} */}
						<button
							style={{ margin: '5px' }}
							name='edit'
							id='edit-btn'
							onClick={() => setIsEditing((isEditing) => !isEditing)}
							> Edit</button>
						<button name='delete' id='delte-btn' onClick={handleDelete}>
							Delete
						</button>
					</Link>
				</>
			) : (
				<EditComment
					user={user}
					id={commentId}
					commentObj={finalComment}
					handleUpdate={handleUpdate}
				/>
			)}
		</div>
	);
};

export default CommentCard;
