const ModifiedErrorClass = require("../error/ModifiedErrorClass");
const productModel=require("../models/productModel");
const catchAsyncErrors=require("../error/catchAsyncErrors");
const ApiFeature = require("../utils/apifeatures");

const cloudinary=require("cloudinary");

//my doubts
exports.doubt=async (req,res,next)=>{
  let  products=await productModel.find();
  let product=await productModel.findById(req.params.id);

  product =await product.find();

// console.log("product");
// console.log(product);
// console.log("product type");
// console.log(Array.isArray(product));

// console.log("products");
// console.log(products);
// console.log("products type");
// console.log(Array.isArray(products));

  res.status(400)
     .json({
      success:true,
     
     });
 
}





//create a product   --only ADMIN
// exports.createProduct=async (req,res,next)=>{
//     const product=await productModel.create(req.body);

//     res.status(201)
//        .json({
//          success:true,
//          product:product
//        })
// }

//with catchAsynch Errors
exports.createProduct=catchAsyncErrors(async (req,res,next)=>{
req.body.userId=req.user.id;
//cloudinary start

let images=[];
let imagesLinks=[];

if (typeof req.body.images === "string") {
  images.push(req.body.images);
  console.log("images is string");
} else if(Array.isArray(req.body.images)) {
  images = req.body.images;
  console.log("images is array");
}


// images=req.body.images;
// console.log("images length");
// console.log(images.length);
for(let i=0;i<images.length;i++){
  let  result=await cloudinary.v2.uploader.upload(images[i],
    {
      folder: "products",
  });
    
    imagesLinks.push({
    public_id:result.public_id,
    url:result.secure_url
  });
}

req.body.images=imagesLinks;


//cloudinary end
  const product=await productModel.create(req.body);

  res.status(201)
     .json({
       success:true,
       product:product
     });
});


 
//get All Products
// exports.getAllProducts=catchAsyncErrors(async (req,res,next)=>{
//   const  products=await productModel.find();

//   res.status(400)
//      .json({
//       success:true,
//       products:products
//      });
 
// })

//get All Products (with Search Filter Pagination)
exports.getAllProducts=catchAsyncErrors(async (req,res,next)=>{
 // return next(new ModifiedErrorClass("Faaltu Error for react alert check",500));
  const resultsPerPage=3;

  const TotalProductsCount = await productModel.countDocuments();
  const apifeature=new ApiFeature(productModel.find(),req.query);

  apifeature.search()
            .filter();
  let  products=await apifeature.query;
  const FilteredProductsCount=products.length;

  
  apifeature.pagination(resultsPerPage);
  products=await apifeature.query.clone();
  
  // const dummy=productModel.find().find({name:"ritesh"}).find().find({price:1000});  
  // console.log("dummy");
  // console.log(dummy); 
  
  // console.log("api1");
  // console.log(apifeature); 
  
  // console.log("api2");
  // console.log(apifeature.query);
//hi

  res.status(200)
     .json({
      success:true,
      TotalProductsCount,
      FilteredProductsCount,
      products:products,
      resultsPerPage
     });
 
})

// Get All Product (Admin)
exports.getAllProductsAdmin = catchAsyncErrors(async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).json({
    success: true,
    products,
  });
});


//Update a product --Only ADMIN
exports.updateProduct=catchAsyncErrors(async (req,res,next)=>{
  let product=await productModel.findById(req.params.id);

  if(!product){
    // return  res.status(500)
    //   .json({
    //    success:false,
    //    message:"Product not found. So can't update"
    //   });
     return next(new ModifiedErrorClass("Product not found. So can't update",404));
  }
//Cloudinary Start
let images=[];
let imagesLinks=[];
if(typeof req.body.images==='string'){
     images.push(req.body.images);
}
else{
    images=req.body.images; 
}

if(images!=='undefined'){
for(let i=0;i<product.images.length;i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
}
}

for(let i=0;i<images.length;i++){
  let  result=await cloudinary.v2.uploader.upload(images[i],{folder: "products",});
    
    imagesLinks.push({
    public_id:result.public_id,
    url:result.secure_url
  });
}

req.body.images=imagesLinks;






  //Cloudinary End
  
  product=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true,useFindAndModify:false});

  res.status(200)
     .json({
      success:true,
      product:product
     });
 
})


//delete a product
exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
  let product=await productModel.findById(req.params.id);
 
  if(!product){
     // return res.status(500)
     //           .json({
     //             success:false,
     //             message:"Product not Found. So can't be deleted"
     //            })
 
     return next(new ModifiedErrorClass("Product not Found. So can't be deleted",404));
  }
//Cloudinary Start
for(let i=0;i<product.images.length;i++){
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
}
//Cloudinary End
 
 await product.deleteOne();
 //product=await productModel.findByIdAndDelete(req.params.id);
 
 // console.log("product");
 // console.log(product);
 
 // console.log("product type");
 // console.log(typeof(product));
 
 res.status(200)
    .json({
     success:true,
     message:"Product deleted successfully"
    })
 }
 )


//get Product details
// exports.getProductDetails=async (req,res,next)=>{
//   const product=await productModel.findById(req.params.id);

//   if(!product){
//     // return res.status(500)
//     //    .json({
//     //     success:false,
//     //     message:"Product not found"
//     //    })
//     return next(new ModifiedErrorClass("Product not found",404));
//   }

//   res.status(200)
//      .json({
//       success:true,
//       product:product
//      })
// }




//with try catch
//get Product details
// exports.getProductDetails=async (req,res,next)=>{
//   try{
//     const product=await productModel.findById(req.params.id);

//     if(!product){
//       // return res.status(500)
//       //    .json({
//       //     success:false,
//       //     message:"Product not found"
//       //    })
//       return next(new ModifiedErrorClass("Product not found",404));
//     }
  
