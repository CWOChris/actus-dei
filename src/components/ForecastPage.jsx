import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const ForecastPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const { searchTerm } = useLocation().state; // Assuming you're passing the search term via route state

  useEffect(() => {
    const apiKey = 'YOUR_API_KEY_HERE';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${baseUrl}?q=${searchTerm}&units=metric&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error('There was an error fetching the forecast data:', error));
  }, [searchTerm]);

  const renderWeatherCards = () => {
    if (!weatherData) return null;

    // Assuming the API returns a list where each item represents a 3-hour forecast,
    // and you're only interested in the forecast at the same time each day for simplicity.
    const dailyForecasts = weatherData.list.filter((_, index) => index % 8 === 0);

    return dailyForecasts.map((forecast, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {new Date(forecast.dt * 1000).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {forecast.weather[0].main}
              {/* Add image/icon based on weather condition */}
            </Typography>
            <Typography variant="body1">
              Min: {Math.round(forecast.main.temp_min)}°C
              <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
                ({Math.round(forecast.main.temp_min * 9/5 + 32)}°F)
              </span>
            </Typography>
            <Typography variant="body1">
              Max: {Math.round(forecast.main.temp_max)}°C
              <span style={{ opacity: 0.6, fontSize: '0.8rem' }}>
                ({Math.round(forecast.main.temp_max * 9/5 + 32)}°F)
              </span>
            </Typography>
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
      <Grid container spacing={2}>
        {renderWeatherCards()}
      </Grid>
    </Box>
  );
};

export default ForecastPage;