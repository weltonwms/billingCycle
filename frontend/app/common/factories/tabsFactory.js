(function(){
    angular.module("primeiraApp").factory('tabs',[tabsFactory]);
    function tabsFactory(){
        function show(owner,{
            tabCreate=false,
            tabUpdate=false,
            tabList=false,
            tabDelete=false
           
        }){
            owner.tabCreate= tabCreate;
            owner.tabUpdate= tabUpdate;
            owner.tabList=tabList;
            owner.tabDelete= tabDelete;
            
        }

        return {show}
    }
})()