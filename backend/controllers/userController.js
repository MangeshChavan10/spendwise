const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 


exports.signUp = async(req,res)=>{
     try{
        console.log("Request body:", req.body);
        const {email,password} = req.body;
        const existingUser = await User.findOne({email}).select("-password");

        if(existingUser){
            return res.status(409).json({
                status:"fail",
                msg:"Email already exists"
            })
        }
        
        const newUser = await User.create({
            email,
            password
        })

        const token = jwt.sign({
            id:newUser._id,
            email:newUser.email
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"})

        res.status(201).json({
            status:"success",
            token
        })

    }catch(err){
        res.status(500).json({
        status:"fail",
        msg:err.message
        })
    }
} 

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ 
        status:"fail",
        msg: "User not found" 
    });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ 
        status:"fail",
        msg: "Invalid credentials"
     });
    }

    const token = jwt.sign({ 
        id: user._id, 
        email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" });

    res.status(200).json({
      status: "success",
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ 
        status:"fail",
        msg: err.message 
    });
  }
};


exports.getUserProfile = async (req,res) =>{
    try{
        const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({
            status:"fail",
            msg:"User not found"
        })
    }
    res.status(200).json({
        status:"success",
        data:{
            id: user._id,
            email: user.email,
            password: user.password
        }
    })
}catch(err){
    res.status(500).json({
        status:"fail",
        msg:err.message
    })
}

}


exports.updateUser = async(req,res) =>{
    try{
        const {currentPassword,newPassword} = req.body;
        const user = await User.findById(req.user.id);
        console.log(req.user.id)
        if(!user){
            return res.status(404).json({
                status:"fail",
                msg:"User not found"
            })
        }
        const MatchPassword = await bcrypt.compare(currentPassword,user.password);
        if(!MatchPassword){
            return res.status(404).json({
                status:"fail",
                msg:"Password is Incorrect"
            })
        }
        const updates = {};
        if(newPassword) updates.password = newPassword;
        await User.findByIdAndUpdate(user._id,updates,{new:true})

        res.status(201).json({
            status:"success",
            msg:"User updated successfully"
        })

    }catch(err){
        console.log(err.message);
        res.status(500).json({
        status:"fail",
        msg:err.message
        
        })
    }
}


exports.deleteUser = async (req,res) =>{
     try{
        const userId = req.user.id;
        await User.findByIdAndDelete(userId);
        

        res.status(201).json({
            status:"success",
            msg:"User deleted successfully"
        })

    }catch(err){
        res.status(500).json({
        status:"fail",
        msg:err.message
        })
    }
    
    
}





