import React, { Fragment,useState,useEffect } from 'react'
import "./resetPassword.css"
import Loader from '../layout/loader/Loader'
import {useNavigate,useParams,Link} from "react-router-dom";


import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


import {useDispatch,useSelector} from "react-redux";
import {resetPassword,clearErrors} from "../../actions/userActions";

import {useAlert} from "react-alert";

import MetaData from "../layout/MetaData";





const ResetPassword = () => {     

const dispatch=useDispatch();
const alert=useAlert();
const navigate=useNavigate();
const {token}=useParams();

const {loading,success,error} =useSelector((state)=>state.userForgotPassword);



const [password,setPassword]= useState("");
const [confirmPassword,setConfirmPassword]= useState("");


                                    
const resetPasswordSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();

    console.log("params:token->")
    console.log(token);

    myForm.set("password",password);
    myForm.set("confirmPassword",confirmPassword);
    dispatch(resetPassword(myForm,token));                
  //  console.log("resetPassword Form Submitted Successfully");
}



useEffect(()=>{
    // if(user){
    //     setName(user.name);
    //     setEmail(user.email);
    //     setAvatarPreview(user.avatar.url);
    //  }
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(success){
        alert.success("Password Reset Successfully");
        // dispatch(loadUser());
        navigate('/login');
        
    }  

},[dispatch,alert,error,navigate,success]);

// useEffect(()=>{
//     if(user){
//         setName(user.name);
//         setEmail(user.email);
//         setAvatarPreview(user.avatar.url);
//      }
// },[user])





return (
   <Fragment>
    {loading?<Loader/>
            : 
            <Fragment>
   
            <MetaData title="Reset Password" />

            <div className="resetPasswordContainer">
                <div className="resetPasswordBox">
                     <h2 className="resetPasswordHeading">Reset Password</h2>
   
    
                    <form className="resetPasswordForm"  onSubmit={resetPasswordSubmit}>
                       
                        <div className="loginPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='New password' required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </div>
                        <div className="loginPassword">
                            <LockIcon/>
                            <input type="password" placeholder='Confirm Password' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <input type="submit" value="Change Password" className='resetPasswordBtn'/>
                    </form>  
                </div>
            </div>
        </Fragment>
    }
   </Fragment>
  )
}

export default ResetPassword