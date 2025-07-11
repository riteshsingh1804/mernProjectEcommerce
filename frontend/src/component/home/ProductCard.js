import React from 'react'
import {Link} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import "./productCard.css";



const ProductCard = ({product}) => {
  const reactStarsOptions={
    value:product.ratings,
    size:window.innerWidth<600 ? 20 : 25,
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    isHalf:true,
    }
  return (
    <Link className='productCard' to={`/product/${product._id}`} >
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...reactStarsOptions}/>  <span>({product.numOfReviews} Reviews)</span>
        </div>
        <span>{`₹${product.price}`}</span>
    </Link>
  )
}

export default ProductCard