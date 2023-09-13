//version one's index route
const express = require('express');//creates another instance of express doesnt take a new space

const router = express.Router();

router.use('/posts',require('./posts'));//acessing the posts.js route in this main index.js route of v1
router.use('/users',require('./users'));

module.exports = router;