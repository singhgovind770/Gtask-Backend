const express = require('express')
const jwt =  require('jsonwebtoken')
const bodyParser = require('body-parser')

module.exports = function Auth(req,res,next){
    console.log(req.body);
    try{
        const verify = jwt.verify(req.body.token, process.env.SECERET_KEY)
        if(verify){
            next();
        }
    }
    catch(err){
        console.log(err)
        res.header("Access-Control-Allow-Origin", "*");
        res.json({"result":false,"error":err, "message":"jwt token error"})
    }
}