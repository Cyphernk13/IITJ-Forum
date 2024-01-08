import express  from "express";
import { UserModel } from '../models/Users.js'
import jwt from "jsonwebtoken"
import bcrypt, { compare } from 'bcrypt'
import nodemailer from 'nodemailer';

const router = express.Router()

router.post( '/register' , async(req,res) => {
    const {username,password,email,commit} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    if (commit) {
        const newUser = new UserModel({username , password: hashedPassword , email})
        await newUser.save()
        res.json({message: "User Registered Succesfully."})
    }else{
      const user = await UserModel.findOne({username});
      const mail = await UserModel.findOne({email})
      console.log(username)
      if (user) {
          return res.json({message:"Username already taken."})
      } 
  
      if (mail) {
          return res.json({message:"Email already exists."})
      }
      res.json({message: "User Registered Succesfully."})
    }

})

router.post( '/otp' , async( req,res ) => {
    const { email } = req.body
    const otp = Math.floor(10000 + Math.random() * 90000);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: '' // Enter your own auth app gmail & password, removed mine for security reasons :)
      }
    });
    
    var mailOptions = {
      from: '', // Enter your own auth app gmail, removed mine for security reasons :)
      to: `${email}`,
      subject: 'OTP for IITJ Forum',
      text: `your OTP is ${otp}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.json({otp})
} )

router.post( '/forgot' , async( req,res ) => {
    const { email } = req.body;
    const mail = await UserModel.findOne({email})
    if (mail) {
      res.json({ message:'Yes' })
    }
    else
    {
      res.json({message:'No'})
    }
} )

router.post( '/login' , async( req,res ) => {
    const { email , password } = req.body
    var user = await UserModel.findOne({email})
    if(!user) {
        return res.json( {message : "Email doesn't exist."} )
    }

    const isPasswordValid = await bcrypt.compare( password , user.password )

    if (!isPasswordValid) {
        return res.json({message : "Email or password incorrect."})
    }
    const token = jwt.sign( {id:user._id},"secret" )
    res.json( {token,userId: user._id} )
})

export default router
