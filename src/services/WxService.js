import axios from 'axios';

const API_KEY = '442fc2578f087c163d126cb7d628bf5d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';  // May need to include a '/weather' here

const fetchWxData = async (location) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/weather`, {
            params: {
                q: location,
                units: 'metric',
                appid: API_KEY,
            },
        });
        return data;
    } catch (error) {
        console.log('Error finding wx data', error);
        throw error;
    }
};

export default fetchWxData;