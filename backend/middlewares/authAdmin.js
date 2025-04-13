import jwt from 'jsonwebtoken'

//admin authetication middleware
const authAdmin= async (req,res,next)=>{
     try{
       const {atoken} = req.headers
       if(!atoken){
        return res.json({success:false,message:"Not Authorized"})
       }
       const token_decode =jwt.verify(atoken,process.env.JWT_SECRET)
       
       req.adminId =token_decode.id

       next()

     }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
     }
}

export default authAdmin