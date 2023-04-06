const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')

const signupSchema=new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email:
        {
          type:String,
          required:true,

        },
        password:
        {
            type:String,
            required:true,
        },
        cpassword:
        {
            type:String,
            required:true,
        },
        tokens:
           [
            {
                token:
                {
                    type:String,
                    required:true
                }

            }
           ]

        
    }
)

 //password hashing
signupSchema.pre('save',async function(next)
{
    
    if(this.isModified('password'))
    
    {
        
    this.password=bcrypt.hashSync(this.password,12);
    this.cpassword=bcrypt.hashSync(this.cpassword,12);
    console.log(this.password);
    }
    next();
})

//we are generateing token
signupSchema.methods.generateAuthToken=async function ()//here methods use to insert data in schema
{
    try{
         let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);//{_id:this._id} this parameter always use any unic value of the schema to compare
        this.tokens=this.tokens.concat({token:token});//create token schema in signup form 
        await this.save();
        return token;
    } catch(err)
    {
     console.log(err);
    }
}

const Signup=mongoose.model("SIGNUP",signupSchema);//this positon important alway write after password hashing
module.exports=Signup;