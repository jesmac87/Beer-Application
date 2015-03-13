var app = angular.module('Beer-App');

app.controller('MainController', function($scope, breweryDBService) {
    $scope.getRandomBeer = function() {
        breweryDBService.getRandomBeerDB().then(function(response) {
            $scope.test = response.data.data;
        });
    };

    $scope.testServ = function() {
        breweryDBService.testService();
    };




});
