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

// const myAPIKey = '442fc2578f087c163d126cb7d628bf5d';
// const city = "Minneapolis, MN";
// const wXAPIURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myAPIKey}`;

// fetch(wXAPIURL)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error("OpenWeather API request failed");
//         }
//         return response.json();
//     })
//     .then(data => {
//         const weatherIcon = data.weather[0].icon;
//         const weatherIconURL = `http://openweathermap.org/img/w/${weatherIcon}.png`;
//         const weatherImage = document.createElement('img');
//         weatherImage.src = weatherIconURL;

//         document.getElementById('wxImg').appendChild(weatherImage);
//     })
//     .catch(error => {
//         console.error('Error: ', error);
//     });

// //  END OF THE CODE FOR THE WEATHER IMAGE IN THE CARDS