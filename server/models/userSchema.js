const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema({
    "fullname"  : String,
    "nickname"  : String,
    "email"     : String,
    "phone"     : Number
})

const Users = mongoose.model('users', userSchema)

exports.default = Users