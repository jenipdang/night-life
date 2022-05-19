import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label} from "../styles";

function EditEvent({ eventObj, handleUpdate, handleError }) {
  const [event, setEvent] = useState({
    name: eventObj.name,
    image_url: eventObj.imageUrl,
    date: eventObj.date,
    start_time: eventObj.startTime,
    venue: eventObj.venue
  })

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        date,
        startTime,
        imageUrl,
        venue
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create an Event</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Event Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="name">Image URL</Label>
            <Input
              type="text"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="date">Event Date</Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              type="time"
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="venue">Venue</Label>
            <Input
              type="venue"
              id="venue"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Event"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{name}</h1>
        <h5>{date} || {startTime}</h5>
        <p>
          <cite>By {user.username}</cite>
        </p>
        <ReactMarkdown>{venue}</ReactMarkdown>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default EditEvent;