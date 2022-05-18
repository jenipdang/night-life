import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents);
  }, []);

  return (
    <Wrapper>
      {events.length > 0 ? (
        events.map((event) => (
          <Event key={event.id}>
            <Box>
              <h2>{event.name}</h2>
              <p>
                <em>Start Time: {event.start_time} minutes</em>
                &nbsp;·&nbsp;
                {/* <cite>By {event.user.username}</cite> */}
              </p>
              <ReactMarkdown>{event.venue}</ReactMarkdown>
            </Box>
          </Event>
        ))
      ) : (
        <>
          <h2>No Event Found</h2>
          <Button as={Link} to="/new">
            Create a new event
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Event = styled.article`
  margin-bottom: 24px;
`;

export default EventList;
