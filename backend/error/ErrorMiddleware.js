const ModifiedErrorClass = require("./ModifiedErrorClass")

const ErrorMiddleware=(err,req,res,next)=>{
  
 let message="Internal Server Error";
 let statusCode=404;

 statusCode=err.statusCode||statusCode;
 message=err.message||message;


//Wrong Mongodb ID error
if(err.name==="CastError"){
    message=`Resource not found. Invalid: ${err.path}`;
    statusCode=400;
}

//duplicat key error
if(err.code===11000){
    message=`Duplicate ${Object.keys(err.keyValue)} Entered`;
}

//wrong JWT error
if(err.name==="jsonWebTokenError"){
    message=`JSON Web Token is Invalid,Please try again`;
}
//JWT expired error
if(err.name==="TokenExpiredError"){
    message=`JSON Web Token has been expired,Please try again`;
}
err.statusCode=statusCode;
err.message=message;

    res.status(err.statusCode)
       .json({
        success:false,
        //errorDetails:err.stack,--this will give the complete detail of error
        message:err.message
       })
}

module.exports=ErrorMiddleware;

// const ModifiedErrorClass = require("./ModifiedErrorClass")

// const ErrorMiddleware= (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.message = err.message || "Internal Server Error";

//   // Wrong Mongodb Id error
//   if (err.name === "CastError") {
//     const message = `Resource not found. Invalid: ${err.path}`;
//     err = new ModifiedErrorClass(message, 400);
//   }

//   // Mongoose duplicate key error
//   if (err.code === 11000) {
//     const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
//     err = new ModifiedErrorClass(message, 400);
//   }

//   // Wrong JWT error
//   if (err.name === "JsonWebTokenError") {
//     const message = `Json Web Token is invalid, Try again `;
//     err = new ModifiedErrorClass(message, 400);
//   }

//   // JWT EXPIRE error
//   if (err.name === "TokenExpiredError") {
//     const message = `Json Web Token is Expired, Try again `;
//     err = new ModifiedErrorClass(message, 400);
//   }

//   res.status(err.statusCode).json({
//     success: false,
//     message: err.message,
//   });
// };

// module.exports=ErrorMiddleware;