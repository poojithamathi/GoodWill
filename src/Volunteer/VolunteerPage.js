// VolunteerPage.js
import React, { useState } from 'react';
import './VolunteerPage.css';
import donateFood from '../Assets/food-distribution.jpg';
import donateClothes from '../Assets/donate-clothes.jpeg';
import donateBooks from '../Assets/donate-books.jpeg';
import donateMedicalSupplies from '../Assets/donate-medical-supplies.jpeg';
import donateHygieneKits from '../Assets/hygiene-kits.jpeg';
import ActivityDetailsPage from './ActivityDetailsPage';

const VolunteerPage = () => {
  const [showActivityModal, setShowActivityModal] = useState(false); // State to control the visibility of the activity modal
  const [selectedActivity, setSelectedActivity] = useState(null); // State to store the selected activity

  const activities = [
    {
      id: 1,
      title: 'Food Distribution',
      description: 'Volunteer to distribute food to shelters and those in need.',
      imageUrl: donateFood,
    },
    {
      id: 2,
      title: 'Clothes Distribution',
      description: 'Help distribute clothes to orphanages and shelters for the homeless.',
      imageUrl: donateClothes,
    },
    {
      id: 3,
      title: 'Book Distribution',
      description: 'Contribute to distributing study books to underprivileged children.',
      imageUrl: donateBooks,
    },
    {
      id: 4,
      title: 'Medical Supplies Distribution',
      description: 'Assist in distributing medical supplies to hospitals and clinics.',
      imageUrl: donateMedicalSupplies,
    },
    {
      id: 5,
      title: 'Hygiene Kits Distribution',
      description: 'Help distribute hygiene kits to shelters and communities in need.',
      imageUrl: donateHygieneKits,
    },
  ];

  // Function to handle clicking on the "Volunteer" button
  const handleVolunteerClick = (activity) => {
    setSelectedActivity(activity);
    setShowActivityModal(true);
  };

  return (
    <div className="volunteer-page">
      <h2>Volunteer Opportunities</h2>
      <div className="activity-cards">
        {activities.map((activity) => (
          <div className="activity-card" key={activity.id}>
            <div className="top-section">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
            <div className="bottom-section">
              <img src={activity.imageUrl} alt={activity.title} />
              <button onClick={() => handleVolunteerClick(activity)} className="volunteer-btn">Volunteer</button>
            </div>
          </div>
        ))}
      </div>
      {showActivityModal && <ActivityDetailsPage activity={selectedActivity} closeModal={() => setShowActivityModal(false)} />}
    </div>
  );
};

export default VolunteerPage;
