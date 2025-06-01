import React, { Fragment } from 'react'



import { Typography, Stepper,Step, StepLabel } from "@material-ui/core";

import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";






import "./checkOutSteps.css";


const CheckOutSteps = ({activeStep}) => {



    const steps=[
      {
        label:<Typography>Shipping Details</Typography>,
        icon:<LocalShippingIcon/>
      },
      {
        label:<Typography>Confirm Orders</Typography>,
        icon:<LibraryAddCheckIcon/>
      },
      {
        label:<Typography>Payment</Typography>,
        icon:<AccountBalanceIcon/>,
      }
    ]


  const stepStyle={
    boxSizing:"border-box",
  }
  
  
  
  
  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyle}>
         {
          steps.map((item,index)=>(
            <Step 
            key={index}
            active={index===activeStep?true:false}
            completed={index<=activeStep?true:false}
            >
               <StepLabel 
               style={{color:index<=activeStep?"tomato":"rgba(0,0,0,0.649)"}}
               icon={item.icon}>{item.label}</StepLabel>
            </Step>
          ))        
         }
      </Stepper>
    </Fragment>




  )
}

export default CheckOutSteps