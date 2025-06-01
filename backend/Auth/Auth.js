const ModifiedErrorClass = require("../error/ModifiedErrorClass");
const catchAsyncErrors = require("../error/catchAsyncErrors");
const jwt=require("jsonwebtoken");
const userModel = require("../models/userModel");

const isAuthenticatedUser=catchAsyncErrors(async(req,res,next)=>{
  const {token}=req.cookies;
 // console.log(token);
  if(!token){
    return next(new ModifiedErrorClass("Please Login to access this resource",401));
  }

  const decodedData=jwt.verify(token,process.env.JWT_SECRET);
  console.log("decoded data")
  console.log(decodedData)
  console.log("decoded data id")
  console.log(decodedData.id)
  req.user =  await userModel.findById(decodedData.id);
  console.log("req.user");
  console.log(req.user);
  console.log("req.user._id");
  console.log(req.user._id);
  console.log("req.user.id"); 
  console.log(req.user.id);
  next();       
})       
       
const AuthorizeRoles=(...roles)=>catchAsyncErrors(async(req,res,next)=>{
  
  if(!roles.includes(req.user.role)){
   return next(new ModifiedErrorClass(`Role:${req.user.role} is not Authorized to access this resource`),403);
  }   

  next(); 
})
module.exports={isAuthenticatedUser,AuthorizeRoles};      