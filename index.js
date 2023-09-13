// install express and then require it
const express = require('express');
const cookieParser = require('cookie-parser')//npm install cookie-parser then require it
const app = express();
const port = 8000;
// npm install express-ejs-layouts
// require ejs-layouts before routes as the routes are going to need the layouts to display
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose')

//npm install express-session-->which stores the session details from passport authentication
const session = require('express-session'); //used for session cookie
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')//requiringg the passport authentication code file
//npm install passport-jwt
const passportJWT = require('./config/passport-jwt-strategy');
//npm install passport-google-oauth
const passportGoogle = require('./config/passport-google-oauth2-strategy');

//npm install connect-mongo..and then require
const MongoStore = require('connect-mongo')//unlike other libraries this requires a argument(the express session-bcz we need to store the session info in the database)
//mongo store is used to store the sessions cookie in the db
//npm install node-sass-middleware
const sassMiddleware = require('node-sass-middleware');
//npm install connect-flash(for flash msgs)
const flash = require('connect-flash')//after requiring set it up to be used after express session passport session
const customMware = require('./config/middleware');




//middlewares
app.use(sassMiddleware({
    src: './assets/scss', //this src is from where you will pick scss file to convert to css
    dest: './assets/css', //this is where i need to put the css files
    debug: true,//if i want to display the err..false would be used during production
    outputStyle: 'extended',//want it in single line or multiple lines
    prefix: '/css' //where should it look
}));

app.use(express.urlencoded({extended: true}));//to read the post requests

app.use(cookieParser());//now tell the middleware to use the cookie parser

app.use(expresslayouts);

app.use(express.static('./assets'));
//make the uploads path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// install ejs and set up view engine
app.set("view engine",'ejs');
app.set('views','./views')//it is saying to fetch the views folder from parallel path

//add a middleware which takes in that session cookie and encrypts it
app.use(session({//using the express-session
    name: 'codeial',//name of the project
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//whn the usr hasnt logged ina nd the identity isnt initialised in that case if we dont want to store extra data in the session cookie then set it false
    resave: false,//when user logged in and some data is present in the session cookie and you dont want to re write it i.e save it again and again then set it false
    cookie: {
        maxAge:(1000 * 60 * 100)//the time you want the session to last
    },
    store: MongoStore.create({//creating new instance of mongo store        
            // mongooseConnection: db,//the db from mongoose.js file which stores the mongoose connection
            mongoUrl : 'mongodb://localhost/codeial_development',
            
            autoRemove: 'disabled'       
        },//now call back func incase connection is not established
        function(err){
            console.log(err || 'connect -mongodb setup ok');
        }
    
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);//from passport-local-strategy file<-config//this function gets called automatically as a middleware

app.use(flash());//this uses session cookies cause it will store the flash msgs in the cookie which stores session
app.use(customMware.setFlash);//now include this to the ejs file in layout.ejs

// use express router
app.use('/',require('./routes'));

app.listen(port,function(err){
    if (err){
        console.log("error",err);
        console.log(`erroe in running the server ${err}`);//interpolation method to fetch the variable 
    }
    console.log(`Server is up and running on ${port}`);//represented by ` tick and ${}
})