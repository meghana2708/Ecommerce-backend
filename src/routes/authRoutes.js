import express from 'express'
import User from '../services/mongodb/models/User'
const router = express.Router()
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import isAdmin from '../middleware/isAdmin'
/*
type : GET
path : /api/v1/auth/users
params : none
isProtected : true (admin)
*/ 
router.get('/users',isAdmin, async(req,res) => {
  try {
      const users = await User.find({})
      res.json({ users })
  } catch (error) {
      console.log(error.message)
      res.status(500).json({ users : []})
  }
})
/*
type : POST
path : /api/v1/auth/signup
params : none
isProtected :false (admin)
*/ 
router.post('/signup',async(req,res) => {
    try {
        const {firstName,lastName = '',email,password} = req.body
      
        
        const salt = await  bcrypt.genSalt(5)
        const hsahedPassword = await bcrypt.hash(password ,salt)
        const user = new User({firstName,lastName,email,password :hsahedPassword , role :1})
        await user.save()
        console.log(hsahedPassword)
        res.json({  user })
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ users : []})

    }
    
})
/*
type : POST
path : /api/v1/auth/signup
params : none
isProtected :false (admin)
*/ 
router.post('/login',async(req,res) => {
    try {
        const {email,password} = req.body
        const user =await  User.findOne({email})
        if(user){
            const isVerified = await bcrypt.compare(password,user.password)
            if(isVerified){
            const { _id, role} = user
            const token = jwt.sign({ _id, role}, process.env.JWT_SECRET, {expiresIn : "1h"})
            return res.json({token})
        }else{
         return res.json({token :null,message:"Unauthorised"})
        }
        
    } 
    return res.json({token :null , message :"User doesnot exist"})
        
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ users : []})

    }
    
})

export default router