import express from "express";
import data from "./data.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
import seedRouter from './routes/seedRoutes.js';
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app=express()


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });


  
app.use(cookieParser())


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use('/api/seed',seedRouter )
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)
















app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})



 const port=process.env.PORT||5000;
 app.listen(port,()=>{
     console.log(`serve at http://localhost:${port}`)
 })