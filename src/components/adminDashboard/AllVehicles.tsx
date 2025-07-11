
import { useGetAllVehiclesQuery, useDeleteVehicleMutation } from '../../features/api/vehiclesApi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import type { Vehicle } from '../../types/vehicleDetails'; // Import the Vehicle type

const AllVehicles = () => {
  const { data: vehicles, isLoading, isError, error, refetch } = useGetAllVehiclesQuery();
  const [deleteVehicle, { isLoading: isDeleting }] = useDeleteVehicleMutation();

  const handleDelete = async (vehicleId: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const responseMessage = await deleteVehicle(vehicleId).unwrap(); // Get the string response
          Swal.fire(
            'Deleted!',
            responseMessage, // Use the message from the backend
            'success'
          );
          // refetch() is automatically handled by invalidatesTags: ['Vehicle'] but explicit refetch
          // might be desired if you want immediate UI update. For a list, invalidatesTags is usually sufficient.
        } catch (err: any) {
          Swal.fire(
            'Error!',
            err?.data?.message || 'Failed to delete vehicle.',
            'error'
          );
          console.error('Failed to delete vehicle:', err);
        }
      }
    });
  };

  if (isLoading) return <div className="text-center py-10 text-white">Loading vehicles...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Error: {'Failed to fetch vehicles'}</div>;
  if (!vehicles || vehicles.length === 0) return <div className="text-center py-10 text-white">No vehicles found.</div>;

  return (
    <div className="min-h-screen bg-darkGray text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-accentPink">All Vehicles</h1>
      <div className="mb-6 flex justify-end">
        <Link to="/admin/vehicles/add" className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors duration-200">
          Add New Vehicle
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full bg-lightGray rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Image</th>
              <th className="p-4 text-left">Manufacturer</th>
              <th className="p-4 text-left">Model</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Fuel Type</th>
              <th className="p-4 text-left">Rental Rate</th>
              <th className="p-4 text-left">Availability</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle: Vehicle) => ( // Explicitly type vehicle for clarity
              <tr key={vehicle.vehicleId} className="border-b border-gray-600 hover:bg-gray-700 transition-colors duration-150">
                <td className="p-4">{vehicle.vehicleId}</td>
                <td className="p-4">
                  <img
                    src={vehicle.imageUrl || '/default-car.png'}
                    alt={`${vehicle.vehicleSpec.manufacturer} ${vehicle.vehicleSpec.model}`}
                    className="w-20 h-auto object-cover rounded-md"
                  />
                </td>
                <td className="p-4">{vehicle.vehicleSpec.manufacturer}</td>
                <td className="p-4">{vehicle.vehicleSpec.model}</td>
                <td className="p-4">{vehicle.vehicleSpec.year}</td>
                <td className="p-4">{vehicle.vehicleSpec.fuelType}</td>
                <td className="p-4">${vehicle.rentalRate.toFixed(2)}</td>
                <td className="p-4">{vehicle.availability ? <span className="text-green-400">Available</span> : <span className="text-red-400">Booked</span>}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/vehicles/edit/${vehicle.vehicleId}`}
                      className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(vehicle.vehicleId)}
                      className="btn btn-sm bg-red-500 hover:bg-red-600 text-white"
                      disabled={isDeleting}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllVehicles;