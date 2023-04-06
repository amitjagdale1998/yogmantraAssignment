// //Implement a MongoDB schema for a blog post that includes fields for the title, author,
// content, and publication date of the post. The schema should also include validation to
// ensure that the title and content fields are not empty
const mongoose=require('mongoose');

const blogSchema= new mongoose.Schema(
    {
        title:
        {
            type:String,
            unique:true,
            required:true,

        },
        author:
        {
            type:String,
           
        },
        content:
        {
            type:String,
         required:true
        },
        publish:
        {
            type:Date,
        }
    }
)
const Blog=mongoose.model('BLOG',blogSchema);
module.exports=Blog;