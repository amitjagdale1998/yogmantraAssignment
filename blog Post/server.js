const express=require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');

const cors=require('cors');
const dotenv=require("dotenv");
dotenv.config();
const PORT= 5000 || process.env.PORT
const app=express();
app.use(cors());
app.use(bodyParser.json());
connectiondb=mongoose.connect(process.env.CONNECTION_STRING,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log("connection sucessfull")).catch((err)=>console.log(err));

const Blog=require('./Model/blogSchema');


app.post("/blog",async(req,res)=>
{
    console.log(req.body);
    try{

        const {title ,author,content,publish}=req.body;

        if(!title ||  !content )
        {
            res.status(400).json({error:" *  title and content"})
        }
        const blog=new Blog({title ,author,content,publish});
      const blogdata=await blog.save();
      if(blogdata)
      {
        res.status(200).json({message:"data save sucessfully"})
        console.log("data save suceessfully");
      }


    }catch(err)
    {
        console.log(err);
    }
  

})


app.get("/",(req,res)=>
{
    res.send("get method called");
})


app.listen(PORT,()=>
{
    console.log(`server started ${PORT}`)
    
    
    
}
)

    





