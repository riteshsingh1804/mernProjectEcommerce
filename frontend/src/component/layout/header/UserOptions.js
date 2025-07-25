import React, { Fragment,useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./userOptions.css";

import {SpeedDial,SpeedDialAction} from "@material-ui/lab"

import Backdrop from "@material-ui/core/Backdrop";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";


import {useDispatch,useSelector} from "react-redux"  ;  
import {useAlert} from "react-alert";
import {logout} from '../../../actions/userActions';



const UserOptions = ({user}) => {
 const [open,setOpen]=useState(false); 
  
 const navigate=useNavigate();
 
 const dispatch=useDispatch();
 const alert=useAlert();

 const {cartItems}=useSelector((state)=>state.cart);
 const options=[
    {icon:<ListAltIcon/>,name:"Orders",func:orders},
    {icon:<PersonIcon/>,name:"Profile",func:account},
    {icon:<ShoppingCartIcon style={{color:cartItems.length>0?"tomato":"unset"}}/>,name:`Cart(${cartItems.length})`,func:cart},
    {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser}
 ];

 if(user.role==="admin"){
    options.unshift({icon:<DashboardIcon/>,name:"Dashboard",func:dashboard})
 }

 function dashboard(){
   navigate("/admin/dashboard");
 }

 function account(){
    navigate("/account");
 }

 function orders(){
    navigate("/orders");
 }
 function cart(){
   navigate("/cart");
}

 function logoutUser(){
    dispatch(logout());
    alert.success("Logout Successfully");
 }

   
return (
<Fragment>
    {/* <div>Hi</div>
    <div>Hi</div>
    <div>Hi</div>
    <div>Hi</div>
    <div>Hi</div>
    <div>Hi</div>
    <div>Hi</div> */}


   <Backdrop open={open}  sx={{  zIndex: 10  }}/>

    <SpeedDial
    ariaLabel='SpeedDial tooltip example'
    onClose={()=>setOpen(false)}
    onOpen={()=>setOpen(true)}
    sx={{  zIndex: 11  }}
    open={open}
    direction="down"  
    className="speedDial"    
    icon={<img className='speedDialIcon' src={ user.avatar.url ? user.avatar.url: "/Sudarshan1.png" } alt="Profile"/>}
    >
    
    {/* <SpeedDialAction icon={<DashboardIcon/>} tooltipTitle="Dashboard"/> */}
    {
        options.map((item)=>(
            <SpeedDialAction key={item.name} 
            icon={item.icon} 
            tooltipTitle={item.name} 
            onClick={item.func}
            tooltipOpen={window.innerWidth<=600?true:false}/>
        ))
    }



    </SpeedDial>
</Fragment>
)
}

export default UserOptions