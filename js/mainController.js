var app = angular.module('Beer-App');

app.controller('MainController', function($scope, breweryDBService) {
    $scope.getRandomBeer = function() {
        breweryDBService.getRandomBeerDB().then(function(beer) {
            $scope.randomBeer = beer.data.data;
            console.log($scope.randomBeer);
        });
    };

    $scope.getLocations = function(city, state, zip) {

        breweryDBService.getLocationsDB(city, state, zip).then(function(locations) {
            $scope.locations = locations.data.data;
        }, function(error) {
            alert(error);
        });

        console.log($scope.locations);
    };





});
