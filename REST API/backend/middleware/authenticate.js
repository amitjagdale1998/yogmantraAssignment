const jwt=require('jsonwebtoken');
// const Signup=require('../Model/signup/userSchema');
const Signup = require("../Model/Signup");
const Authenticate = async(req,res,next) => {
  try{
      console.log(" all cookies",req.cookies);
    const token=req.cookies.jwttoken;
    const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
    const rootUser=await Signup.findOne({_id:verifyToken._id,"tokens.token":token});
    if(!rootUser)
    {
      throw new Error('user not found');
    }

    req.token=token;
    req.rootUser=rootUser;
    req.userID=rootUser._id;
    //show on console
    next();
  }catch(err)
  {
    res.status(401).send("unauthorised:No token provided ");
    console.log(err);
  }
}

module.exports=Authenticate;