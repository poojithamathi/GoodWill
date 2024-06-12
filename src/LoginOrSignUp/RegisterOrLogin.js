import React, { useState, useEffect } from 'react';
import './AuthPage.css';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { GoogleLogin } from 'react-google-login';
import googleLogo from '../Assets/google.png';
import { FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase'; // Adjust the import path if necessary

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  }, []);

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    } else if (e.target.id === 'phoneNumber') {
      setPhoneNumber(e.target.value);
    } else if (e.target.id === 'verificationCode') {
      setVerificationCode(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSuccess = (response) => {
    console.log('Login successful:', response);
  };

  const onFailure = (error) => {
    console.error('Login failed:', error);
  };

  const handlePhoneSignIn = () => {
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.error('Error during sign-in with phone number:', error);
        setError('Error during sign-in with phone number. Please try again.');
      });
  };

  const verifyCode = () => {
    confirmationResult.confirm(verificationCode)
      .then((result) => {
        console.log('Phone sign-in successful:', result);
      })
      .catch((error) => {
        console.error('Error verifying code:', error);
        setError('Error verifying code. Please try again.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic
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
          <div>
            <label htmlFor="phoneNumber">Phone Number:</label>
            <div className="input-container">
              <FaPhone className="input-icon" />
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
              <button type="button" onClick={handlePhoneSignIn}>Send Verification Code</button>
            </div>
          </div>
          {confirmationResult && (
            <div>
              <label htmlFor="verificationCode">Verification Code:</label>
              <div className="input-container">
                <input
                  type="text"
                  id="verificationCode"
                  value={verificationCode}
                  onChange={handleChange}
                  placeholder="Enter the code sent to your phone"
                />
                <button type="button" onClick={verifyCode}>Verify Code</button>
              </div>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          <button type="submit">Login</button>
          <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <div className='google-signin-button' onClick={renderProps.onClick}>
               Sign in with: <img src={googleLogo} alt="Google Logo"  style={{marginLeft:'10px'}}/>
              </div>
            )}
          />
          <div id="recaptcha-container"></div>
        </form>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
