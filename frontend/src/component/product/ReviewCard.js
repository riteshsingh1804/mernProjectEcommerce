import React from 'react'
import ReactStars from "react-rating-stars-component";

import "./reviewCard.css"

const ReviewCard = ({review}) => {

    const reactStarsOptions={
        value:review.rating,
        size:window.innerWidth<600 ? 20 : 25,
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        isHalf:true,
        } 



  return (
   <div className='reviewCard'>
       <img src="/Sudarshan1.png" alt="profile Image" />
       <p>{review.name}</p>
       <ReactStars  {...reactStarsOptions}/>
       <span>{review.comment}</span>
   </div>
  )
}

export default ReviewCard