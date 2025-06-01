import isURL from "validator/lib/isURL";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    
    
    
    
    
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,

    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,

    
    
    
    
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    
    
    
ALL_USERS_REQUEST_ADMIN,
ALL_USERS_SUCCESS_ADMIN,
ALL_USERS_FAIL_ADMIN,

USER_DETAILS_REQUEST_ADMIN,
USER_DETAILS_SUCCESS_ADMIN,
USER_DETAILS_FAIL_ADMIN,

UPDATE_USER_REQUEST_ADMIN,
UPDATE_USER_SUCCESS_ADMIN,
UPDATE_USER_RESET_ADMIN,
UPDATE_USER_FAIL_ADMIN,

DELETE_USER_REQUEST_ADMIN,
DELETE_USER_SUCCESS_ADMIN,
DELETE_USER_RESET_ADMIN,
DELETE_USER_FAIL_ADMIN,




CLEAR_ERRORS






} from "../constants/userConstants";

// to handle LOGIN/REGISTER/LOGOUT/LOAD_USER
export const userAuthReducer=(state={user:{}},action)=>{
   switch(action.type){
    case LOGIN_REQUEST:
        case REGISTER_REQUEST:
            case LOAD_USER_REQUEST:
             return{
                ...state,
                loading:true,
                isAuthenticated:false
             }
    case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            case LOAD_USER_SUCCESS:
              return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
              }
             
              
    case LOGOUT_SUCCESS:
        return  {
            ...state,
            user:null,
            loading:false,
            isAuthenticated:false    
        }        
    case LOGIN_FAIL:
        case REGISTER_FAIL:
            case LOAD_USER_FAIL:
                 return{
                    ...state,
                    loading:false,
                    isAuthenticated:false,
                    user:null,
                    error:action.payload,
                 }
      case LOGOUT_FAIL:
        return{
              ...state,
              loading:false,
              error:action.payload
        }           
    case CLEAR_ERRORS:
        return{
            ...state,
            error:null
        }             
    default:
        return state;
   }
     
}


//userUpdateReducer
//to handle profile update/password update
export const userUpdateReducer=(state={},action)=>{
    switch(action.type){
            case UPDATE_PROFILE_REQUEST:
                case UPDATE_PASSWORD_REQUEST:
            return{
                 ...state,
                 loading:true,
            }
            case UPDATE_PROFILE_SUCCESS:
                case UPDATE_PASSWORD_SUCCESS:
            return{
                 ...state,
                 loading:false,
                 isUpdated:action.payload
            }
            case UPDATE_PROFILE_RESET:
                case UPDATE_PASSWORD_RESET:
            return{
                 ...state,
                 loading:false,
                 isUpdated:false
            }
            case UPDATE_PROFILE_FAIL:
                case UPDATE_PASSWORD_FAIL:
            return{
                 ...state,
                 loading:false,
                 error:action.payload,
                 
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                } 
          default:
             return state        
    }


}


export const userForgotPasswordReducer=(state={},action)=>{
    switch(action.type){
            case FORGOT_PASSWORD_REQUEST:
                case RESET_PASSWORD_REQUEST:
            return{
                 ...state,
                 loading:true,
                 //error:null
            }
            case FORGOT_PASSWORD_SUCCESS:
            return{
                 ...state,
                 loading:false,
                 message:action.payload
            }
            case RESET_PASSWORD_SUCCESS:
            return{
                    ...state,
                    loading:false,
                    success:action.payload
            }
            
            case FORGOT_PASSWORD_FAIL:
                case RESET_PASSWORD_FAIL:
            return{
                 ...state,
                 loading:false,
                 error:action.payload,
                 
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                } 
          default:
             return state        
    }
}


//admin Reducers
export const allUsersAdminReducer=(state={users:[]},action)=>{
    switch(action.type){
            case ALL_USERS_REQUEST_ADMIN:
            return{
                 ...state,
                 loading:true,
                 //error:null
            }
            case ALL_USERS_SUCCESS_ADMIN:
            return{
                 ...state,
                 loading:false,
                 users:action.payload
            }
           case ALL_USERS_FAIL_ADMIN:
            return{
                 ...state,
                 loading:false,
                 error:action.payload,
                 
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                } 
          default:
             return state        
    }

}

export const userDetailsAdminReducer=(state={user:{}},action)=>{
    switch(action.type){
            case USER_DETAILS_REQUEST_ADMIN:
            return{
                 ...state,
                 loading:true,
                 //error:null
            }
            case USER_DETAILS_SUCCESS_ADMIN:
            return{
                 ...state,
                 loading:false,
                 user:action.payload
            }
           case USER_DETAILS_FAIL_ADMIN:
            return{
                 ...state,
                 loading:false,
                 error:action.payload,
                 
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                } 
          default:
             return state        
    }

}



export const UDUserAdminReducer=(state={},action)=>{
    switch(action.type){
            case UPDATE_USER_REQUEST_ADMIN:
            case DELETE_USER_REQUEST_ADMIN:    
            return{
                 ...state,
                 loading:true,
                 //error:null
            }


            case UPDATE_USER_SUCCESS_ADMIN:
            return{
                 ...state,
                 loading:false,
                 isUpdated:action.payload.success,
                 message:action.payload.message
            }
            case DELETE_USER_SUCCESS_ADMIN:
            return{
                ...state,
                loading:false,
                isDeleted:action.payload.success,
                message:action.payload.message
            }


           case UPDATE_USER_RESET_ADMIN:
            return{
                 ...state,
                 loading:false,
                 isUpdated:false,
                 
            }
            case DELETE_USER_RESET_ADMIN:
            return{
                 ...state,
                 loading:false,
                 isDeleted:false,
            }


            case UPDATE_USER_FAIL_ADMIN:
            case DELETE_USER_FAIL_ADMIN:
            return{
                ...state,
                loading:false,
                error:action.payload,
                    
            }
            case CLEAR_ERRORS:
                return{
                    ...state,
                    error:null
                } 
          default:
             return state        
    }

}