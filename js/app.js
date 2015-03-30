var app = angular.module('Beer-App', ['ui.router', 'ui.bootstrap', 'firebase']);

// app.config(function($stateProvider, $urlRouterProvider) {
//     //
//     // For any unmatched url, redirect to /diary
//     $urlRouterProvider.otherwise("beerDiary");
//     //
//     // Now set up the states
//     $stateProvider
//         .state('randomBeer', {
//             url: "/randomBeer",
//             templateUrl: "./views/randomBeer.html"
//         })
//         .state('beerDiary', {
//             url: "/beerDiary",
//             templateUrl: "./beerDiary/beerDiary.html",
//             controller: 'BeerDiaryController',
//         })
//         .state('locations', {
//             url: '/locations',
//             templateUrl: './views/locations.html',
//             controller: 'MainController'

//         })
//         .state('login', {
//             url: '/login',
//             templateUrl: './login/login.html',
//             controller: 'LoginController',
//         });
// });

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
                    // the rest is the same for ui-router and ngRoute...

                    templateUrl: './login/login.html',

                }
            },
            controller: "LoginController",
            url: '/login'

        })


    //     .state("login", {
    //     // the rest is the same for ui-router and ngRoute...
    //     controller: "LoginController",
    //     templateUrl: "./login/login.html",
    //     url: '/login',

    // })


    // .state("beerDiary", {

    //         views: {
    //             'beerDiary': {
    //                 templateUrl: "./beerDiary/beerDiary.html",
    //             }
    //         },
    //         controller: "BeerDiaryController",

    //         url: '/beerDiary',
    //         resolve: {
    //             // controller will not be loaded until $requireAuth resolves
    //             // Auth refers to our $firebaseAuth wrapper in the example above
    //             "currentAuth": ["Auth", function(Auth) {
    //                 // $requireAuth returns a promise so the resolve waits for it to complete
    //                 // If the promise is rejected, it will throw a $stateChangeError (see above)
    //                 return Auth.$requireAuth();
    //             }]
    //         }
    //     })

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
                    templateUrl: "./views/randomBeer.html",
                }
            },

            controller: "BeerDiaryController",

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
