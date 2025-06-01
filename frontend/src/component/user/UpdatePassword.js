import React, { Fragment,useState,useEffect } from 'react'
import "./updatePassword.css"
import Loader from '../layout/loader/Loader'
import {useNavigate,Link} from "react-router-dom";

import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";


import {useDispatch,useSelector} from "react-redux";
import {updatePassword,clearErrors} from "../../actions/userActions";

import {useAlert} from "react-alert";

import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";





const UpdatePassword = () => {     

const dispatch=useDispatch();
const alert=useAlert();
const navigate=useNavigate();


const {loading,isUpdated,error} =useSelector((state)=>state.userUpdate);


const [oldPassword,setOldPassword]= useState("");
const [newPassword,setNewPassword]= useState("");
const [confirmPassword,setConfirmPassword]= useState("");


                                    
const updatePasswordSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();

    myForm.set("oldPassword",oldPassword);    
    myForm.set("newPassword",newPassword);
    myForm.set("confirmPassword",confirmPassword);
    dispatch(updatePassword(myForm));                
  //  console.log("updatePassword Form Submitted Successfully");
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
    if(isUpdated){
        alert.success("Password Updated Successfully");
        // dispatch(loadUser());
        navigate('/account');
        dispatch({ type: UPDATE_PASSWORD_RESET});
    }  

},[dispatch,alert,error,navigate,isUpdated]);

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
   
            <MetaData title="Update Profile" />

            <div className="updatePasswordContainer">
                <div className="updatePasswordBox">
                     <h2 className="updatePasswordHeading">Update Password</h2>
   
    
                    <form className="updatePasswordForm"  encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                        <div className="loginPassword">
                            <VpnKeyIcon/>
                            <input type="password" placeholder='oldPassword' required value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                        </div>
                        <div className="loginPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='newPassword' required value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
                        </div>
                        <div className="loginPassword">
                            <LockIcon/>
                            <input type="password" placeholder='confirmPassword' required value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                        </div>
                        <input type="submit" value="Change Password" className='updatePasswordBtn'/>
                    </form>  
                </div>
            </div>
        </Fragment>
    }
   </Fragment>
  )
}

export default UpdatePassword