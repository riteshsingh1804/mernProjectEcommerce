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


export const newOrderReducer=(state={order:{}},action)=>{
switch(action.type){
            case CREATE_ORDER_REQUEST:
            return {
                  ...state,
                  loading:true
            }
            case CREATE_ORDER_SUCCESS:
            return {
                   ...state,
                   loading:false,
                   order:action.payload
            }
            case CREATE_ORDER_FAIL:
            return {
                 ...state,
                 loading:false,
                 error:action.payload
            }
            case CLEAR_ERRORS:
            return {
                ...state,
                loading:false,
                error:null
            } 
            default:
                return state;  
}
}   

export const myOrdersReducer=(state={orders:[]},action)=>{
    switch(action.type){
                case MY_ORDERS_REQUEST:
                return {
                      ...state,
                      loading:true
                }
                case MY_ORDERS_SUCCESS:
                return {
                       ...state,
                       loading:false,
                       orders:action.payload
                }
                case MY_ORDERS_FAIL:
                return {
                     ...state,
                     loading:false,
                     error:action.payload
                }
                case CLEAR_ERRORS:
                return {
                    ...state,
                    loading:false,
                    error:null
                } 
                default:
                    return state;  
    }
    }   


export const orderDetailsReducer=(state={order:{}},action)=>{
    switch(action.type){
                case ORDER_DETAILS_REQUEST:
                return {
                        ...state,
                        loading:true
                }
                case ORDER_DETAILS_SUCCESS:
                return {
                        ...state,
                        loading:false,
                        order:action.payload
                }
                case ORDER_DETAILS_FAIL:
                return {
                        ...state,
                        loading:false,
                        error:action.payload
                }
                case CLEAR_ERRORS:
                return {
                    ...state,
                    loading:false,
                    error:null
                } 
                default:
                    return state;  
    }
    }      





//Admin reducers


//all orders admin
    export const allOrdersAdminReducer=(state={orders:[]},action)=>{
        switch(action.type){
                    case ALL_ORDERS_REQUEST_ADMIN:
                    return {
                          ...state,
                          loading:true
                    }
                    case ALL_ORDERS_SUCCESS_ADMIN:
                    return {
                           ...state,
                           loading:false,
                           orders:action.payload
                    }
                    case ALL_ORDERS_FAIL_ADMIN:
                    return {
                         ...state,
                         loading:false,
                         error:action.payload
                    }
                    case CLEAR_ERRORS:
                    return {
                        ...state,
                        loading:false,
                        error:null
                    } 
                    default:
                        return state;  
        }
        }   
 
//update delete order reducer
export const UDOrderAdminReducer=(state={},action)=>{
    switch(action.type){
                case UPDATE_ORDER_REQUEST_ADMIN:
                case DELETE_ORDER_REQUEST_ADMIN:    
                return {
                      ...state,
                      loading:true
                }



                case UPDATE_ORDER_SUCCESS_ADMIN:
                return {
                       ...state,
                       loading:false,
                       isUpdated:action.payload
                }
                case DELETE_ORDER_SUCCESS_ADMIN:
                return {
                       ...state,
                       loading:false,
                       isDeleted:action.payload
                }

                
                case UPDATE_ORDER_RESET_ADMIN:
                    return{
                          ...state,
                          loading:false,
                          isUpdated:false
                          
              };    
                case DELETE_ORDER_RESET_ADMIN:
                    return{
                          ...state,
                          loading:false,
                          isDeleted:false
                          
              };     
           


                case UPDATE_ORDER_FAIL_ADMIN:
                case DELETE_ORDER_FAIL_ADMIN:
                return {
                     ...state,
                     loading:false,
                     error:action.payload
                }
                
                case CLEAR_ERRORS:
                return {
                    ...state,
                    loading:false,
                    error:null
                } 
                default:
                    return state;  
    }
    }   
        