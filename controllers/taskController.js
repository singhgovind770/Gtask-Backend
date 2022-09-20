const taskModel = require("../models/taskModel")

async function create(req, res){
    console.log(req.body)
    await taskModel.create(req.body)
    .then((response)=>{
        res.json({
            "result":true,
            "message":"task created",
            "response":response
        })
    })
    .catch((error)=>{
        res.json({
            "result":false,
            "message":"task is not created",
            "response":error
        })
    })
}

async function update(req, res){
    console.log(req.body)

    try{
        const result = await taskModel.findOneAndUpdate(req.body.filter, req.body.update)
        if(result){
            console.log(result)
            res.json({
                "message":"User Updated!",
                "result":true
            })   
        }
        else
        res.json({
            "message":"Not Updated",
            "result":false
        })
    }
    catch(error){
        res.json({"result":false, "error":error})
    }
}


async function getTasks(req, res){
    const search = {
        "userId":req.body.userId,
        "status":req.body.status
    } 

    console.log(search)
    await taskModel.find(search)
    .then((response)=>{
        res.json({
            "result":true,
            "message":"sucessfully working",
            "response":response
        })
    })
    .catch((error)=>{
        res.json({
            "result":false,
            "message":"not working",
            "response":error
        })
    })
}

async function remove(req, res){
    await taskModel.deleteOne(req.body)
    .then((response)=>{
        res.json({
            "result":true,
            "message":"sucessfully deleted",
            "response":response
        })
    })
    .catch((error)=>{
        res.json({
            "result":false,
            "message":"not working",
            "response":error
        })
    })
}

module.exports  = {create, getTasks, remove, update}