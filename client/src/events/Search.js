import { useState, useRef, useEffect} from "react";
import {Input} from '../styles';


function Search({ setEvents }) {
  const [term, setTerm] = useState("")
  const ref = useRef()

  const getSearchTerm = () => {
    fetch(`/api/search?name=${term}`)
    .then((r) => r.json())
    .then((data) => {
      setEvents(data)
    })
    .catch((err) => alert(err))
  }

  useEffect(() => {
    getSearchTerm()
  },[term])

  return (
    <div className="ui large fluid icon input">
      <Input
        type="text"
        ref={ref}
        value={term}
        placeholder="Search Events"
        onChange={e => setTerm(ref.current.value)}
      />
    </div>
  );
}

export default Search;