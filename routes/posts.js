const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller');

router.get('/posts',postController.post);//this says if user acesses /posts then fetch the data from the controller mentioned in .post function

module.exports = router;