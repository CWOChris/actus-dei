import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';

const RawPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const fetchWeatherData = () => {
    const apiKey = '442fc2578f087c163d126cb7d628bf5d';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Using the "weather" endpoint for single city/zip
    const url = `${baseUrl}?q=${searchTerm}&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setApiResponse(JSON.stringify(response.data, null, 2)); // Beautify the JSON response
      })
      .catch(error => {
        console.error('There was an error fetching the data:', error);
        setApiResponse('Failed to fetch data. Please try again.');
      });
  };

  return (
    <Box sx={{ m: 4 }}>
      <TextField
        label="City or ZIP Code"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={fetchWeatherData}>
        Search
      </Button>
      {apiResponse && (
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 2 }}>
          {apiResponse}
        </Typography>
      )}
    </Box>
  );
};

export default RawPage;