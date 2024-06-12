// HomePage.js
import React,{useState,useEffect} from 'react';
import HomeCard from './HomePageCard'
import CommitmentCard from './CommitmentCard'
import donateImage from '../Assets/donate3.jpeg'
import commitmentImage from '../Assets/commitment.jpeg'
import BouncingText from './Bouncing';
const HomePage = () => {


  return (
    <div>
    <div className="home-page">
      <section className="intro">
        <HomeCard description="At Goodwill to Give, we believe in the transformative power of generosity. Our platform serves as a bridge between those who have the means to give and those in need. With a steadfast commitment to building stronger communities, we invite you to join us on our mission to make a difference, one donation at a time." imageUrl={donateImage}/>
      </section>

      <section className="commitment">
        <CommitmentCard description="We empower individuals and families to thrive by providing essential resources and support through contributions, fostering sustainability and environmental responsibility through the donation and repurposing of items, reducing waste, and promoting a greener planet. Every donation, regardless of size, has the power to change lives, allowing us to collectively create meaningful impact and inspire hope for a brighter future." imageUrl={commitmentImage}/>
      </section>

      <section>
      <BouncingText/>
      <div style={{textAlign:'center',justifyContent:'justify',margin:'100px',display:'flex'}}>
        Explore our website to learn more about our programs, find donation centers near you, or start a donation drive in your community. Together, we can create lasting change and build a brighter future for all.

        Join us in spreading goodwill and generosity. Together, we can make the world a better place, one donation at a time.
        </div>
      </section>

    </div> 
    </div>
  );
};

export default HomePage;
