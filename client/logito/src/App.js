import './App.scss';
import EmployeeLogin from './components/Employee/Login/EmployeeLogin';
import AdminLogin from './components/Admin/LoginPage/AdminLogin';
import EmployeeDashboard from './components/Employee/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Admin/Dashboard/AdminDashboard';
import HomePage from './components/HomeNavbar/HomePage'
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ViewProjects from './components/Employee/ProjectList/ViewProjects';
import CreateProject from './components/Employee/CreateProject/CreateProject';
import Protected from './Protected';
import UpdateProjectComponent from './components/Employee/UpdateProject/UpdateProject';
import EmployeeProfile from './components/Employee/Profile/EmployeeProfile';
import Calendar from './components/Employee/Calendar/Calendar';
import LandingPage from './components/LandingPage/LandingPage';

function App() {

  const { isLoggedIn } = useSelector(state => state.authReducer);
  const { adminisLoggedIn } = useSelector(state => state.adminauthReducer);
  const { onHomePage } = useSelector(state => state.homePage);
  
  let homePage; 
  if(localStorage.getItem('proceededTo')){
    homePage = true;
  } else {
    homePage = false;
  }

  return (
    <div>
    
      <BrowserRouter>
    
      {!onHomePage && !homePage && <LandingPage/>}
    
      <Routes>
        <Route exact path = "/login" element = {<HomePage/>}></Route>
        <Route exact path = "/admin/login" element = {<AdminLogin/>}></Route>
        <Route exact path = "/employee/login" element = {<EmployeeLogin></EmployeeLogin>}></Route>
        <Route exact path = "/admin/dashboard" element = {<AdminDashboard/>}></Route>
        <Route exact path = "/employee/dashboard" element = {<Protected isLoggedIn={isLoggedIn}><EmployeeDashboard /></Protected>}></Route>
        <Route exact path = "/employee/viewProjects" element = {<ViewProjects></ViewProjects>}></Route>
        <Route exact path = "/employee/createProject" element = {<CreateProject></CreateProject>}></Route>
        <Route exact path = "/employee/updateProject/:id" element = {<UpdateProjectComponent></UpdateProjectComponent>}></Route>
        <Route exact path = "/employee/profile" element = {<EmployeeProfile></EmployeeProfile>}></Route>
        <Route exact path = "/employee/calendar" element = {<Calendar></Calendar>}></Route>
      </Routes>
      </BrowserRouter>
      </div>
 
  );
}

export default App;
