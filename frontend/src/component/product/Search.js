import React ,{useState,useEffect,Fragment}from 'react'
import "./search.css"

import { useNavigate  } from 'react-router-dom';
import MetaData from '../layout/MetaData';



const Search = () => {
  
  const [keyword,setKeyword]=useState("");
  
  let navigate = useNavigate();

  const searchSubmitHandler=(e)=>{
    e.preventDefault();
    if(keyword.trim()){
      //  console.log("hi");
        navigate(`/products/${keyword.trim()}`);
    }
    else{
        navigate('/products');
    }
    
  }
  
return (
    <Fragment>
        <MetaData title="SEARCH A PRODUCT --ECOMMERCE"/>
   <form className='searchBox' onSubmit={searchSubmitHandler}>
      <input
                type="text" 
                placeholder="Search any Product..." 
                onChange={(e)=>setKeyword(e.target.value)}/>

       <input type="submit" value="Search" />
   </form>
    </Fragment>

)
}

export default Search