import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

const ForecastCard = ({ day, icon, minTemp, maxTemp, description }) => {
  // Function to get the correct weather icon based on the OpenWeatherMap icon code
  const getWeatherIcon = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}.png`;
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 'auto', mt: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {day}
        </Typography>
        <CardMedia
          component="img"
          height="140"
          image={getWeatherIcon(icon)}
          alt="weather icon"
        />
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Min: {minTemp}°C ({Math.round(minTemp * 9/5 + 32)}°F)
        </Typography>
        <Typography variant="body1" color="text.primary">
          Max: {maxTemp}°C ({Math.round(maxTemp * 9/5 + 32)}°F)
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;