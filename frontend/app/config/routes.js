angular.module('primeiraApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider.state('dashboard', {
            url: '/dashboard',
            templateUrl: 'dashboard/dashboard.html'
        }).state('cadastro', {
            url: '/cadastro?page',
            templateUrl: 'billingCycle/tabs.html'
        });
        // $urlRouterProvider.otherwise('/dashboard')
        $httpProvider.interceptors.push('handleResponseError');
    }
]).run([
    '$rootScope',
    '$http',
    '$location',
    '$window',
    'auth',
    function ($rootScope, $http, $location, $window, auth) {
        validateUser();
        $rootScope.$on('$locationChangeStart', validateUser)
        function validateUser() {
            let user = auth.getUser();
            let authPage = '/auth.html';
            let isAuthPage = $window.location.href.includes(authPage);

            if (!user && !isAuthPage) {
                $window.location.href = authPage;
            } else if (user && !user.isValid) {
                auth.validateToken(user.token, (err, valid) => {
                    if (!valid) {
                        $window.location.href = authPage;
                    } else {
                        user.isValid = true;
                        $http.defaults.headers.common.Authorization = user.token;
                        isAuthPage ? $window.location.href = "/" : $location.path('/dashboard');
                    }
                })
            }
        } //fim validateUser()

    }

])