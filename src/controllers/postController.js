const db = require('../models/config/database');

const Post = require("../models/post")
const User = require("../models/user")
const controller = {}

controller.create = async (req,res) => {
  try {
    let { title,text,autor,banner_image,userId } = req.body
    
    const createdItem = await Post.create({ 
      title,
      text,
      autor,
      banner_image,
      userId
    })
    
    return res.status(200).json(createdItem)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
}

controller.list = async (req,res) => {
  try {
    const findAllData = await Post.findAll({include:[{model:User,atributes:['name', 'email']}]})
    
    return res.status(200).json(findAllData)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.find = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await Post.findOne({ where: { id },include:[{model:User,atributes:['name', 'email']}]})
    const status = checkIfExist ? 200 : 204

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.update = async (req,res) => {
  try {
    const { id } = req.params
    let { title,text,autor,banner_image } = req.body

    const checkIfExist = await Post.findOne({ where: { id } })
    const status = checkIfExist ? 200 : 204

    await Post.update(
      { 
        title: title!==undefined? title : bookExist.title,
        text: text!==undefined? text : bookExist.text,
        autor: autor!==undefined? autor : bookExist.autor,
        banner_image: banner_image!==undefined? banner_image : bookExist.banner_image,
      },
      {
        where: { id }
      },
    );

    return res.status(status).json()
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.delete = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await Post.findOne({ where: { id }})
    
    if(checkIfExist) {
      await Post.destroy({ where: { id } })
    }
    const status = checkIfExist ? 200 : 204 

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

module.exports = controller;