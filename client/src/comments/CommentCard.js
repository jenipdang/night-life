import { useEffect, useState } from 'react';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import Loading from '../pages/Loading';
import EditComment from './EditComment';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CommentCard = ({ user, comment }) => {
	const { commentId } = useParams();
	const [commentObj, setCommentObj] = useState({});
	const history = useHistory();
	const location = useLocation()
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
		<div className='container'>
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
						{/* {user === finalComment.post_by && location.pathname !== '/comments'? ( */}

					{!isEditing && location.pathname !== "/comments" ? (
					<div className='actions'>
						<button onClick={() => setIsEditing((isEditing) => !isEditing)} style={{border: "none", backgroundColor: "white"}}>
							<span aria-label='edit'>
							<EditIcon />
							</span>
						</button>
						<button onClick={handleDelete} style={{border: "none", padding: "20px", backgroundColor: "white"}}>
							<span aria-label='delete'>
							<DeleteIcon />
							</span>
						</button>
					</div>
					) : null }
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
