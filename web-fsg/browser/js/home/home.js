app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'js/home/home.html',
        resolve: {
            loggedInUser: function (AuthService){
                return AuthService.getLoggedInUser()
            }
        }
    });
});
