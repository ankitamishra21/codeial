// install express and then require it
const express = require('express');
const cookieParser = require('cookie-parser')//npm install cookie-parser then require it
const app = express();
const port = 8000;
// npm install express-ejs-layouts
// require ejs-layouts before routes as the routes are going to need the layouts to display
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')
//middlewares
app.use(express.urlencoded({extended: true}));//to read the post requests

app.use(cookieParser());//now tell the middleware to use the cookie parser

app.use(expresslayouts);


app.use(express.static('./assets'));

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes'));

// install ejs and set up view engine
app.set("view engine",'ejs');
app.set('views','./views')//it is saying to fetch the views folder from parallel path

app.listen(port,function(err){
    if (err){
        console.log("error",err);
        console.log(`erroe in running the server ${err}`);//interpolation method to fetch the variable 
    }
    console.log(`Server is up and running on ${port}`);//represented by ` tick and ${}
})