angular.module('primeiraApp').factory('gridSystem',[function(){
    function toCssClasses(numbers){
        const x= numbers?numbers.split(' '):[];
        let classes= '';
        if(x[0]) classes+=`col-xs-${x[0]}`;
        if(x[1]) classes+=` col-sm-${x[1]}`;
        if(x[2]) classes+=` col-md-${x[2]}`;
        if(x[3]) classes+=` col-lg-${x[3]}`;

        return classes;
    }
    return {toCssClasses};
}])