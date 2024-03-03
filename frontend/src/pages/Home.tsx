
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
              <button className="px-6 py-2 bg-light-blue hover:bg-orange-300 text-white rounded">Get Started</button>
              <button className="px-6 py-2 bg-transparent hover:bg-orange-300 text-black rounded border border-black">Learn More</button>
            </div>
          </div>
        
          <div className="w-1/2 flex justify-center">
            <img src="" alt="Chicken Logo" className="max-w-sm"/>
          </div>
        </div>
        </div>
      </div>
    );
  }
  

export default Home;