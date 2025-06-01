import React, { Fragment } from 'react'
import { dividerClasses } from '@mui/material';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

import { useNavigate } from 'react-router-dom';

import "./cart.css";

import { useSelector,useDispatch } from 'react-redux';

import CartItemCard from "./CartItemCard.js"


import { addItemToCart,removeItemFromCart } from '../../actions/cartActions.js';

import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";

const Cart = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const {cartItems}=useSelector((state)=>state.cart);
    

//   const item={
//     productId:"product1abcdef",
//     name:"Oppo f11",
//     price:"10000",
//     image:"https://res.cloudinary.com/doe1zxzv6/image/upload/v1719008797/avatars/jyhwgvslrp3mkfqemffr.webp",
//     quantity:3 
// }  

const  IncreaseQuantity=(productId,quantity,stock)=>{
    if(quantity>=stock){return;}
  
    const newQty=quantity+1 ;
   
     dispatch(addItemToCart(productId,newQty));
  }
  const  DecreaseQuantity=(productId,quantity)=>{
    if(quantity<=1){return;}
  
    const newQty=quantity-1 ;
    
     dispatch(addItemToCart(productId,newQty));
  }

  const deleteItemFromCart=(productId)=>{
        dispatch(removeItemFromCart(productId));
  }

  const checkOutHandler=()=>{
    navigate("/login?redirect=shipping")
  }
  return (
 <Fragment>
    {
        cartItems.length===0?
        (
            <div className="emptyCart">
                <RemoveShoppingCartIcon/>
                <Typography>No Product in your Cart</Typography>
                <Link to="/products">View Product</Link>
            </div>
        )
        :
        (
            <Fragment>      
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
        
                {
                cartItems&&cartItems.map((item)=>(
                     <div className="cartContainer" key={item.productId}>
                        <CartItemCard deleteItemFromCart={deleteItemFromCart} item={item}/>
                        <div className="cartInput">
                             <button onClick={()=>DecreaseQuantity(item.productId,item.quantity)}>-</button>
                             <input type="number" value={item.quantity} />
                             <button onClick={()=>IncreaseQuantity(item.productId,item.quantity,item.stock)}>+</button>
                        </div>
                        <div className="cartSubtotal">
                            {`₹${item.price*item.quantity}`}
                        </div>
                        
                    </div>          
                    ))  
                }
        
                
                <div className="cartGrossProfit">
                          <div></div>
                          <div className="cartGrossProfitBox">
                                <p>Gross total</p>
                                <p>{`₹${cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}`}</p>
                          </div>
                          <div></div>
                          <div className="checkOutBtn">
                            <button onClick={checkOutHandler}>Check Out</button>
                          </div>
                </div>     
        
        
            </div>
           </Fragment>
        )

    }
 </Fragment>
  )
}

export default Cart