//     res.status(200)
//        .json({
//         success:true,
//         product:product
//        })
//   }
//   catch(err){
//       next(err);
//   }

// }


//with catchAsyncErrors
//get Product details
exports.getProductDetails=catchAsyncErrors(async (req,res,next)=>{
  const product=await productModel.findById(req.params.id);
  
  if(!product){
    // return res.status(500)
    //    .json({
    //     success:false,
    //     message:"Product not found"
    //    })
    return next(new ModifiedErrorClass("Product not found",404));
  }

  res.status(200)
     .json({
      success:true,
      product:product
     })
})



//create New Review or update the review
exports.createUpdateAnyProductAnyReview=catchAsyncErrors(async (req,res,next)=>{
  //mine
  const {rating ,comment,productId}=req.body;  
  const review={
      userId:req.user._id,//try with req.user.id
      name:req.user.name,
      rating:Number(rating),
      comment,

     }


     const  product=await productModel.findById(productId);
     if(!product){
      return next(new ModifiedErrorClass("No Product found with this Product Id"),404);
     }
    
     let isReviewed=false;
     product.reviews.forEach((item)=>{
       if(item.userId.toString()===review.userId.toString()){
        isReviewed=true;
        return false; //break; will not work with forEach
       }
     })
//  console.log("isReviewed");
//   console.log(isReviewed);
     if(!isReviewed){
      console.log("a")
        product.reviews.push(review);
     }
     else{
      console.log("b");
        product.reviews.forEach((item)=>{
         if(item.userId.toString()===review.userId.toString()){
              item.name=review.name;
              item.userId=review.userId;
              item.comment=review.comment;
              item.rating=review.rating;
              return false;
         }
        })
     }


    let ratingsSum=0;
    let ratingsAvg=0;
    let totalReviews=product.reviews.length;
    
    product.reviews.forEach((item)=>{
      ratingsSum=ratingsSum+item.rating;
    })
    ratingsAvg=ratingsSum/totalReviews;

    product.ratings=ratingsAvg;
    product.numOfReviews=totalReviews;

    await product.save({validateBeforeSave:false});
    
    res.status(200)
       .json({
        success:true,
        message:"Reviews added SuccessFully",
       })

  

  //    //sir
  // const {rating ,comment,productId}=req.body;  
  // const review={
  //     userId:req.user._id,//try with req.user.id
  //     name:req.user.name,
  //     rating:Number(rating),
  //     comment,

  //    }
  //    const  product=await productModel.findById(productId);
  //    if(!product){
  //     return next(new ModifiedErrorClass("No Product found with this Product Id"),404);
  //    }
    
  //    const isReviewed=product.reviews.find((item)=>
  //     item.userId.toString()===review.userId.toString()
  //   )
    
  //    console.log("isReviewed");
  //    console.log(isReviewed);

  //    if(!isReviewed){
  //     console.log("a");
  //       product.reviews.push(review);
  //       product.numOfReviews=product.reviews.length
  //    }
  //    else{
  //     console.log("b");
  //       product.reviews.forEach((item)=>{
  //        if(item.userId.toString()===review.userId.toString()){
  //             item.comment=review.comment;
  //             item.rating=review.rating;
  //        }
  //       })
  //    }

  //   let ratingsSum=0;
  //   product.reviews.forEach((item)=>{
  //     ratingsSum=ratingsSum+item.rating;
  //   });
  //   product.ratings= ratingsSum/product.reviews.length;
  //   product.numOfReviews=product.reviews.length;
  //   await product.save({validateBeforeSave:false});
    
  //   res.status(200)
  //      .json({
  //       success:true,
  //       message:"Review added SuccessFully"
  //      })
})

//delete any review from a single product
exports.deleteAnyProductAnyReview=catchAsyncErrors(async(req,res,next)=>{
    
  const productId=req.query.productId;
  const reviewId=req.query.reviewId;

  const product=await productModel.findById(productId);

  if(!product){
    return next(new ModifiedErrorClass("No Product found with this Id"));
  }
  // console.log("a");
  // console.log(product.reviews);

 const newProductReviews=product.reviews.filter((item)=>(
    item._id.toString()!=reviewId.toString()
  ))
  product.reviews=newProductReviews; 
  // console.log("b");
  // console.log(product.reviews);

    let ratingsSum=0;
    let ratingsAvg=0;
    let totalReviews=product.reviews.length;
    
    product.reviews.forEach((item)=>{
      ratingsSum=ratingsSum+item.rating;
    })
    if(totalReviews!=0)ratingsAvg=ratingsSum/totalReviews;

    product.ratings=ratingsAvg;
    product.numOfReviews=totalReviews;

    await product.save({validateBeforeSave:false});
    
    res.status(200)
       .json({
        success:true,
        message:"Reviews deleted SuccessFully",
       })

})


//get all reviews from a single product
exports.getAllReviewsOfAnyProduct=catchAsyncErrors(async (req,res,next)=>{
  const productId=req.query.productId;
  // console.log(productId);
  const product=await productModel.findById(productId);

  if(!product){
    return next(new ModifiedErrorClass("No Products Found with this Id"),404);
  }

  if(product.reviews.length===0){
    return next(new ModifiedErrorClass("No Reviews yet to this Product"),400);
  }

  res.status(200)
     .json({
      success:true,
      reviews:product.reviews
     })
})












// exports.getAllProducts=(req,res)=>{
//     // console.log("req");
//     // console.log(req);
//     res.status(400)
//        .json({message:"Server is working fine",family:"Suryabai, Mamata, Sandhya(Babu, Sudhir), Ravi, Ritesh"});
//     // console.log("res");
//     // console.log(res);   
// }

