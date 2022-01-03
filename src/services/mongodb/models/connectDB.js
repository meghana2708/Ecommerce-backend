import  mongoose  from "mongoose";
const connectDB = async () => {
const connectionString = process.env.DB_URL

try {
    await  mongoose.connect(connectionString)
    console.log("Connected to DB !!!")
} catch (error) {
    console.group(error.message)
    console.log(`could not connect to thr DB : ${error.message}`)
}
}
export default connectDB
