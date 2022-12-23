import React, { useEffect,useState } from "react";
import EmployeeLogin from '../Employee/Login/EmployeeLogin';
import AdminLogin from '../Admin/LoginPage/AdminLogin';
import { Navigate, useNavigate  } from 'react-router-dom';
import './HomePage.scss';

// Home Page Component
function HomePage(){
    let navigate = useNavigate();
    const [adminComp, setadminComp] = useState(false);
    
    return (
        <div className="home-page">
            <div className="Logito-title"><h1><span className="title">LOG</span>ito</h1></div>
            {adminComp === false ? <div className="employee-login"> <EmployeeLogin></EmployeeLogin>
           <small className="small-text">Login as <button className="admin-button" onClick={() => { setadminComp(!adminComp); } }>Admin</button></small>  </div> : <div className="admin-login"><AdminLogin isVisible={adminComp} /> <small className="employee-login-text">Login as <button className="employee-button" onClick={() => { setadminComp(!adminComp); } }>Employee</button></small></div>}
        </div>
    )

}

export default HomePage;