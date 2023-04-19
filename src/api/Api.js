const express = require('express');
const querystring = require('querystring');
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId; 
const app = express()
const port = 2780;
const dbProduct = require('./connection/connection');
const {ElectroniProduct,ApplicationProduct,FashionProduct,HomeProduct,GroceryProduct,ToyProduct,UserDetails} = require('./connection/schema');
const bodyParser = require('body-parser'); 
app.use(bodyParser.json())
var cors = require('cors');
app.use(cors())


app.listen(port,()=> {
    console.log(`Listen on port ${port}`)
})

app.get("/product",(req,res)=>{
    let {query} = req
    if(query.category=="Electronic"){
        ElectroniProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Application"){
        ApplicationProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Fashion"){
        FashionProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Home"){
        HomeProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Grocery"){
        GroceryProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
    if(query.category=="Toy"){
        ToyProduct.find()
        .then((result)=>{
        res.send(result)
        })
        .catch((err)=>console.log(err))
    }
})

app.get("/product/:category/:id",(req,res)=>{
    let { params } = req
    let { category,id } = params
    let obj_id = new ObjectId(id);
    if(category=="Electronic"){
        ElectroniProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Application"){
        ApplicationProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Fashion"){
        FashionProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Home"){
        HomeProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Grocery"){
        GroceryProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
            .catch((err)=>console.log(err))
    }
    if(category=="Toy"){
        ToyProduct.find({_id:obj_id})
            .then((result)=>{
            res.send(result)
            })
        .catch((err)=>console.log(err))
    }
})
app.post("/register",(req,res)=>{
    let userdata = req.body.body
    if(userdata){
        UserDetails.find({mobNumber: userdata.userMob})
        .then((result) => {
            if(result.length==0){
                UserDetails.find({userEmail:userdata.userEmail})
                        .then((result) => {
                            if(result.length==0){
                                let finalData = {
                                    userName:userdata.userName,
                                    mobNumber:userdata.userMob,
                                    userEmail:userdata.userEmail,
                                    userPass:userdata.userPass,
                                    userFav:[],
                                    userCart:[],
                                    userOrder:[]
                                }
                                const userDetailsFinal = new UserDetails(finalData)
                                userDetailsFinal.save((err)=> {
                                    if(err)
                                        res.send(err)
                                    else
                                        res.send("Regiseter Sucesssfully")
                            })
                            }
                            else
                            res.send("User Email already Registered")
                        })
                }
            else
                res.send("User Mobile number already Registered")
            }
        
        )
        .catch(err => console.log(err))
    
    }
})
app.post("/login",(req,res)=>{
    const loginUser = req.body.body

    const checkPass = (n) => {
        if(n==1)
            UserDetails.find({mobNumber: loginUser.userID,userPass:loginUser.userPass})
            .then(result=> result.length==1 ? res.send({...result,user:true}) : res.send(false))
            .catch(err => res.send(err))
        else
            UserDetails.find({userEmail:loginUser.userID,userPass:loginUser.userPass})
            .then(result=> result.length==1 ? res.send({...result,user:true}) : res.send(false))
            .catch(err => res.send(err))
    }
    if(!isNaN(loginUser.userID)){
            UserDetails.find({mobNumber: loginUser.userID})
            .then((result) => {
                if(result.length==1){
                    checkPass(1)
                }else{
                    res.send("Invalid User")
                }
            })
            .catch(err => res.send(err))
    }else{
        UserDetails.find({userEmail:loginUser.userID})
                .then((result) => {
                    if(result.length==1){
                        checkPass(2)
                    }else{
                        res.send("Invalid User")   
                    }
            })
    }
})
app.get("/login/:id",(req,res)=>{
    let { params } = req
    let { id } = params
    let obj_id = new ObjectId(id)
    UserDetails.find({_id:obj_id})
    .then(result=> res.send({...result,user:true}))
    .catch(err=> res.send(err))

})
app.post("/AddFav/:id/:act",(req,res)=>{
    let { id,act } = req.params
    let product = req.body.body
    let obj_id = new ObjectId(id)
    UserDetails.findById(obj_id,(err,info)=>{
        if(err)
            res.send(err)
        else{
            if(act == "Add"){
                UserDetails.updateOne({_id: info._id},{$push:{userFav:product}},(err, numAffected, rawResponse)=>{
                    if(err)
                        console.log(err)
                    else{
                        if(numAffected.modifiedCount == 1){
                            res.send("Add to wishlist")
                        }
                    }
                })
            }else if(act == "Remove"){
                UserDetails.updateOne({_id: info._id},{$pull:{userFav:{_id: product._id}}},(err, numAffected, rawResponse)=>{
                    if(err)
                        res.send(err)
                    else{
                        if(numAffected.modifiedCount == 1){
                            res.send("Remove From wishlist")
                        }
                    }
                })
            }
        }
    })
})
app.post("/AddCart/:id/:act",(req,res)=>{
    let { id,act } = req.params
    let product = req.body.body
    let obj_id = new ObjectId(id)
    UserDetails.findById(obj_id,(err,info)=>{
        if(err)
            res.send(err)
        else{
            if(act == "Add"){
                let index = info.userCart.findIndex((ele)=> ele._id === product._id)
                if(index == -1)
                    UserDetails.updateOne({_id: info._id},{$push:{userCart:product}},(err, numAffected, rawResponse)=>{
                        if(err)
                            console.log(err)
                        else{
                            if(numAffected.modifiedCount == 1){
                                res.send("Add to Cart")
                            }
                        }
                })
            }else if(act == "Remove"){
                UserDetails.updateOne({_id: info._id},{$pull:{userCart:{_id: product._id}}},(err, numAffected, rawResponse)=>{
                    if(err)
                        res.send(err)
                    else{
                        if(numAffected.modifiedCount == 1){
                            res.send("Remove From Cart")
                        }
                    }
                })
            }
        }
    })
})