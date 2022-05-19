import { useState, useEffect } from 'react';
import CommentsList from './CommentsList';

const CommentsContainer = () => {
	const [comments, setComments] = useState([]);

	useEffect(() => {
		fetch('/api/comments')
			.then((r) => r.json())
			.then((data) => setComments(data.data.map((c) => c.attributes)))
			.catch((err) => alert(err));
	}, []);

	return (
		<div>
			<CommentsList comments={comments} />
		</div>
	);
};

export default CommentsContainer;
