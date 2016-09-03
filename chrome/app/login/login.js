'use strict';

// angular.module('myApp.login', ['ngRoute'])

// .config(['$stateProvider', function($stateProvider) {
//   $stateProvider.state('/login', {
//     templateUrl: 'login/login.html',
//     controller: 'LoginCtrl',
//     resolve: {
//         loggedInUser: function(AuthService){
//             return AuthService.getLoggedInUser();
//         }
//     },
//   });
// }])

app.controller('LoginCtrl', function($scope, $state, AuthService, loggedInUser) {

    $scope.login = {};
    if(loggedInUser) $scope.loggedInUser = loggedInUser
    $scope.view = "Login View"
    $scope.error = null;

    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo).then(function () {

            console.log("should be loading the home state...")
            $state.go('home');
        }).catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
