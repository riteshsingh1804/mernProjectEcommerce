import React,{Fragment,useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router';


import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public"
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";

import {Country,State} from "country-state-city";


import { saveShippingInfo } from '../../actions/cartActions';

import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';

import "./shipping.css";






const Shipping = () => {

const dispatch=useDispatch();
const alert=useAlert();
const navigate=useNavigate();

const {shippingInfo}=useSelector((state)=>state.cart);


const [address,setAddress]=useState(shippingInfo.address);
const [city,setCity]=useState(shippingInfo.city);
const [state,setState]=useState(shippingInfo.state);
const [country,setCountry]=useState(shippingInfo.country);
const [pinCode,setPinCode]=useState(shippingInfo.pinCode);
const [phoneNumber,setphoneNumber]=useState(shippingInfo.phoneNumber);

const ShippingSubmit=(e)=>{
e.preventDefault();


if(phoneNumber.length!==10){
    alert.error("Phone Number must be 10 digits long");
    return;
}
dispatch(saveShippingInfo({address,city,state,country,pinCode,phoneNumber}));

navigate("/order/confirm");

}
  return (
   <Fragment>

    <MetaData title="Shipping Details"/>
    <CheckOutSteps activeStep={0} />

    <div className="shippingContainer">
        <div className="shippingBox">
            <h2 className="shippingHeading">Shipping Details</h2>
            <form className='shippingForm' 
                encType='multipart/form-data' 
                onSubmit={ShippingSubmit}
            >
               <div>
                    <HomeIcon/>
                    <input 
                        type="text"
                        placeholder='Address'
                        required
                        value={address}
                        onChange={(e)=>setAddress(e.target.value)} 
                    />
               </div>
               <div>
                    <LocationCityIcon/>
                    <input 
                        type="text"
                        placeholder='City'
                        required
                        value={city}
                        onChange={(e)=>setCity(e.target.value)} 
                    />
               </div>
               <div>
                    <PinDropIcon/>
                    <input 
                        type="text"
                        placeholder='Pin Code'
                        required
                        value={pinCode}
                        onChange={(e)=>setPinCode(e.target.value)} 
                    />
               </div>
               <div>
                    <PhoneIcon/>
                    <input 
                        type="text"
                        placeholder='Phone Number'
                        required
                        value={phoneNumber}
                        onChange={(e)=>setphoneNumber(e.target.value)} 
                    />
               </div>
               <div>
                    <PublicIcon/>

                    <select 
                    required
                    value={country}
                    onChange={(e)=>setCountry(e.target.value)}
                    >
                        <option value="">Country</option>
                        {Country&&Country.getAllCountries().map((item)=>(
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                    
               </div>
               

               {
                country&&(
                
                <div>
                    <TransferWithinAStationIcon/>

                    <select 
                    required
                    value={state}
                    onChange={(e)=>setState(e.target.value)}
                    >
                        <option value="">State</option>
                        {State&&State.getStatesOfCountry(country).map((item)=>(
                            <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                        ))}
                    </select>
                    
               </div>    
                )
               }

               <input 
                type="submit"
                value="Continue"
                className='shippingBtn'
                disabled={state?false:true} />



            </form>
        
        
        
        </div>
    </div>
   </Fragment>
  )
}

export default Shipping