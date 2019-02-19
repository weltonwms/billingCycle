angular.module('primeiraApp').config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider.state('dashboard',{
            url:'/dashboard',
            templateUrl:'dashboard/dashboard.html'
        }).state('cadastro',{
            url:'/cadastro?page',
            templateUrl:'billingCycle/tabs.html'
        });
        $urlRouterProvider.otherwise('/dashboard')
    }
])