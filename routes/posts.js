const express = require('express');
const router = express.Router();
const passport = require('passport');

const postsController = require('../controllers/posts_controller');

router.post('/create',passport.checkAuthentication,postsController.create);//this says if user acesses /posts then fetch the data from the controller mentioned in .post function

router.get('/destroy/:id',passport.checkAuthentication,postsController.destroy);//uses string param //now create an del btn in home.ejs file

module.exports = router;