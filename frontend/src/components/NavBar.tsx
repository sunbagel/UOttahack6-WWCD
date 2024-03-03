import { useEffect, useState } from "react";
import '../styles/NavBar.css';
import { Link } from "react-router-dom";


const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [username, setUsername] = useState<string | null>('');
  useEffect(() => {
    if (sessionStorage.getItem('username') ) {
      setUsername(sessionStorage.getItem('username'));
    }
    // console.log(sessionStorage.getItem('username'));
    // console.log(username);
  }, [username])

  const signout = () => {
    sessionStorage.setItem('username', "");
    sessionStorage.setItem('password', "");
    setUsername("");
  }

  return (
    <nav className="bg-orange-500 bg-opacity-50 shadow-md">
      <div className="container h-5/6 mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center text-gray-800 text-xl font-bold">
            {/* <img src="../../debatedino.png" alt="Logo" className="h-8"/> */}
            <span className="self-center whitespace-nowrap">ChickenDinner</span>
        </Link>

        <div className={`md:flex items-center 'block'`}>

            {/* links */}
            <div className="flex flex-col md:flex-row md:ml-6">
                <Link to="/" className="navbar-link">Home</Link>
                {!username && (
                  <>
                    <Link to="/login" className="navbar-link">
                      Login
                    </Link>
                    <Link to="/register" className="navbar-link">Register</Link>
                  </>
                )}
                {username === 'McDonalds' && (
                    <Link to="/restaurants" className="navbar-link">Leftover management</Link>
                )}
                {username === 'SoupKitchen' && (
                  <Link to="/kitchens" className="navbar-link">Shopping cart</Link>
                )}
                {username === 'John Delivery' && (
                  <Link to="/delivery" className="navbar-link">Delivery</Link>
                )}
                {username && (
                  <Link to='/' className='navbar-link'>Welcome, {username}</Link>
                )}
                {username && (
                  <Link to="/" className="navbar-link" onClick={signout}>Logout</Link>
                )}
            </div>

        </div>
      </div>
    </nav>
    

  )
}

export default NavBar
