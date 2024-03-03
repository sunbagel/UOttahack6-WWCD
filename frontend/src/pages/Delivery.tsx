import Places from '../components/Places'
import { useState } from 'react';
import { useLoadScript } from "@react-google-maps/api";

const Delivery = () => {
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    const handleAddressChange = (address: string) => {
        setSelectedAddress(address);
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'AIzaSyAEk5Gar3yJSumyMCD2cfufCefHF9QXUIM',
        libraries: ["places"],
    });

    if (loadError) return <div>Error loading Google Maps API</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div className="min-h-screen">

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

            {/* Map */}
            <div className="h-2/3">
                <br></br>
                <img src="https://i.stack.imgur.com/RdkOb.jpg" alt="Map" className="w-full" />
            </div>

            {/* Delivery Info Boxes */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Info Box 1 */}
                <div className="bg-white rounded-md shadow-md p-4">
                <h2 className="text-lg mb-2">16 min</h2>
                <p className="text-gray-600 mb-4">McDonalds Kanata to 123 Appleby Lane</p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Deliver</button>
                </div>

                {/* Info Box 2 */}
                <div className="bg-white rounded-md shadow-md p-4">
                <h2 className="text-lg mb-2">32 min</h2>
                <p className="text-gray-600 mb-4">Metro to Kanata Food Cupboard</p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Deliver</button>
                </div>

                {/* Info Box 3 */}
                <div className="bg-white rounded-md shadow-md p-4">
                <h2 className="text-lg mb-2">9 min</h2>
                <p className="text-gray-600 mb-4">Noodle House to Shepherds of Good Hope</p>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Deliver</button>
                </div>
            </div>
        </div>
    )

}


export default Delivery




