const express=require('express');
const mongoose=require('mongoose')
require("dotenv").config;

const connectiondb=mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection sucessfull")).catch((err)=>console.log(err));

module.exports=connectiondb;