const mongoose = require("mongoose")
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'));
const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    }

})
const User = mongoose.model("User",userSchema)
module.exports = {User};