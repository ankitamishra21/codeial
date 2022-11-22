// this route handles when the user selects url/users/profile then it is redirected using this route
const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');//reruire the particular controller file in the corresponding route

router.get('/profile',passport.checkAuthentication,usersController.profile);//we put checkAuthentication here bcz we want to redirect the user to the profile page if the user is authenticated

router.get('/sign-in',usersController.signIn);//get the action for the particular routes from controller

router.get('/sign-up',usersController.signUp);

router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',//the strategy used
    {failureRedirect: '/users/sign-in'},//if failure in authentication redirect back ,if not then next line 
),usersController.createSession);//can take 3 arguments

router.get('/sign-out',usersController.destroySession);

module.exports = router;