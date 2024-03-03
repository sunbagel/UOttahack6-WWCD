import { useState } from "react";
import '../styles/NavBar.css';
import { Link } from "react-router-dom";



const NavBar = () => {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
  return (
    
    <nav className="bg-orange-500 bg-opacity-50 shadow-md">
      <div className="container h-5/6 mx-auto px-6 py-8 flex justify-between items-center">
        <Link to="/" className="flex items-center text-gray-800 text-xl font-bold">
            {/* <img src="../../debatedino.png" alt="Logo" className="h-8"/> */}
            <span className="self-center whitespace-nowrap">ChickenDinner</span>
        </Link>

        <div className={`md:flex items-center 'block'`}>

            {/* links */}
            <div className="flex flex-col md:flex-row md:ml-6">
                <Link to="/" className="navbar-link">Home</Link>
                <Link to="/Restaurants" className="navbar-link">Restaurants</Link>
                <Link to="/Kitchens" className="navbar-link">Soup Kitchens</Link>
                <Link to="/Drivers" className="navbar-link">Drivers</Link>
            </div>

        </div>
      </div>
    </nav>
    

  )
}

export default NavBar
