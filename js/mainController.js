var app = angular.module('Beer-App');

app.controller('MainController', function($state, $scope, breweryDBService, $modal, Auth, $firebaseArray) {

    $scope.auth = Auth;


    $scope.openModal = function(location) {

        var modalInstance = $modal.open({
            templateUrl: './views/breweryInfo.html',
            controller: function($scope) {
                $scope.location = location;
            },
            size: 'lg',
        });
    };

    $scope.getLocations = function(city, state, zip) {

        breweryDBService.getLocationsDB(city, state, zip).then(function(locations) {

            reset();

            $scope.locations = locations.data.data;
        }, function() {
            alert('Please try again');
        });

    };

    var reset = function() {
        $scope.city = '';
        $scope.state = '';
        $scope.zip = '';
    };



    // refactor later -- probably doesn't belong in here
    $scope.userLogout = function() {
        Auth.$unauth();
        $state.go('login');
        alert('You are now logged out');
    };

    //redundant...
    // $scope.addToFavorites = function(beer) {
 //     var ref = new Firebase("https://beer-app.firebaseio.com/users");
 //     var userId = ref.getAuth().uid;
 //     var userRef = new Firebase("https://beer-app.firebaseio.com/users/" + userId + '/favorites');
 //     $scope.favorites = $firebaseArray(userRef);
 //     $scope.favorites.$add(beer);



 // };




});
