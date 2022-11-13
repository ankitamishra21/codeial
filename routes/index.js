//the routes folder includes the different  routes or pages the website has 
const express = require('express');

const router = express.Router();
// requiring the home controller function from controllers
const homeController = require('../controllers/home_controller')

console.log('router loaded');

// like app.get we do in the main index.js ..me make routes file to distribute the code where the function is obtained from the controllers folder
router.get('/',homeController.home)//var homeController dot the module that is being exported from controller

module.exports = router;