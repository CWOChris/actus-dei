import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid, Switch, FormControlLabel, FormGroup } from '@mui/material';
import ForecastCard from './ForecastCard'; // Make sure you have this component

const ForecastPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isMetric, setIsMetric] = useState(true); // State to track if metric is selected
  const { searchTerm } = useLocation().state; // Adjust according to how you pass the searchTerm

  useEffect(() => {
    const apiKey = '442fc2578f087c163d126cb7d628bf5d';
    // Adjust the units parameter based on the isMetric state
    const units = isMetric ? 'metric' : 'imperial';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${baseUrl}?q=${searchTerm}&units=${units}&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error('There was an error fetching the forecast data:', error));
  }, [searchTerm, isMetric]); // Add isMetric to the dependency array to refetch when it changes

  const handleToggle = (event) => {
    setIsMetric(event.target.checked);
  };

  // Function to render weather cards goes here (make sure it uses isMetric to adjust displayed units)

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          5-Day Forecast
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Switch checked={isMetric} onChange={handleToggle} />}
            label={isMetric ? 'C' : 'F'}
            labelPlacement="start"
          />
        </FormGroup>
      </Box>
      <Grid container spacing={2}>
        {/* Render your weather cards here */}
      </Grid>
    </Box>
  );
};

export default ForecastPage;
