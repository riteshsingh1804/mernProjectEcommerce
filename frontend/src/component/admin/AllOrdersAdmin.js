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

import { clearErrors,allOrdersAdmin,deleteOrderAdmin } from '../../actions/orderActions';
import { DELETE_ORDER_RESET_ADMIN } from '../../constants/orderConstants';
import "./allOrdersAdmin.css";
const AllOrdersAdmin = () => {
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading,error,orders}=useSelector((state)=>state.allOrdersAdmin);
     const {error: deleteError, isDeleted}=useSelector((state)=>state.UDOrderAdmin);
    const columns=[
        {   
            field:"id",
            headerName:"Order ID",
            minWidth:300,
            flex:1,
        },
        {   
            field:"status",
            headerName:"Status",
            minWidth:150,
            flex:.5,
            cellClassName:(params)=>{
                return params.getValue(params.id,"status")==="Delivered"?"greenColor":"redColor";
            },
        },
        {   
            field:"itemsQty",
            headerName:"Items Qty",
            minWidth:150,
            flex:.4,
            type:"number"
        },
        {   
            field:"amount",
            headerName:"Amount",
            minWidth:270,
            flex:.5,
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
                        <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                           <EditIcon/>
                        </Link>
                        <Button 
                        onClick={()=>deleteOrderAdminHandler(params.getValue(params.id,"id"))}
                        >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        },

    ];



const rows=[];

orders && orders.forEach((item)=>{
    rows.push({
        id:item._id,
        status:item.orderStatus,
        itemsQty:item.orderItems.length,
        amount:item.totalPrice, 
    })
});
    









const deleteOrderAdminHandler=(id)=>{
    dispatch(deleteOrderAdmin(id));
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
    alert.success("Order Deleted Successfully");
    navigate("/admin/dashboard");
    dispatch({type:DELETE_ORDER_RESET_ADMIN});
}

  dispatch(allOrdersAdmin());
},[dispatch,error,alert,navigate,deleteError, isDeleted])


  return (
    <Fragment>
        {loading?(<Loader/>)
        :
        (
            <Fragment>
        <MetaData title={`ALL ORDERS -ADMIN`}/>
   
        <div className="dashboard">
            <Sidebar/>

            <div className="ordersListContainer">
                <h1 id="ordersListHeading">ALL ORDERS</h1>
                 <DataGrid
                 rows={rows}         
                 columns={columns}
                 pageSize={10}
                 disableSelectionOnClick
                 className='ordersListTbale'
                 
                 />
        
            </div>
         </div>
   
   
   
           </Fragment>
        )
        }
    </Fragment>
  )
}

export default AllOrdersAdmin