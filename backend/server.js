const app= require("./app");

//removed this dotenv for production
//const dotenv=require("dotenv");

const cloudinary=require("cloudinary");
const connectDatabase=require("./database/database");

//console.log(ritesh);

//handling unCaught Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    //since server is already crashed so did not called server.close
    process.exit(1);
})



//deotenv Configuration
//dotenv.config({path:"./config/config.env"});
//we updated this below code as this thing is needed only for local and Dev not for Production
//dotenv.config({path:"backend/config/config.env"});
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

connectDatabase();
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on the PORT ${process.env.PORT} and on link http://localhost:${process.env.PORT}  smoothly`);
})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


//console.log(ritesh);

//unhandled Promise rejection
//like suppose in mongo URL wrong thing typed
//in such cases Error came but server does not crashed So we Stop the server by our own
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandledPromise rejection"); 

    server.close(()=>{
        process.exit(1);
    });
})