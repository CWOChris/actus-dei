import React from 'react';

function WeatherDisplay({ data }) {
  // Assuming `data` includes both current weather and a 5-day forecast.
  // For current weather, you might have data.current (or a similar structure)
  // For the 5-day forecast, you might have data.daily (or similar)

  // Format temperature function
  const formatTemperature = (tempCelsius) => {
    const tempFahrenheit = (tempCelsius * 9/5) + 32;
    return `${tempCelsius.toFixed(1)}°C (${tempFahrenheit.toFixed(1)}°F)`;
  };

  // Selecting a representative forecast for each day (simplified approach)
  // In a real scenario, you would need to aggregate or select specific time slots
  const dailyForecasts = data.daily.slice(0, 5); // Assuming 'daily' contains daily forecasts

  return (
    <div>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <h2>Current Weather</h2>
        <div style={{ margin: '20px auto', width: '300px', border: '1px solid #ccc', padding: '20px' }}>
          <h3>{data.current.weather[0].main}</h3>
          <img src={`http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`} alt="weather" />
          <p>{formatTemperature(data.current.temp)}</p>
          <p>{data.current.weather[0].description}</p>
        </div>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <h2>5-Day Forecast</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
          {dailyForecasts.map((day, index) => (
            <div key={index} style={{ margin: '10px', width: '200px', border: '1px solid #ccc', padding: '10px' }}>
              <h4>Day {index + 1}</h4>
              <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="weather" />
              <p>{formatTemperature(day.temp.day)}</p>
              <p>{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherDisplay;