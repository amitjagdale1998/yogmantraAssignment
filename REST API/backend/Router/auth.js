
const jwt= require('jsonwebtoken');
const express = require("express");
const cookieParser=require('cookie-parser');
const router = express.Router();
const cors=require('cors');
require("../connectdb/connectiondb"); //connect to mongodb
const Signup = require("../Model/Signup"); //Signup Schema
const bcrypt=require('bcryptjs');
router.use(cookieParser());
router.use(cors());
const authenticate=require('../middleware/authenticate');



router.post("/register",async (req, res) => {
  const { name, email, password,cpassword } = req.body; //this come from body
  if (!name || !email || !password || !cpassword) {
    return res.status(422).json({ error: "Plz the all filled" });
  }
  //THIS IS using Promises method
//   Signup.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "email already  exist" });
//       }
//       const signup = new Signup({ name, email, password }); //this come from schema

//       signup
//         .save()
//         .then(() => {
//           res.status(201).json({ meassage: "signup successfully" });
//         })
//         .catch(() => res.status(500).json({ error: "some error" }));
//     })
//     .catch((err) => {
//       console.log(err);
//     });
     //This is using async await method
     try
     {
        const  userExist= await Signup.findOne({email:email});
          if(userExist)
          {
            return res.status(422).json({error:"email already exist"});
          }
          if(cpassword!==password)
          {
              return res.status(422).json({error:"passwpord mismatch"})  
          }
        const signup=new Signup({name,email,password,cpassword});
        const signupRegister= await signup.save();
        if(signupRegister)
        {
            res.status(201).json({message:"signup sucessfully"});
        }
     }catch(err)
     {
       console.log(err);
     }


});
//Login Route

router.post("/login",async(req,res)=>
{
    const {email,password}=req.body;
    // console.log("Login data",req.body);
    if ( !email || !password) 
    {
        return res.status(422).json({ error: "Plz the all filled" });
      }
    try
    {
       let token; 
       const userLogin= await Signup.findOne({email:email});//compare email
    //    console.log(userLogin);
       if(!userLogin)
       {
        return res.status(422).json({error:"invalid creditials"});
       }    
       const isMatch =await bcrypt.compare(password,userLogin.password);//compare password by changing increpted format
    //    console.log(isMatch);

    token= await userLogin.generateAuthToken();
    // console.log(token);
    //addinfg token in cookie

     //it mostly use to store token for frontend use 
     //this is cokkies parameter
    res.cookie("jwttoken",token,
    {
        expires:new Date(Date.now()+2592000000),//cookeies and token expire time 
        httpOnly:true,
    });//this is cookie for store token

    // expires:new Date(Date.now()+2592000000),//cookeies and token expire time 
    // httpOnly:true,//allow to cookies can enter browser page by link


       if(!isMatch)
       {
        return res.status(500).json({error:"invalid creditials"});

        
       }
       else
       {
        return res.status(201).json({message:"valid creditials"});
       }

       
    }catch(err)
    {
         console.log(err);
    }
})

//about.get

router.get('/about',authenticate,(req,res)=>
{
  console.log("hello my about");
  console.log(req.rootUser);
  res.send(req.rootUser);
})

module.exports = router;
