
import '../styles/Home.css'

const Home = () => {
    return (
      <div className="container flex flex-col mx-auto items-center justify-center min-h-screen">
        
     
        <div className="p-12 bg-orange-300 bg-opacity-50 backdrop-filter backdrop-blur-md rounded-lg shadow-lg overflow-hidden min-w-full max-w-4xl">
        <div className="flex flex-row items-center justify-center w-full">
        
          <div className="flex flex-col w-1/2 space-y-4">
            <h1 className="text-5xl font-bold">Chicken Dinner</h1>
            <p className="text-xl">Turning leftovers into community treasures — a sustainable path from excess to access.</p>
            <div className="flex space-x-4">
              <button className="px-6 py-2 bg-black text-white rounded">Get Started</button>
              <button className="px-6 py-2 bg-transparent text-black rounded border border-black">Learn More</button>
            </div>
          </div>
        
          <div className="w-1/2 flex justify-center">
            <img src="" alt="Chicken Logo" className="max-w-sm"/>
          </div>
        </div>
        </div>

        <div>
            Leftover Goodness is an innovative platform dedicated to transforming the way communities think about and handle food surplus. 
            In a world where food waste and hunger coexist, our app serves as a vital bridge, connecting restaurants, grocery stores, and households with surplus food 
            to soup kitchens and food banks in need. By leveraging real-time technology and a user-friendly interface, Leftover Goodness facilitates the donation of excess food,
             ensuring that it reaches those who can benefit from it most, rather than going to waste. Our mission is not only to alleviate hunger but also to foster a culture of 
             sustainability and sharing, making our communities stronger and our environmental footprint smaller. Join us in our journey to make food waste a thing of the past, 
             turning every leftover into a step towards a better future.
        </div>
      </div>
    );
  }
  

export default Home;