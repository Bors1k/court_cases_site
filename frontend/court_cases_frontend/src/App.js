import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Routes, Route, Link , useLocation, useNavigate} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import CourtsListScreen from './screens/CourtsListScreen'
import ProfileScreen from './screens/ProfileScreen'
import HomeScreen from './screens/HomeScreen';
import { useSelector, useDispatch} from 'react-redux'
import { signout } from './features/auth/authSlice'
import { clearUser } from './features/user/userSlice'
import CourtScreen from './screens/CourtScreen';
import CreateCourtScreen from './screens/CreateCourtScreen';

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
          <Route path="/courts" element={<CourtsListScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
          <Route path="/courts/:court_id" element={<CourtScreen/>}/>
          <Route path="/courts/create-court" element={<CreateCourtScreen/>}/>
        </Routes>
      </div>
    );
}

export default App;
