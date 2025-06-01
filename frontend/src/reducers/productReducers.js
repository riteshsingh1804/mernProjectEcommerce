import {
      ALL_PRODUCTS_REQUEST,
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

      DELETE_PRODUCT_REQUEST_ADMIN,
      DELETE_PRODUCT_SUCCESS_ADMIN,
      DELETE_PRODUCT_RESET_ADMIN,
      DELETE_PRODUCT_FAIL_ADMIN,

      UPDATE_PRODUCT_REQUEST_ADMIN,
      UPDATE_PRODUCT_SUCCESS_ADMIN,
      UPDATE_PRODUCT_RESET_ADMIN,
      UPDATE_PRODUCT_FAIL_ADMIN,



      CLEAR_ALL_ERRORS } from "../constants/productConstants";



export const allProductsReducer=(state={products:[]},action)=>{
        switch (action.type){
            case ALL_PRODUCTS_REQUEST:
                     return{
                           ...state,
                           loading:true,
                          
                     };
            case ALL_PRODUCTS_SUCCESS:
                     return{
                           ...state,
                           loading:false,
                           products:action.payload.products,
                           FilteredProductsCount:action.payload.FilteredProductsCount,
                           resultsPerPage:action.payload.resultsPerPage,
                     };
            case ALL_PRODUCTS_FAIL:
                     return{
                           ...state,
                           loading:false,
                           error:action.payload.response.data.message,
                         
                          
                     };
            case CLEAR_ALL_ERRORS:
                     return{
                           ...state,
                           loading:false,
                           error:null,
                           
                           
                     };
            default:
                     return state;

        }
    }


export const  productDetailsReducer=(state={product:{}},action)=>{
     switch(action.type){
      case PRODUCT_DETAILS_REQUEST:
            return{
                        ...state,
                        loading:true
            }
      case PRODUCT_DETAILS_SUCCESS:
            return{
                         ...state,
                         loading:false,
                         product:action.payload.product
            }     
      case PRODUCT_DETAILS_FAIL:
            return{
                         ...state,
                         loading:false,
                         error:action.payload.response.data.message,
            }  
      case CLEAR_ALL_ERRORS:
            return{
                  ...state,
                  loading:false,
                  error:null,
               
            };         
      default:
            return state;        
     }
} 


export const  newReviewReducer=(state={},action)=>{
      switch(action.type){
       case NEW_REVIEW_REQUEST:
             return{
                         ...state,
                         loading:true
             }
       case NEW_REVIEW_SUCCESS:
             return{
                          ...state,
                          loading:false,
                          success:action.payload
             }    
      case NEW_REVIEW_RESET:
            return{
                              ...state,
                              loading:false,
                              success:false
            }          
       case NEW_REVIEW_FAIL:
             return{
                          ...state,
                          loading:false,
                          error:action.payload,
             }  
       case CLEAR_ALL_ERRORS:
             return{
                   ...state,
                   loading:false,
                   error:null,
                
             };         
       default:
             return state;        
      }
 } 






































 export const allProductsAdminReducer=(state={products:[]},action)=>{
      switch (action.type){
          case ALL_PRODUCTS_REQUEST_ADMIN:
                   return{
                         ...state,
                         loading:true,
                        
                   };
          case ALL_PRODUCTS_SUCCESS_ADMIN:
                   return{
                         ...state,
                         loading:false,
                         products:action.payload.products,
                       
                   };
          case ALL_PRODUCTS_FAIL_ADMIN:
                   return{
                         ...state,
                         loading:false,
                         error:action.payload.response.data.message,
                       
                        
                   };
          case CLEAR_ALL_ERRORS:
                   return{
                         ...state,
                         loading:false ,
                         error:null,
                         
                         
                   };
          default:
                   return state;

      }
  }

  export const CUDProductAdminReducer=(state={product:{}},action)=>{
      switch (action.type){
          case CREATE_PRODUCT_REQUEST_ADMIN:
          case DELETE_PRODUCT_REQUEST_ADMIN:  
          case UPDATE_PRODUCT_REQUEST_ADMIN:  
                   return{
                         ...state,
                         loading:true,
                        
                   };



          case CREATE_PRODUCT_SUCCESS_ADMIN:
                   return{
                         ...state,
                         loading:false,
                         product:action.payload.product,
                         isCreated:action.payload.success,
                       
                   };
          case DELETE_PRODUCT_SUCCESS_ADMIN:
                  return{
                        ...state,
                        loading:false,
                      //  product:action.payload.product,
                        isDeleted:action.payload.success,
                        
                  };
          case UPDATE_PRODUCT_SUCCESS_ADMIN:
                  return{
                        ...state,
                        loading:false,
                        product:action.payload.product,
                        isUpdated:action.payload.success,
                        
                  };  




          case CREATE_PRODUCT_RESET_ADMIN:
                  return{
                        ...state,
                        loading:false,
                        isCreated:false
                        
            };       
          case DELETE_PRODUCT_RESET_ADMIN:
                  return{
                        ...state,
                        loading:false,
                        isDeleted:false
                        
            };     
          case UPDATE_PRODUCT_RESET_ADMIN:
                  return{
                        ...state,
                        loading:false,
                        isUpdated:false
                        
            };    
            
            


          case CREATE_PRODUCT_FAIL_ADMIN:
          case DELETE_PRODUCT_FAIL_ADMIN:
          case UPDATE_PRODUCT_FAIL_ADMIN:  
                   return{
                         ...state,
                         loading:false,
                         error:action.payload.response.data.message,  
                   };
          
          
            case CLEAR_ALL_ERRORS:
            return{
                  ...state,
                  loading:false,
                  error:null,
            };
         
           
            default:
                   return state;

      }
  }