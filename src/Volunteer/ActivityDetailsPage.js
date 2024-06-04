import React from 'react';
import './ActivityDetailsPage.css';

const ActivityDetailsPage = ({ activity, onClose, onSignUp }) => {
  return (
    <div className="activity-modal">
      <div className="activity-modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Activity Details</h2>
        <div>
          <h3>{activity.title}</h3>
          <p>{activity.description}</p>
          <p>Location: {activity.location}</p>
          <p>Date: {activity.date}</p>
          {/* <img src={activity.imageUrl} alt={activity.title} /> */}
        </div>
        <form onSubmit={onSignUp}>
          <h3>Sign Up</h3>
          
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" required />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default ActivityDetailsPage;
