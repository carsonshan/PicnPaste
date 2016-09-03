'use strict';

// angular.module('myApp.signup', ['ngRoute'])

// .config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/signup', {
//     templateUrl: 'signup/signup.html',
//     controller: 'SignupCtrl',
//     resolve: {
//         loggedInUser: function(AuthService){
//             return AuthService.getLoggedInUser();
//         }
//     },
//   });
// }])

app.controller('SignupCtrl', function($scope, $state, AuthService, loggedInUser) {

    $scope.signup = {};
    $scope.loggedInUser = loggedInUser
    $scope.view = "Signup View"
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;

        console.log(signupInfo)

        AuthService.signup(signupInfo)
            .then(function (newUser){
                var loginCredentials = {}
                loginCredentials.email = signupInfo.email
                loginCredentials.password = signupInfo.password
                return AuthService.login(loginCredentials)
            })
            .then(function () {
                $state.go('home');
            })
            .catch(function () {
                $scope.error = 'Invalid login credentials.';
            });

    };

});
