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

    var ref = new Firebase("https://beer-app.firebaseio.com");

    // Create a callback which logs the current auth state
    function authDataCallback(authData) {
        if (authData) {
            var userId = ref.getAuth().uid;
            var userRef = new Firebase("https://beer-app.firebaseio.com/users/" + userId + '/favorites');
            $scope.favorites = $firebaseArray(userRef);
        } else {
            console.log("user logged out");
        }

    }

    // Register the callback to be fired every time auth state changes
    ref.onAuth(authDataCallback);






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

                    var ref = new Firebase("https://beer-app.firebaseio.com/users");
                    var userId = ref.getAuth().uid;


                    var userRef = new Firebase("https://beer-app.firebaseio.com/users/" + userId + '/favorites');

                    $scope.favorites = $firebaseArray(userRef);
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
