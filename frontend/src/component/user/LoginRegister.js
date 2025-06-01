import React, { Fragment,useRef,useState,useEffect } from 'react'
import "./loginRegister.css"
import Loader from '../layout/loader/Loader'
import {useNavigate,Link,useLocation } from "react-router-dom";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";


import {useDispatch,useSelector} from "react-redux";
import {login,register,clearErrors} from "../../actions/userActions";

import {useAlert} from "react-alert";







const LoginRegister = () => {     

    const dispatch=useDispatch();
    
    const alert=useAlert();

     const {loading,isAuthenticated,user,error} =useSelector((state)=>state.userAuth);

     const navigate=useNavigate();
const [loginEmail,setLoginEmail]=useState("");
const [loginPassword,setLoginPassword]=useState("");

// const [registerDetails,setRegisterDetails]=useState({
//     registerName:"",
//     registerEmail:"",
//     registerPassword:"",
// });
// const [registerName,registerEmail,registerPassword]=registerDetails;


const [registerName,setRegisterName]=useState("");
const [registerEmail,setRegisterEmail]=useState("");
const [registerPassword,setRegisterPassword]=useState("");


const [avatar,setAvatar]=useState();
const [avatarPreview,setAvatarPreview]=useState("/Sudarshan1.png");




const loginTab=useRef(null);
const registerTab=useRef(null);
const switcherTab=useRef(null);



const registerDataChange=(e)=>{
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
//    else{
//     setRegisterDetails({...registerDetails,[e.target.name]:e.target.value});
//    }
  if(e.target.name==="registerName"){
    setRegisterName(e.target.value);
  }
  if(e.target.name==="registerEmail"){
    setRegisterEmail(e.target.value);
  }
  if(e.target.name==="registerPassword"){
    setRegisterPassword(e.target.value);
  }
  

}

                                        
const loginSubmit=(e)=>{
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
    // console.log("Login Form Submitted Successfully");
}

const registerSubmit=(e)=>{
    e.preventDefault();
    const myForm=new FormData();

    myForm.set("name",registerName);
    myForm.set("email",registerEmail);
    myForm.set("password",registerPassword);
    myForm.set("avatar",avatar);
    dispatch(register(myForm));
  //  console.log("Register Form Submitted Successfully");
}


const switchTab=(e,tab)=>{
    if(tab==='login'){
           //  switcherTab.current.classList.add("shiftToNeutral");
             switcherTab.current.classList.remove("shiftToRight");

             registerTab.current.classList.remove("shiftToMainViewRegisterForm");
             loginTab.current.classList.remove("shiftToLeftLoginForm");
    }
    if(tab==='register'){
             switcherTab.current.classList.add("shiftToRight");
           //  switcherTab.current.classList.remove("shiftToNeutral");

             registerTab.current.classList.add("shiftToMainViewRegisterForm");
             loginTab.current.classList.add("shiftToLeftLoginForm");
    }
}
const location=useLocation();
const redirect=location.search?location.search.split("=")[1]:"account";
useEffect(()=>{
    if(error){
        alert.error(error);
        dispatch(clearErrors());
    }
    if(isAuthenticated){
       // console.log(location.search.split("=")[1])
        navigate(`/${redirect}`);
    }  

},[dispatch,alert,error,navigate,redirect,isAuthenticated]);
  return (
   <Fragment>
    {loading?<Loader/>
            : 
            <Fragment>
   

            <div className="loginRegisterContainer">
                <div className="loginRegisterBox">
                    <div className="login_register_header">
                        <div className="login_register_toggle">
                            <p onClick={(e)=>switchTab(e,"login")}>LOGIN</p>
                            <p onClick={(e)=>switchTab(e,"register")}>REGISTER</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
    
                    <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                        <div className="loginEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)}/>
                        </div>  
                        <div className="loginPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)}/>
                        </div>
                        <Link to="/password/forgot">Forgot Password ? </Link>
                        <input type="submit" value="Login" className='loginBtn'/>
                    </form>    
    
                    <form className="registerForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                       <div className="registerName">
                            <FaceIcon/>
                            <input type="text" placeholder='Name' required name="registerName" value={registerName} onChange={registerDataChange}/>
                        </div>  
                        <div className="registerEmail">
                            <MailOutlineIcon/>
                            <input type="email" placeholder='Email' required name="registerEmail" value={registerEmail} onChange={registerDataChange}/>
                        </div>  
                        <div className="registerPassword">
                            <LockOpenIcon/>
                            <input type="password" placeholder='Password' required name="registerPassword" value={registerPassword} onChange={registerDataChange}/>
                        </div>
                        <div id="registerImage">
                            <img src={avatarPreview} alt="Avatar Preview" />
                            <input type="file" name="avatar" accept="image/*" onChange={registerDataChange} />
                        </div>
                        <input type="submit" value="Register" className='registerBtn'/>
                    </form>  
                </div>
            </div>
        </Fragment>
    }
   </Fragment>
  )
}

export default LoginRegister