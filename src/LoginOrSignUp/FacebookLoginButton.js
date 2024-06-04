import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const appId = '445915101157399';

  const handleLoginSuccess = (response) => {
    console.log('Login successful:', response);
    onLoginSuccess(response);
  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
    onLoginFailure(error);
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={handleLoginSuccess}
      onFailure={handleLoginFailure}
      icon="fa-facebook" // Optional: Use FontAwesome icon for the button
      textButton="Sign in with Facebook" // Optional: Customize button text
    />
  );
};

export default FacebookLoginButton;
