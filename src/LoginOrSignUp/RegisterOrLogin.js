import React, { useState } from 'react';
import './AuthPage.css'; // Import the CSS file
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { GoogleLogin } from 'react-google-login';
import googleLogo from '../Assets/google.png';
import FacebookLoginButton from './FacebookLoginButton';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const onSuccess = (response) => {
    console.log('Login successful:', response);
    // You can perform additional actions here, such as sending the token to your backend for authentication
  };

  const onFailure = (error) => {
    console.error('Login failed:', error);
    // Handle failed login
  };

  const handleFacebookLoginSuccess = (response) => {
    // Handle successful login
    console.log('Facebook login successful:', response);
  };

  const handleFacebookLoginFailure = (error) => {
    // Handle failed login
    console.error('Facebook login failed:', error);
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
        </form>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default LoginPage;
