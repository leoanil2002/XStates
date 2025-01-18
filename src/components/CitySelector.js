import React, { useState, useEffect } from 'react';

const CitySelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Fetch all countries on initial load
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://crio-location-selector.onrender.com/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };
    if (selectedCountry) {
      fetchStates();
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };
    if (selectedCountry && selectedState) {
      fetchCities();
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setStates([]); // Reset states when country is changed
    setCities([]); // Reset cities when country is changed
    setSelectedState(''); // Reset state selection
    setSelectedCity(''); // Reset city selection
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setCities([]); // Reset cities when state is changed
    setSelectedCity(''); // Reset city selection
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div>
      <h1>Select Location</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <select id="country" value={selectedCountry} onChange={handleCountryChange} style={{ marginRight: '10px' }}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select id="state" value={selectedState} onChange={handleStateChange} style={{ marginRight: '10px' }} disabled={!selectedCountry}>
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h2>You selected {selectedCity ? selectedCity : "____"}, {selectedState ? selectedState : "____"}, {selectedCountry ? selectedCountry : "____"}</h2>
      </div>
    </div>
  );
};

export default CitySelector;
