import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch events from the server
    axios
      .get('http://localhost:5000/api/events')
      .then((response) => {
        console.log('Fetched events:', response.data); // Log fetched events
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
        alert('Failed to fetch events. Please check if the server is running.');
        setLoading(false);
      });
  }, []);

  const handleEventAdd = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const handleEventDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== id));
      })
      .catch((error) => console.error('Error deleting event:', error));
  };

  const handleToggleReminder = (eventId) => {
    const selectedEvent = events.find((event) => event._id === eventId);
    const updatedEvent = {
      ...selectedEvent,
      reminder: !selectedEvent.reminder,
    };

    axios
      .put(`http://localhost:5000/api/events/${eventId}`, updatedEvent)
      .then(() => {
        const updatedEvents = events.map((event) =>
          event._id === eventId ? updatedEvent : event
        );
        setEvents(updatedEvents);
      })
      .catch((error) => console.error(`Error updating reminder status for event ${eventId}:`, error));
  };

  const onEventEdit = (eventId, updatedData) => {
    axios
      .put(`http://localhost:5000/api/events/${eventId}`, updatedData)
      .then(() => {
        const updatedEvents = events.map((event) =>
          event._id === eventId ? { ...event, ...updatedData } : event
        );
        setEvents(updatedEvents);
      })
      .catch((error) => console.error(`Error updating event ${eventId}:`, error));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-container">
      <h1 className="gfg">GFG</h1>
      <h2>Event Management App</h2>
      <EventForm onEventAdd={handleEventAdd} />
      <EventList
        events={events}
        onEventDelete={handleEventDelete}
        onToggleReminder={handleToggleReminder}
        onEventEdit={onEventEdit}
      />
    </div>
  );
};

export default App;
