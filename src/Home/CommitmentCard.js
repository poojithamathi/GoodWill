// HomePage.js
import React from 'react';
import './HomePageCard.css'; // Import CSS for styling


const CommitmentCard = ({description,imageUrl}) => {
  return (
    <div className="commitment-container">
      <div className="card-row">
      <div className="commitment-image-card">
          <img src={imageUrl} alt="" style={{borderRadius:"100%"}}/>
        </div>
        <div className="commitment-description-card">
          <h2>Our Commitment</h2>
          <p>{description}</p>
        </div>      
      </div>
    </div>
  );
};

export default CommitmentCard;
