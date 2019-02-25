(function(){
    angular.module('primeiraApp').controller('AuthCtrl',[
        'msgsFactory',
        '$http',
        '$location',
        'auth',
        AuthController
    ]);
    
    function AuthController(msg, http, location, auth){
        const vm= this;
        vm.loginMode= true;

        vm.changeMode=()=>vm.loginMode= !vm.loginMode;

        vm.signup= ()=>{
            auth.signup(vm.user, (err,data)=>{err?msg.addError(err):location.path('/'); console.log(err,data)});
        }

        vm.login= ()=>{
            auth.login(vm.user, err=>err?msg.addError(err):location.path('/'));
        }

        vm.logout=function(){
            auth.logout( ()=>location.path('/'));
            
        }

        vm.getUser=()=> auth.getUser() ;
        
    }


})()
