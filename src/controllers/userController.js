const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const db = require('../models/config/database');
const config = require('../config');
const controllers = {}

db.sync()

controllers.list = async (req, res) => {
  const data = await User.findAll()
    .then(function(data){
      return data;
    })
    .catch(error => {
      return error;
    }); 
  
  res.json(
    {
      success: true,
      data: data
    }
  )  
}

controllers.register = async (req,res) => {
  const { name, email, password } = req.body;
  const data = await User.create({
    name: name,
    email: email,
    password: password
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    console.log("Erro: "+error);
    return error;
  })

  res.status(200).json({
    success: true,
    message:"Registado",
    data: data
  });
}
   
controllers.login = async (req,res) => {
  if (req.body.email && req.body.password) {
    var email = req.body.email;
    var password = req.body.password;
  }

  var user = await User.findOne({where: { email: email}})
    .then(function(data){
      return data;
    })
    .catch(error =>{
      console.log("Erro: "+error);
      return error;
    })

  if (password === null || typeof password === "undefined") { 
    res.status(403).json({
      success: false,
      message: 'Campos em Branco'
    })
  } 
  else {
    if (req.body.email && req.body.password && user) {
      const isMatch = bcrypt.compareSync(password, user.password);

      if (req.body.email === user.email && isMatch) {
        let token = jwt.sign(
          {email: req.body.email}, 
          config.jwtSecret,
          {expiresIn: '1h' }
        );

        res.json({
          success: true, 
          message: 'Autenticação realizada com  sucesso!', 
          token: token
        });
      } 
      else {
        res.status(403).json({
          success: false, 
          message: 'Dados de autenticação inválidos.'
        });
      }
    }
    else {
      res.status(400).json({
        success: false, 
        message: 'Erro no processo de autenticação. Tente de novo mais tarde.'
      });
    }
  }} 
  
module.exports = controllers;