(function(){
    angular.module('primeiraApp').controller('dashboardCtrl',[
        '$scope',
        '$http',
        dashboardController
    ]);
    
    function dashboardController(scope, http){
        const self= this;
        scope.getSummary=function(){
            const url="http://127.0.0.1:3003/api/billingSummary";
            http.get(url).then(function(response){
                const {credit, debt} = response.data; //usando destructing, mas poderia ser 'const credit= response.data.credit'
                self.credit= credit;
                self.debt= debt;
                self.total= credit - debt;
            })
        }
        scope.getSummary();
    }


})()

