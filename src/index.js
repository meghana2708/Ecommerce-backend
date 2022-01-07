import express from 'express'
import dotenv from 'dotenv'
import connectDB from './services/mongodb/models/connectDB'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import categoryRoutes from './routes/categoryRoutes'
import productRoutes from './routes/productRoutes'
dotenv.config()
const app = express('../.env')
app.use(express.json())

const port = process.env.PORT || 3000
connectDB()
app.use(cors())
app.use(express.json())
//route to handle requests
app.use("/api/v1/auth", authRoutes)
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/product',productRoutes)
console.log('hi')
app.get('/' ,(req,res) => {
  res.send(`server running at ${port} (Deployed via workflow)`)
})
app.listen(port,(req,res) => {
  console.log(`server listening at port ${port}`)
})