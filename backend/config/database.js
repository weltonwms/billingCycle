const mongoose= require('mongoose');

mongoose.connect("mongodb://localhost/db_finance",{useMongoClient:true});

mongoose.Error.messages.general.required="O atributo '{PATH}' é obrigatório";
mongoose.Error.messages.Number.min= "({VALUE}) é menor que o mínimo permitido {MIN} ";
mongoose.Error.messages.Number.max="({VALUE}) é maior que o máximo permitido {MAX}";
mongoose.Error.messages.String.enum="({VALUE}) não é válido para o atributo {PATH}";