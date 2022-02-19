const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  fullname: String,
  nickname: String,
  email: String,
  password: String,
  phone: Number,
  verifiedStatus: String,
  verifiedToken: String,
});

const Users = mongoose.model("users", userSchema);

exports.default = Users;
