import {redisClient} from "../services/redis.js"
import jwt from  "jsonwebtoken"
import { User } from "../models/user.js";
export const Auth=async(req,res,next)=>{

   try{
     const token=req.cookies.token 
    
    if(!token){
        return res.status(401).json({error:"Please Login"})
    }

    const isBl=await redisClient.get(token)

    if(isBl){
          res.clearCookie("token") 
          return res.status(401).json({error:"Please Login v2"})
    }

    const {_id}=jwt.verify(token,process.env.SECRET);
    const user=await User.findById(_id);
    if(!user){
        return res.status(401).json({error:"Unauthorized"})
    }
    req.user=user
    next()}
   catch(e){

    return res.json({error:e.message})

   }
}