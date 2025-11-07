const Subscription = require("../models/subscriptionModel");


exports.addSubscription = async(req,res) =>{
    const {title, active} = req.body;
    
    if(!title) {
        return res.status(400).json({
            message:"Title is required"
        })
    }
     
    await Subscription.create({
        title,
        active: active !== undefined ? active : true, 
        userId: req.user.id
    });

    res.status(200).json({
        message:"Added this Subscription"
    })
}


exports.getSubscription = async (req,res)=>{
    const id = req.user.id;
    const subscriptions = await Subscription.find({ userId: id });

    res.status(200).json({
        data:subscriptions
    })
}

exports.deleteSubscription = async (req,res) =>{
    const id = req.user._id;
     await Subscription.deleteMany({userId:id});

     res.status(200).json({
        message:"Subscription deleted"
     })
}