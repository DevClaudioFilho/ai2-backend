const db = require('../models/config/database');

const System = require("../models/system")
const Book = require("../models/book")

const controller = {}

db.sync()

controller.create = async (req,res) => {
  try {
    let { title,short_description,description,banner_image,how_play_text,video_url } = req.body
    
    const createdItem = await System.create({ 
      title,
      short_description,
      description,
      banner_image,
      how_play_text,
      video_url 
    })
    
    return res.status(200).json(createdItem)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
}

controller.list = async (req,res) => {
  try {
    const findAllData = await System.findAll()
    
    return res.status(200).json(findAllData)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.find = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await System.findOne({ where: { id }})
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
    let { title,short_description,description,banner_image,how_play_text,video_url } = req.body

    const checkIfExist = await System.findOne({ where: { id } })
    const status = checkIfExist ? 200 : 204

    await System.update(
      { 
        title: title!==undefined? title : bookExist.title,
        short_description: short_description!==undefined? short_description : bookExist.short_description,
        description: description!==undefined? description : bookExist.description,
        banner_image: banner_image!==undefined? banner_image : bookExist.banner_image,
        how_play_text : how_play_text!==undefined? how_play_text : bookExist.how_play_text,
        video_url : video_url!==undefined? video_url : bookExist.video_url
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
    const checkIfExist = await System.findOne({ where: { id }})
    
    if(checkIfExist) {
      await System.destroy({ where: { id } })
    }
    const status = checkIfExist ? 200 : 204 

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

module.exports = controller;