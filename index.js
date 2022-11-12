const express = require('express');
const app = express();
const port = 8000;

app.listen(port,function(err){
    if (err){
        console.log("error",err);
        console.log(`erroe in running the server ${err}`);//interpolation method to fetch the variable 
    }
    console.log(`Server is up and running on ${port}`);//represented by ` tick and ${}
})