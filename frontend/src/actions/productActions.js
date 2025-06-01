import {ALL_PRODUCTS_REQUEST,
        ALL_PRODUCTS_SUCCESS,
        ALL_PRODUCTS_FAIL,

        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS,
        PRODUCT_DETAILS_FAIL,

        NEW_REVIEW_REQUEST,
        NEW_REVIEW_SUCCESS,
        NEW_REVIEW_RESET,
        NEW_REVIEW_FAIL,







        ALL_PRODUCTS_REQUEST_ADMIN,
        ALL_PRODUCTS_SUCCESS_ADMIN,
        ALL_PRODUCTS_FAIL_ADMIN,
        
        CREATE_PRODUCT_REQUEST_ADMIN,
        CREATE_PRODUCT_SUCCESS_ADMIN,
        CREATE_PRODUCT_RESET_ADMIN,
        CREATE_PRODUCT_FAIL_ADMIN,

        UPDATE_PRODUCT_REQUEST_ADMIN,
        UPDATE_PRODUCT_SUCCESS_ADMIN,
        UPDATE_PRODUCT_RESET_ADMIN,
        UPDATE_PRODUCT_FAIL_ADMIN,

        DELETE_PRODUCT_REQUEST_ADMIN,
        DELETE_PRODUCT_SUCCESS_ADMIN,
        DELETE_PRODUCT_RESET_ADMIN,
        DELETE_PRODUCT_FAIL_ADMIN,
  
        
        CLEAR_ALL_ERRORS } from "../constants/productConstants";

import axios from "axios";


//get All Products
export const getAllProducts=(keyword="",currentPage=1,price=[0,25000],category="",rating=0)=>async(dispatch)=>{
try{
    dispatch({   type:ALL_PRODUCTS_REQUEST  });
    // const data1={
    //     products:[],
    //     FilteredProductsCount:10
    // }
    let link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;
     if(category){
        link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
     }
     console.log("link");
     console.log(link);
    //pata nhi kyu price filter kam nhi kar rha tha check again
    const {data}=await axios.get(link);
    //  let a={
    //     p:"P",
    //     q:"Q"
    //  }
    //  console.log("a1");
    //  console.log(a);
    //  a={
    //     q:"QQ",
    //     ...a,
       
    //  }
    //  console.log("a2");
    //  console.log(a);
    //  a={
    //     ...a,
    //     q:"QQ",
        
    //  }
    //  console.log("a3");
    //  console.log(a);
    
    dispatch({   type:ALL_PRODUCTS_SUCCESS,  payload:data });
}
catch(error){
     dispatch({   type:ALL_PRODUCTS_FAIL, payload:error, })
}

}



export const getProductDetails=(id)=>async(dispatch)=>{
    try{
         dispatch({type:PRODUCT_DETAILS_REQUEST});

         const {data}=await axios.get(`/api/v1/product/${id}`);
         
         dispatch({  type:PRODUCT_DETAILS_SUCCESS,   payload:data   })

        }
    catch(error){
        dispatch({  type:PRODUCT_DETAILS_FAIL,payload:error   })
    }
}


//new Review
export const newReview=(reviewData)=>async(dispatch)=>{
    try{
         dispatch({type:NEW_REVIEW_REQUEST});

         const {data}=await axios.put(`/api/v1/review`,reviewData,{headers:{"Content-Type":"application/json"}});
         
         dispatch({  type:NEW_REVIEW_SUCCESS,  payload:data.success  })

        }
    catch(error){
         dispatch({   type:NEW_REVIEW_FAIL,  payload:error.response.data.message  })
    }
}





















//Admin Actions
////get All Products(ADMIN)
export const allProductsAdmin=()=>async(dispatch)=>{
    try{
        dispatch({   type:ALL_PRODUCTS_REQUEST_ADMIN  });
       
          const {data}=await axios.get(`/api/v1/admin/products`);
        
        dispatch({ type:ALL_PRODUCTS_SUCCESS_ADMIN, payload:data });
    }
    catch(error){
         dispatch({  type:ALL_PRODUCTS_FAIL_ADMIN,   payload:error,  })
    }
    
    }


//create new product (ADMIN)
export const createProductAdmin=(productData)=>async(dispatch)=>{
    try{
        dispatch({   type:CREATE_PRODUCT_REQUEST_ADMIN  });
        
            const {data}=await axios.post(
                `/api/v1/admin/product/new`,
                productData, 
                {headers:{"Content-Type":"multipart/form-data"}}
            );
        
        dispatch({ type:CREATE_PRODUCT_SUCCESS_ADMIN, payload:data });
    }
    catch(error){
            dispatch({  type:CREATE_PRODUCT_FAIL_ADMIN,   payload:error,  })
    }
    
    }

//delete a product (ADMIN)
export const deleteProductAdmin=(id)=>async(dispatch)=>{
    try{
        dispatch({   type:DELETE_PRODUCT_REQUEST_ADMIN  });
        
            const {data}=await axios.delete(`/api/v1/admin/product/${id}`);
        
        dispatch({ type:DELETE_PRODUCT_SUCCESS_ADMIN, payload:data });
    }
    catch(error){
            dispatch({  type:DELETE_PRODUCT_FAIL_ADMIN,   payload:error,  })
    }
    
    }

//update a product(ADMIN)
export const updateProductAdmin=(id,productData)=>async(dispatch)=>{
    try{
        dispatch({   type:UPDATE_PRODUCT_REQUEST_ADMIN  });
        
        const {data}=await axios.put(
            `/api/v1/admin/product/${id}`,
            productData, 
            {headers:{"Content-Type":"multipart/form-data"}}
        );
        
        dispatch({ type:UPDATE_PRODUCT_SUCCESS_ADMIN, payload:data });
    }
    catch(error){
            dispatch({  type:UPDATE_PRODUCT_FAIL_ADMIN,   payload:error,  })
    }
    
    }














//To Clear all the errors
export const clearAllErrors=()=>async(dispatch)=>{
    dispatch({    type:CLEAR_ALL_ERRORS  })
}