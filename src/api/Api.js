const express = require('express');
const querystring = require('querystring');
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId; 
const app = express()
const port = 2780;
const dbProduct = require('./connection/connection');
const {ElectroniProduct,ApplicationProduct,FashionProduct,HomeProduct,GroceryProduct,ToyProduct} = require('./connection/schema');
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
    if(query.category=="Mobile"){
        ElectroniProduct.find({type:"Phone"})
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
