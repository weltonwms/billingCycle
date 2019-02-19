const BillingCycle= require('./billingCycle');
const _= require('lodash');

BillingCycle.methods(['get','post','put','delete']);
BillingCycle.updateOptions({new:true, runValidators:true});

BillingCycle.after('post', sendErrorsOrNext).after('put',sendErrorsOrNext)

function sendErrorsOrNext(req, res, next){
    const bundle= res.locals.bundle;
   if(bundle.errors){
        const errors= parseError(bundle.errors);
        res.status(500).json({errors});
   }
   else{
       next();
   }
}

function parseError(errorRestful){
    const errors= [];
    _.forIn(errorRestful,(erro)=>{errors.push(erro.message)})
    return errors;
}

BillingCycle.route('count',(req, res, next)=>{
    BillingCycle.count((err,value)=>{
        if(err){
            res.status(500).json({errors:[err]});
        }
        else{
            res.status(200).json({value});
        }
    })
})

module.exports= BillingCycle;