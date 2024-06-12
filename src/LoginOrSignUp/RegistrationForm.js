import React, { useState } from 'react';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import './RegistrationPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { auth, createUserWithEmailAndPassword, sendEmailVerification, firestore} from '../firebase'; // Import Firebase authentication functions
import bcrypt from 'bcryptjs'; // Import bcrypt

const RegistrationPageCard = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const passwordtooltip = (
    <Tooltip id="password-tooltip">
      Password must be 8-15 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character. Eg: AbcdEfg#34
    </Tooltip>
  );

  const emailtooltip = (
    <Tooltip id="email-tooltip">
      Please enter a valid email address in the format abc@example.com.
    </Tooltip>
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    // Check for empty fields
    for (let key in formData) {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    }

    // Check email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Check password strength (add your password validation logic here)

    setErrors(newErrors);

    // If there are no errors, proceed with registration and send verification email
    if (Object.keys(newErrors).length === 0) {
      try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
  
        // Send email verification
        await sendEmailVerification(user);
  
        const hashedPassword = await bcrypt.hash(formData.password, 10);
        // Add user data to Firestore after email verification

        const userData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          createdAt: new Date(),
          password: hashedPassword // Add any additional user data here
          // Add any additional user data here
        };
  
        // Add the user data to the Firestore 'users' collection
        const userDocRef = await firestore.addDoc(firestore.collection(firestore, 'users'), userData);
  
        console.log('User registered and data stored:', formData);
        console.log('User document ID:', userDocRef.id); // Optionally, you can log the document ID
      } catch (error) {
        console.error('Error registering user:', error);
        setErrors({ general: error.message });
      }
    }
  };

  return (
    <div className="register-main">
      <div className="register-container">
        <div className="registration-form">
          <div className="icon-container">
            <FontAwesomeIcon icon={faUsers} className="big-icon" />
          </div>
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name<sup>*</sup></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formLastName">
              <Form.Label>Last Name<sup>*</sup></Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address<sup>*</sup>
                <OverlayTrigger overlay={emailtooltip} placement='right'>
                  <span className="d-inline-block">
                    <i className="fas fa-question-circle ml-2 text-primary"></i>
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                required
              />
              <Form.Control.Feedback className='errormessages' type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password<sup>*</sup>
                <OverlayTrigger overlay={passwordtooltip} placement='right'>
                  <span className="d-inline-block">
                    <i className="fas fa-question-circle ml-2 text-primary"></i>
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                isInvalid={!!errors.password}
                required
              />
              <Form.Control.Feedback className='errormessages' type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" block>
              Register
            </Button>
          </Form>
        </div>
        <div className="signup-info">
          <div className="signup-info-container">
            <h2 className="signup-heading">Join Our Community</h2>
            <p>Welcome to Goodwill To Give, where every donation makes a difference. By creating an account, you'll become part of a community dedicated to spreading goodwill and making positive change.</p>
            <h3>Why Sign Up?</h3>
            <ul className="signup-list">
              <li className="signup-list-item">Make an Impact: Your donations help those in need and support worthy causes.</li>
              <li className="signup-list-item">Stay Connected: Get updates on how your contributions are making a difference.</li>
              <li className="signup-list-item">Track Your Donations: Keep a record of your generous contributions over time.</li>
              <li className="signup-list-item">Discover Opportunities: Explore new ways to give back and get involved.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPageCard;
