module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }
    next();
}
//now require this middleware in index.js and use it below flash