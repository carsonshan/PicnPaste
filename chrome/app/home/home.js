'use strict';

// angular.module('myApp.home', ['ngRoute'])

// .config(['$stateProvider', function($stateProvider) {
//   $stateProvider.state('/home', {
//     url: '/home',
//     templateUrl: 'login/login.html',
//     controller: 'LoginCtrl',
//     resolve: {
//         loggedInUser: function(AuthService){
//             return AuthService.getLoggedInUser();
//         }
//     },
//   });
// }])

app.controller('HomeCtrl', function($scope, loggedInUser, allUserImages) {

    $scope.loggedInUser = loggedInUser;

    $scope.allImages = allUserImages;
    console.log($scope.allImages)

})

app.factory('HomeFactory', function ($http) {

    var HomeFactory = {};

    HomeFactory.getAllImages = function (userId) {
        console.log("getAllImages Ran", base, userId)
        return $http.get(base + '/api/images/' + userId)
            .then(function(res){
                return res.data
            })
    }

    return HomeFactory;

})
