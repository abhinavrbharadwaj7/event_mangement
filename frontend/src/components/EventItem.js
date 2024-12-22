// src/components/EventItem.js
import React from 'react';

const EventItem = ({ event, onToggleReminder, onEventDelete, onEventEdit }) => {
  console.log("Rendering EventItem with event:", event);

  return (
    <div className="event-card">
      <div className="event-info">
        <h3 className="event-title">
          {event.title}{' '}
          <span
            className="rem-para"
            onClick={() => onToggleReminder(event._id)}
            style={{ cursor: 'pointer' }}
          >
            {event.reminder ? '✔️' : '❌'}
          </span>
        </h3>
        <p className="event-date">{new Date(event.date).toLocaleDateString()}</p>
      </div>
      <div className="event-actions">
        <button className="delete-btn" onClick={() => onEventDelete(event._id)}>
          Delete
        </button>
        <button
          onClick={() => onEventEdit(event._id, { title: 'Edited Title', reminder: !event.reminder })}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default EventItem;
