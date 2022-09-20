const mongoose  = require('mongoose')

const taskModel =  new mongoose.Schema({
      userId:{
        type:String,
        required:true
      },

      status:{
        type:String, // planned, ongoing, completed
        required:true
      },

      title:{
        type:String,
        required:true
      },

      description:{
        type:String,
        required:true
      },

      createdAt:{
        type:Date,
        default: new Date()
      },
})

const task = mongoose.model('Tasks', taskModel)
module.exports  = task