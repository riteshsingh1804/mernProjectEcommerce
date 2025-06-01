import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg";
import "./home.css";
import ProductCard from "./ProductCard.js";
import Loader from "../layout/loader/Loader.js";

import MetaData from '../layout/MetaData.js';
import {clearAllErrors, getAllProducts} from "../../actions/productActions.js"
import {useSelector,useDispatch} from "react-redux";

import {useAlert} from "react-alert";

// const product={
//   name:"Blue Tshirt",
//   images:[{url:"https://i.ibb.co/DRST11n/1.webp"},],
//   price:"₹3000",
//   _id:"sudarshan"
// }

const Home = () => {

  
// const product={
//   name:"Blue Tshirt",
//   images:[{url:"https://i.ibb.co/DRST11n/1.webp"},],
//   price:"₹3000",
//   _id:"sudarshan"
// }
  const alert=useAlert();
//FilteredProductsCount
  const {loading,error,products} =useSelector(state=>state.allProducts);

  const dispatch=useDispatch();
  
  useEffect(()=>{
    if(error){
       alert.error(error);
       dispatch(clearAllErrors())
    }
  dispatch(getAllProducts());
  },[dispatch,error,alert])
  
  
  return (
   <Fragment>
    {
      loading
      ?(<Loader/>)
      :( <Fragment>
        <MetaData  title="ECOMMERCE"/>
        <div className="banner">
              <p>Welcome to Ecommerce</p>
              <h1>Find Amazing Products below</h1>
  
              <a href="#container">
                <button>Scroll <CgMouse/></button>
              </a>
         </div>
  
         <h2 className="homeHeading">Featured Products</h2>
  
         <div className="container" id="container">
            {products&&
              products.map((item,index)=>(
                <ProductCard key={index} product={item}/>
              ))
              //mandatory to use "() but not {}"
              //or use return inside map
            }
         
         </div>
  
  
      </Fragment>)

    }
   </Fragment>
  )
}

export default Home