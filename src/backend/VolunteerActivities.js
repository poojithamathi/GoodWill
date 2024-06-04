// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
// Initialize Express app
const app = express();
const port = 5000;

app.use(cors({ origin: 'http://localhost:3000' }));

// MongoDB connection U RI
const mongoURI = 'mongodb+srv://cluster12891.xvtp72m.mongodb.net/volunteer_activities';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define Volunteer Activity schema
const volunteerActivitySchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  location: String,
  date: Date,
});

// Define Volunteer Activity model
const VolunteerActivity = mongoose.model('VolunteerActivity', volunteerActivitySchema);

// Route to fetch all volunteer activities
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await VolunteerActivity.find();
    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
