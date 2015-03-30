var app = angular.module('Beer-App');

app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://beer-app.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);