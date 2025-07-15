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
              <th className="text-red-500 border border-gray-300 p-2">Model</th>
              <th className="text-red-500 border border-gray-300 p-2">Rental Rate</th>
              <th className="text-red-500 border border-gray-300 p-2">Color</th>
              <th className="text-red-500 border border-gray-300 p-2">Created At</th>
              <th className="text-red-500 border border-gray-300 p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((car: Vehicle) => (
              <tr key={car.vehicleId} className="hover:bg-blue-500">
                <td className="border border-gray-300 p-2">{car.vehicleId}</td>
                <td className="border border-gray-300 p-2">{car.availability}</td>
                <td className="border border-gray-300 p-2">{car.rentalRate}</td>
                <td className="border border-gray-300 p-2">{car.color}</td>
                <td className="border border-gray-300 p-2">{car.color}</td>
                <td className="border border-gray-300 p-2">{car.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
