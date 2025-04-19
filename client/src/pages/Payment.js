import React from "react"
import Layout from "./../components/imp/layout"
import qr from "./qr.png"
const Payment=()=>{
    return (
        <Layout>
            <div className="footer center">
                <img src={qr} alt="image not available"/> 
                
                <h1><a href="upi://pay?pa=paytmqr59s4jh@paytm&pn=Paytm">CLICK HERE</a></h1>
            </div>
            
        </Layout>
    )
}
export default Payment