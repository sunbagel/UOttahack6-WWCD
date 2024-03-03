import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Restaurants from './pages/Restaurants'
import Kitchens from './pages/Kitchens'
import Delivery from './pages/Delivery'

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
        </Routes>
      </Router>
    </div>
  )
}

export default App
