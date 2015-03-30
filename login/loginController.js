var app = angular.module('Beer-App');

app.controller('LoginController', function($state, $firebaseAuth, $scope, Auth) {

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            console.log("User is logged out");
        }
    });

    $scope.createUser = function(email, password) {

        Auth.$createUser({
            email: email,
            password: password
        }).then(function(userData) {
            $scope.userLogin(email, password);
        }).catch(function(error) {
            alert(error + ' Please try again');
        });

        $scope.email = '';
        $scope.password = '';
    };

    $scope.userLogin = function(email, password) {

        Auth.$authWithPassword({
            email: email,
            password: password
        }).then(function(authData) {
            console.log("Logged in as:", authData.uid);

            $scope.email = '';
            $scope.password = '';
            $state.go('beerDiary');

        }).catch(function(error) {
            alert(error);
            console.error("Authentication failed:", error);
        });
    };

});
