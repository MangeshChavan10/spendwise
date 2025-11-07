const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "An email is required"],
    unique: true,
    lowercase:true
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: 8,
    maxlength: 20,
  },
});


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});


userSchema.methods.correctPassword = async function (candidate, hashed) {
  return await bcrypt.compare(candidate, hashed);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
