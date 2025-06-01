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


    CLEAR_ERRORS,
   

} from "../constants/userConstants";
import axios from "axios";


//Login
export const login=(email,password)=>async(dispatch)=>{

    try{
        dispatch({type:LOGIN_REQUEST});

        const {data}=await axios.post(
            `/api/v1/login`,
            {email,password},
            {headers:{"Content-Type":"application/json"}}
        );

        dispatch({type:LOGIN_SUCCESS,payload:data.user})
    }
    catch(error){
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
    }
}


//Register
export const register=(userData)=>async(dispatch)=>{

    try{
        dispatch({type:REGISTER_REQUEST});

        const {data}=await axios.post(
            `/api/v1/register`,
            userData,
            {headers:{"Content-Type":"multipart/form-data"}}
        );

        dispatch({type:REGISTER_SUCCESS,payload:data.user})
    }
    catch(error){
        dispatch({type:REGISTER_FAIL,payload:error.response.data.message})
    }
}


//Load User data 
export const loadUser=()=>async(dispatch)=>{

    try{
        dispatch({type:LOAD_USER_REQUEST});

        const {data}=await axios.get(`/api/v1/me` );

        dispatch({type:LOAD_USER_SUCCESS,payload:data.user})
    }
    catch(error){
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message})
    }
}

//logout user
export const logout=()=>async(dispatch)=>{

    try{
        await axios.get(`/api/v1/logout`);

        dispatch({type:LOGOUT_SUCCESS})
    }
    catch(error){
        dispatch({type:LOGOUT_FAIL,payload:error.response.data.message})
    }
}



//update Profile
export const updateProfile=(userData)=>async(dispatch)=>{

    try{
        dispatch({type:UPDATE_PROFILE_REQUEST});

        const {data}=await axios.put(
            `/api/v1/me/update`,
            userData,
            {headers:{"Content-Type":"multipart/form-data"}}
        );

        dispatch({type:UPDATE_PROFILE_SUCCESS,payload:data.success});
        
    }
    catch(error){
        dispatch({type:UPDATE_PROFILE_FAIL,payload:error.response.data.message})
    }
}

//Update Password
export const updatePassword=(passwords)=>async(dispatch)=>{

    try{
        dispatch({type:UPDATE_PASSWORD_REQUEST});

        const {data}=await axios.put(
            `/api/v1/password/update`,
            passwords,
            {headers:{"Content-Type":"Application/json"}}
        );

        dispatch({type:UPDATE_PASSWORD_SUCCESS,payload:data.success});
        
    }
    catch(error){
        dispatch({type:UPDATE_PASSWORD_FAIL,payload:error.response.data.message})
    }
}





//Forgot Password
export const forgotPassword=(email)=>async(dispatch)=>{

    try{
        dispatch({type:FORGOT_PASSWORD_REQUEST});

        const {data}=await axios.post(
            `/api/v1/password/forgot`,
            email,
            {headers:{"Content-Type":"application/json"}}
        );

        dispatch({type:FORGOT_PASSWORD_SUCCESS,payload:data.message});
        
    }
    catch(error){
        dispatch({type:FORGOT_PASSWORD_FAIL,payload:error.response.data.message})
    }
}




//Reset Password
export const resetPassword=(passwords,token)=>async(dispatch)=>{

    try{
        dispatch({type:RESET_PASSWORD_REQUEST});

        const {data}=await axios.put(
            `/api/v1/password/reset/${token}`,
            passwords,
            {headers:{"Content-Type":"application/json"}}
        );

        dispatch({type:RESET_PASSWORD_SUCCESS,payload:data.success});
        
    }
    catch(error){
        dispatch({type:RESET_PASSWORD_FAIL,payload:error.response.data.message})
    }
}







export const getAllUsersAdmin=()=>async(dispatch)=>{

    try{
        dispatch({type:ALL_USERS_REQUEST_ADMIN});

        const {data}=await axios.get(`/api/v1/admin/users`);

        dispatch({type:ALL_USERS_SUCCESS_ADMIN,payload:data.users});
        
    }
    catch(error){
        dispatch({type:ALL_USERS_FAIL_ADMIN,payload:error.response.data.message})
    }
}

export const getUserDetailsAdmin=(id)=>async(dispatch)=>{

    try{
        dispatch({type:USER_DETAILS_REQUEST_ADMIN});

        const {data}=await axios.get(`/api/v1/admin/user/${id}`);

        dispatch({type:USER_DETAILS_SUCCESS_ADMIN,payload:data.user});
        
    }
    catch(error){
        dispatch({type:USER_DETAILS_FAIL_ADMIN,payload:error.response.data.message})
    }
}
export const updateUserAdmin=(id,userData)=>async(dispatch)=>{

    try{
        dispatch({type:UPDATE_USER_REQUEST_ADMIN});

        const {data}=await axios.put(`/api/v1/admin/user/${id}`,userData,{headers:{"Content-Type":"multipart/form-data"}}
        );

        dispatch({type:UPDATE_USER_SUCCESS_ADMIN,payload:data});
        
    }
    catch(error){
        dispatch({type:UPDATE_USER_FAIL_ADMIN,payload:error.response.data.message})
    }
}

export const deleteUserAdmin=(id)=>async(dispatch)=>{

    try{
        dispatch({type:DELETE_USER_REQUEST_ADMIN});

        const {data}=await axios.delete(`/api/v1/admin/user/${id}`);

        dispatch({type:DELETE_USER_SUCCESS_ADMIN,payload:data});
        
    }
    catch(error){
        dispatch({type:DELETE_USER_FAIL_ADMIN,payload:error.response.data.message})
    }
}

//Clear Errors
export const clearErrors=()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS});
}