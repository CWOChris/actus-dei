import React, { useState } from 'react';
import fetchWxData from '../services/WxService';

function WeatherSearch({ onSearch }) {
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    try {
      const data = await fetchWxData(location);
      onSearch(data);
    } catch (error) {
      console.error('Search failed:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default WeatherSearch;