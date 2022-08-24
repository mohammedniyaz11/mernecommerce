import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import bcrypt from 'bcryptjs'

// handles google login
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import { genrateToken } from "../utils.js";
// export const googleLogin = async(req, res) => {
//   const { idToken } = req.body;

//   client
//     .verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID })
//     .then((response) => {
//       const { email_verified, name, email } = response.payload;

//       if (email_verified) {
//         User.findOne({ email }).exec((err, user) => {
//           if (user) {
//             const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
//               expiresIn: "7d"
//             });
//             const { _id, email, name } = user;
//             console.log(user)
//             return res.send({
//               name:user.name,
//               token,
//               user: { _id, email, name }
//             });
//           } else {
//             const password = email + process.env.JWT_SECRET;
         
//             user = new User({ name, email, password });
//             console.log(user)
//             user
//               .save((err, data) => {
//                 if (err) {
//                   return res.status(400).json({
//                     error: "User signup failed with google"
//                   });
//                 }
//                 const token = jwt.sign(
//                   { _id: data._id },
//                   process.env.JWT_SECRET,
//                   { expiresIn: "7d" }
//                 );
//                 const { _id, email, name } = data;
//                 console.log(data)
//                 return res.json({
//                   token,
//                   user: { _id, email, name }
//                 });
//               })
//               .catch((err) => {
//                 console.log(err)
//                 return res.status(401).json({
//                   message: "signup error"
//                 });
//               });
//           }
//         });
//       } else {
//         return res.status(400).json({
//           error: "Google login failed. Try again"
//         });
//       }
//     });
// };

export const googleLogin =async(req,res)=>{
  console.log("hello world")

 
  try{
    const{idToken}=req.body;
  
    const verify = await client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID })
    console.log(verify)
    

    const {email, name} = verify.payload;
    console.log(email)
    const password = email + process.env.JWT_SECRET
    console.log(password)
  

    const passwordHash = await bcrypt.hash(password, 12)

   
    const user = await User.findOne({email})
    console.log(user,"=================")
    if(user){
      console.log(user)
      const isMatch = await bcrypt.compare(password, user.password)
      

      res.json({
        _id:user.id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:genrateToken(user)
    });
    return;

   
    }else{
      console.log("helllo world")
      const newUser = new User({
        name, email, password: passwordHash
    })
    await newUser.save()
    res.send({
      _id:user.id,
      name:user.data.name,
      email:user.email,
      isAdmin:user.isAdmin,
      token:genrateToken(user)
  });
  return;

    }
    

  }catch(err){
    return res.status(500).json({msg:err.message})

  }
}


