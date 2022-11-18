// this route handles when the user selects url/users/profile then it is redirected using this route
const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');//reruire the particular controller file in the corresponding route

router.get('/profile',usersController.profile);

router.get('/sign-in',usersController.signIn);//get the action for the particular routes from controller

router.get('/sign-up',usersController.signUp);

router.post('/create', usersController.create);
module.exports = router;