import Card from "../components/ingredientCard.tsx"
import React, { useEffect, useState } from 'react';
import messaging from "../solace/Messaging"
import Paho from 'paho-mqtt';

import axios from 'axios';
const apiUrl = 'http://localhost:5000';
const id = '65e44396148cbca1b0fb9351';


type Delivery = {
    payloadString: string;
}
const Kitchens = () => {
    const [soupKitchen, setSoupKitchen] = useState(null);

    useEffect(() => {
        const fetchSoupKitchen = async () => {
        try {
            const response = await axios.get(`${apiUrl}/soup_kitchens/${id}`);
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
        const response = await axios.get(`${apiUrl}/soup_kitchens/${id}`);
        setSoupKitchen(response.data);
    };
    
    const handleMinusClick = async (category: string, ingredient) => {
    // Call the endpoint to update the quantity
        await axios.put(`${apiUrl}/soup_kitchens/${id}`, {
            $inc: {
                [`ingredients.${category}.${ingredient}`]: -1,
            },
        });

        // Refresh soup kitchen data after updating quantities
        handleUpdate();
    };

    const handlePlusClick = async (category: string, ingredient) => {
    // Call the endpoint to update the quantity
        await axios.put(`${apiUrl}/soup_kitchens/${id}`, {
            $inc: {
                [`ingredients.${category}.${ingredient}`]: 1,
            },
        });

        // Refresh soup kitchen data after updating quantities
        handleUpdate();
    };

    const submitOrder = async () => {
        console.log(soupKitchen);
        for (const category in soupKitchen?.ingredients) {
            const items = soupKitchen.ingredients[category]
            for (const item in items) {
                console.log(items[item], item)
                if (items[item] > 0) {
                    await axios.post(`${apiUrl}/delivery`, {
                        accepted: true,
                        driverId: "65e446ca5e19f81b8da07328",
                        restaurantId: '65e3faec8a41765ed19205d5',
                        kitchenId: "65e44396148cbca1b0fb9351",
                        item: item,
                        itemQuantity: items[item],
                    });
                }
            }
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
					{/* {sendButton} */}
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

export default Kitchens


