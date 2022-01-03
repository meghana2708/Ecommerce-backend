import jwt from 'jsonwebtoken'
const isAdmin = (req,res,next) => {
    const token = req.headers.autherization?.split(" ")[1]
    console.log(token)
    if (token){
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decodedToken)
        const { role } = decodedToken
        if(role == 1) next()
    else
      return  res.json({
            message : "UNAUTHORISED"
        })
    
}else{
    return res.json({
        message: "UNAUTHORISED"
    })
}}
export default isAdmin