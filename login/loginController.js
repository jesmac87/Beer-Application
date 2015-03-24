var app = angular.module('Beer-App');

app.controller('LoginController', function($firebaseAuth, $scope) {
    var ref = new Firebase("https://beer-app.firebaseio.com");
    // create an instance of the authentication service
    // var auth = $firebaseAuth(ref);


    $scope.createUser = function(email, password) {



        ref.createUser({
            email: email,
            password: password
        }, function(error, userData) {
            if (error) {
                alert(error);
                console.log("Error creating user:", error);
            } else {

                console.log("Successfully created user account with uid:", userData.uid);
                console.log(userData);
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
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                ref.child("users").child(authData.uid).set({
                    provider: authData.provider,


                });
                $scope.email = '';
                $scope.password = '';


            }
        });
    };




});
