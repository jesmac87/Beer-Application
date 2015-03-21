var app = angular.module('Beer-App', ['ui.router', 'ui.bootstrap', 'firebase']);

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("home");
    //
    // Now set up the states
    $stateProvider
        .state('randomBeer', {
            url: "/randomBeer",
            templateUrl: "./views/randomBeer.html"
        })
        .state('home', {
            url: "/home",
            templateUrl: "./views/home.html",
            controller: 'MainController'
        })
        .state('locations', {
            url: '/locations',
            templateUrl: './views/locations.html',
            controller: 'MainController'

        })
        .state('login', {
            url: '/login',
            templateUrl: './login/login.html',
            controller: 'LoginController',
        });
});
