const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController'); 

  router.post('/create',bookController.create);
  router.get('/list',bookController.list);
  router.get('/get/:id',bookController.find);
  router.get('/filter/:systemId',bookController.findBySystem);
  router.put('/update/:id',bookController.update);
  router.delete('/delete/:id',bookController.delete);
 
 module.exports = router;