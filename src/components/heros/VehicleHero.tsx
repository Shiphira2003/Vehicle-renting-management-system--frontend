import { Link } from 'react-router-dom';
import { FaCar, FaChair, FaGasPump, FaCogs } from 'react-icons/fa'; 
import { useState } from 'react';

import mercedesImg from '../../assets/mercedes .jpg'; 
import jeepWranglerImg from '../../assets/jeep.jpg'; 
import toyotaCamryImg from '../../assets/toyota.jpg';   
import hondaCRVImg from '../../assets/brabus.jpg';         
import nissanFrontierImg from '../../assets/range.jpg'; 
import teslaModel3Img from '../../assets/Tesla.jpg';  
import busImg from '../../assets/bus.jpg';
import pinkieImg from '../../assets/pinkie.jpg';



interface Vehicle {
    id: string;
    name: string;
    model: string;
    type: string; // e.g., 'SUV', 'Sedan'
    seats: number;
    transmission: 'Automatic' | 'Manual';
    fuelType: 'Petrol' | 'Diesel' | 'Electric';
    dailyRate: number;
 
    shortDescription: string;
    image: string; 
}

const mockVehicles: Vehicle[] = [
    {
        id: '1',
        name: 'Jeep Wrangler',
        model: 'Sahara',
        type: 'SUV',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyRate: 95,
        image: jeepWranglerImg,
        shortDescription: 'Conquer any terrain with style and power.'
    },
    {
        id: '2',
        name: 'Toyota Camry',
        model: 'SE',
        type: 'Sedan',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyRate: 60,
        image: toyotaCamryImg, 
        shortDescription: 'Comfortable and fuel-efficient for city drives.'
    },
    {
        id: '3',
        name: 'Mercedes-Benz C-Class',
        model: 'C300',
        type: 'Luxury',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyRate: 150,
        image: mercedesImg, 
        shortDescription: 'Experience luxury and performance on every journey.'
    },
    {
        id: '4',
        name: 'Honda CR-V',
        model: 'EX',
        type: 'SUV',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyRate: 70,
        image: hondaCRVImg,
        shortDescription: 'Versatile and reliable for family adventures.'
    },
    {
        id: '5',
        name: 'Nissan Frontier',
        model: 'Pro-4X',
        type: 'Truck',
        seats: 4,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        dailyRate: 110,
        image: nissanFrontierImg,
        shortDescription: 'Robust and ready for heavy-duty tasks.'
    },
    {
        id: '6',
        name: 'Tesla Model 3',
        model: 'Long Range',
        type: 'Electric',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Electric',
        dailyRate: 130,
        image: teslaModel3Img,
        shortDescription: 'Eco-friendly driving with cutting-edge technology.'
    },
     {
        id: '7',
        name: 'Bus',
        model: 'Long Bus',
        type: 'Electric',
        seats: 40,
        transmission: 'Automatic',
        fuelType: 'Electric',
        dailyRate: 230,
        image: busImg,
        shortDescription: 'good for large group.'
    },
     {
        id: '8',
        name: 'pinkie',
        model: 'brabus',
        type: 'Electric',
        seats: 4,
        transmission: 'Automatic',
        fuelType: 'Electric',
        dailyRate: 100,
        image: pinkieImg,
        shortDescription: 'aesthetic.'
    }
];



