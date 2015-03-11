var app = angular.module('Beer-App');

app.service('breweryDBService', function($http, $window) {


    this.getRandomBeerDB = function($window) {
        console.log($window.env.apiKey);
        return $http({
            method: 'GET',
            url: 'http://api.brewerydb.com/v2/beer/random/?key=' + $window.env.apiKey,
        });




    };

});
