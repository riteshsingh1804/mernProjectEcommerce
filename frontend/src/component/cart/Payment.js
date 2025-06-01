import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router";
import axios from "axios";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";


import CheckoutSteps from "../cart/CheckOutSteps";
import MetaData from "../layout/MetaData";


import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";


import "./payment.css";

 import { newOrder, clearErrors } from "../../actions/orderActions";

const Payment = () => {

  const navigate=useNavigate();

  const dispatch = useDispatch();
  const alert = useAlert();

  const stripe = useStripe();
  const elements = useElements();
  
  const payBtn = useRef(null);

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.userAuth);

  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };



  const fullOrderInfo = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;

    try {
         
          const { data } = await axios.post(
            "/api/v1/payment/process",
            paymentData,
            `"Content-Type": "application/json"`
          );
          // console.log("dataA");
          // console.log(data);
          const client_secret = data.client_secret;

          if (!stripe || !elements) return;

          const result = await stripe.confirmCardPayment(client_secret, 
            {
            payment_method: {
              card: elements.getElement(CardNumberElement),
              billing_details: {
                name: user.name,
                email: user.email,
                address: {
                  line1: shippingInfo.address,
                  city: shippingInfo.city,
                  state: shippingInfo.state,
                  postal_code: shippingInfo.pinCode,
                  country: shippingInfo.country,
                },
              },
            },
          });
          // console.log("dataB");
          // console.log(result);
          if (result.error) {
                  payBtn.current.disabled = false;
                  alert.error(result.error.message);
          } 
          else {
                  if (result.paymentIntent.status === "succeeded") {
                      fullOrderInfo.paymentInfo = {
                        paymentId: result.paymentIntent.id,
                        paymentStatus: result.paymentIntent.status,
                      };
                      alert.success(`Payment of ₹${paymentData.amount/100} Done Successfully `);
                       dispatch(newOrder(fullOrderInfo));
                       navigate("/success");
                  } 
                  else {
                      alert.error("There's some issue while processing payment ");
                  }
          }
    } catch (error) {
            payBtn.current.disabled = false;
            alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Infooo</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </Fragment>
  );
};

export default Payment;