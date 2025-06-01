// "name":"oppo f19",
// "description":"this is my mother Phone",
// "price":"20000",
// "rating":"5",
// "images":[
//     {"public_id":"aaa","url":"bbb"},
//     {"public_id":"ccc","url":"ddd"}
// ],
// "category":"phone",
// "stock":"10"

// {
//     "name":"mouse",
//     "description":"for Scroll",
    
//     "price":"20000",
//     "rating":"5",
//     "images":[
//         {"public_id":"aaa","url":"bbb"},
//         {"public_id":"ccc","url":"ddd"}
//     ],
//     "category":"phone",
//     "stock":"10"
// }


// {
//     "name":"ravi",
//        "email":"abc@gmail21.com",
//        "password":"12345678",
//        "avatar":{
//            "public_id":"abcd",
//            "url":"abdd"
//        }
// }

const productSchema=mongoose.Schema({
    name:         {type:String,required:[true,"Please Enter Product Name"],trim:true},
    description:  {type:String,required:[true,"Please Enter Product Description"]},
    price:        {type:Number,required:[true,"Please Enter Product Price"],maxLength:[8,"Price can't exceed 8 characters"]},
    rating:       {type:Number,default:0},
    images:[{
        public_id:{type:String,required:true},
        url:      {type:String,required:true}
    }],
    category:     {type:String,required:[true,"Please Enter Product Category"]},
    stock:        {type:Number,required:[true,"Please Enter Product Stock"],maxLength:[4,"Price can't exceed 4 characters"],default:1},
    numOfReviews: {type:Number,default:0},
    reviews:[{
        name:     {type:String,required:true},
        rating:   {type:Number,required:true},
        comment:  {type:String,required:true},
    }],
    //createdBy:{type:String,required:true},
    createdAt:    {type:Date,default:Date.Now},

})



// {
//     "shippingInfo":{
//     "address":"3/13 belwariya",
//     "pinCode":"222222",
//     "phoneNumber":"7570019489",

//     "city":"varanasi",
//     "state":"up",
//     "country":"India"
//   },
 
//   "orderItems":[{
//       "name":"name",
//       "price":"20000",
//       "quantity":"2",
//       "image":"image",
//       "productId":"65f0af4f1bc62ad643ddd907"
//   }],
 
//   "userId":"65fb3792be32e3b81e554937",
 
//   "paymentInfo":{
//       "paymentId":"paymentId",
//       "paymentStatus":"success"
//   },
  
//   "itemsPrice":"100",
//   "taxPrice":"100",
//   "shippingPrice":"100",
//   "totalPrice":"300"
  

// }