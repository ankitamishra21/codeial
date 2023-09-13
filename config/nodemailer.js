const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')

//this is part which defines how the communivcation is goung to take place(part that sends email)
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',//gmail created this domain for us to interact with gmail as user
    port: 587,
    secure: false,
    auth: {//estb the identity
        user: 'ankitaarunmishra@gmail.com',
        pass: 'aeqslfyykltbxjuk'
    }
});


let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
         if (err){console.log('error in rendering template',err); return}
         
         mailHTML = template;
        }
    )

    return mailHTML;
}


module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}