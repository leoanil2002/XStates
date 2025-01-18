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
    fetch('https://crio-location-selector.onrender.com/countries')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (selectedCountry) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((response) => response.json())
        .then((data) => setStates(data))
        .catch((error) => console.error('Error fetching states:', error));
    }
  }, [selectedCountry]);

  // Fetch cities when a state is selected
  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error fetching cities:', error));
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
      <div>
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {selectedCountry && (
        <div>
          <select value={selectedState} onChange={handleStateChange}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedState && (
        <div>
          <select value={selectedCity} onChange={handleCityChange}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <h2>You selected {selectedCity}, {selectedState}, {selectedCountry}</h2>
      </div>
    </div>
  );
};

export default CitySelector;
