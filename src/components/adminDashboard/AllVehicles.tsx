import { useGetAllVehiclesQuery } from "../../features/api/vehiclesApi";
import type { Vehicle } from "../../types/vehicleDetails";

export const AllVehicles = () => {
  const {
    data: vehicles = [],
    error,
    isLoading,
  } = useGetAllVehiclesQuery();

  return (
    <>
      <h1 className="text-blue-950 text-2xl font-bold mb-4">All Vehicles</h1>

      {error && <p className="text-red-600 font-semibold">Error Occurred</p>}

      {isLoading && <p className="text-blue-600 font-semibold">Content Loading...</p>}

      {!isLoading && !error && vehicles.length === 0 && (
        <p className="text-gray-600 font-semibold">No vehicles found.</p>
      )}

      {!isLoading && !error && vehicles.length > 0 && (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-green-100">
            <tr>
              <th className="text-red-500 border border-gray-300 p-2">Vehicle ID</th>
              <th className="text-red-500 border border-gray-300 p-2">Availability</th>
              <th className="text-red-500 border border-gray-300 p-2">Rental Rate</th>
              <th className="text-red-500 border border-gray-300 p-2">Color</th>
              <th className="text-red-500 border border-gray-300 p-2">Description</th>
              <th className="text-red-500 border border-gray-300 p-2">Image URL</th>
              <th className="text-red-500 border border-gray-300 p-2">Year</th>
              <th className="text-red-500 border border-gray-300 p-2">Spec ID</th>
              <th className="text-red-500 border border-gray-300 p-2">Transmission</th>
              <th className="text-red-500 border border-gray-300 p-2">Seats</th>
              <th className="text-red-500 border border-gray-300 p-2">Model</th>
              <th className="text-red-500 border border-gray-300 p-2">Manufacturer</th>
              <th className="text-red-500 border border-gray-300 p-2">Fuel Type</th>
              <th className="text-red-500 border border-gray-300 p-2">Features</th>
              <th className="text-red-500 border border-gray-300 p-2">Engine Capacity</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((car: Vehicle) => (
              <tr key={car.vehicleId} className=" text-blue-500">
                <td className="border border-gray-300 p-2">{car.vehicleId}</td>
                <td className="border border-gray-300 p-2">{car.availability}</td>
                <td className="border border-gray-300 p-2">{car.rentalRate}</td>
                <td className="border border-gray-300 p-2">{car.color}</td>
                <td className="border border-gray-300 p-2">{car.description}</td>
                <td className="border border-gray-300 p-2">{car.imageUrl}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.year}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.vehicleSpecId}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.transmission}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.seatingCapacity}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.model}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.manufacturer}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.fuelType}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.features}</td>
                <td className="border border-gray-300 p-2">{car.vehicleSpec.engineCapacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};