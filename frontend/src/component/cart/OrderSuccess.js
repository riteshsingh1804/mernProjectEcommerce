import React from 'react'
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';


import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import "./orderSuccess.css";
const OrderSuccess = () => {
  return (
   <div className="orderSuccess">
    <CheckCircleIcon/>
    <Typography>Your Order has been Placed Successfully</Typography>
    <Link to="/orders">View Orders</Link>
   </div>
  )
}

export default OrderSuccess