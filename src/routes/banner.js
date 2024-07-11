const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/bannerController'); 

  router.post('/create',bannerController.create);
  router.get('/list',bannerController.list);
  router.get('/get/:id',bannerController.find);
  router.put('/update/:id',bannerController.update);
  router.delete('/delete/:id',bannerController.delete);
 
 module.exports = router;