function initAutoComplete() {
    var input = document.getElementById('city');
    var autocomplete = new google.maps.places.Autocomplete(input);

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
    });
};

document.addEventListener('DOMContentLoaded', function () {
    initAutoComplete();
});

