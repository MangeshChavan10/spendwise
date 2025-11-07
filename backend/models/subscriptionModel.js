const mongoose = require("mongoose");


const subscriptionSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        active:{
            type:Boolean,
            required:true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        }
})


const Subscription = mongoose.model("Subscription",subscriptionSchema);

module.exports = Subscription;

