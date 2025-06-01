import {createStore,combineReducers,applyMiddleware} from "redux";
import {thunk} from "redux-thunk";
//import thunk from "redux-thunk"; it throws error
import {composeWithDevTools} from "redux-devtools-extension"

import {
         allProductsReducer,
         productDetailsReducer,
         newReviewReducer,
         allProductsAdminReducer,
         CUDProductAdminReducer
} from "./reducers/productReducers"

import {
         userAuthReducer, 
         userUpdateReducer,
         userForgotPasswordReducer,

         allUsersAdminReducer,
         userDetailsAdminReducer,
         UDUserAdminReducer
} from "./reducers/userReducer";

import { 
        cartReducer 
} from "./reducers/cartReducer";

import { 
         newOrderReducer,
         myOrdersReducer,
         orderDetailsReducer,
         allOrdersAdminReducer,
         UDOrderAdminReducer
} from "./reducers/orderReducer";

const reducer=combineReducers({
    allProducts:allProductsReducer,
    productDetails:productDetailsReducer,
    newReview:newReviewReducer,
    allProductsAdmin:allProductsAdminReducer,
    CUDProductAdmin:CUDProductAdminReducer,


    userAuth:userAuthReducer,
    userUpdate:userUpdateReducer,
    userForgotPassword:userForgotPasswordReducer,
    allUsersAdmin:allUsersAdminReducer,
    userDetailsAdmin:userDetailsAdminReducer,
    UDUserAdmin:UDUserAdminReducer,

    cart:cartReducer,

    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    allOrdersAdmin:allOrdersAdminReducer,
    UDOrderAdmin:UDOrderAdminReducer
});
let initialState={
    cart:{
        cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
        shippingInfo:localStorage.getItem("shippingInfo") ?JSON.parse(localStorage.getItem("shippingInfo")):{}      
    }
};
const middleware=[thunk];

const store=createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware),
    ));

// module.exports=store;  //why this is not working ??

  export  default store;