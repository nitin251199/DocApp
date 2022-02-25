
import './App.css';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Home from './components/UserInterface/Home/Home';
import Dashboard from './components/Administration/Dashboard';
import AddDoctors from './components/Administration/AddDoctors';
import DisplayAllDoctors from './components/Administration/DisplayAllDoctors';
import AdminLogin from './components/Administration/AdminLogin';
import Header from './components/UserInterface/Header'
import Footer from './components/UserInterface/Footer'
import Login from "./components/UserInterface/Login"
import SignUp from "./components/UserInterface/SignUp"
import { ToastContainer } from 'react-toastify';
import { AppointmentPage } from './components/UserInterface/AppointmentPage/AppointmentPage';
import ScrollToTop from './components/ScrollToTop';
import Main from './components/UserInterface/ChatPortion/Main';
import { DocProfile } from './components/UserInterface/DocProfile/DocProfile';
import UserProfile from './components/UserInterface/UserProfile.js/UserProfile';
import Cart from './components/UserInterface/Cart/Cart'
import AddressCart from './components/UserInterface/Cart/AddressCart';
import UserProfile2 from './components/UserInterface/UserProfile.js/UserProfile2';
import EditProfile from './components/UserInterface/UserProfile.js/EditProfile';
import DocProfile2 from './components/UserInterface/DocProfile/DocProfile2';
import { MyOrders } from './components/UserInterface/MyOrders/MyOrders';
import VideoRoot from './components/UserInterface/VideoChatSection/VideoRoot';
import { Blog } from './components/UserInterface/Blogs/Blog';
import { DisplayBlogs } from './components/UserInterface/Blogs/DisplayBlogs';

function App(props) {
  return (
    <div >
      <Router>
        <ScrollToTop />
        <Route component={Home} exact strict path="/" history={props.history} />
        <Route component={Dashboard} path="/dashboard" history={props.history} />
        <Route component={AddDoctors} path="/adddoctors" history={props.history} />
        <Route component={DisplayAllDoctors} path="/displayalldoctors" history={props.history} />
        <Route component={AdminLogin} path="/adminlogin" history={props.history} />
        <Route component={Header} path="/header" history={props.history} />
        <Route component={Footer} path="/footer" history={props.history} />
        <Route component={Login} path="/login" props={props.history} />
        <Route component={SignUp} path="/signup" props={props.history} />
        <Route component={AppointmentPage} path="/appointment-page" history={props.history} />
        <Route component={Main} path="/main" history={props.history} />
        <Route component={DocProfile} path='/docprofile' history={props.history} />
        <Route component={UserProfile} path='/userprofile' history={props.history} /> 
        <Route component={Cart} path="/cart" history={props.history} /> 
        <Route component={AddressCart} path="/addresscart" history={props.history} /> 
        <Route component={UserProfile2} path="/userprofile2" history={props.history} />
        <Route component={EditProfile} path="/editprofile" history={props.history} />
        <Route component={DocProfile2} path="/docprofile2" history={props.history} />
        <Route component={MyOrders} path="/myorders" history={props.history} />
        <Route component={VideoRoot} path="/videoroot" history={props.history} />
        <Route component={Blog} path="/blog" history={props.history} />
        <Route component={DisplayBlogs} path="/displayblogs" history={props.history} />
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
