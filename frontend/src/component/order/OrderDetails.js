import React,{useEffect,useState,Fragment} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';

import { orderDetails,clearErrors } from '../../actions/orderActions';


import "./orderDetails.css";
const OrderDetails = () => {

    const dispatch=useDispatch();
    const alert=useAlert();
    const {id}=useParams();

    const {order,error,loading}=useSelector((state)=>state.orderDetails);



useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors);
    }
    dispatch(orderDetails(id));
},[error,dispatch,alert,id])  

  return (
    <Fragment>
    {loading ? (
      <Loader />
    ) : (
      <Fragment>
        <MetaData title="Order Details" />
        <div className="orderDetailsPage">
                <div className="orderDetailsContainer">
                        <Typography component="h1">Order #{order && order._id}</Typography>
                        
                        
                        
                        <Typography>Shipping Info</Typography>
                        <div className="orderDetailsContainerBox">
                        <div>
                            <p>Name:</p>
                            <span>{order.userId && order.userId.name}</span>
                        </div>
                        <div>
                            <p>Phone:</p>
                            <span>
                            {order.shippingInfo && order.shippingInfo.phoneNumber}
                            </span>
                        </div>
                        <div>
                            <p>Address:</p>
                            <span>
                            {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                            </span>
                        </div>
                        </div>
                        
                       
                       
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                        <div>
                            <p className={ order.paymentInfo && order.paymentInfo.paymentStatus === "succeeded" ? "greenColor" : "redColor" }>
                             {order.paymentInfo && order.paymentInfo.paymentStatus === "succeeded"? "PAID" : "NOT PAID"}
                            </p>
                        </div>

                        <div>
                            <p>Amount:</p>
                            <span>{order.totalPrice && order.totalPrice}</span>
                        </div>
                        </div>

                        
                        
                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                        <div>
                            <p className={ order.orderStatus && order.orderStatus === "Delivered" ? "greenColor" : "redColor" } >
                                {order.orderStatus && order.orderStatus}
                            </p>
                        </div>
                        </div>
                </div>

                <div className="orderDetailsCartItems">
                    <Typography>Order Items:</Typography>
                    <div className="orderDetailsCartItemsContainer">
                    {order.orderItems &&
                        order.orderItems.map((item) => (
                        <div key={item.productId}>
                            <img src={item.image} alt="Product" />
                            <Link to={`/product/${item.productId}`}>{item.name}</Link>
                            <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                            </span>
                        </div>
                        ))}
                    </div>
                </div>
        </div>
      </Fragment>
    )}
  </Fragment>
  )
}

export default OrderDetails