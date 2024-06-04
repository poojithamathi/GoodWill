// HomePage.js
import React from 'react';
import './HomePageCard.css'; // Import CSS for styling


const HomePage = ({description,imageUrl}) => {
  return (
    <div className="homecard-container">
      <div className="card-row">
        <div className="description-card">
          <h2>Welcome to Goodwill to Give</h2>
          <p>{description}</p>
        </div>
        <div className="image-card">
          <img src={imageUrl} alt="" style={{borderRadius:"10px"}}/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
