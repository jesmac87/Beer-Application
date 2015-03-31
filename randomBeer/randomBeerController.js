var app = angular.module('Beer-App');

app.controller('RandomBeerController', function($state, $scope, breweryDBService, $modal, $firebaseArray) {
    $scope.getRandomBeer = function() {


        breweryDBService.getRandomBeerDB().then(function(beer) {


            var modalInstance = $modal.open({
                templateUrl: './randomBeer/randomBeerModal.html',
                size: 'lg',
                controller: function($scope) {
                    $scope.randomBeer = beer.data.data;
                    $scope.addToFavorites = function(beer) {
                        var ref = new Firebase("https://beer-app.firebaseio.com/users");
                        var userId = ref.getAuth().uid;
                        var userRef = new Firebase("https://beer-app.firebaseio.com/users/" + userId + '/favorites');
                        $scope.favorites = $firebaseArray(userRef);
                        $scope.favorites.$add($scope.randomBeer);
                        $state.go('beerDiary');
                        modalInstance.close('cancel');

                    };

                    $scope.newRandomBeer = function() {
                        breweryDBService.getRandomBeerDB().then(function(beer) {
                            $scope.randomBeer = beer.data.data;
                        });
                    };

                },

            });
        });

    };


});
