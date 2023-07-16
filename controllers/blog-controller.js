import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find().populate("user");
    }catch (err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({blogs})
};

export const addBlog = async(req,res,next) =>{
    const {location,description,image,user,cost,places_to_visit} = req.body;

    var existingUser;
    try{
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err)
    }
    if (!existingUser){
        return res.status(400).json({message: "Unable To Find User By ID"})
    }
    const blog = new Blog({
        location,
        description,
        image,
        user,
        cost,
        places_to_visit,
    });
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch (err){
        console.log(err);
        return res.status(500).json({message: err});
    }

    return res.status(200).json({blog})
};

export const  updateBlog = async(req,res,next) =>{
    const {location,description,cost,places_to_visit} = req.body;
    const blogId = req.params.id;
    let blog;
    try{ 
        blog = await Blog.findByIdAndUpdate(blogId, {  
            location,
            description,
            cost,
            places_to_visit
    })
    } catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message: "Unable To Update The Blog"})
    }
    return res.status(200).json({blog});
};
export const getById = async(req,res,next) => {
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message: "No Blog Found"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    try {
        const blog = await Blog.findByIdAndRemove(id).populate('user');
        if (!blog) {
        return res.status(500).json({ message: "Unable to delete" });
    }
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).json({ message: "Successfully deleted" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occurred" });
    }
};
export const getByUserId = async(req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (err) {
        return console.log(err)
    }
    if (!userBlogs) {
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blogs:userBlogs})
}