export const VehiclesListing = () => {
    //  manage filter states here
    const [filters, setFilters] = useState({}); // Example: { type: 'SUV', priceMax: 100 }
    const [sort, setSort] = useState('dailyRateAsc'); // Example: 'dailyRateAsc', 'popularity'

    // In a real app, you'd fetch data based on filters/sort
    const filteredAndSortedVehicles = mockVehicles; // Placeholder for now

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="bg-purple-700 text-white py-16 px-4 text-center">
                <h1 className="text-5xl font-extrabold mb-4 animate-fadeInUp">
                    "Drive Your Dream"
                </h1>
                <p className="text-xl text-purple-100 font-light animate-fadeInUp delay-200">
                    Rent your perfect ride.
                </p>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto p-8">
                {/* Filters and Search - Conceptual Section */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-100">
                    <h2 className="text-2xl font-bold text-purple-800 mb-4">Find Your Perfect Ride</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {/* Example Filter: Vehicle Type */}
                        <div>
                            <label htmlFor="vehicleType" className="block text-gray-700 text-sm font-semibold mb-2">Vehicle Type</label>
                            <select id="vehicleType" className="select select-bordered w-full">
                                <option value="">All Types</option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Truck">Truck</option>
                                <option value="Electric">Electric</option>
                            </select>
                        </div>

                        {/* Example Filter: Price Range */}
                        <div>
                            <label htmlFor="priceRange" className="block text-gray-700 text-sm font-semibold mb-2">Max Daily Price</label>
                            <input type="range" min="0" max="200" value="200" className="range range-primary" step="10" />
                            <div className="w-full flex justify-between text-xs px-2 text-gray-600">
                                <span>$0</span>
                                <span>$100</span>
                                <span>$200+</span>
                            </div>
                        </div>

                        {/* Example Sort */}
                        <div>
                            <label htmlFor="sortBy" className="block text-gray-700 text-sm font-semibold mb-2">Sort By</label>
                            <select id="sortBy" className="select select-bordered w-full">
                                <option value="dailyRateAsc">Price: Low to High</option>
                                <option value="dailyRateDesc">Price: High to Low</option>
                                <option value="popularity">Popularity</option>
                            </select>
                        </div>

                        <div className="md:col-span-3 lg:col-span-1 flex items-end">
                             <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full">
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Vehicle Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredAndSortedVehicles.map((vehicle) => (
                        <div key={vehicle.id} className="card bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <figure>
                                <img
                                    src={vehicle.image} // CHANGED from vehicle.imageUrl to vehicle.image
                                    alt={`${vehicle.name} ${vehicle.model}`}
                                    className="w-full h-48 object-cover"
                                />
                            </figure>
                            <div className="card-body p-6">
                                <h2 className="card-title text-purple-800 text-2xl font-bold mb-1">
                                    {vehicle.name} <span className="text-lg text-gray-500 font-normal">{vehicle.model}</span>
                                </h2>
                                <p className="text-gray-700 text-sm mb-3">{vehicle.shortDescription}</p>

                                {/* Specifications Grid */}
                                <div className="grid grid-cols-2 gap-y-2 text-gray-600 text-sm mb-4">
                                    <div className="flex items-center gap-2">
                                        <FaCar className="text-purple-600" /> {vehicle.type}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaChair className="text-purple-600" /> {vehicle.seats} Seats
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaGasPump className="text-purple-600" /> {vehicle.fuelType}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCogs className="text-purple-600" /> {vehicle.transmission}
                                    </div>
                                </div>

                                <div className="flex justify-between items-baseline mb-4">
                                    <p className="text-3xl font-extrabold text-orange-600">
                                        ${vehicle.dailyRate}
                                        <span className="text-lg font-normal text-gray-500">/day</span>
                                    </p>
                                    <div className="badge badge-outline text-purple-600 border-purple-600">Available</div>
                                </div>

                                <div className="card-actions justify-end">
                                    <Link to={`/vehicles/${vehicle.id}`} className="btn bg-purple-600 hover:bg-purple-700 text-white w-full">
                                        View Details
                                    </Link>
                                    {/* Optionally add a "Book Now" button that leads directly to booking with pre-selected car */}
                                    {/* <button className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-2">Book Now</button> */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination (Conceptual)
                <div className="flex justify-center mt-12">
                    <div className="join">
                        <button className="join-item btn btn-primary bg-purple-700 hover:bg-purple-800 text-white">«</button>
                        <button className="join-item btn btn-primary bg-purple-700 hover:bg-purple-800 text-white">Page 1</button>
                        <button className="join-item btn btn-primary bg-purple-700 hover:bg-purple-800 text-white">2</button>
                        <button className="join-item btn btn-primary bg-purple-700 hover:bg-purple-800 text-white">3</button>
                        <button className="join-item btn btn-primary bg-purple-700 hover:bg-purple-800 text-white">»</button>
                    </div>
                </div> */}
            </div>
        </div>
    );
};