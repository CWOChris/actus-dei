import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const ForecastPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { searchTerm } = useLocation().state;

  useEffect(() => {
    const apiKey = '442fc2578f087c163d126cb7d628bf5d';
    const units = 'metric'; // or 'imperial', depending on your toggle state
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${baseUrl}?q=${searchTerm}&units=${units}&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error('There was an error fetching the forecast data:', error));
  }, [searchTerm]);

  const renderWeatherCards = () => {
    if (!weatherData) return null;

    // Filter logic here remains unchanged
    const dailyForecasts = weatherData.list.filter((_, index) => index % 8 === 0);

    return dailyForecasts.map((forecast, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            {/* Card content remains unchanged */}
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        5-Day Forecast
      </Typography>
      {/* City and state/province/country information */}
      {weatherData && (
        <Typography variant="subtitle1">
          {weatherData.city.name}, {weatherData.city.country}
        </Typography>
      )}
      {/* Today's forecast */}
      {weatherData && (
        <>
          <Typography variant="h6" gutterBottom>
            Today's Forecast:
          </Typography>
          <p>
            {weatherData.list[0].weather[0].description}
          </p>
        </>
      )}
      <Grid container spacing={2}>
        {renderWeatherCards()}
      </Grid>
    </Box>
  );
};

export default ForecastPage;