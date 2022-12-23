import './LandingPage.scss';
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { onHomePage } from "../../actions/homePage";
import { useDispatch, useSelector } from "react-redux";

//Landing Page Component
function LandingPage(){
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = () => {
        dispatch(onHomePage())
        navigate("/login");
      };
    
    return (
        <section class="wrapper">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="title">
            <span className='title'>Welcome To <span className='log'>LOG</span>ito</span>
            <br></br>
            <span class = "subtitle">Managing projects made easier!</span>
        </div>
        <p className='proceed-to-home-page'>Proceed to <button className='landing-page-button' onClick={handleLogin}>LOGIN</button></p>
    </section>
    )
}

export default LandingPage;