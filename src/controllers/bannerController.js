const db = require('../models/config/database');
const Banner = require("../models/banner")

const controller = {}

controller.create = async (req,res) => {
  try {
    let { img_url,img_alt,title,message} = req.body
  
    const createdItem = await Banner.create({
      img_url,
      img_alt,
      title,
      message
    })

    return res.status(200).json(createdItem)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
}

controller.list = async (req,  res) => {
  try {
    const findAllData = await Banner.findAll()
    
    return res.status(200).json(findAllData)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.find = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await Banner.findOne({ where: { id } })
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
    const checkIfExist = await Banner.findOne({ where: { id } })
    
    if(checkIfExist) {
      await Banner.destroy({ where: { id } })
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
    const { img_url,img_alt,title,message } = req.body

    const bannerExist = await Banner.findOne({ where: { id } })

    await Banner.update(
      { 
        title: title!==undefined? title : bannerExist.title,
        img_url: img_url!==undefined? img_url : bannerExist.img_url,
        img_alt: img_alt!==undefined? img_alt : bannerExist.img_alt,
        message: message!==undefined? message : bannerExist.message
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