const userModel=require("../models/userModel");
const catchAsyncErrors=require("../error/catchAsyncErrors");
const { find } = require("../models/productModel");
const ModifiedErrorClass = require("../error/ModifiedErrorClass");
const { trusted } = require("mongoose");
const storeSendToken = require("../utils/storeSendToken");
const sendEmail=require("../utils/sendEmail.js");
const crypto=require("crypto");

const cloudinary=require("cloudinary");

//Register User
// exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
//     //console.log("hi")
//     const user=await userModel.create(req.body);
   
//     const token=user.getJWTToken();
//     res.status(201)
//        .json({
//         success:true,
//         message:"User Registered Successfully",
//         token
//        })
//     })

//Register user
exports.registerUser=catchAsyncErrors(async (req,res,next)=>{
    
   const mycloudinary=await cloudinary.v2.uploader.upload(
    req.body.avatar,
    {
        folder:"avatars",
        width:150,
        crop:"scale"
    });

    const {name,email,password}=req.body;

    const user=await userModel.create({
        name,
        email,
        password,
        avatar:{
            public_id:mycloudinary.public_id,
            url:mycloudinary.secure_url
        }

    });
   
    // const token=user.getJWTToken();
    // const options={
    //     expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
    //     httpOnly:true
    // }

    // res.status(200)
    //    .cookie("token",token,options)
    //    .json({
    //     success:true,
    //     user,
    //     token
    //    })
    storeSendToken(user,res,201);

    })


//Login User
exports.loginUser=catchAsyncErrors(async(req,res,next)=>{
    //my try  
    //    const user=await userModel.find({email:req.email}).select("password")
       
    //    const token=user.getJWTToken();
    //    if(user){
    //         res.status(200)
    //         .json({  
    //         success:true,
    //         message:"User Logged in Successfully", 
    //         })
    //    }
      
    //actual code
    const {email,password}=req.body;

    //checking if user has given both Email and Password
    if(!email||!password){
        return next(new ModifiedErrorClass("Please Enter Email and Password"),400);
    }
    const user=await userModel.findOne({email}).select("+password");
    if(!user){
        return next(new ModifiedErrorClass("Invalid Email or password"),401);
    }

    const isPasswordMatched=await user.comparePassword(password);

    if(!isPasswordMatched){
       // return next(new ModifiedErrorClass("Password did not matched"));
         return next(new ModifiedErrorClass("Invalid Email or Password"),401);
    }
    // const token=user.getJWTToken();
    // const options={
    //     expires:new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*60*1000),
    //     httpOnly:true
    // }
    // res.status(200)
    //    .cookie("token",token,options)
    //    .json({
    //     success:true,
    //     user,
    //     token
    //    })

    storeSendToken(user,res,200);

})    

//logout user
exports.logoutUser=catchAsyncErrors(async (req,res,next)=>{
      
  //mine  
//   return  res.status(200)
//        .cookie("token",null,new Date(Date.now()))
//        .json({
//         success:true,
//         message:"User logged out Successfully",
//        })

//actual code
res.cookie("token",null,{expires:new Date(Date.now()),httpOnly: true})

res.status(200)
   .json({
    success:true,
    message:"User Logged out Successfully"
   })

})





