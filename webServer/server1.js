let PORT = 8081

var express = require('express');

var app = express();

app.get('/', function(req, res) {
    console.log('teste')
})

app.listen(PORT,()=>{console.log(`Servidor web esta na porta ${PORT}`)})