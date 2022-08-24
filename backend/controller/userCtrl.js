
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from "../models/userModel.js";
import { genrateToken } from "../utils.js";
import nodemailer from 'nodemailer'
const {CLIENT_URL} = 'http://localhost:3000'
import sendEmail from '../sendMail.js';
import sendMail from '../sendEmail.js'
const  main=async(to,url,text)=> {
    console.log(to,"==================")
    console.log(url)
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'sendapimail11@gmail.com', // generated ethereal user
        pass:'yvoexclzqmtwbaeh', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'sendapimail11@gmail.com', // sender address
      to: `${to}`, // list of receivers
      subject: `welcome to amazona`, // Subject line
      text: "hello ", // plain text body
      html:  `
      <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
      <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Amazona <br> your otp is......</h2>
      <div><h1>${text}<h1><div>
      <p>Congratulations! You're almost set to start using AMAZONA.
          Just click the button below to validate your email address.
      </p>
      
      <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">verify you email</a>
  
      <p>If the button doesn't work for any reason, you can also click on the link below:</p>
  
      <div>${url}</div>
      </div>
  `, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }






const userCtrl={
    register:async(req,res)=>{
        try{
            const user=await User.findOne({email:req.body.email})
            const{name,email,password}=req.body;
            
    
         if(!name||!email||!password){
             res.json("fill all the form")
         }
         
         else if(!validateEmail(email)){
             res.status(400).json({msg:"write email correctly "})
         }
         
         
         else if(user){
           return  res.sataus(400).send({msg:"the user alredy presnt it invalid email"})

            
         }else if(password.length<6){
             res.json({msg:"password length is is less then 6 letter"})

         }else{
           
         
          const newUser={
              name,email,password
          }
          console.log(password,"passsword")
        //   const activation_token=createActivationToken(newUser)
        //   console.log(activation_token,'+++++++++++++++++++')
        const otp=1234
          const token=jwt.sign({name:name,email:email,password:password,otp:otp},'secret', {expiresIn: '50m'})
          console.log(token)
          const yes=jwt.verify(token,'secret')
          console.log(yes,"=======yes")
          const url = `http://localhost:3000/user/activate/${token}`
          console.log(url)
          main(email, url,`your ${otp} is=======`)
          console.log(sendEmail)
           
    
    

       
          res.json({msg:"regiester Sucess! please activate the email to start."})


         }

           

        }catch(err){
            return res.status(500).json("server error")
        }
    },
    activateEmail:async(req,res)=>{
        try{
            console.log(req.params.id)
            const activation_token=req.params.id;
            console.log(activation_token,"===================")
        
            
        
            const token="1234"
            const yes=jwt.verify(activation_token,'secret')
            console.log("hi========================",yes)
            
         
          
           
          
            const{name,email,password,otp}=yes;
            console.log(yes.name)
            console.log(yes.otp)
            const otpconfirm=yes.otp
            console.log(yes.password,"password is equal toooooo")

            const check=await User.findOne({email})
            if(check){
                return res.status(400).json({msg:"the user is already exxist"})
            }else{
                if(req.body.otp==otpconfirm){
                const newUser=new User({
                    name,email,  password:bcrypt.hashSync(yes.password)
                })
               const user=await newUser.save()
                console.log(newUser,"====================")
                res.send({
                    _id:user.id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin,
                    token:genrateToken(user)
                });
                return;
            }else{
                res.status(401).send({message:'Invalid email or password'})
              
            }
        }
            



        }catch(err){
            console.log(err)
            res.json({msg:err.message})

        }
    },

    login: async (req, res) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const refresh_token = createRefreshToken({id: user._id})
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // 7 days
            })

            res.json({msg: "Login success!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAccessToken: (req, res) => {
        try {
        
            const rf_token = req.cookies.refreshtoken
       
            if(!rf_token) return res.status(400).json({msg: "Please login now!"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"})
              

                const access_token = createAccessToken({id: user.id})
                console.log(access_token)
                res.json({access_token})
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({msg: err.message})
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})

           
            const url = `http://localhost:3000/user/reset/${user.id}`
            console.log(url)

            main(email, url, "Reset your password")
            res.json({msg: "Re-send the password, please check your email."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    resetPassword: async (req, res) => {
        try {
            const id=req.params.id;
            console.log(req.params)
            console.log(id)
       
            // const yes=jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            // console.log(yes)

            const user = await User.findById(id)
            console.log(user)
            if(user){

            const {password} = req.body
            console.log(password)
            const passwordHash = await bcrypt.hash(password, 12)

            await User.findOneAndUpdate({_id: user._id}, {
                password: passwordHash
            })
        }

            res.json({msg: "Password successfully changed!"})
            console.log(user)
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
        }
    },
    getUserinfo:async(req,res)=>{
        try{
            const user=await Users.findById(req.user.id).select('-password')
            res.json(user)

        }catch(err){
            res.status(500).json({msg:err.message})
        }
    },
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await User.find().select('-password')

            res.json(users)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    

   
  

}


export default userCtrl;




function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '50m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '50m'})
}

const createRestToken= (payload) => {
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '50m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}






