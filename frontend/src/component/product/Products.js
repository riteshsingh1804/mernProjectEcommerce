import React ,{Fragment,useState,useEffect}from 'react'
import "./products.css";
import { useParams } from 'react-router-dom';

import {useSelector,useDispatch} from "react-redux";
import { clearAllErrors,getAllProducts } from '../../actions/productActions';

import Loader from '../layout/loader/Loader';
import ProductCard from '../home/ProductCard';

import Pagination from 'react-js-pagination';

import Slider from "@material-ui/core/Slider";
import {Typography}  from '@mui/material';

import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData"
const categories=[
       
        "Bottom",
        "Tops",
        "Attire",
        "Footwear",
        "Camera",
        "SmartPhones",
        "Laptop",
        "Watch"
]

const Products = () => {
  
const dispatch=useDispatch();
const {keyword}=useParams();
const alert=useAlert();
// console.log("keyword");
// console.log(keyword);


const {products,loading,error,resultsPerPage,FilteredProductsCount}=useSelector(state=>state.allProducts);
const [currentPage,setCurrentPage]=useState(1);
const [price,setPrice]=useState([0,25000]);
const [category,setCategory]=useState("");
const [rating,setRating]=useState(0);

const currentPageHandler=(e)=>{
    setCurrentPage(e);
    
}

const priceHandler=(e,newPrice)=>{
    setPrice(newPrice);
    setCurrentPage(1);
}

const ratingHandler=(e,newRating)=>{
    setRating(newRating);
    setCurrentPage(1);
}


 const categoryHandler=(newCategory)=>{
    setCategory(newCategory);
    setCurrentPage(1);
}
useEffect(()=>{
    if(error){
        alert(error);
        dispatch(clearAllErrors());
    }
 dispatch(getAllProducts(keyword,currentPage,price,category,rating));
},[dispatch,keyword,currentPage,price,category,rating,alert,error])
  
  

  
return (
  <Fragment>
    {
        loading?(<Loader/>)
        :(
              <Fragment>
                <MetaData title="PRODUCTS --ECOMMERCE"/>
                <h2 className="productsHeading">Products</h2>
                
                <div className="products">
                    {
                        products&&products.map((item,index)=>(
                            <ProductCard key={index} product={item}/>
                        ))
                    }
                </div>
              
                <div className="filterBox">
                    
                    <Typography>Price</Typography>
                    <Slider
                    value={price}
                    onChange={priceHandler}

                    valueLabelDisplay='on'
                    aria-labelledby='range-slider'
                    min={0}
                    max={25000}
                    
                    />

                    <Typography>Categories</Typography>
                    <ul className="categoryBox">
                        {categories.map((item)=>(
                            <li
                              className='category-link'
                              key={item}
                              onClick={()=>categoryHandler(item)}
                               
                            >
                            {item}
                           </li>
                        ))}
                    </ul>


                    <fieldset>
                        <Typography component="legend">Ratings Above</Typography>
                        <Slider
                           value={rating}
                           onChange={ratingHandler}
                           aria-labelledby='"continuous-slider'
                           min={0}
                           max={5}
                           valueLabelDisplay='auto'
                        />
                    </fieldset>



                </div>

                {
                    resultsPerPage<FilteredProductsCount
                    &&( 
                    <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultsPerPage}
                        totalItemsCount={FilteredProductsCount}
                        onChange={currentPageHandler}
                        
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                        activeLinkClass='pageLinkActive'
                    />
                 </div>)
                }
              
              </Fragment>
        )
    }
  </Fragment>


)


}




export default Products