(function(){
    angular.module('primeiraApp').factory('msgsFactory',[
        'toastr',
        messagesFactory
    ])

    function messagesFactory(toastr){
        function addMessages(msgs, title, method){
            if(msgs instanceof Array){
                msgs.forEach(msg=>toastr[method](msg, title))
            }
            else{
                toastr[method](msgs, title)
            }
        }

        function addSuccess(msgs){
            addMessages(msgs, "Sucesso",'success');
        }

        function addError(msgs){
            addMessages(msgs, "Erro",'error');
        }

        return {addError, addSuccess}
    }


})()