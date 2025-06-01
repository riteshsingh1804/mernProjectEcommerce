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

import { clearAllErrors,allProductsAdmin,deleteProductAdmin } from '../../actions/productActions';
import { DELETE_PRODUCT_RESET_ADMIN } from '../../constants/productConstants';
import "./allProductsAdmin.css";
const AllProductsAdmin = () => {
    const alert=useAlert();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {loading,error,products}=useSelector((state)=>state.allProductsAdmin);
     const {error: deleteError, isDeleted}=useSelector((state)=>state.CUDProductAdmin);
    const columns=[
        {
            field:"id",
            headerName:"Product ID",
            minWidth:200,
            flex:0.5
        },
        {
            field:"name",
            headerName:"Name",
            minWidth:350,
            flex:1
        },
        {
            field:"stock",
            headerName:"Stock",
            minWidth:150,
            flex:0.3,
            type:"number"
        },
        {
            field:"price",
            headerName:"Price",
            minWidth:270,
            flex:0.5,
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
                        <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
                           <EditIcon/>
                        </Link>
                        <Button 
                        onClick={()=>deleteProductAdminHandler(params.getValue(params.id,"id"))}
                        >
                            <DeleteIcon/>
                        </Button>
                    </Fragment>
                )
            }
        },

    ];



const rows=[];

products && products.forEach((item)=>{
    rows.push({
        id:item._id,
        name:item.name,
        stock:item.stock,
        price:item.price, 
    })
});
    









const deleteProductAdminHandler=(id)=>{
    dispatch(deleteProductAdmin(id));
}


useEffect(()=>{
if(error){
   alert.error(error);
   dispatch(clearAllErrors());
}
if(deleteError){
    alert.error(deleteError);
    dispatch(clearAllErrors());
}
if(isDeleted){
    alert.success("Product Deleted Successfully");
    navigate("/admin/dashboard");
    dispatch({type:DELETE_PRODUCT_RESET_ADMIN});
}

  dispatch(allProductsAdmin());
},[dispatch,error,alert,navigate,deleteError, isDeleted])


  return (
    <Fragment>
        {loading?(<Loader/>)
        :
        (
            <Fragment>
        <MetaData title={`ALL PRODUCTS -ADMIN`}/>
   
        <div className="dashboard">
            <Sidebar/>

            <div className="productsListContainer">
                <h1 id="productsListHeading">All PRODUCTS</h1>
                 <DataGrid
                 rows={rows}         
                 columns={columns}
                 pageSize={10}
                 disableSelectionOnClick
                 className='productsListTbale'
                 
                 />
        
            </div>
         </div>
   
   
   
           </Fragment>
        )
        }
    </Fragment>
  )
}

export default AllProductsAdmin