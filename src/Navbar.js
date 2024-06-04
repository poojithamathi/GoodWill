// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // If you're using React Router
import './navbar.css';
import logo from './Assets/hand.png';

const Navbar = () => {
  return (
    <nav className="navbar-main">
      <div className="navbar-container">
        {/* <Link to="/" className="logo">Goodwill to Give<img src={logo} className='logo-class'/></Link> */}
        <Link to="/" className="logo">Goodwill to Give</Link>
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/volunteer">Volunteer</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/registerorlogin">Register/Login</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
