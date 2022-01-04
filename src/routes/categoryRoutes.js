import express from 'express'
import User from '../services/mongodb/models/User'
import Category from '../services/mongodb/models/Category'
import {body,validationResult} from 'express-validator'
const router = express.Router()
import bcrypt from 'bcryptjs'
/*
type : GET
path : /api/v1/category/all
params : none
isProtected : false (public)
*/ 
router.get('/all', async (req,res) => {
    try {
         const categories = await  Category.find({})
         return res.status(500).json({categories, message:"successfully fetched categories"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({categories  : [], message:"error fetching categories"})
    }
})
/*
type : POST
path : /api/v1/category/add
params : none
isProtected : true (private)
*/ 
router.post('/add',
body('name').isLength({min:1}),
body('description').isLength({min : 10})
, async (req,res) => {
    const {errors} = validationResult(req)
    if(errors.length >0) return res.status(403).json({errors,message: "Bad request"})
    try {
        const category = new Category(req.body)
        await  category.save()
        res.status(200).json({category,message: "Saved category in DB"})
         
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({categories  : [], message:"error posting categories"})
    }
})
/*
type : PUT
path : /api/v1/category/:id
params : none
isProtected : true (private)
*/ 
router.put('/update/:id', async (req,res) => {
    const {id} = req.params
    try {
         const categories = await  Category.findOneAndUpdate({_id:id},req.body,{
             new : true
         })
         return res.status(200).json({categories, message:"Updated categories"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({categories  : null, message:"Unable to update categories"})
    }
})
/*
type : DELETE
path : /api/v1/category/:id
params : none
isProtected : true (private)
*/ 
router.delete('/delete/:id', async (req,res) => {
    const {id} = req.params
    try {
         const categories = await  Category.findByIdAndRemove(id)
         return res.status(200).json({categories, message:" deleted categories"})
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({categories  : null, message:"Unable to delete categories"})
    }
})


export default router