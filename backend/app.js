const express=require("express");
const cookieParser=require("cookie-parser")

const bodyParser=require("body-parser");
const expressFileUpload=require("express-fileupload");


//neeche ke 4 lines payment k liye kyu add kiya sir ne??
//below dotenv not needed because of production
//const dotenv=require("dotenv");


//below 1 line ie path is added for deployment
const path=require("path");

//deotenv Configuration
//dotenv.config({path:"./config/config.env"});
//needed change inthis because of deployment
//dotenv.config({path:"backend/config/config.env"});
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config/config.env"});
}

//error imprts
const ErrorMiddleware = require("./error/ErrorMiddleware");

//router imports
const productRouter=require("./routers/productRouter");
const userRouter=require("./routers/userRouter");
const orderRouter=require("./routers/orderRouter");
const paymentRouter=require("./routers/paymentRouter");

const app=express();


//basic middlewares like 
app.use(express.json({limit:'50mb'}));
app.use(cookieParser({limit:'50mb'}));

app.use(bodyParser.urlencoded({extended:true,parameterLimit:100000,limit:"50mb"}));
app.use(expressFileUpload({useTempFiles : true,limit:'50mb'}));
//router middlewares
app.use("/api/v1",productRouter);
app.use("/api/v1",userRouter);
app.use("/api/v1",orderRouter);
app.use("/api/v1",paymentRouter);

//below 4 lines added for deployment
app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
})

//erromiddlewarer
app.use(ErrorMiddleware);

module.exports = app;
