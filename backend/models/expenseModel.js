const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Expense title is required"],
      trim: true,
    },
    category: {
      type: String,
      default: "Other",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    paymentMode: {
      type: String,
      enum: ["Cash", "Card", "UPI", "NetBanking", "Other"],
      default: "Cash",
    },
    type:{
      type:String,
      enum:["debited","credited"],
      lowercase:true,
      required:true
    },
    date: {
      type: Date,
      default: Date.now,
    },
    note: {
      type: String,
      trim: true,
      maxlength: 200,
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Expense", expenseSchema);
