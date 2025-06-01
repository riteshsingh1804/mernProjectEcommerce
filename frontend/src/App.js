
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import WebFont from "webfontloader";
import React from "react"

import Header from "./component/layout/header/Header.js";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/home/Home";
// import Loader from "./component/layout/loader/Loader.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js";

import LoginRegister from './component/user/LoginRegister.js';
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile.js";
import UpdatePassword from "./component/user/UpdatePassword.js";
import UserOptions from "./component/layout/header/UserOptions.js";

import ForgotPassword from './component/user/ForgotPassword.js';
import ResetPassword from './component/user/ResetPassword.js';


import Cart from "./component/cart/Cart.js";
import Shipping from "./component/cart/Shipping.js";
import ConfirmOrder from './component/cart/ConfirmOrder.js';
import Payment from './component/cart/Payment.js';
import OrderSuccess from './component/cart/OrderSuccess.js';


import MyOrders from './component/order/MyOrders.js';



import Dashboard from "./component/admin/Dashboard.js";
import AllProductsAdmin from './component/admin/AllProductsAdmin.js';
import CreateProductAdmin from './component/admin/CreateProductAdmin.js';
import UpdateProductAdmin from "./component/admin/UpdateProductAdmin.js";
import AllOrdersAdmin from "./component/admin/AllOrdersAdmin.js"
import UpdateOrderAdmin from "./component/admin/UpdateOrderAdmin.js"
import AllUsersAdmin from './component/admin/AllUsersAdmin.js';



import store from "./store.js";

import { loadUser } from './actions/userActions.js';
import { useSelector } from 'react-redux';


//things done for payment
import { Fragment } from 'react';
import { useState,useEffect } from 'react';

import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderDetails from './component/order/OrderDetails.js';

function App() {

  const {isAuthenticated,loading,user} =useSelector((state)=>state.userAuth);
  
  const [stripeApiKey,setApiStripeKey]=useState("");
  
  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");
    console.log("stripeapikey from frontend");
    console.log(data);
    setApiStripeKey(data.stripeApiKey);
  }
  React.useEffect(()=>{
    WebFont.load({
     google:{
       families:["Roboto","Montserrat","Droid Sans"]
     }
    });


    store.dispatch(loadUser());
    getStripeApiKey();

   },[]);

  //  useEffect(() => {
  //   const stripePromise= loadStripe(stripeApiKey);
  //   console.log("stripePromise from frontend");
  //   console.log(stripePromise);
  //  }, [stripeApiKey]);
 


  return (
   <Router>
         <Header/>
              
          {isAuthenticated && <UserOptions user={user}/>}
       <Routes>
          
          <Route exact  path='/' element={<Home/>} />
          {/* <Route exact  path='/' element={<Loader/>} /> */}
          <Route exact path="/product/:id" element={<ProductDetails/>}/>
          <Route exact path="/products" element={<Products/>}/> 
          <Route path="/products/:keyword" element={<Products/>}/> 
          <Route exact path="/search" element={<Search/>}/>
          
         
         
           <Route exact path="login" element={<LoginRegister/>}/>
          
           {isAuthenticated &&<Route exact path="/account"element={<Profile/>}/>}
          {/* <Route exact path="/account"element={<Profile/>}/>  */}
      
           {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>}/>}
           {isAuthenticated && <Route exact path="/password/update" element={<UpdatePassword/>}/>}
      
         <Route exact path="/password/forgot" element= {<ForgotPassword/>}/>
         <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>



         <Route exact path="/cart" element={<Cart/>}/>
        {isAuthenticated &&<Route exact path="/shipping"element={<Shipping/>}/>}
        {isAuthenticated &&<Route exact path="/order/confirm"element={<ConfirmOrder/>}/>}
        {stripeApiKey && isAuthenticated &&
          (
            <Route exact path="/process/payment" element=
            {
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment/>
            </Elements>
            }
            />
          )}
         {isAuthenticated &&<Route exact path="/success" element={<OrderSuccess/>}/>}




        {isAuthenticated && <Route exact path="/orders" element={<MyOrders/>}/>}
        {isAuthenticated && <Route exact path="/order/:id" element={<OrderDetails/>}/>}


        



        {isAuthenticated && (user.role==="admin") &&
        <Route exact path="/admin/dashboard" element={<Dashboard/>}/>}

       {isAuthenticated && (user.role==="admin") &&
        <Route exact path="/admin/products" element={<AllProductsAdmin/>}/>}
  
        {isAuthenticated && (user.role==="admin") &&
        <Route exact path="/admin/product/new" element={<CreateProductAdmin/>}/>}

        {isAuthenticated && (user.role==="admin") &&
        <Route exact path="/admin/product/:id" element={<UpdateProductAdmin/>}/>}

        {isAuthenticated && (user.role==="admin") && 
        <Route exact path="/admin/orders" element={<AllOrdersAdmin/>}/>}

        {isAuthenticated && (user.role==="admin") && 
        <Route exact path="/admin/order/:id" element={<UpdateOrderAdmin/>}/>}

        {isAuthenticated && (user.role==="admin") && 
        <Route exact path="/admin/users" element={<AllUsersAdmin/>}/>}




       </Routes>
       
 
        
         
         <Footer/>
   </Router>
 

  );
}

export default App;
