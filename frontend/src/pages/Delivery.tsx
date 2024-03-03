import { useEffect, useState } from "react"
import messaging from "../solace/Messaging"
import Card from "../components/ingredientCard";
import Places from '../components/Places'
import { useLoadScript } from "@react-google-maps/api";type Delivery = {
    payloadString: string;
}

const Delivery = () => {
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    const handleAddressChange = (address: string) => {
        setSelectedAddress(address);
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAEk5Gar3yJSumyMCD2cfufCefHF9QXUIM',
        libraries: ["places"],
    });

    
    const [deliveries, setDeliveries] = useState<Array<unknown>>([]);
    const [connected, setConnected] = useState(false);
    const handleMessage = (message: Delivery) => {
        setDeliveries([...deliveries, JSON.parse(message.payloadString)]);
    }
    messaging.register(handleMessage.bind(this));
    const handleConnectClick = () => {
		if (connected) {
			messaging.disconnect();
			setConnected(false);
		} else {
			messaging.connectWithPromise().then(response => {
				console.log("Succesfully connected to Solace Cloud.", response);
				messaging.subscribe("delivery/+/+/+");
				setConnected(true);
			}).catch(error => {
				console.log("Unable to establish connection with Solace Cloud, see above logs for more details.", error);
			});
		}
	}

    const handleSendClick = () => {
        const message = new Paho.MQTT.Message(JSON.stringify({ text: "Hello" }));
		message.destinationName = "accept";
		messaging.send(message);
	}
    const sendButton = connected ? <button onClick={handleSendClick}>Send</button> : <button disabled>Send</button>;

    const onAccept = (idx) => {
        setDeliveries(deliveries.filter((_, i) => i != idx));
    }
    const onDecline = (idx) => {
        setDeliveries(deliveries.filter((_, i) => i != idx));
    }
    useEffect(() => {
        console.log(deliveries);
    }, [deliveries])
    if (loadError) return <div>Error loading Google Maps API</div>;
    if (!isLoaded) return <div>Loading...</div>;
    return (
        <div className="min-h-screen">
            <div className="buttons">
                <button onClick={handleConnectClick}>{connected ? 'Disconnect' : 'Connect'}</button>
                {/* {sendButton} */}
            </div>
            {/*Set location*/}
            
            <br></br>
            
            <div className="w-full flex justify-center">
                <div className="max-w-screen-lg w-full px-4">
                    <div>
                        <label htmlFor="addressInput" className="mr-2">Location:</label>
                        <Places setAddress={handleAddressChange} /> 
                        <input
                            id="addressInput"
                            type="text"
                            style={{ width: '900px' }}
                            value={selectedAddress}
                            onChange={(e) => handleAddressChange(e.target.value)}
                            className="flex-1"
                        /> 
                    </div>
                </div>
            </div>
            <br></br>
            {/* Map */}
            <div className="h-2/3">
                <br></br>
                <img src="https://i.stack.imgur.com/RdkOb.jpg" alt="Map" className="w-full" />
            </div>
            {/* Delivery Info Boxes */}
            
            <div className="flex row-auto">
                {deliveries.map((d, idx) => (
                    <div key={idx} className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden m-4">
                        <img className="w-full h-56 object-cover object-center" src={"https://media.istockphoto.com/id/1497211470/photo/black-woman-working-at-a-supermarket-arranging-carefully-the-tomato-display-at-the-produce.webp?b=1&s=170667a&w=0&k=20&c=-9vV_A0_2eNm1nxIy3YiJ2ontAdBzFkFVowvNFJYgPo="} alt="food item" />
                        <div className="p-4">
                            <h2 className="text-gray-800 text-lg font-semibold">{d.item} ({d.itemQuantity}) <br/> KitchenLocation: {d.kitchenLocation.toString()}</h2>
                            <div className="mt-3 flex justify-between">
                                <button onClick={() => onAccept(idx)} className="px-4 py-2 bg-green-500 text-white hover:bg-green-600 rounded">Accept</button>
                                <button onClick={() => onDecline(idx)} className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded">Decline</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}


export default Delivery




