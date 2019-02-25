(function(){
    angular.module('primeiraApp').factory('auth',[
        '$http',
        'consts',
        AuthFactory
    ])

    function AuthFactory($http, consts){
        let user=null;

        function getUser(){
            if(!user){
                user=JSON.parse(localStorage.getItem(consts.userKey));
            }
            return user;
        }

        function signup(user, callback){
            return submit('signup', user, callback);
        }

        function login(user, callback){
            return submit('login', user, callback);
        }

        function submit(url, user, callback){
            $http.post(`${consts.oapiUrl}/${url}`, user)
            .then(response=>{
                localStorage.setItem(consts.userKey, JSON.stringify(response.data) );
                $http.defaults.headers.common.Authorization=response.data.token;
                if(callback){
                    callback(null, response.data);
                }
            })
            .catch(response=>{
               if(callback){
                callback(response.data.errors, null);
               }
                
            });
        }

        function logout(callback){
            user= null;
            localStorage.removeItem(consts.userKey);
            $http.defaults.headers.common.Authorization= '';
            if(callback) {
                callback(null);
            }
        }

        function validateToken(token, callback){
            if(!token){
                return callback?callback('Token Inválido'):null;
            }
            $http.post(`${consts.oapiUrl}/validateToken`, {token})
            .then(resp=>{
               
                if(!resp.data.valid){
                    logout();
                }
                else{
                    $http.defaults.headers.common.Authorization=getUser().token;
                }
                if(callback) {
                    callback(null, resp.data.valid);
                }
            }).catch(resp=>{
                if(callback) {
                    
                    callback(resp.data.errors, null);
                }
            })
        }
        return {signup, login, logout, getUser, validateToken}
    }
})()