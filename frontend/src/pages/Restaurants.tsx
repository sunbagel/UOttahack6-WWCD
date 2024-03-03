import axios from 'axios';
import { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';
import messaging from '../solace/Messaging';

type Delivery = {
    payloadString: string;
}
const Restaurants = () => {
    const sendIngredientsList = async (ingredients) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_SERVER}/restaurants/65e3ffcc3770b8e651dec385`, ingredients);
        } catch (error) {
            console.log(error);
        }

    }
    const [ingredients, setIngredients] = useState<Array<unknown>>([]);
    const [connected, setConnected] = useState(false);
    const handleMessage = (message: Delivery) => {
        setIngredients([...ingredients, JSON.parse(message.payloadString)]);
    }
    messaging.register(handleMessage.bind(this));
    const handleConnectClick = () => {
		if (connected) {
			messaging.disconnect();
			setConnected(false);
		} else {
			messaging.connectWithPromise().then(response => {
				console.log("Succesfully connected to Solace Cloud.", response);
				messaging.subscribe("restaurants/+/ingredients/+");
				setConnected(true);
			}).catch(error => {
				console.log("Unable to establish connection with Solace Cloud, see above logs for more details.", error);
			});
		}
	}

    const handleSendClick = () => {
        const message = new Paho.Message(JSON.stringify({ text: "Hello" }));
		message.destinationName = "delivery";
		messaging.send(message);
	}
    useEffect(() => {
        console.log(ingredients);
    }, [ingredients])
    const sendButton = connected ? <button onClick={handleSendClick}>Send</button> : <button disabled>Send</button>;


    return (
        <div>
            Restaurants Page
            <div>
            <div className="buttons">
					<button onClick={handleConnectClick}>{connected ? 'Disconnect' : 'Connect'}</button>
					{sendButton}
				</div>
				<ol>

				</ol>
        </div>
        </div>
    )

}


export default Restaurants




