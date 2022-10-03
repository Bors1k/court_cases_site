import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './features/Header';
import { Routes, Route, Link , useLocation, useNavigate, Navigate} from "react-router-dom";
import LoginScreen from './features/user/LoginScreen';
import CourtsListScreen from './features/courts/CourtsTable/CourtsListScreen'
import ProfileScreen from './features/user/ProfileScreen'
import HomeScreen from './features/home/HomeScreen';
import { useSelector, useDispatch} from 'react-redux'
import { signout } from './features/auth/authSlice'
import { clearUser } from './features/user/userSlice'
import CourtScreen from './features/courts/CourtPage/CourtScreen';
import CreateCourtScreen from './features/courts/CreateCourtPage/CreateCourtScreen';
import {clearCourtState} from './features/courts/courtsSlice'
import { Redirect } from 'react-router-dom';
import Footer from './features/Footer'


function App() {
  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  React.useEffect(() => {
    if (location.pathname == '/logout'){
      dispatch(signout())
      dispatch(clearUser())
      dispatch(clearCourtState())
      navigate('/login')
    }
  }, [location]);

  
    return (
      <div className="App d-flex flex-column min-vh-100">
        <Header></Header>
        <Routes>
          <Route path="/" element={<HomeScreen/>}/>
          <Route path='/courts' element={<PrivateRoute><CourtsListScreen/></PrivateRoute>}></Route>
          <Route path='/profile' element={<PrivateRoute><ProfileScreen/></PrivateRoute>}></Route>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/courts/:court_id" element={<PrivateRoute><CourtScreen/></PrivateRoute>}/>
          <Route path="/courts/create-court" element={<PrivateRoute><CreateCourtScreen/></PrivateRoute>}/>
          <Route path='/logout' element={<PrivateRoute><Navigate to={'/login'}/></PrivateRoute>}></Route>
        </Routes>
        <Footer></Footer>
      </div>
    );
}

function PrivateRoute({ children }) {
  const auth = useSelector(store=>store.auth)

  if (auth.token == null || undefined) {
    return <Navigate to={{pathname: "/login" }}/>
  }

  return children
}

export default App;
