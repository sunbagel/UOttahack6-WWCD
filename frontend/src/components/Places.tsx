import React, { useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useLoadScript } from "@react-google-maps/api";

interface PlacesProps {
  setAddress: (address: string) => void;
}

const Places: React.FC<PlacesProps> = ({ setAddress }) => {
  useLoadScript({
    googleMapsApiKey: "AIzaSyAEk5Gar3yJSumyMCD2cfufCefHF9QXUIM",
    libraries: ["places"],
  });
  const [address, setAddressState] = useState<string>('');

  const handleChange = (newAddress: string) => {
    setAddressState(newAddress);
  };

  const handleSelect = async (selectedAddress: string) => {
    try {
      setAddress(selectedAddress);
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected address: ', selectedAddress);
      console.log('Lat lng: ', latLng);
    } catch (error) {
      console.error('Error selecting address: ', error);
    }
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Enter your address',
                className: 'location-search-input',
              })}
            />
            <div>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const style = {
                  backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                };
                return (
                    <div key={suggestion.placeId}>
                        <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                        </div>
                    </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default Places;

