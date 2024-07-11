const db = require('../models/config/database');
const Book = require("../models/book")

const controller = {}

db.sync()

controller.create = async (req,res) => {
  try {
    let { title,short_description,description,banner_image,link_url,systemId } = req.body
  
    const createdItem = await Book.create({ 
      title,
      short_description,
      description,
      banner_image,
      link_url,
      systemId
    })

    return res.status(200).json(createdItem)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
}

controller.list = async (req,  res) => {
  try {
    const findAllData = await Book.findAll()
    
    return res.status(200).json(findAllData)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.find = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await Book.findOne({ where: { id } })
    const status = checkIfExist ? 200 : 204

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.findBySystem = async (req,res) => {
  try {
    const { systemId } = req.params
    const checkIfExist = await Book.findAll({ where: { systemId } })
    const status = checkIfExist ? 200 : 204

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.delete = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await Book.findOne({ where: { id } })
    
    if(checkIfExist) {
      await Book.destroy({ where: { id } })
    }
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
    const { title,short_description,description,banner_image,link_url,systemId } = req.body

    const bookExist = await Book.findOne({ where: { id } })

    await Book.update(
      { 
        title: title!==undefined? title : bookExist.title,
        short_description: short_description!==undefined? short_description : bookExist.short_description,
        description: description!==undefined? description : bookExist.description,
        banner_image: banner_image!==undefined? banner_image : bookExist.banner_image,
        link_url : link_url!==undefined? link_url : bookExist.link_url,
        systemId: systemId!==undefined? systemId : bookExist.systemId
      },
      {
        where: { id }
      },
    );

    return res.status(200).json()
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

module.exports = controller;