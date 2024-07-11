const express = require('express');
const router = express.Router();

const bookSystemController = require('../controllers/bookSystemController'); 

  router.post('/create',bookSystemController.create);
  router.get('/list',bookSystemController.list);
  router.get('/get/:id',bookSystemController.find);
  router.put('/update/:id',bookSystemController.update);
  router.post('/delete/:id',bookSystemController.delete);
 
 module.exports = router;