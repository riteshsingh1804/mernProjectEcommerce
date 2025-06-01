import React from 'react'
import { useState,useEffect,Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';

import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@mui/material';
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";



import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';

import { clearErrors,getAllUsersAdmin,deleteUserAdmin } from '../../actions/userActions';
import { DELETE_USER_RESET_ADMIN } from '../../constants/userConstants';
import "./allUsersAdmin.css";
const AllUsersAdmin = () => {
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading,error,users}=useSelector((state)=>state.allUsersAdmin);
     const {error: deleteError, isDeleted}=useSelector((state)=>state.UDUserAdmin);
    const columns=[
        {
            field:"id",
            headerName:"User ID",
            minWidth:200,
            flex:0.8
        },
        {
            field:"email",
            headerName:"Email",
            minWidth:350,
            flex:1,
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:150,
            flex:0.5,
            type:"number"
        },
        {
            field:"role",
            headerName:"Role",
            minWidth:270,
            flex:0.3,
            type:"number"
        },
        {
            field:"actions",
            headerName:"Actions",
            minWidth:150,
            flex:0.3,
            type:"number",
            sortable:false,
            renderCell:(params)=>{
                return(
                    <Fragment>
                        <Link to={`/admin/user/${params.getValue(params.id,"id")}`}>
                           <EditIcon/>
                        </Link>
                        <Button 
                        onClick={()=>deleteUserAdminHandler(params.getValue(params.id,"id"))}
                        >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        },

    ];



const rows=[];

users && users.forEach((item)=>{
    rows.push({
        id:item._id,
        email:item.email,
        name:item.name,
        role:item.role, 
    })
});
    









const deleteUserAdminHandler=(id)=>{
 //   dispatch(deleteUserAdmin(id));
}


useEffect(()=>{
if(error){
   alert.error(error);
   dispatch(clearErrors());
}
if(deleteError){
    alert.error(deleteError);
    dispatch(clearErrors());
}
if(isDeleted){
    alert.success("User Deleted Successfully");
    navigate("/admin/dashboard");
    dispatch({type:DELETE_USER_RESET_ADMIN});
}

  dispatch(getAllUsersAdmin());
},[dispatch,error,alert,navigate,deleteError, isDeleted])


  return (
    <Fragment>
        {loading?(<Loader/>)
        :
        (
            <Fragment>
        <MetaData title={`ALL USERS -ADMIN`}/>
   
        <div className="dashboard">
            <Sidebar/>

            <div className="usersListContainer">
                <h1 id="usersListHeading">All USERS</h1>
                 <DataGrid
                 rows={rows}         
                 columns={columns}
                 pageSize={10}
                 disableSelectionOnClick
                 className='usersListTbale'
                 
                 />
        
            </div>
         </div>
   
   
   
           </Fragment>
        )
        }
    </Fragment>
  )
}

export default AllUsersAdmin