import { useState, useEffect } from 'react'
import CommentsList from './CommentsList'

const CommentsContainer = () => {
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch('/api/comments')
    })

  return (
    <div>CommentsContainer</div>
  )
}

export default CommentsContainer