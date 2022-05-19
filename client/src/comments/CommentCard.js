import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../pages/Loading'

const CommentCard = ({ comment }) => {
    const {id} = useParams()
    const [ commentObj, setCommentObj ] = useState(null)

    useEffect(() => {
        if (!comment) {
            fetch(`/api/comments/${id}`)
            .then(r => r.json())
            .then(comment => setCommentObj(comment))
        }
    }, [comment, id])

    const finalComent = comment ? comment : commentObj
    if (!finalComent) return <Loading /> 

  return (
    <div>{finalComent.content}</div>
  )
}

export default CommentCard