var app = angular.module('Beer-App');

app.controller('LoginController', function($firebaseAuth, $scope) {
    var ref = new Firebase("https://beer-app.firebaseio.com");

    $scope.createUser = function(email, password) {

        ref.createUser({
            email: email,
            password: password
        }, function(error, userData) {
            if (error) {
                alert(error);
                console.log("Error creating user:", error);
            } else {

                ref.child("users").child(userData.uid).set({
                    provider: 'password',
                });
                console.log("Successfully created user account with uid:", userData.uid);

                alert('Thank you for signing up, please proceed to login');
            }
        });

        $scope.email = '';
        $scope.password = '';
    };

    $scope.userLogin = function(email, password) {

        ref.authWithPassword({
            email: email,
            password: password
        }, function(error, authData) {
            if (error) {
                alert("Login Failed! " + error);
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);




                $scope.email = '';
                $scope.password = '';
            }
        });
    };

    // Create a callback which logs the current auth state
    function authDataCallback(authData) {

        if (authData) {
            console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
            console.log("User is logged out");
        }
    }

    // Register the callback to be fired every time auth state changes
    ref.onAuth(authDataCallback);


});
