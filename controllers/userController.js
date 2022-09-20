const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


async function login(req, res){
    console.log(req.body.mobNumber)
    try {
        const signIn = await userModel.findOne({ "mobNumber": req.body.mobNumber })

        if (!signIn) {
            res.json({ "message": "User Not found", "result": false })
        }
        else {

            //Checking Password is equal to the hash password or not
            await bcrypt.compare(req.body.password.toString(), signIn.password.toString()).then((result) => {

                if (result) {

                    //Creating Jwt token 
                    const Token = jwt.sign({ id: signIn._id }, process.env.SECERET_KEY)
                    res.json({
                        "message": "You Have Successfully Logged In!",
                        "result": true,
                        "token": Token,
                        "name": signIn.name,
                        "id": signIn._id
                    })

                }

                else {
                    res.json({
                        "message": "Unable to login, Invalid Password",
                        "result": false
                    })

                }
            })
        }
    }
    catch (err) {
        console.log(err)
        res.json({
            "result":false,
            "message":"something went wrong!",
            "error":err
            })    
    }
}

async function register(req, res){
    await userModel.findOne({ "mobNumber": req.body.mobNumber })
    .then(async function (Res) {
      if (Res == null) {
            let data = req.body
            const saltRounds = 10;

            //Creating password hash
            await bcrypt.hash(data.password.toString(), saltRounds, async function (err, hash) {
                if (err) {
                    res.json({"status":false, error: err, "message":"something went wrong!"})
                    return
                }

                data.password = hash

                await userModel.create(data)
                    .then(function (Res) { 

                        //Creating Jwt for authentication
                        const Token = jwt.sign({ id: Res._id }, process.env.SECERET_KEY)
                        res.json({
                            "result": true,
                            "message": 'Congratulations! Your Account is Created ',
                            "name": Res.name,
                            "id":Res._id,
                            "token": Token,
                        })
                    }

                    )
                    .catch(function (error) {
                        console.log(error)
                        res.json({
                            "result": 'false',
                            "message": "Oops! Error Occured",
                            "error": error
                        })
                    })
            })
        }
    else
        res.json({
            "status":true,
            "message": 'Your Account is Already Exist',
        })

    }).catch((err)=>{       
        res.json({
            "status":false,
            "message":"something went wrong!",
            "error":err
        })
    })
}


//it is used to check user is already logged In or Not
function verify(req, res){
    try{
        const verify = jwt.verify(req.body.token, process.env.SECERET_KEY)
        if(verify){
            
            res.json({
                "message":"You Have Successfully Logged In!",
                "result":true,
                "id":verify.id
            })  
        }
    }
    catch(err){
        console.log(err)
        res.json({"error":err, "message":"Something Went Wrong", "Result":false})
    }
}

module.exports  = {login,register,verify}