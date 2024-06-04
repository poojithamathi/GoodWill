import React, { useState } from 'react';
import { Form, Button, Row, Col, Container, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './RegistrationPage.css'; // Import custom CSS file
import GeometricParticles from '../Particles/GeometricParticles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import RegistrationPageCard from './RegistrationForm'

const RegistrationPage = () => {
 

  return (
    <div>
      {/* <GeometricParticles/> */}
      <RegistrationPageCard/>
    </div>
  );
};

export default RegistrationPage;
