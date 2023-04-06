const express=require('express');
const cors=require('cors');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv=require('dotenv');
dotenv.config();
const app=express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());//this is work as middleware to convert data in json format //position is important
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false }
    }));
    require('./connectdb/connectiondb');//connect to mongodb 
app.use(require('./Router/auth'))//connect to router //position is important

app.get("/",(req,res)=>
{
    res.send("get method called");
});
app.get("/signup",(req,res)=>
{
    res.send("signup called");
})


app.listen(5000,()=>
{
    console.log("server started sucessfully");
})