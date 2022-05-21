import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Error, FormField, Input} from '../styles';


const NewComment = ({eventId}) => {
    const [comment, setComment] = useState({
      content: ""
    })

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory()

    const handleChange = (e) => {
      setComment({
        ...comment,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = (e) => {
      console.log(e)
      e.preventDefault()
      if ([comment.content].some(val => val.trim() === "")) {
        alert("Comment cannot be empty!")
      }

      fetch (`/api/events/${eventId}/comments`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment)
      })
      .then(r => {
        setIsLoading(false);
        if (r.status === 201) {
          r.json()
          .then(comment => {
            setComment({content: comment.content})
          })
        } else {
					r.json().then((err) => setErrors(err.errors));
				}
			})
			.catch((err) => setErrors(err.message));
      history.push('/events')
    }
    

    return (
      <>
        <div>
          <h2>Add a Comment</h2>
          <form>
            <FormField>
              <Input
                type='text'
                name='content'
                value={comment.content}
                onChange={handleChange}
              />
            </FormField>
            <FormField>
              <Button onClick={handleSubmit} color='primary' type='submit'>
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </FormField>
            <FormField>
              {errors?.map((err) => (
                <Error key={err}>{err}</Error>
              ))}
            </FormField>
          </form>
        </div>
        </>
    );
}

export default NewComment