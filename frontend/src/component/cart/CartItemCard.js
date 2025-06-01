import React from 'react'
import "./cartItemCard.css";
import {Link} from "react-router-dom";

const CartItemCard = ({item,deleteItemFromCart}) => {
  return (
   <div className="cartItemCard">
       <img src={item.image} alt={`${item.name} Image`} />
       <div>
            <Link to={`/product/${item.productId}`}>{item.name}</Link>
            <span>{`Price: ₹ ${item.price}`}</span>
            <p onClick={()=>deleteItemFromCart(item.productId)}>Remove</p>
       </div>
   </div>
  )
}

export default CartItemCard