//forgot Password
exports.forgotPassword=catchAsyncErrors(async(req,res,next)=>{
    const user=await userModel.findOne({email:req.body.email});

    if(!user){
        return next(new ModifiedErrorClass("User not found"),404);
    }
//Get reset token    
const resetToken=user.getResetPasswordToken();
await user.save({validateBeforeSave:false});

//const resetPasswordUrl1=`http://localhost:4000/api/v1/password/reset/${resetToken}`;
// const resetPasswordUrl=`${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;


//const resetPasswordUrl=`${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
//above url changes because of deployment as ports are same
const resetPasswordUrl=`${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

const message=`Your password reset token is ${resetPasswordUrl} \n\nIf you have not requested this email,then Please Ignore it. `;
try{
     await sendEmail({
        email:user.email,
        subject:`Ecommerce Password Recovery`,
        message
     });
     res.status(200)
        .json({
            succcess:true,
            message:`Email sent to ${user.email} Successfully`
        });
}
catch(error){
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save({validateBeforeSave:false});
    return next(new ModifiedErrorClass(error.message,500));

}

})

//Reset Password
exports.resetPassword=catchAsyncErrors(async (req,res,next)=>{
//mine   
// const user=await userModel.findOne({resetPasswordToken:req.params.id});

// if(!user){
//     return next(new ModifiedErrorClass("No User Found"),403);
// }
// if(user.resetPasswordExpire<Date.now()){
//     return next(new ModifiedErrorClass("Reset token expired"),403);
// }

// if(!password||!newPassword){
//     return next(new ModifiedErrorClass("Please Enter both Password and Confirm Password"));
// }
// user.password=ppassword;

// await user.save({validateBeforeSave:false});

// res.status(200)
//    .json({
//     success:true,
//     message:"Password changed Successfully"
//    })

//sir
const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

const user=await userModel.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
// const user=await userModel.findOne({resetPasswordToken});

if(!user){
    return next(new ModifiedErrorClass("Reset Password Token is Invalid or It has been Expired",400))
}

if(req.body.password!==req.body.confirmPassword){
    return next(new ModifiedErrorClass("Password did not matched",400));
}

user.password=req.body.password;
user.resetPasswordToken=undefined;
user.resetPasswordExpire=undefined;

await user.save();
  storeSendToken(user,res,200);

})










//Get User Details -by Authenticated user
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user=await userModel.findById(req.user.id);

   //no need of below if because this route must return user since user is logged in.
   //if(!user){}
    res.status(200)
       .json({
        success:true,
        user
       })
})


//update User Password
exports.updatePassword=catchAsyncErrors(async (req,res,next)=>{
    //mine
    // const user=await userModel.findById(req.user.id);
    
    // if(newPassword!==confirmPassword){
    //     return next(new ModifiedErrorClass("Password did not matched"),400);
    // }
    // user.password=req.body.password;
    // await user.save();
    // storeSendToken(user,res,200);
   
    //sir
    const user=await userModel.findById(req.user.id).select("+password");
    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ModifiedErrorClass("Your old Password is incorrect"),400);
    }
    if(req.body.newPassword!==req.body.confirmPassword){
        return next(new ModifiedErrorClass("Your new Password and confirm Password did not matched"),400);
    }
    
    user.password=req.body.newPassword;
    await user.save();
    storeSendToken(user,res,200);
})


exports.updateProfile=catchAsyncErrors(async (req,res,next)=>{
    //me
    // const user=await user.findById(req.user.id);
    
    // user.name=req.body.name;
    // user.email=req.body.email;


    // if(!req.body.name||!req.body.email){
    //     return next(new ModifiedErrorClass("Please fill all the details"),400);
    // }
    // await user.save();
    // res.status(200)
    //     .json({
    //         success:true,
    //         message:"Profile updated Successfully",
    //         user
    //     })

    //sir(mera code nhi sahi h)
    const newUserData={
        name:req.body.name,
        email:req.body.email,
    }
    if(req.body.avatar!==""){
        const user=await userModel.findById(req.user.id);
        
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);

        const mycloudinary=await cloudinary.v2.uploader.upload(
                req.body.avatar,
                {
                    folder:"avatars",
                    width:150,
                    crop:"scale"
                });

        newUserData.avatar={
            public_id:mycloudinary.public_id,
            url:mycloudinary.secure_url
        }
    }
  
  const user=await userModel.findByIdAndUpdate(req.user.id,newUserData,{new:true,runValidators:true,useFindAndModify:false});
    res.status(200)
        .json({
            success:"true"
        })


})

//Get All Users  -by Authenticated and Admin
exports.getAllUsers=catchAsyncErrors(async(req,res,next)=>{
    //me
    // const users=await userModel.find({});

    // if(!users){
    //     return next(new ModifiedErrorClass("No Users found"),400);
    //     }
    // res.status(200)
    //     .json({
    //         success:tue,
    //         users
    //     })
   
    //sir (mera code bhi shi h)
    const users=await userModel.find();
    res.status(200)
        .json({
            success:true,
            users
        })


    })

//get any Single user detail (by authenticated and admin)
exports.getAnyUserDetails=catchAsyncErrors(async (req,res,next)=>{
    //me
    const user=await userModel.findById(req.params.id);

    if(!user){
        return next(new ModifiedErrorClass(`User not found with ID: ${req.params.id}`),400);
    }

    res.status(200)
        .json({
            success:true,
            user
        })

    //sir  (same h mere jaisa)

})

//update any User Role (by authenticated and admin)
exports.updateAnyUserRole=catchAsyncErrors(async (req,res,next)=>{
    if(!req.body.name||!req.body.email||!req.body.role){
           return next(new ModifiedErrorClass("Please Fill out Updated Name,Email and Role"),400);
    } 
    
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role

     }

     const user=await userModel.findByIdAndUpdate(req.params.id,newUserData,{
     new:true,
     runValidators:true,
     useFindAndModify:false
     })

     if(!user){
        return next(new ModifiedErrorClass(`No User Found with ID: ${req.params.id}`,400));
     }

     res.status(200)
        .json({
            success:true,
            message:`User role updated successfully with id: ${req.params.id}`
        })

})

//delete any User  (by authenticated and admin)
exports.deleteAnyUser=catchAsyncErrors(async (req,res,next)=>{
    const user=await userModel.findById(req.params.id);

    if(!user){
        return next(new ModifiedErrorClass("No User found with given ID"),400);
    }
   //Cloudinary
   const imageId=user.avatar.public_id;
   await cloudinary.v2.uploader.destroy(imageId);
   //Cloudinary

    await user.deleteOne();
    res.status(200)
       .json({
        success:true,
        message:`User deleted successfully with id: ${req.params.id}`
       })
})
