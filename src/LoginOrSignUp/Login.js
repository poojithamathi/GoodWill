import React, { useState } from 'react';
import './AuthPage.css'; // Import the CSS file
import { FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import {   GoogleAuthProvider, 
    signInWithPopup, 
    getAuth, 
    RecaptchaVerifier, 
    signInWithPhoneNumber, 
    PhoneAuthProvider, 
    signInWithCredential, signInWithEmailAndPassword } from "firebase/auth";
import googleLogo from '../Assets/google.png';
import { firestore } from '../firebase'
import { initializeApp } from 'firebase/app';


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAkNln4-nOCKl-ZC2mUI4y-fEGd1NiCzME",
    authDomain: "goodwilltogive.firebaseapp.com",
    databaseURL: "https://goodwilltogive-default-rtdb.firebaseio.com",
    projectId: "goodwilltogive",
    storageBucket: "goodwilltogive.appspot.com",
    messagingSenderId: "764435663568",
    appId: "1:764435663568:web:7711d98b912ca6d32dacd5"
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    } else if (e.target.id === 'phone') {
      setPhoneNumber(e.target.value);
    } else if (e.target.id === 'code') {
      setVerificationCode(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google sign-in successful:', user);
      // You can perform additional actions here after successful sign-in
    } catch (error) {
      console.error('Google sign-in failed:', error);
      // Handle failed sign-in
    }
  };

  const handlePhoneSignIn = async () => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            console.log('Recaptcha verified:', response);
          }
        }, auth);
      }

      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      console.log('SMS sent successfully');
    } catch (error) {
      console.error('Phone sign-in failed:', error);
      // Handle failed sign-in
    }
  };

  const handleVerifyCode = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await signInWithCredential(auth, credential);
      const user = result.user;
      console.log('Phone sign-in successful:', user);
      // You can perform additional actions here after successful sign-in
    } catch (error) {
      console.error('Code verification failed:', error);
      // Handle failed code verification
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check if user exists in Firestore collection
      const usersRef = firestore.collection(firestore, 'users');
      const q = firestore.query(usersRef, firestore.where('email', '==', email));
      const querySnapshot = await firestore.getDocs(q);
      
      if (querySnapshot.empty) {
        // User not found in Firestore
        setError('User not found');
      } else {
        // User found in Firestore
        console.log('User exists in Firestore:', querySnapshot.docs[0].data());
        // Proceed with additional actions after successful sign-in
      }
    } catch (error) {
      console.error('Sign-in failed:', error);
      setError('Invalid email or password'); // Set error message for display
    }
  };

  return (
    <div className='login-main'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <div className="input-container">
              <FaEnvelope className="input-icon" />
              <input type="email" id="email" value={email} onChange={handleChange} placeholder="Enter your email" />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <div className="input-container">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
            </div>
          </div>
          {/* <div>
            <label htmlFor="phone">Phone:</label>
            <div className="input-container">
              <FaPhone className="input-icon" />
              <input type="tel" id="phone" value={phoneNumber} onChange={handleChange} placeholder="Enter your phone number" />
            </div>
            <button type="button" onClick={handlePhoneSignIn}>Send Code</button>
          </div>
          <div>
            <label htmlFor="code">Verification Code:</label>
            <input type="text" id="code" value={verificationCode} onChange={handleChange} placeholder="Enter verification code" />
            <button type="button" onClick={handleVerifyCode}>Verify Code</button>
          </div> */}
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
          <div className='google-signin-button' onClick={handleGoogleSignIn}>
            Sign in with: <img src={googleLogo} alt="Google Logo" style={{ marginLeft: '10px' }} />
          </div>
        </form>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}

export default LoginPage;
