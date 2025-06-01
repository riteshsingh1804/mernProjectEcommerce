import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom';

import { Typography } from '@material-ui/core';


import MetaData from '../layout/MetaData';
import CheckOutSteps from '../cart/CheckOutSteps';

import "./updateOrderAdmin.css";
import { Fragment } from 'react';



const UpdateOrderAdmin = () => {

const dispatch=useDispatch();
const navigate=useNavigate();

const cartItems=useSelector((state)=>state.cart.cartItems);
const shippingInfo=useSelector((state)=>state.cart.shippingInfo);
const  user  = useSelector((state) => state.userAuth.user);


// const { shippingInfo, cartItems } = useSelector((state) => state.cart);
// const { user } = useSelector((state) => state.userAuth);




const address=`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

     
const subtotal=cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0);
const shippingCharges=subtotal > 1000 ? 0 : 100;
const tax=subtotal*.18;
const totalPrice=subtotal+shippingCharges+tax;

const ProceedToPayment=()=>{
 const data={
        subtotal,
        shippingCharges,
        tax,
        totalPrice
    }

sessionStorage.setItem("orderInfo",JSON.stringify(data));
navigate("/process/payment");

}

return (
   <Fragment>
      <MetaData title="Confirm Order"/>
    

      <div className="confirmOrderPage">
            <div>
                    <div className="confirmShippingArea">
                        <Typography>Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p><span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p><span>{shippingInfo.phoneNumber}</span>
                            </div>
                            <div>
                                <p>Address:</p><span>{address}</span>
                            </div>
                        </div>
                    </div>

                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems&&cartItems.map((item)=>(
                                <div key={item.productId}>
                                    <img src={item.image} alt={item.name} />
                                    <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                    <span>{item.quantity}X ₹{item.price}=<b>₹{item.quantity*item.price}</b></span>
                                </div>
                            ))}
                        </div>
                    </div>



            </div>




            <div>
                <div className="orderSummary">
                    <Typography>Order Summary</Typography>
                    <div>
                        <div>
                            <p>SubTotal:</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges:</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST:</p>
                            <span>₹{tax}</span>
                        </div>
                    </div>
               


                    <div className="orderSummaryTotal">
                        <p>Total:</p>
                        <span>₹{totalPrice}</span>
                    </div>

                    <button onClick={ProceedToPayment}>Proceed To Payment</button>
                </div>
            </div>


      </div>
   </Fragment>
  )
}

export default UpdateOrderAdmin