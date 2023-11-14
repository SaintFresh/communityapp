import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getEvents from '@wasp/queries/getEvents';
import createEvent from '@wasp/actions/createEvent';

export function Event() {
  const { eventId } = useParams();
  const { data: events, isLoading, error } = useQuery(getEvents);
  const createEventFn = useAction(createEvent);
  const [newEventTitle, setNewEventTitle] = useState('');

  useEffect(() => {
    // Fetch event details with eventId
  }, [eventId]);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateEvent = () => {
    createEventFn({ title: newEventTitle });
    setNewEventTitle('');
  };

  return (
    <div>
      <h1>Event Details</h1>
      {/* Render event details */}

      <div>
        <input
          type='text'
          placeholder='New Event Title'
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        />
        <button onClick={handleCreateEvent}>Create Event</button>
      </div>
      <div>
        <Link to='/dashboard'>Go back to Dashboard</Link>
      </div>
    </div>
  );
}