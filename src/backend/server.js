const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 5000;

// MongoDB connection URI
const mongoURI = 'mongodb+srv://Cluster12891:Mpoojitha123@cluster12891.xvtp72m.mongodb.net/GoodWillToGive';

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
const VolunteerActivity = mongoose.model('VolunteerActivity', volunteerActivitySchema, 'volunteer_activities');

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

// Start the Express.js server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
