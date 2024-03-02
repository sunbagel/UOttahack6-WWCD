import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div>
      <header>
        <h1>Leftover Goodness</h1>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      <section id="about">
        <div>
          <h2>About Us</h2>
          <p>Welcome to Leftover Goodness! We are dedicated to reducing food waste and supporting local communities by connecting leftover ingredients with nearby soup kitchens.</p>
          <p>Every day, tons of perfectly good food goes to waste. Our platform allows individuals and businesses to donate their surplus ingredients to those in need, making a positive impact on both the environment and society.</p>
        </div>
      </section>
      <section id="contact">
        <div>
          <h2>Contact Us</h2>
          <p>Interested in learning more or getting involved? Contact us today!</p>
          <button>Contact Us</button>
          <p>Or sign up to start donating now!</p>
          <button>Sign Up</button>
        </div>
      </section>
      <footer>
        <p>&copy; 2024 Leftover Goodness. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
