import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Routes, Route, Link } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import CourtsScreen from './screens/CourtsScreen'
import ProfileScreen from './screens/ProfileScreen'

function App() {
    return (
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/" element={<CourtsScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
        </Routes>
      </div>
    );
}

export default App;
