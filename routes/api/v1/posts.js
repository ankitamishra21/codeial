const express = require('express');//creates another instance of express doesnt take a new space

const router = express.Router();
const passport = require('passport');
//creating the route from the posts_api.js controller
const postsApi = require('../../../controllers/api/v1/posts_api');

router.get('/',postsApi.index);
router.delete('/:id',passport.authenticate('jwt',{session: false}),postsApi.destroy);

module.exports = router;