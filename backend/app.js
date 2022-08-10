import express from 'express';
import mongoose from 'mongoose';
import userRouter from "./routes/user-routes";
import blogRouter from "./routes/blog-routes";
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json()); //parse all data in json format
app.use("/api/user",userRouter);
app.use("/api/blog", blogRouter);

mongoose.connect(

    "mongodb://shubhi07:shubhi@cluster0-shard-00-00.o3iwe.mongodb.net:27017,cluster0-shard-00-01.o3iwe.mongodb.net:27017,cluster0-shard-00-02.o3iwe.mongodb.net:27017/?ssl=true&replicaSet=atlas-j5p6e6-shard-0&authSource=admin&retryWrites=true&w=majority"
)
    .then( () => app.listen(5000) )
    .then( () => console.log("Connected to Database and listening to PORT 5000") )
    .catch( (err) => console.log(err) );


