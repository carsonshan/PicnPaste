app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'navbar/navbar.html',
        link: function (scope) {

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'About', state: 'about' },
                { label: 'Documentation', state: 'docs' }
            ];
            scope.adminItems = [
                { label: 'Admin :: Products', state: 'admin', auth: true },
                { label: 'Admin :: Users', state: 'adminUser', auth: true },
                { label: 'Admin :: Orders', state: 'adminOrder', auth: true },
                { label: 'Admin :: Add Product', state: 'adminCreateProduct', auth: true },
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('login');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

            var originatorEv;
            scope.openMenu = function($mdOpenMenu, ev) {
              originatorEv = ev;
              $mdOpenMenu(ev);
            };
            // scope.announceClick = function(index) {
            //   $mdDialog.show(
            //     $mdDialog.alert()
            //       .title('You clicked!')
            //       .textContent('You clicked the menu item at index ' + index)
            //       .ok('Nice')
            //       .targetEvent(originatorEv)
            //   );
            //   originatorEv = null;
            // };

            scope.demo = {
                  showTooltip : false,
                  tipDirection : ''
              };
              scope.demo.delayTooltip = undefined;
              scope.$watch('demo.delayTooltip',function(val) {
                scope.demo.delayTooltip = parseInt(val, 10) || 0;
              });
              scope.$watch('demo.tipDirection',function(val) {
                if (val && val.length ) {
                  scope.demo.showTooltip = true;
                }
              })

        }

    };

});

