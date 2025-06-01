import React,{useEffect,useState,Fragment} from 'react'
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux'
import { Alert } from '@mui/material'
import { Typography } from '@material-ui/core';

import {Doughnut,Line} from "react-chartjs-2";


import Sidebar from './Sidebar';

import { clearAllErrors,allProductsAdmin } from '../../actions/productActions';
import "./dashboard.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
  } from "chart.js";
    
 
const Dashboard = () => {
    ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend,ArcElement);

   const dispatch=useDispatch();


    const {products,loading,error}=useSelector((state)=>state.allProductsAdmin);
    let outOfStock=0;
    products&&products.forEach((item)=>{
        if(item.stock===0){outOfStock=outOfStock+1}
    })
    



const lineState={
    labels:["Initial Amount","Amount Earned"],
    datasets:[
                {
                label:"Total Amount",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(192,72,40)",],
                data:[0,4000],
                },
            ],
}


const doughnutState={
    labels:["Out of Stock","InStock"],
    datasets:[
        {
            backgroundColor:["#00A6B4","#6000B4"],
            hoverBackgroundColor:["#405000","#35014f"],
            data:[outOfStock,products.length-outOfStock]
        }
    ]
}




useEffect(()=>{
  
    
      dispatch(allProductsAdmin());
    },[dispatch])

return (
  <div className="dashboard">
        <Sidebar/>
        <div className="dashboardContainer">
             <Typography component="h1">Dashboard</Typography>
             <div className="dashboardSummary">
                    <div>
                            <p>Total Amount <br /> Rs 2000</p>
                    </div>
             
                    <div className="dashboardSummaryBox2">
                            <Link to="/admin/products">
                                <p>Products</p>
                                <p>{products&& products.length}</p>
                            </Link>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>56</p>
                            </Link>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>5</p>
                            </Link>
                    </div>
            </div>

            <div className="lineChart">
                <Line data={lineState}/>
            </div>

            <div className="doughnutChart">
                <Doughnut data={doughnutState}/>
            </div>

        
        </div>

  </div>
  )
}

export default Dashboard