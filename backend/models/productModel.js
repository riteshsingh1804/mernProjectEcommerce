const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:         {type:String,required:[true,"Please Enter Product Name"],trim:true},
    description:  {type:String,required:[true,"Please Enter Product Description"]},
    price:        {type:Number,required:[true,"Please Enter Product Price"],maxLength:[8,"Price can't exceed 8 characters"]},
    ratings:       {type:Number,default:0},
    images:[{
        public_id:{type:String,required:true},
        url:      {type:String,required:true}
    }],
    category:     {type:String,required:[true,"Please Enter Product Category"]},
    stock:        {type:Number,required:[true,"Please Enter Product Stock"],maxLength:[4,"Price can't exceed 4 characters"],default:1},
    numOfReviews: {type:Number,default:0},
    reviews:[{
        userId:   {type:mongoose.Schema.ObjectId,ref:"users",required:true},
        name:     {type:String,required:true},
        rating:   {type:Number,required:true},
        comment:  {type:String,required:true},
    }],
   
    userId:{type:mongoose.Schema.ObjectId,ref:"users",required:true},
    //createdBy:{type:String,required:true},
    createdAt:    {type:Date,default:Date.Now},

})

const productModel=mongoose.model("products",productSchema);
module.exports=productModel;