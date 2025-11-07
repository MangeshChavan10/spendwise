const validator = require("validator");


function emailValidator(req,res,next){
    const email = req.body.email;
    if(!email || !validator.isEmail(String(email).trim(),{allow_utf8_local_part:true})){
            return res.status(400).json({
                error:"Invalid Email"
            })
    }

    email = validator.normalizeEmail(String(email).trim(),{gmail_remove_dots:true});
    next();
}


module.exports = emailValidator;