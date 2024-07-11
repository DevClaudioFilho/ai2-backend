const db = require('../models/config/database');
const SystemBooks = require("../models/systemBooks")

const controller = {}

db.sync()

controller.create = async (req,res) => {
  try {
    let { systemId, booksId } = req.body
    let returnData={
      "NumberOfBooks": 0,
      "insertedBook": []
    }

    for(x=0; x<booksId.length; x++){
      const checkIfExist = await SystemBooks.findOne({ where: { bookId:booksId[x],systemId } })
      if(checkIfExist) {
        const createdItem = await SystemBooks.create({ 
          systemId,
          bookId:booksId[x]
        })
        
        returnData.insertedBook.push(createdItem)
        returnData.NumberOfBooks = returnData.NumberOfBooks + 1
      }
    }

    return res.status(200).json(createdItem)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
}

controller.list = async (req,  res) => {
  try {
    const findAllData = await SystemBooks.findAll()
    
    return res.status(200).json(findAllData)
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

controller.find = async (req,res) => {
  try {
    const { systemId } = req.params
    const checkIfExist = await SystemBooks.findAll({ where: { systemId } })
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
    const checkIfExist = await SystemBooks.findOne({ where: { systemId, booksId } })
    
    if(checkIfExist) {
      await SystemBooks.destroy({ where: { systemId, booksId } })
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
    let { systemId, booksId } = req.body

    const checkIfExist = await SystemBooks.findOne({ where: { systemId } })
    if(checkIfExist) {
      for(x=0; x<booksId.length; x++){
        await SystemBooks.update({ 
          systemId,
          bookId:booksId[x]
        },{ where: { systemId } })
      }
    }
    return res.status(200).json()
  }
  catch(err){
    return res.status(500).json({"msg": err.message})
  }
};

module.exports = controller;