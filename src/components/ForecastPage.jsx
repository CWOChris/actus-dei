import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, Switch, FormControlLabel, Stack } from '@mui/material';

const ForecastPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isMetric, setIsMetric] = useState(true); // State to track the unit system
  const { searchTerm } = useLocation().state;

  useEffect(() => {
    const apiKey = '442fc2578f087c163d126cb7d628bf5d';
    const units = isMetric ? 'metric' : 'imperial'; // Use state to determine units
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${baseUrl}?q=${searchTerm}&units=${units}&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error('There was an error fetching the forecast data:', error));
  }, [searchTerm, isMetric]); // Include isMetric in the dependencies array

  const handleToggle = (event) => {
    setIsMetric(event.target.checked);
  };

  const renderWeatherCards = () => {
    if (!weatherData) return null;

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
            </Typography>
            <Typography variant="body1">
              Min: {Math.round(forecast.main.temp_min)}{isMetric ? '°C' : '°F'}
              <span style={{ opacity: isMetric ? 0.6 : 1, fontSize: '0.8rem' }}>
                ({Math.round(isMetric ? forecast.main.temp_min * 9/5 + 32 : (forecast.main.temp_min - 32) * 5/9)}{isMetric ? '°F' : '°C'})
              </span>
            </Typography>
            <Typography variant="body1">
              Max: {Math.round(forecast.main.temp_max)}{isMetric ? '°C' : '°F'}
              <span style={{ opacity: isMetric ? 0.6 : 1, fontSize: '0.8rem' }}>
                ({Math.round(isMetric ? forecast.main.temp_max * 9/5 + 32 : (forecast.main.temp_max - 32) * 5/9)}{isMetric ? '°F' : '°C'})
              </span>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          5-Day Forecast
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ opacity: !isMetric ? 1 : 0.5 }}>F</Typography>
          <Switch checked={isMetric} onChange={handleToggle} />
          <Typography variant="body2" sx={{ opacity: isMetric ? 1 : 0.5 }}>C</Typography>
        </Stack>
      </Box>
      <Grid container spacing={2}>
        {renderWeatherCards()}
      </Grid>
    </Box>
  );
};

export default ForecastPage;
