import { useGetAllVehiclesQuery } from "../../features/api/vehiclesApi";
import type { Vehicle } from "../../types/vehicleDetails";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {
  Car,
  Fuel,
  Users,
  Gauge,
  BadgeCheck,
  DollarSign,
} from "lucide-react";

export const AllVehicles = () => {
  const {
    data: vehicles = [],
    error,
    isLoading,
  } = useGetAllVehiclesQuery();

  const cloud_name = "dm5e7fx96";
  const preset_key = "vehicles";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    availability: "Available",
    rentalRate: "",
    color: "",
    description: "",
    imageUrl: "",
    year: "",
    transmission: "",
    seatingCapacity: "",
    model: "",
    manufacturer: "",
    fuelType: "",
    features: "",
    engineCapacity: "",
  });

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const cloudFormData = new FormData();
    cloudFormData.append("file", file);
    cloudFormData.append("upload_preset", preset_key);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        cloudFormData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setUploadProgress(percent);
          },
        }
      );
      setFormData({ ...formData, imageUrl: response.data.secure_url });
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const handleAddVehicle = () => {
    setIsModalOpen(false);
    Swal.fire({
      icon: "success",
      title: "Vehicle Added",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-center mb-4 text-orange-400">All Vehicles</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Vehicle
        </button>
      </div>

      {error && <p className="text-red-600 font-semibold">Error Occurred</p>}
      {isLoading && <p className="text-blue-600 font-semibold">Loading...</p>}
      {!isLoading && !error && vehicles.length === 0 && (
        <p className="text-gray-600 font-semibold">No vehicles found.</p>
      )}

      {!isLoading && !error && vehicles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {vehicles.map((car: Vehicle) => (
            <div
              key={car.vehicleId}
              className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200"
            >
              <img
                src={car.imageUrl || "/placeholder.jpg"}
                alt={`${car.vehicleSpec.manufacturer} ${car.vehicleSpec.model}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-purple-800 font-bold text-xl mb-1">
                  {car.vehicleSpec.manufacturer}
                  <span className="text-gray-600 font-medium ml-1">
                    {car.vehicleSpec.model}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-700 mt-2">
                  <div className="flex items-center gap-1 text-purple-600">
                    <Car size={16} />
                    {car.vehicleSpec.model}
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Users size={16} />
                    {car.vehicleSpec.seatingCapacity} Seats
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Fuel size={16} />
                    {car.vehicleSpec.fuelType}
                  </div>
                  <div className="flex items-center gap-1 text-purple-600">
                    <Gauge size={16} />
                    {car.vehicleSpec.transmission}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-orange-600 text-2xl font-bold">
                    ${car.rentalRate}.00
                    <span className="text-gray-500 text-sm font-medium">/day</span>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border border-purple-600 text-purple-600`}>
                    {car.availability}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
