import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Box, Card, CardContent, Typography, Grid, Switch, FormControlLabel, Stack, CardMedia } from '@mui/material';

const ForecastPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const { searchTerm } = useLocation().state;

  useEffect(() => {
    const apiKey = '442fc2578f087c163d126cb7d628bf5d';
    const units = isMetric ? 'metric' : 'imperial';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const url = `${baseUrl}?q=${searchTerm}&units=${units}&appid=${apiKey}`;

    axios.get(url)
      .then(response => {
        setWeatherData(response.data);
      })
      .catch(error => console.error('There was an error fetching the forecast data:', error));
  }, [searchTerm, isMetric]);

  const handleToggle = (event) => {
    setIsMetric(event.target.checked);
  };

  const renderWeatherCards = () => {
    if (!weatherData) return null;

    const dailyForecasts = weatherData.list.filter((_, index) => index % 8 === 0);

    return dailyForecasts.map((forecast, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ maxWidth: 345, backgroundColor: 'darkgray' }}>
          <CardContent>
            {/* All Typography components should now have color: 'white' to contrast with the dark background */}
            <Typography gutterBottom variant="h5" component="div" sx={{ color: 'white' }}>
              {new Date(forecast.dt * 1000).toLocaleDateString()}
            </Typography>
            <CardMedia
              component="img"
              image={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt="Weather icon"
              sx={{ width: 100, height: 100, margin: 'auto' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ color: 'white' }}>
              {forecast.weather[0].description}
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
              Min: {Math.round(forecast.main.temp_min)}{isMetric ? '°C' : '°F'}
              <span style={{ opacity: isMetric ? 0.6 : 1, fontSize: '0.8rem' }}>
                ({Math.round(isMetric ? forecast.main.temp_min * 9/5 + 32 : (forecast.main.temp_min - 32) * 5/9)}{isMetric ? '°F' : '°C'})
              </span>
            </Typography>
            <Typography variant="body1" sx={{ color: 'white' }}>
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
    <Box sx={{ flexGrow: 1, padding: 2, backgroundColor: '#212121', color: 'white' }}>
      {/* Apply the dark background color and text color adjustments here as well */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          5-Day Forecast
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="body2" sx={{ opacity: !isMetric ? 1 : 0.5, color: 'white' }}>F</Typography>
          <Switch checked={isMetric} onChange={handleToggle} />
          <Typography variant="body2" sx={{ opacity: isMetric ? 1 : 0.5, color: 'white' }}>C</Typography>
        </Stack>
      </Box>
      {weatherData && (
        <>
          <Typography variant="subtitle1" gutterBottom sx={{ color: 'white' }}>
            {weatherData.city.name}, {weatherData.city.country}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Today's Forecast:
          </Typography>
          <Typography variant="body1" sx={{ color: 'white' }}>
            {weatherData.list[0].weather[0].description.charAt(0).toUpperCase() + weatherData.list[0].weather[0].description.slice(1)}
          </Typography>
        </>
      )}
      <Grid container spacing={2}>
        {renderWeatherCards()}
      </Grid>
    </Box>
  );
};

export default ForecastPage;
