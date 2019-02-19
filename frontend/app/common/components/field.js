(function(){
    angular.module('primeiraApp').component('field',{
        bindings:{
            id:'@',
            placeholder:'@',
            type:'@',
            grid:'@',
            label:'@',
            model:"=",
            readonly:"<"
        },
        controller:[
            'gridSystem',
            function(gridSystem){
                this.$onInit= ()=> this.gridClass=gridSystem.toCssClasses(this.grid)
            }
        ],
        template:`
        <div class="{{$ctrl.gridClass}}">
        <div class="form-group">
            <label for="{{$ctrl.id}}">{{$ctrl.label}}</label>
            <input id="{{$ctrl.id}}" type="{{$ctrl.type}}" ng-model="$ctrl.model" 
            ng-readonly="$ctrl.readonly"
            class="form-control" placeholder="{{$ctrl.placeholder}}">
        </div>
    </div>
        `
    })
})()