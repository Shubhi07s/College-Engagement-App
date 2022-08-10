import mongoose from "mongoose";
import Blog from "../model/Blog";
import User from "../model/User";

/* CONTROLLER TO GET ALL THE BLOGS*/
export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
         blogs = await Blog.find().populate("user");
        // blogs = await Blog.find();
    }
    catch (err) {
        return console.log(err);
    }

    if (!blogs) {
        return res.status(404).json({ message: "No blogs available" });
    }

    return res.status(200).json({ blogs });
}

/* CONTROLLER TO ADD BLOG */

export const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user);
    }
    catch (err) {
        return console.log(err);
    }

    if (!existingUser) {
        return res.status(400).json({message: "Please Sign Up" });
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });

 
    try { //Instead of directly adding blog now we have to add blog to the user as well
        const session = await mongoose.startSession(); 
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: err });
    }

    return res.status(200).json({ blog });

    
}

/* UPDATE BLOG CONTROLLER*/

export const updateBlog = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    }
    
    catch (err) {
        return console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "No Such Blog exists" });
    }

    return res.status(200).json({ blog });

    
}

export const getById = async (req, res, next) => {
    const id= req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    }
    catch (err) {
        console.log(err);
    }

    if (!blog) {
        return res.status(404).json({ message: "No blogs available" });
    }

    return res.status(200).json({ blog });
}

export const deleteBlog = async (req, res, next) => {
    const id= req.params.id;
    let blog;
    try {
        //We need to remove the blog from the users blog as well
        blog = await Blog.findByIdAndRemove(id).populate('user'); // will give ref to user collection
        await blog.user.blogs.pull(blog);
        await blog.user.save(); 
        // blog = await Blog.findByIdAndRemove(id)
       
    }
    catch (err) {
        console.log(err);
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to delete" });
    }

    return res.status(200).json({ message: "Successfully Deleted" });
}


/*  Get all blogs of that particular user*/
export const getByUserId = async (req, res, next) => {
    const userId= req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    }
    catch (err) {
        console.log(err);
    }

    if (!userBlogs) {
        return res.status(404).json({ message: "No blog Found" });
    }

    return res.status(200).json({ user:userBlogs });
}