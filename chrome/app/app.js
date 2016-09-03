'use strict';

var base = "http://localhost:1337";

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'ui.router',
  // 'myApp.login',
  // 'myApp.signup',
  // 'myApp.home',
  'myApp.version',
  'fsaPreBuilt'
]).config( function($locationProvider, $stateProvider, $routeProvider, $urlRouterProvider) {
  // $locationProvider.hashPrefix('!');

  $stateProvider
  .state('signup', {
    url: '/signup',
    templateUrl: 'signup/signup.html',
    controller: 'SignupCtrl',
    resolve: {
        loggedInUser: function(AuthService){
            return AuthService.getLoggedInUser();
        }
    }
  })
  .state('home', {
    url: '/home',
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl',
    resolve: {
        loggedInUser: function(AuthService){
            return AuthService.getLoggedInUser();
        },
        allUserImages: function (HomeFactory, loggedInUser){
            return HomeFactory.getAllImages(loggedInUser._id)
        }
    }
  })
  .state('login', {
    url: '/login',
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl',
    resolve: {
        loggedInUser: function(AuthService){
            return AuthService.getLoggedInUser();
        }
    }
  })


  $urlRouterProvider.otherwise('/login');


});
