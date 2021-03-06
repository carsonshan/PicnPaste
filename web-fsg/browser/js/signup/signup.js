app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($scope, AuthService, $state) {

    $scope.signup = {};
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
