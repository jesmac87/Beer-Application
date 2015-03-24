var app = angular.module('Beer-App');

app.controller('BeerDiaryController', function($scope, breweryDBService, $modal, $firebaseArray) {



    $scope.getBeer = function(name) {
        breweryDBService.getBeerDB(name).then(function(beer) {

            $scope.favBeer = beer.data.data;
            $scope.beer = '';
            console.log(beer.data.data);
            $scope.openBeerModal($scope.favBeer);

        });
    };


    var ref = new Firebase("https://beer-app.firebaseio.com/favorites");
    $scope.favorites = $firebaseArray(ref);



    $scope.openFavoriteBeerModal = function(beer) {
        var modalInstance = $modal.open({
            templateUrl: './beerDiary/favoriteBeerInfo.html',

            controller: function($scope) {

                var ref = new Firebase("https://beer-app.firebaseio.com/favorites");
                $scope.favorites = $firebaseArray(ref);

                console.log($scope.favBeer);
                $scope.favBeer = beer;

                $scope.removeFromFavorites = function(favBeer) {
                    // $scope.favorites.$remove($indexFor(favBeer));
                    $scope.favorites.$remove($scope.favorites.$indexFor(favBeer.$id));
                    modalInstance.close('cancel');

                };

            },
            size: 'lg',
        });
    };



    $scope.openBeerModal = function(beer) {


        if (beer) {
            var modalInstance = $modal.open({
                templateUrl: './beerDiary/beerInfo.html',

                controller: function($scope) {

                    var ref = new Firebase("https://beer-app.firebaseio.com/favorites");
                    $scope.favorites = $firebaseArray(ref);
                    $scope.favBeer = beer;

                    $scope.addToFavorites = function(beer) {
                        $scope.favorites.$add(beer);
                        console.log(beer);
                        modalInstance.close('cancel');

                    };
                },
                size: 'lg',
            });
        } else {
            alert('Please try again, no beer found.');
        }
    };
});
