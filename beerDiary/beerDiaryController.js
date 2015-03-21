var app = angular.module('Beer-App');

app.controller('BeerDiaryController', function($scope, breweryDBService) {

    $scope.getBeer = function(name) {
        breweryDBService.getBeerDB(name).then(function(beer) {

            $scope.favBeer = beer.data.data;
            $scope.beer = '';
            console.log(beer.data.data);

        });
    };
});
