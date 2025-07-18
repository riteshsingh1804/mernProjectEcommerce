import React, { Fragment,useState,useEffect } from 'react'
import "./updateProfile.css"
import Loader from '../layout/loader/Loader'
import {useNavigate,Link} from "react-router-dom";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";


import {useDispatch,useSelector} from "react-redux";
import {updateProfile,loadUser,clearErrors} from "../../actions/userActions";

import {useAlert} from "react-alert";

import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";





const UpdateProfile = () => {     

const dispatch=useDispatch();
const alert=useAlert();
const navigate=useNavigate();

const {user} =useSelector((state)=>state.userAuth);
const {loading,isUpdated,error} =useSelector((state)=>state.userUpdate);


const [name,setName]= useState("");
const [email,setEmail]=useState("")

const [avatar,setAvatar]=useState();
const [avatarPreview,setAvatarPreview]=useState("/Sudarshan1.png");




const updateProfileDataChange=(e)=>{
   if(e.target.name==="avatar"){
       const reader=new FileReader();

       reader.onload=()=>{
            if(reader.readyState===2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
       }
       reader.readAsDataURL(e.target.files[0]);
   }

  if(e.target.name==="name"){
    setName(e.target.value);
  }
  if(e.target.name==="email"){
    setEmail(e.target.value);
  }
}
                        


const updateProfileSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();

    myForm.set("name",name);    
    myForm.set("email",email);
    myForm.set("avatar",avatar);
    dispatch(updateProfile(myForm));                
  //  console.log("updateProfile Form Submitted Successfully");
}



useEffect(()=>{
    if(user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
     }
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(isUpdated){
        alert.success("Profile Updated Successfully");
        dispatch(loadUser());
        navigate('/account');
        dispatch({ type: UPDATE_PROFILE_RESET});
    }  

},[dispatch,alert,error,navigate,isUpdated,user]);

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

            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                     <h2 className="updateProfileHeading">Update Profile</h2>
   
    
                    <form className="updateProfileForm"  encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                       <div className="updateProfileName">
                            <FaceIcon/>
                            <input type="text" placeholder='Name' required name="name" value={name} onChange={updateProfileDataChange}/>
                        </div>  
                        <div className="updateProfileEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder='Email' required name="email" value={email} onChange={updateProfileDataChange}/>
                        </div> 
                        <div id="updateProfileImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={updateProfileDataChange} />
                        </div>
                        <input type="submit" value="Update" className='updateProfileBtn'/>
                    </form>  
                </div>
            </div>
        </Fragment>
    }
   </Fragment>
  )
}

export default UpdateProfile