import React, { useState } from 'react';
import './DonationPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faImage } from '@fortawesome/free-solid-svg-icons';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

function DonationPage() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [userLocation, setUserLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [distance, setDistance] = useState(null);
  const [pickup, setPickup] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSelect = async (value) => {
    try {
      const results = await geocodeByAddress(value);
      const coordinates = await getLatLng(results[0]);
      setUserLocation(value);
      setCoordinates(coordinates);
    } catch (error) {
      console.error('Error selecting location:', error);
      setError('Error selecting location. Please try again.');
    }
  };

  const handlePickupChange = (e) => {
    setPickup(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!coordinates) {
        setError('Please select a valid location.');
        return;
      }
      const targetCoordinates = { lat: 37.7749, lng: -122.4194 }; // Example coordinates for a target location
      const calculatedDistance = calculateDistance(coordinates, targetCoordinates);
      setDistance(calculatedDistance.toFixed(2));
      setSubmitted(true);
    } catch (error) {
      console.error('Error processing donation:', error);
      setError('An error occurred while processing your donation. Please try again later.');
    }
  };

  const calculateDistance = (coords1, coords2) => {
    const radlat1 = (Math.PI * coords1.lat) / 180;
    const radlat2 = (Math.PI * coords2.lat) / 180;
    const theta = coords1.lng - coords2.lng;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  };

  return (
    <div className='donation-page'>
      <h2>Make a Donation</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea id="description" value={description} onChange={handleDescriptionChange} />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image:</label>
            <input type="file" id="image" onChange={handleImageChange} accept="image/*"/>
            <FontAwesomeIcon icon={faImage} className="upload-icon" />
          </div>
          <div className="form-group">
            <label htmlFor="location">Your Location:</label>
            <PlacesAutocomplete value={userLocation} onChange={setUserLocation} onSelect={handleSelect}>
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div>
                  <input {...getInputProps({ placeholder: 'Search Places ...' })} />
                  <div>
                    {loading && <div>Loading...</div>}
                    {suggestions.map(suggestion => {
                      const style = suggestion.active ? { backgroundColor: '#a8dadc', cursor: 'pointer' } : { backgroundColor: '#ffffff', cursor: 'pointer' };
                      return (
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                          {suggestion.description}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>
          <div className="form-group">
            <label>Distance to Drop-off Point:</label>
            <p>{distance !== null ? `${distance} miles` : 'Calculating...'}</p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="distance-icon" />
          </div>
          <div className="form-group">
            <label>Pickup Option:</label>
            <input type="checkbox" id="pickup" checked={pickup} onChange={handlePickupChange} />
            <label htmlFor="pickup">I would like to schedule a pickup for an additional fee.</label>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Submit Donation</button>
        </form>
      ) : (
        <div className="submission-success">
          <p>Thank you for your donation!</p>
          <p>Your donation request has been submitted successfully. Your distance to the drop-off point is {distance} miles.</p>
        </div>
      )}
    </div>
  );
}

export default DonationPage;
