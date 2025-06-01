import React,{ Fragment,useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import {DataGrid} from "@material-ui/data-grid";
import LaunchIcon from "@material-ui/icons/Launch";


import MetaData from '../layout/MetaData';
import Loader from '../layout/loader/Loader';

import { clearErrors,myOrders } from '../../actions/orderActions';

import "./myOrders.css";



const MyOrders = () => {

const dispatch=useDispatch();
const alert=useAlert();

const {loading,error,orders}=useSelector((state)=>state.myOrders);
const {user}=useSelector((state)=>state.userAuth);




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
        flex:.3,
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
        flex:.3,
        type:"number",
        sortable:false,
        renderCell:(params)=>{
            return(
                <Link to={`/order/${params.getValue(params.id,"id")}`}>
                   <LaunchIcon/>
                </Link>
            )
        }
    },
];
const rows=[];
orders&&
orders.forEach((item,index)=>{
    rows.push({
        id:item._id,
        status:item.orderStatus,
        itemsQty:item.orderItems.length,
        amount:item.totalPrice
    });
})






useEffect(()=>{
if(error){
    alert.error(error);
    dispatch(clearErrors());
}

dispatch(myOrders());

},[error,dispatch,alert])
  return (
   <Fragment>

    <MetaData title={`${user.name}-Orders`}/>

    {
        loading?
        (<Loader/>)
        :
        (<div className='myOrdersPage'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            />
           
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
        </div>)
    }
   </Fragment>
  )
}

export default MyOrders