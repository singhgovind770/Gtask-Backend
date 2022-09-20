const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const bodyParser = require('body-parser')
const user = require('./routes/user')
const task = require('./routes/task')
const mongoose =  require('mongoose')
require('dotenv').config();
const cors = require('cors')

var corsOptions = {
    origin:'*',
    optionsSuccessStatus: 200,
  }

app.use(cors(corsOptions))

app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
})

mongoose.connect(process.env.DB_URL)
        .then((result)=>console.log(`database connected`))
        .catch((err)=>console.log(err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/user',user)
app.use('/task',task)

app.get('/',(req, res)=>{
    res.json({
        "status":true,
        "message":"it's working"
    })
})

app.get('*',(req, res)=>{
    res.json({
        "status":false,
        "message":"not found"
    })
})