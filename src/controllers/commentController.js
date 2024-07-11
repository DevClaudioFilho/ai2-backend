const db = require('../models/config/database');

const Comment = require("../models/comment");
const Post = require('../models/post');
const User = require('../models/user');

const controller = {}

db.sync()

controller.create = async (req,res) => {
  try {
    let { comment,postId,userId } = req.body
    
    const createdItem = await Comment.create({ comment, postId, userId})
    
    return res.status(200).json(createdItem)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
}

controller.list = async (req,res) => {
  try {
    const findAllData = await Comment.findAll()
    
    return res.status(200).json(findAllData)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.find = async (req,res) => {
  try {
    const { id } = req.params
    const checkIfExist = await Comment.findOne({ where: { id }})
    const status = checkIfExist ? 200 : 204

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.findByPostId = async (req,res) => {
  try {
    const { postId } = req.params
    const checkIfExist = await Comment.findAll({ where: {postId},include:[ 
      {      
        model: User, 
        as:'users'
      }, 
      {
        model: Post, 
        as:'posts'
      }]})
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
    let { comment,postId,userId } = req.body

    const checkIfExist = await Comment.findOne({ where: { id } })
    const status = checkIfExist ? 200 : 204

    await Comment.update(
      { 
        comment: comment!==undefined? comment : bookExist.comment,
        postId: postId!==undefined? postId : bookExist.postId,
        userId: userId!==undefined? userId : bookExist.userId,
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
    const checkIfExist = await Comment.findOne({ where: { id }})
    
    if(checkIfExist) {
      await Comment.destroy({ where: { id } })
    }
    const status = checkIfExist ? 200 : 204 

    return res.status(status).json(checkIfExist)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

module.exports = controller;