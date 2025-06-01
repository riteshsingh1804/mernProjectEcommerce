const ModifiedErrorClass = require("../error/ModifiedErrorClass");
const catchAsyncErrors = require("../error/catchAsyncErrors");
const orderModel=require("../models/orderModel");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");



//create new Order
exports.newOrder=catchAsyncErrors(async (req,res,next)=>{
 const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
       }=req.body
const order=await orderModel.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    userId:req.user._id
    //userId:req.user._id,
    //both are fine.both are saving id and datatype is ObjectID

});

res.status(201)
   .json({
      success:true,
      message:"Order created Successfully",
      order
   })
})





//get single order details
exports.getAnyOrderDetails=catchAsyncErrors(async (req,res,next)=>{
    const order=await orderModel.findById(req.params.id).populate("userId","name email");
    if(!order){
        return next(new ModifiedErrorClass("No Order found with this Id"),404);
    }
    
    res.status(200)
       .json({
        success:true,
        order
       })
})

//get Logged In user orders
exports.myOrders=catchAsyncErrors(async (req,res,next)=>{
    // const orders=await orderModel.find({userId:req.user.id});//req.user._id and req.user.id both works same
    const orders=await orderModel.find({userId:req.user._id});

    if(!orders){
        return next(new ModifiedErrorClass("No Orders Found"),404);
    }

    res.status(200)
       .json({
        success:true,
        orders
       })
})




//getAll Orders ---Admin

exports.getAllOrders=catchAsyncErrors(async (req,res,next)=>{
const orders=await orderModel.find();
if(!orders){
    return next(new ModifiedErrorClass("No Orders Found"),404);
}

let totalAmount=0;
 orders.forEach((item)=>{
    totalAmount=totalAmount+item.totalPrice;
})

res.status(200)
    .json({
        success:true,
        totalAmount,
        orders
         
    })
})


//update Any Order Status ---Admin
exports.updateAnyOrderStatus=catchAsyncErrors(async (req,res,next)=>{
    const order=await orderModel.findById(req.params.id);
   
    if(!order){
        return next(new ModifiedErrorClass("No Order Found wit this Id"),404);
    }
    if(order.orderStatus==="delivered"){
        return next(new ModifiedErrorClass("You have already delivered this order",400));
    }
    if(req.body.orderStatus==="shipped"){
    order.orderItems.forEach(async (item)=>{
        await updateStock(item.productId,item.quantity);
    }) 
    }
    order.orderStatus=req.body.orderStatus;
    
    if(req.body.status==="delivered"){
        order.deliveredAt=Date.now();
    }
    

    await order.save({validateBeforeSave:false});
    res.status(200)
    .json({
        success:true,
        message:"Order status updated Successfully"
    })
})

async function updateStock(productId,quantity){
  const product=await productModel.findById(productId);
//   console.log("product found->")
//   console.log(product)
  product.stock=product.stock-quantity;
  
  await product.save({validateBeforeSave:false});
}

//delete order
exports.deleteAnyOrder=catchAsyncErrors(async(req,res,next)=>{
    const order=await orderModel.findById(req.params.id);

    if(!order){
        return next(new ModifiedErrorClass("No Orders Found with this Id"),200);
    }

    await order.deleteOne();
    res.status(200)
       .json({    
        success:true,
        message:"Order Deleted Successfully"
       })
})

