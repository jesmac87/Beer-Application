var app = angular.module('Beer-App', ['ui.router', 'ui.bootstrap', 'firebase']);


// for ui-router
app.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("login");
            alert('Must be logged in');
        }
    });
}]);

app.config(["$stateProvider", function($stateProvider) {
    $stateProvider
        .state("login", {
            views: {
                'login': {
                    templateUrl: './login/login.html',
                }
            },
            controller: "LoginController",
            url: '/login'
        })
        .state("beerDiary", {
            templateUrl: "./beerDiary/beerDiary.html",
            controller: "BeerDiaryController",
            url: '/beerDiary',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function(Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
                }]
            }
        })
        .state("randomBeer", {
            views: {
                'randomBeer': {
                    templateUrl: "./randomBeer/randomBeer.html",
                }
            },
            controller: "RandomBeerController",
            url: "/randomBeer",
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function(Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
                }]
            }
        })
        .state("locations", {
            views: {
                'locations': {
                    templateUrl: './views/locations.html',
                }
            },
            controller: 'MainController',
            url: '/locations',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function(Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
                }]
            }
        })
        .state("otherwise", {
            views: {
                'login': {
                    // the rest is the same for ui-router and ngRoute...

                    templateUrl: './login/login.html',

                }
            },
            url: "*path",
            templateUrl: "./login/login.html"
        });
}]);
