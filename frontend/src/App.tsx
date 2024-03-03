import { useState } from 'react'
import './App.css'
import Paho from "paho-mqtt";
// @ts-ignore
import messaging from './solace/Messaging.js';

function App(this: any) {
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);
  
  const handleMessage = (message) => {
    console.log(message);
    setMessages(cur => cur.concat(message.payloadString));
	}
  messaging.register(handleMessage.bind(this));
  const handleSendClick = () => {
		const message = new Paho.Message(JSON.stringify({text: "Hello"}));
		message.destinationName = "SomeTopic";
		messaging.send(message);
	}

  const handleConnectClick = () => {
		if (connected) {
			messaging.disconnect();
      setConnected(false);
		} else {
			messaging.connectWithPromise().then(response => {
				console.log("Succesfully connected to Solace Cloud.", response);
				messaging.subscribe("SomeTopic");
        setConnected(true);
			}).catch(error => {
				console.log("Unable to establish connection with Solace Cloud, see above logs for more details.", error);
			});
		}
	}


  const sendButton = connected ? <button onClick={handleSendClick}>Send</button> : <button disabled>Send</button>;


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
      <section>
          <div className="buttons">
            <button onClick={handleConnectClick}>{connected ? 'Disconnect' : 'Connect'}</button>
            {sendButton}
          </div>
          <ol>
            {messages.map((message, index) => {
              return <li key={index}>{message}</li>
            })}
          </ol>
      </section>
      <footer>
        <p>&copy; 2024 Leftover Goodness. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
