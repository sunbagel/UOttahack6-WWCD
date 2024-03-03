import axios from 'axios';
import { useEffect, useState } from 'react';
import Paho from 'paho-mqtt';
import messaging from '../solace/Messaging';
import Card from '../components/ingredientCard';

type Delivery = {
    payloadString: string;
}

const apiUrl = 'http://localhost:5000';
const id = '65e3ffcc3770b8e651dec385';

const Restaurants = () => {
    const [soupKitchen, setSoupKitchen] = useState(null);

    useEffect(() => {
        const fetchSoupKitchen = async () => {
        try {
            const response = await axios.get(`${apiUrl}/restaurants/${id}`);
            setSoupKitchen(response.data);
        } catch (error) {
            console.error('Error fetching soup kitchen:');
        }
        };

        fetchSoupKitchen();
        console.log(soupKitchen);
    }, []);

    const handleUpdate = async () => {
        // Refresh soup kitchen data after updating quantities
        const response = await axios.get(`${apiUrl}/restaurants/${id}`);
        setSoupKitchen(response.data);
    };
    
    const handleMinusClick = async (category: string, ingredient) => {
    // Call the endpoint to update the quantity
        await axios.put(`${apiUrl}/restaurants/${id}`, {
            $inc: {
                [`ingredients.${category}.${ingredient}`]: -1,
            },
        });

        // Refresh soup kitchen data after updating quantities
        handleUpdate();
    };

    const handlePlusClick = async (category: string, ingredient) => {
    // Call the endpoint to update the quantity
        await axios.put(`${apiUrl}/restaurants/${id}`, {
            $inc: {
                [`ingredients.${category}.${ingredient}`]: 1,
            },
        });

        // Refresh soup kitchen data after updating quantities
        handleUpdate();
    };

    const submitOrder = async () => {
        // insert logic here
    }


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
        <div className="p-4 flex flex-col">
            <div className="buttons">
					<button onClick={handleConnectClick}>{connected ? 'Disconnect' : 'Connect'}</button>
					{sendButton}
				</div>
  <button
    type="button"
    className="btn bg-light-blue self-end"
    onClick={submitOrder}
  >
    submit order
  </button>
  {soupKitchen &&
    Object.entries(soupKitchen.ingredients).map(([category, items]) => (
      <div key={category} className="mb-4">
        <h2 className="mb-2 text-lg font-semibold">{category}</h2>
        <div className="flex overflow-x-auto space-x-4">
          {Object.entries(items).map(([ingredient, quantity]) => (
            <Card
              key={`${category}-${ingredient}`}
              imageUrl="https://media.istockphoto.com/id/1497211470/photo/black-woman-working-at-a-supermarket-arranging-carefully-the-tomato-display-at-the-produce.webp?b=1&s=170667a&w=0&k=20&c=-9vV_A0_2eNm1nxIy3YiJ2ontAdBzFkFVowvNFJYgPo="
              altText={ingredient}
              cardText={`${ingredient} (${quantity})`}
              onMinusClick={() => handleMinusClick(category, ingredient)}
              onPlusClick={() => handlePlusClick(category, ingredient)}
            />
          ))}
        </div>
      </div>
    ))}
</div>
    )
}

export default Restaurants




