const mongoose=require("mongoose");
const validator=require("validator");

const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
//for resetPasswordTken
const crypto=require("crypto");
const userSchema=new mongoose.Schema({
    name:{type:String,required:[true,"Please Enter Your Name"],minLength:[4,"Name must have 4 Characters"],maxLength:[30,"Name can't exceed 30 Characters"]},
    email:{type:String,required:[true,"Please Enter Your Email"],unique:true,validate:[validator.isEmail,"Plese Enter Valid Email"],},
    password:{type:String,required:[true,"Please Enter Your Password"],minLength:[8,"Password must be greater than 8 Characters "],select:false},
    avatar:{
        public_id:{type:String,required:true},
        url:{type:String,required:true}
    },
    role:{type:String,default:"user"},
    createdAt:{type:Date,default:Date.now},
    resetPasswordToken:{type:String},
    resetPasswordExpire:{type:Date}
})

//encrypting password before saving to DB
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
})

//JWT

//this will return json web token based on id and Secret
userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRE});
}

//compare password
userSchema.methods.comparePassword=async function(password){
     return await bcrypt.compare(password,this.password);
}






//Generating Reset Password Token with help of crypto
userSchema.methods.getResetPasswordToken=function(){
    //Generating Reset Token
    const resetToken=crypto.randomBytes(20).toString("hex");
    
    //Hashing the Reset Token and saving it to userSchema
    this.resetPasswordToken=crypto.createHash("sha256").update(resetToken).digest("hex");
                            
    this.resetPasswordExpire=Date.now()+15*60*1000;
    return resetToken;
}

const userModel=new mongoose.model("users",userSchema);
module.exports=userModel;













