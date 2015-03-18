var app = angular.module('Beer-App');

app.service('breweryDBService', function($http, $window) {

    var breweryURL = 'http://api.brewerydb.com/v2/',
        key = '?key=' + $window.env.apiKey;


    this.getRandomBeerDB = function() {
        return $http({
            method: 'GET',
            url: breweryURL + 'beer/random' + key + '&format=json&hasLabels=Y&status=verified',
        });
    };

    this.getLocationsDB = function(city, state, zip) {
        if (city === undefined) {
            city = '';
        } else if (city === '') {
            city = '';
        } else {
            city = '&locality=' + city;
        }

        if (state === undefined) {
            state = '';
        } else if (state === '') {
            state = '';
        } else {
            state = '&region=' + state;
        }

        if (zip === undefined) {
            zip = '';
        } else if (zip === '') {
            zip = '';
        } else {
            zip = '&postalCode=' + zip;
        }

        return $http({
            method: 'GET',
            url: breweryURL + 'locations' + key + city + state + zip,
        });
    };


});
