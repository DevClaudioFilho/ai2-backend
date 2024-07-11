const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController'); 

router.post('/create',postController.create);
router.get('/list',postController.list);
router.get('/get/:id',postController.find);
router.put('/update/:id',postController.update);
router.delete('/delete/:id',postController.delete);

 module.exports = router;