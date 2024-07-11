const express = require('express');
const router = express.Router();

const systemController = require('../controllers/systemController'); 

  router.post('/create',systemController.create);
  router.get('/list',systemController.list);
  router.get('/get/:id',systemController.find);
  router.put('/update/:id',systemController.update);
  router.delete('/delete/:id',systemController.delete);

 module.exports = router;