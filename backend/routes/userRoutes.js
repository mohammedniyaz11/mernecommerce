import  express  from "express";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { genrateToken } from "../utils.js";
import expressAsyncHandler from 'express-async-handler'
import {googleLogin} from '../controller/auth.js'
import userCtrl from "../controller/userCtrl.js";




const userRouter=express.Router();


userRouter.post('/signin',expressAsyncHandler(async(req,res)=>{
  
    const user=await User.findOne({email:req.body.email})
  
    if(user){
       
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user.id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:genrateToken(user)
            });
            return;

        }
    }
    res.status(401).send({message:'Invalid email or password'})

}))




userRouter.post('/signup',expressAsyncHandler(async(req,res)=>{
  
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),

    });
    const user=await newUser.save();
    res.send({
        _id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:genrateToken(user)
    });
    console.log(user)
}))


userRouter.post('/googlelogin',googleLogin)





userRouter.post('/regiester',userCtrl.register)
userRouter.post('/activation/:id',userCtrl.activateEmail)
userRouter.post('/login',userCtrl.login)
userRouter.post('/refresh_token', userCtrl.getAccessToken)
userRouter.post('/forgot',userCtrl.forgotPassword)
userRouter.post('/reset/:id',userCtrl.resetPassword)




















export default userRouter;