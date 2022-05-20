import { useRef } from "react";
import {Input} from '../styles';

function Search({ term, searchKeyword }) {
  const inputEl = useRef("")

  const getSearchTerm = () => {
    searchKeyword(inputEl.current.value)
  }

  return (
    <div className="ui large fluid icon input">
      <Input
        type="text"
        ref={inputEl}
        value={term}
        placeholder="Search Events"
        onChange={getSearchTerm}
      />
    </div>
  );
}

export default Search;