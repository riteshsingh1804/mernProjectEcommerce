import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,

    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,



    ALL_ORDERS_REQUEST_ADMIN,
    ALL_ORDERS_SUCCESS_ADMIN,
    ALL_ORDERS_FAIL_ADMIN,
   
    UPDATE_ORDER_REQUEST_ADMIN,
    UPDATE_ORDER_SUCCESS_ADMIN,
    UPDATE_ORDER_RESET_ADMIN,
    UPDATE_ORDER_FAIL_ADMIN,

    DELETE_ORDER_REQUEST_ADMIN,
    DELETE_ORDER_SUCCESS_ADMIN,
    DELETE_ORDER_RESET_ADMIN,
    DELETE_ORDER_FAIL_ADMIN,


    CLEAR_ERRORS 
} from "../constants/orderConstants";

import axios from "axios";


//create Order
export const newOrder=(newOrderData)=>async(dispatch,getState)=>{
  try{
   dispatch({type:CREATE_ORDER_REQUEST});

   const {data}=await axios.post("/api/v1/order/new",
    newOrderData,
    {headers:{"Content-Type":"application/json"}}
)
   
    dispatch({type:CREATE_ORDER_SUCCESS,payload:data.order});

  } 
  catch(error){
    dispatch({type:CREATE_ORDER_FAIL,payload:error.response.data.message});
  }  

}


//My Orders
export const myOrders=()=>async(dispatch,getState)=>{
  try{
   dispatch({type:MY_ORDERS_REQUEST});

   const {data}=await axios.get("/api/v1/orders/me");

    dispatch({type:MY_ORDERS_SUCCESS,payload:data.orders});

  } 
  catch(error){
    dispatch({type:MY_ORDERS_FAIL,payload:error.response.data.message});
  }  

}


//Order Details
export const orderDetails=(id)=>async(dispatch,getState)=>{
  try{
   dispatch({type:ORDER_DETAILS_REQUEST});

   const {data}=await axios.get(`/api/v1/order/${id}`);

    dispatch({type:ORDER_DETAILS_SUCCESS,payload:data.order});

  } 
  catch(error){
    dispatch({type:ORDER_DETAILS_FAIL,payload:error.response.data.message});
  }  

}





//Admin 
//all orders admin
export const allOrdersAdmin=()=>async(dispatch,getState)=>{
  try{
   dispatch({type:ALL_ORDERS_REQUEST_ADMIN});

   const {data}=await axios.get("/api/v1/admin/orders");

    dispatch({type:ALL_ORDERS_SUCCESS_ADMIN,payload:data.orders});

  } 
  catch(error){
    dispatch({type:ALL_ORDERS_FAIL_ADMIN,payload:error.response.data.message});
  }  

}

//update order admin 
export const updateOrderAdmin=(id,orderData)=>async(dispatch,getState)=>{
  try{
   dispatch({type:UPDATE_ORDER_REQUEST_ADMIN});
  
   const {data}=await axios.put(
    `/api/v1/admin/order/${id}`,
    orderData, 
    {headers:{"Content-Type":"application/json"}}
);
   dispatch({type:UPDATE_ORDER_SUCCESS_ADMIN,payload:data.success});
  }
  catch(error){
    dispatch({type:UPDATE_ORDER_FAIL_ADMIN,payload:error.response.data.message});
  }
}


//delete order admin
export const deleteOrderAdmin=(id)=>async(dispatch,getState)=>{
  try{
   dispatch({type:DELETE_ORDER_REQUEST_ADMIN});
  
   const {data}=await axios.delete(`/api/v1/admin/order/${id}`);
   dispatch({type:DELETE_ORDER_SUCCESS_ADMIN,payload:data.success});
  }
  catch(error){
    dispatch({type:DELETE_ORDER_FAIL_ADMIN,payload:error.response.data.message});
  }
}





export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}