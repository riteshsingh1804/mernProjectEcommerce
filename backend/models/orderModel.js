const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
   shippingInfo:{
      address:{type:String,required:true},
      pinCode:{type:Number,required:true},
      phoneNumber:{type:Number,required:true},

      city:{type:String,required:true},
      state:{type:String,required:true},
      country:{type:String,required:true}
    },
   
    orderItems:[{
        name:{type:String,required:true},
        price:{type:Number,required:true},
        quantity:{type:Number,required:true},
        image:{type:String,required:true},
        productId:{type:mongoose.Schema.ObjectId,ref:"products",required:true},
    }],
   
    userId:{type:mongoose.Schema.ObjectId,ref:"users",required:true},
   
    paymentInfo:{
        paymentId:{type:String,required:true},
        paymentStatus:{type:String,required:true}
    },
    
    itemsPrice:{type:Number,default:0,required:true},
    taxPrice:{type:Number,default:0,required:true},
    shippingPrice:{type:Number,default:0,required:true},
    totalPrice:{type:Number,default:0,required:true},
    
    createdAt:{type:Date,default:Date.now},
    paidAt:{type:Date,required:true},
    deliveredAt:{type:Date},

    orderStatus:{type:String,required:true,default:"processing"},

})

const orderModel=mongoose.model("order",orderSchema);
module.exports=orderModel;