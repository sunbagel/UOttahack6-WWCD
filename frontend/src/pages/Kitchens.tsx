import Card from "../components/ingredientCard.tsx"

const Kitchens = () => {

    return (
        <div className="p-4">
        <h1 className="mb-4">Fruits and Vegetables</h1>
        <div className="flex overflow-x-auto space-x-4">
            <Card
                imageUrl="https://media.istockphoto.com/id/1497211470/photo/black-woman-working-at-a-supermarket-arranging-carefully-the-tomato-display-at-the-produce.webp?b=1&s=170667a&w=0&k=20&c=-9vV_A0_2eNm1nxIy3YiJ2ontAdBzFkFVowvNFJYgPo="
                altText="AppleBanana"
                cardText="Apple"
            />
            <Card
                imageUrl="https://media.istockphoto.com/id/1497211470/photo/black-woman-working-at-a-supermarket-arranging-carefully-the-tomato-display-at-the-produce.webp?b=1&s=170667a&w=0&k=20&c=-9vV_A0_2eNm1nxIy3YiJ2ontAdBzFkFVowvNFJYgPo="
                altText="Banana"
                cardText="Banana"
            />
        </div>
    </div>
    )

}


export default Kitchens




