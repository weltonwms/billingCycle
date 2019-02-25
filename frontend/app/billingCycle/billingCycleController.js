(function(){
    angular.module('primeiraApp').controller('billingCycleCtrl',[
        '$http',
        'msgsFactory',
        'tabs',
        '$location',
        billingCycleController
    ])

    function billingCycleController($http, msgs,tabs, location){
        
        const vm = this;
        const url= "http://localhost:3003/api/billingCycles";
        let page= location.search().page || 1;
        const numberPerPage= 5;
    
       
        vm.refresh= function(){
           
           
            $http.get(`${url}?skip=${numberPerPage * (page - 1)}&limit=${numberPerPage}`).then(response=>{
               //console.log(response.data)
                vm.billingCycle= {credits:[{}],debts:[{}]};
                vm.billingCycles= response.data;
                vm.calculateValues();
            }).catch(response=>{
                console.log(response.data.errors)
                msgs.addError(response.data.errors)
            });

            $http.get(`${url}/count`).then(response=>{
                vm.pages= Math.ceil(response.data.value / numberPerPage);
                tabs.show(vm,{tabList:true,tabCreate:true})
                
            })
        }

        vm.create= function(){
           
            $http.post(url,vm.billingCycle).then((response)=>{
                vm.refresh();
                msgs.addSuccess("Incluído com Sucesso!")
            }).catch((response)=>{
                console.log(response.data.errors)
                msgs.addError(response.data.errors)
            })
        }

        vm.showUpdate= function (billingCycle){
            vm.billingCycle= billingCycle;
            tabs.show(vm,{tabUpdate:true});
            vm.calculateValues();
        }

        vm.showDelete= function (billingCycle){
            vm.billingCycle= billingCycle;
            tabs.show(vm,{tabDelete:true});
            vm.calculateValues();
        }

        vm.update= function (){
            const urlUpdate= url+"/"+vm.billingCycle._id;
            $http.put(urlUpdate,vm.billingCycle).then(resposta=>{
                msgs.addSuccess("Registro alterado com sucesso!");
                vm.refresh();
            }).catch(response=>{
                msgs.addError(response.data.errors)
            })
        }

        vm.delete= function(){
            const urlDelete= url+"/"+vm.billingCycle._id;
            $http.delete(urlDelete).then(resposta=>{
                msgs.addSuccess("Registro Excluído com Sucesso");
               vm.refresh();               
            }).catch(response=>{
                console.log(response);
                msgs.addError(response.data.errors);
            })
        }

        vm.addCredit= function(index){
            
            vm.billingCycle.credits.splice(index+1,0,{});
          
        }

        vm.cloneCredit= function(index,{name, value}){
            vm.billingCycle.credits.splice(index+1,0,{name, value});
            vm.calculateValues();
        }

        vm.deleteCredit= function (index){
           
            if (vm.billingCycle.credits.length > 1){
              vm.billingCycle.credits.splice(index, 1);
              vm.calculateValues();
            }
        }

        vm.addDebt= function(index){
            
            vm.billingCycle.debts.splice(index+1,0,{});
          
        }

        vm.cloneDebt= function(index,{name, value, status}){
            vm.billingCycle.debts.splice(index+1,0,{name, value, status});
            vm.calculateValues();
        }

        vm.deleteDebt= function (index){
           
            if (vm.billingCycle.debts.length > 1){
                vm.billingCycle.debts.splice(index, 1);
                vm.calculateValues();
            }
        }

        vm.calculateValues= function(){
            vm.credit=0;
            vm.debt=0;
            vm.total= 0;

            vm.billingCycle.credits.forEach( ({value}) => {
                vm.credit+= !value || isNaN(value)?0:parseFloat(value);
            });
            vm.billingCycle.debts.forEach( ({value}) => {
                vm.debt+= !value || isNaN(value)?0:parseFloat(value);
            });
            vm.total= vm.credit - vm.debt;
        }

        vm.refresh();
    }
})()