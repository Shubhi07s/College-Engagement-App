import express from 'express';

import { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } from '../controllers/blog-controller';


const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);
blogRouter.get("/:id", getById); //get by blog id
blogRouter.delete("/:id", deleteBlog);
blogRouter.get("/user/:id", getByUserId); //get by user id
export default blogRouter;