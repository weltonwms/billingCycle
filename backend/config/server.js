const express= require('express');
const server= express();
const bodyParser= require('body-parser');
const cors= require('./cors');
const queryInt= require('express-query-int');

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(queryInt());
server.use(cors)



const port= 3003;
server.listen(port,()=>{
    console.log(`backend rodando na porta ${port}`);
});

module.exports=server;