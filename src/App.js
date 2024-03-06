import React, { useState } from 'react';
import { Header } from './components/Header';
import { WelcomeMessage } from './components/WelcomeMessage';
import { WeatherSearch } from './components/WeatherSearch';
import { WeatherDisplay } from './components/WeatherDisplay';

function App() {
  const [wxData, setWxData] = useState(null);

  return (
    <div className='App'>
      <Header title='Actus Dei' />
      <WelcomeMessage message='Welcome to Actus Dei!' />
      <WeatherSearch setWxData={setWxData} />
      {wxData && <WeatherDisplay data={wxData} />}
    </div>
  );
};

export default App;