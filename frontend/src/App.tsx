import React, { createContext, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Restaurants from './pages/Restaurants'
import Kitchens from './pages/Kitchens'
import Delivery from './pages/Delivery'
import Login from './pages/Login'
import Register from './pages/Register'
import messaging from './solace/Messaging.ts';

function App() {

  return (
    <div>
        <Router>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/restaurants" element={<Restaurants/>}/>
            <Route path="/kitchens" element={<Kitchens/>}/>
            <Route path="/delivery" element={<Delivery/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </Router>
    </div>
  )
}

export default App
