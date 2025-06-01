import React from 'react'

import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftfooter">
           <h4>DOWNLOAD OUR APP</h4>
           <p>Download Our App for Android and IOS phones</p>
           <img src={playStore} alt="playStore" />
           <img src={appStore} alt="appStore" />
        </div>
        <div className="midfooter">
            <h1>Ecommerce</h1>
            <p>High Quality is Our First Priority</p>
            <p>Copyrights 2024 &copy; Sudarshan Coding</p>
        </div>

        <div className="rightfooter">
            <h4>Follow Us</h4>
            <a href="https://m.facebook.com/">Instagram</a>
            <a href="https://m.facebook.com/">Facebook</a>
            <a href="https://m.facebook.com/">LinkedIn</a>
            <a href="https://m.facebook.com/">Youtube</a>
        </div>


    </footer>
  )
}

export default Footer