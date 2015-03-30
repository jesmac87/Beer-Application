var app = angular.module('Beer-App');

app.controller('LoginController', function($state, $firebaseAuth, $scope, Auth) {
    //var ref = new Firebase("https://beer-app.firebaseio.com"); moved to authFactory

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

        // ref.createUser({
        //     email: email,
        //     password: password
        // }, function(error, userData) {
        //     if (error) {
        //         alert(error);
        //         console.log("Error creating user:", error);
        //     } else {

        //         ref.child("users").child(userData.uid).set({
        //             provider: 'password',
        //         });
        //         console.log("Successfully created user account with uid:", userData.uid);

        //         alert('Thank you for signing up, please proceed to login');
        //     }
        // });

        Auth.$createUser({
            email: email,
            password: password
        }).then(function(userData) {
            $scope.userLogin(email, password);
            // alert("User created with uid: " + userData.uid + ". Please proceed to login");
        }).catch(function(error) {
            alert(error + ' Please try again');
        });

        $scope.email = '';
        $scope.password = '';
    };

    $scope.userLogin = function(email, password) {

        // Auth.$authWithPassword({
        //     email: email,
        //     password: password
        // }, function(error, authData) {
        //     if (error) {
        //         alert("Login Failed! " + error);
        //         console.log("Login Failed!", error);
        //     } else {
        //         console.log("Authenticated successfully with payload:", authData);
        //         $scope.email = '';
        //         $scope.password = '';
        //     }
        // });

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

    // Create a callback which logs the current auth state
    // function authDataCallback(authData) {

    //     if (authData) {
    //         console.log("User " + authData.uid + " is logged in with " + authData.provider);
    //     } else {
    //         console.log("User is logged out");
    //     }
    // }

    // // Register the callback to be fired every time auth state changes
    // Auth.onAuth(authDataCallback);


});
