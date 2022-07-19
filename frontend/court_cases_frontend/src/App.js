import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Routes, Route, Link , useLocation, useNavigate} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import CourtsScreen from './screens/CourtsScreen'
import ProfileScreen from './screens/ProfileScreen'
import HomeScreen from './screens/HomeScreen';
import { useSelector, useDispatch} from 'react-redux'
import { signout } from './features/auth/authSlice'
import { clearUser } from './features/user/userSlice'

function App() {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  React.useEffect(() => {
    if (location.pathname == '/logout'){
      dispatch(signout())
      dispatch(clearUser())
      navigate('/login')
    }
  }, [location]);

  
    return (
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path="/courts" element={<CourtsScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
        </Routes>
      </div>
    );
}

export default App;
