const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Event = require('./models/Event'); // Assuming the Event schema is in models/Event.js

const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/eventdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use(bodyParser.json());

// Add Event (POST)
app.post('/api/events', async (req, res) => {
  try {
    const { title, date, reminder } = req.body;
    const newEvent = new Event({ title, date, reminder });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error creating event' });
  }
});

// Get Events (GET)
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
});

// Update Event (PUT)
app.put('/api/events/:id', async (req, res) => {
  try {
    const { title, date, reminder } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { title, date, reminder },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating event' });
  }
});

// Delete Event (DELETE)
app.delete('/api/events/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting event' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
