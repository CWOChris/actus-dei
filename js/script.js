// // BEGIN AUTOCOMPLETE
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        initAutoComplete();
    }, 500);
});


function initAutoComplete() {
    var input = document.getElementById('city');
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
    });
};
// // END AUTOCOMPLETE





// //  MIGHT BE ABLE TO USE THE CODE BELOW FOR THE WEATHER IMAGE IN THE CARDS

const myAPIKey = '442fc2578f087c163d126cb7d628bf5d';
document.getElementById('citySearch').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=celsius&appid=${myAPIKey}`)
        .then(response => response.json())
        .then(data => {
            displayWeatherForecast(data);
        })
        .catch(err => {
            console.log('Error: ', error);
        });
});

function displayWeatherForecast(data) {
    const forecastContainer = document.getElementById('#');
    forecastContainer.innerHTML = '';

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const temperature = item.main.temp;
        const description = item.weather[0].description;
        const icon = item.weather[0].icon;
        const humidity = item.main.humidity;
        const wind = item.wind.speed;
        const sunset = new Date(item.sys.sunset * 1000);
        const moonPhase = item.moon_phase;
        const pressure = item.main.pressure;
        const cityDisplay = data.city.name;

        // This is where the DOM will be manipulated
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `

        `;
        // End of where the DOM will be manipulated
    });
}








// //  END OF THE CODE FOR THE WEATHER IMAGE IN THE CARDS

// //  MIGHT BE HELPFUL LATER ON FOR THE DISPLAY OF THE WEATHER IN THE CARDS

        // .then(data => {
        //     console.log(data);
        //     document.getElementById('cityName').innerHTML = data.name;
        //     document.getElementById('temp').innerHTML = data.main.temp;
        //     document.getElementById('humidity').innerHTML = data.main.humidity;
        //     document.getElementById('wind').innerHTML = data.wind.speed;
        //     document.getElementById('weather').innerHTML = data.weather[0].main;
        //     document.getElementById('weatherDescription').innerHTML = data.weather[0].description;
        //     document.getElementById('weatherIcon').src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        // })
        // .catch(err => console.log(err));

// //  END OF THE CODE FOR THE DISPLAY OF THE WEATHER IN THE CARDS

// //  WX IMAGES
        // const icon = item.weather[0].icon;
// //  END OF WX IMAGES