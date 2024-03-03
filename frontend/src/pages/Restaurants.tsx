import axios from 'axios';


const Restaurants = () => {
    const sendIngredientsList = async (ingredients) => {
        const response = await axios.post(`${import.meta.env.VITE_API_SERVER}/publish`, ingredients);

    }

    return (
        <div>
            Restaurants Page
        </div>
    )

}


export default Restaurants




