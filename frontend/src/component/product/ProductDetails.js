import React, { Fragment, useEffect, useState } from 'react'
import { useParams, useRevalidator } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import { useSelector,useDispatch } from 'react-redux';
import {useAlert} from "react-alert";


import Loader from "../layout/loader/Loader.js"
import ReviewCard from "./ReviewCard";
import MetaData from '../layout/MetaData.js';


import { addItemToCart } from '../../actions/cartActions.js';
import { clearAllErrors, getProductDetails,newReview } from '../../actions/productActions';


import Carousel from 'react-material-ui-carousel'
import {
Dialog,
DialogActions,
DialogContent,
DialogTitle,
Button,
} 
from "@material-ui/core"
import { Rating } from '@mui/material';


import "./productDetails.css";
import { NEW_REVIEW_RESET } from '../../constants/productConstants.js';



const ProductDetails = () => {

  
   const {id}=useParams();
//   console.log("a");
//   console.log(id);
   const dispatch=useDispatch();
   const alert=useAlert();

   const {product,loading,error}=useSelector(state=>state.productDetails); 
   const {success,error:reviewError}=useSelector((state)=>state.newReview);
   const [quantity,setQuantity]=useState(1);
   

 
   const  increaseQuantity=()=>{
    if(quantity>=product.stock){return;}
  
    const newQty=quantity+1 ;
    setQuantity(newQty);
    // dispatch(addItemToCart(id,newQty));
  }
  const  decreaseQuantity=()=>{
    if(quantity<=1){return;}
  
    const newQty=quantity-1 ;
    setQuantity(newQty);
    // dispatch(addItemToCart(id,newQty));
  }
  const addToCartHandler=()=>{
    dispatch(addItemToCart(id,quantity));
    alert.success("Item Added to Cart")
  }




    const reactStarsOptions={
      value:product.ratings,
      size:window.innerWidth<600 ? 20 : 25,
      edit:false,
      color:"rgba(20,20,20,0.1)",
      activeColor:"tomato",
      isHalf:true,
      }






  const [dialogOpen,setDialogOpen]=useState(false);
  const [reviewRating,setReviewRating]=useState(0);
  const [reviewComment,setReviewComment]=useState("");
  
  const submitReviewToggle=()=>{
    dialogOpen?setDialogOpen(false):setDialogOpen(true);
  }
  const submitReviewHandler=()=>{
    const myForm=new FormData();
    myForm.set("rating",reviewRating);
    myForm.set("comment",reviewComment);
    myForm.set("productId",id);

    console.log(reviewRating);
    console.log(reviewComment);
    console.log(id);
    
    dispatch(newReview(myForm));
    setDialogOpen(false);
  }
  



   
   
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearAllErrors());
    }
    if(reviewError){
      alert.error(reviewError);
      dispatch(clearAllErrors());
   }
   if(success){
    alert.success("Review Submitted Successfully");
    dispatch({type:NEW_REVIEW_RESET});
 }

    dispatch(getProductDetails(id));
  },[dispatch,id,error,alert,reviewError,success]);




 return (
 <Fragment>
    {
      loading
      ?(<Loader/>)
      :( <Fragment>
        <MetaData title={`${product.name} --ECOMMERCE`}/>
        <div className="productDetails">
           <div  className="productDetails-carousel">
               <Carousel>
                 {product.images&&
                 product.images.map((item,i)=>(
                   <img key={i} src={item.url} alt={item.url} className="carouselImage" />
                 ))
                 }
               </Carousel>
           </div>
     
           <div  className="productDetails-details">
               <div className="detailsBlock-1">
                   <h2>{product.name}</h2>
                   <p>Product # {product._id}</p>
               </div>
               <div className="detailsBlock-2">
                       <ReactStars {...reactStarsOptions}/>
                       <span>({product.numOfReviews} Reviews)</span>
               </div>
               <div className="detailsBlock-3">
                   <h1>{`R${product.price}`}</h1>
                   <div className="detailsBlock-3-1">
                       <div className="detailsBlock-3-1-1">
                           <button onClick={decreaseQuantity}>-</button>
                           <input type="number" readOnly value={quantity} />
                           <button onClick={increaseQuantity}>+</button>
                       </div>
     
                       <button disabled={product.stock<1?true:false} onClick={addToCartHandler}>Add To Cart</button>   
                   </div>
                   <p>
                     Status:<b className={product.stock<1?"redColor":"greenColor"}>{product.stock<1?"Out Of Stock":"In Stock"}</b>
                   </p>
               </div>
     
     
               <div className="detailsBlock-4">
                    Description:<p>{product.description}</p>  
               </div> 
     
               <button className="submitReview" onClick={submitReviewToggle}>Submit Review</button>   
     
       {/* <h2>{reactStarsOptions.value}</h2>
       <h2>{product.ratings}</h2> */}
           </div>
        </div>
     <h3 className="reviewsHeading">REVIEWS </h3>
       
       <Dialog
       aria-labelledby='simple-dialog-title'
       open={dialogOpen}
       onClose={submitReviewToggle}
       >
              <DialogTitle>Submit Title</DialogTitle>
              <DialogContent className='submitDialog'>
                    <Rating 
                      onChange={(e)=>setReviewRating(e.target.value)}
                      value={reviewRating}
                      size="large"
                    />

                    <textarea
                    className='submitDialogTextArea'
                    cols="30"
                    rows="5"
                    onChange={(e)=>setReviewComment(e.target.value)}
                    value={reviewComment}
                    >
                    </textarea>

              </DialogContent>
              <DialogActions>
                     <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
                     <Button onClick={submitReviewHandler} color="primary">Submit</Button>
              </DialogActions>

       </Dialog>


       
       
       {product.reviews&&product.reviews[0]?
       (
          <div className="reviews">
           {product.reviews&&product.reviews.map((item,index)=>(
                  <ReviewCard key={index} review={item}/>
           ))}
          </div>
       )
        :
        (
         <p className="noReviews">No Reviews Yet</p>
        )
        }
     
     
     
     
         </Fragment>)
    }
 </Fragment>
  )
}

export default ProductDetails