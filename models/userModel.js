const mongoose = require('mongoose')
const userModel = new mongoose.Schema({
        name:{
            type:String,
            required:true
        },
        mobNumber:{
            type:Number,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        }
})

const user = mongoose.model("gtaskusers", userModel)
module.exports = user
