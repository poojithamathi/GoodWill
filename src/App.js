import React, { useState, useEffect } from "react";
import Home from './Home/Home';
import DonationPage from './Donation/DonationPage';
import Listings from './Listings';
import Navbar from './Navbar';
import RegisterOrSignUp from './LoginOrSignUp/RegisterOrLogin'
import Register from './LoginOrSignUp/UserRegistration'
import Volunteer from './Volunteer/VolunteerPage'
import ActivityDetails from "./Volunteer/ActivityDetailsPage";
import Chatbot from "./Chatbot/Chatbot";
import Login from './LoginOrSignUp/Login';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';


import './style.css'
import Footer from './Footer'

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/donate" component={DonationPage} />
          <Route path="/listings" component={Listings} />
          <Route path="/registerorlogin" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/volunteer" component={Volunteer} />
          <Route path="/volunteer/*" component={ActivityDetails} />
          <Route path="/chatroom" component={Chatbot} /> {/* Add the chatbot route */}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
