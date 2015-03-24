var app = angular.module('Beer-App');

app.controller('MainController', function($scope, breweryDBService, $modal) {
    $scope.getRandomBeer = function() {
        breweryDBService.getRandomBeerDB().then(function(beer) {
            $scope.randomBeer = beer.data.data;
            console.log($scope.randomBeer);
        });
    };

    $scope.getLocations = function(city, state, zip) {

        breweryDBService.getLocationsDB(city, state, zip).then(function(locations) {
            reset();
            $scope.locations = locations.data.data;
            console.log($scope.locations);
        }, function() {
            alert('Please try again');
        });
    };

    var reset = function() {
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
    };

    $scope.openModal = function(location) {

        var modalInstance = $modal.open({
            templateUrl: './views/breweryInfo.html',
            controller: function($scope) {
                $scope.location = location;
            },
            size: 'lg',
        });
    };


});
