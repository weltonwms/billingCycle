(function(){
    angular.module('primeiraApp').component('paginator',{
        bindings:{
            url:"@",
            pages:"@"
        },
        controller:[
            '$location',
            function(location){
                const vm= this;
               
                vm.$onInit=function(){
                    
                    const pages= parseInt(this.pages) || 1;
                    this.pagesArray= Array(pages).fill(0).map( (el,i)=>i+1);
                    
                    this.current= parseInt(location.search().page) || 1;
               
                    this.needPagination= this.pages > 1;
                    this.hasPrev= this.current > 1;
                    this.hasNext= this.current < this.pages;
                    
                }
                vm.isCurrent= function(i){
                    return i===this.current;
                }

                vm.disabled= function(event){
                    console.log(event.flag)
                    if(event.flag){
                        event.event.preventDefault();
                    }
                    
                };
                console.log(vm)
                
               
            }
        ],
        template:`
            <ul class="pagination pagination-sm no-margin pull-right" ng-if="$ctrl.needPagination">
                <li class="paginate_button previous" ng-class="{disabled:!$ctrl.hasPrev }"> 
                     <a ng-click="$ctrl.disabled({event:$event, flag:!$ctrl.hasPrev});" href="{{$ctrl.url}}?page={{$ctrl.current -1}}"> Anterior </a> 
                </li>
                <li class="paginate_button" ng-class="{active:$ctrl.isCurrent(index)}" ng-repeat="index in $ctrl.pagesArray">
                    <a href="{{$ctrl.url}}?page={{index}}" >{{index}} </a>
                </li>

                <li class="paginate_button next" ng-class="{disabled:!$ctrl.hasNext }"> 
                    <a  ng-click="$ctrl.disabled({event:$event, flag:!$ctrl.hasNext});" href="{{$ctrl.url}}?page={{$ctrl.current +1}}"> Próximo </a> 
                 </li>

            </ul>
        `
    })



})()