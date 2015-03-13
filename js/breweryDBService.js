var app = angular.module('Beer-App');

app.service('breweryDBService', function($http, $window) {


    this.getRandomBeerDB = function() {

        return $http({
            method: 'GET',
            url: 'https://api.brewerydb.com/v2/beer/random?key=' + $window.env.apiKey + '&format=json&hasLabels=Y',
        });
    };

    this.testService = function() {
        console.log("hello");
    };

});
