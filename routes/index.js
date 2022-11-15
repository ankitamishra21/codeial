//the routes folder includes the different  routes or pages the website has an redirects to other routes
// main route to handle the other routes
const express = require('express');//creates another instance of express doesnt take a new space

const router = express.Router();
console.log('router loaded');
// requiring the home controller function from controllers for this corresponding route
const homeController = require('../controllers/home_controller')//assigning it to a local variable which will then be used to get

// like app.get we do in the main index.js ..we make routes file to distribute the code where the function is obtained from the controllers folder
router.get('/',homeController.home)//var homeController dot the module that is being exported from controller

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));




module.exports = router;