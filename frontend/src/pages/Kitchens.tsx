import Card from "../components/ingredientCard.tsx"
import React, { useEffect, useState } from 'react';

import axios from 'axios';
const apiUrl = 'http://localhost:5000';
const id = '65e44396148cbca1b0fb9351';

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
        // insert logic here
    }

    return (
      <div className="container flex flex-col mx-auto items-center justify-center min-h-screen">
        <div className="p-4 flex flex-col">
          <button
            type="button"
            className="btn bg-light-blue text-white hover:bg-orange-300 self-end"
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
      </div>
    )

}

export default Kitchens


