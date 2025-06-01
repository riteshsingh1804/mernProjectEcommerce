import React, { Fragment,useState,useEffect } from 'react'
import "./forgotPassword.css"
import Loader from '../layout/loader/Loader'
import {useNavigate,Link} from "react-router-dom";

import MailOutlineIcon from "@material-ui/icons/MailOutline";


import {useDispatch,useSelector} from "react-redux";
import {forgotPassword,clearErrors} from "../../actions/userActions";

import {useAlert} from "react-alert";

import MetaData from "../layout/MetaData";





const ForgotPassword = () => {     

const dispatch=useDispatch();
const alert=useAlert();
const navigate=useNavigate();

const {loading,message,error} =useSelector((state)=>state.userForgotPassword);


const [email,setEmail]=useState("")



                        


const forgotPasswordSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();

    myForm.set("email",email);
    dispatch(forgotPassword(myForm));                
  //  console.log("forgotPassword Form Submitted Successfully");
}



useEffect(()=>{

    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(message){
        alert.success(message);
        
       
    }  

},[dispatch,alert,error,message]);

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
   
            <MetaData title="Forgot Password" />

            <div className="forgotPasswordContainer">
                <div className="forgotPasswordBox">
                     <h2 className="forgotPasswordHeading">Forgot Password</h2>

                    <form className="forgotPasswordForm" onSubmit={forgotPasswordSubmit}>
                        <div className="forgotPasswordEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder='Email' required name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div> 
                        <input type="submit" value="Send Mail" className='forgotPasswordBtn'/>
                    </form>  
                </div>
            </div>
        </Fragment>
    }
   </Fragment>
  )
}

export default ForgotPassword