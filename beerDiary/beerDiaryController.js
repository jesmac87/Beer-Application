var app = angular.module('Beer-App');

app.controller('BeerDiaryController', function($firebaseObject, $scope, breweryDBService, $modal, $firebaseArray) {

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

                var userId = ref.getAuth().uid;
                var userFavorites = new Firebase("https://beer-app.firebaseio.com/users/" + userId + '/favorites');
                var obj = $firebaseObject(userFavorites);
                $scope.favorites = $firebaseArray(userFavorites);

                obj.$bindTo($scope, "comments");
                var today = new Date();

                console.log($scope.favBeer);
                $scope.favBeer = beer;

                $scope.addComment = function(comment, favBeer) {




                    if (!$scope.comments[favBeer.$id].comments) { // make sure to not create array if array exists, to prevent overwrite
                        $scope.comments[favBeer.$id].comments = [];
                    }

                    $scope.comments[favBeer.$id].comments.push({
                        comment: comment,
                        date: today.toJSON()
                    });
                    $scope.comment = ''; // clear input

                };

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
