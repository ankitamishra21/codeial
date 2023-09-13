//route index for api routes

const express = require('express');//creates another instance of express doesnt take a new space

const router = express.Router();
//defining v1 to be used
router.use('/v1',require('./v1'));
module.exports = router;