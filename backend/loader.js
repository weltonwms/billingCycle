const server= require('./config/server');
require('./config/database');
const c= require('mongoose');
//console.log(c);
require('./config/routes')(server);
