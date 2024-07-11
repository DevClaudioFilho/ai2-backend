const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController'); 

  router.post('/create',commentController.create);
  router.get('/list',commentController.list);
  router.get('/get/:id',commentController.find);
  router.put('/update/:id',commentController.update);
  router.get('/post/:postId',commentController.findByPostId);
  router.delete('/delete/:id',commentController.delete);

 module.exports = router;