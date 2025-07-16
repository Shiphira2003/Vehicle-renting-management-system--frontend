import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; 
import { useGetVehicleByIdQuery } from '../features/api/vehiclesApi';
import { useCreateBookingMutation } from '../features/api/userApi';
import  type { Vehicle } from '../types/vehicleDetails'; 
import type { CreateBookingPayload } from '../types/Types'; 
import { FaCar, FaChair, FaGasPump, FaCogs, FaCalendarAlt, FaMapMarkerAlt, FaDollarSign } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import  type { RootState } from '../apps/store';
import { Toaster, toast } from 'sonner';

export const VDetails = () => {
    const { id } = useParams<{ id: string }>();
    const vehicleId = id ? parseInt(id) : undefined;
    const navigate = useNavigate();

    const { data: vehicle, error, isLoading } = useGetVehicleByIdQuery(vehicleId!, {
        skip: vehicleId === undefined, 
    });

    const [createBooking, { isLoading: isBookingLoading }] = useCreateBookingMutation();
    const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

    const [pickupDateTime, setPickupDateTime] = useState('');
    const [dropoffDateTime, setDropoffDateTime] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    // Calculate total cost whenever dates change
    useEffect(() => {
        if (pickupDateTime && dropoffDateTime && vehicle?.rentalRate) {
            const pickUp = new Date(pickupDateTime);
            const dropOff = new Date(dropoffDateTime);

            if (dropOff > pickUp) {
                const diffTime = Math.abs(dropOff.getTime() - pickUp.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                setTotalCost(diffDays * vehicle.rentalRate);
            } else {
                setTotalCost(0); // Invalid date range
            }
        } else {
            setTotalCost(0);
        }
    }, [pickupDateTime, dropoffDateTime, vehicle?.rentalRate]);

    const handleBookingSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isAuthenticated || !user?.id) {
            toast.error('Please log in to book a vehicle.');
            navigate('/login');
            return;
        }

        if (!vehicleId || !pickupDateTime || !dropoffDateTime || totalCost <= 0) {
            toast.error('Please fill all booking details correctly.');
            return;
        }

        const pickUp = new Date(pickupDateTime);
        const dropOff = new Date(dropoffDateTime);

        if (dropOff <= pickUp) {
            toast.error('Drop-off date/time must be after pick-up date/time.');
            return;
        }

        // Assuming a default locationId for now. You'll need to implement a way to select this.
        const defaultLocationId = 1; // <<< IMPORTANT: Replace with actual logic to get locationId

        const loadingToastId = toast.loading("Processing your booking...");
        try {
            const bookingPayload: CreateBookingPayload = {
                userId: user.id, // User ID from Redux state
                vehicleId: vehicleId,
                locationId: defaultLocationId, // Placeholder location ID
                bookingDate: pickUp.toISOString(), // Send as ISO string
                returnDate: dropOff.toISOString(), // Send as ISO string
                totalAmount: parseFloat(totalCost.toFixed(2)), // Ensure it's a number, then backend might convert to string
            };

            const res = await createBooking(bookingPayload).unwrap();
            toast.success('Booking successful!', { id: loadingToastId });
            console.log('Booking response:', res);
            navigate('/dashboard/bookings'); // Redirect to user's bookings page
        } catch (err: any) {
            toast.error('Failed to create booking: ' + (err.data?.message || err.message || err.error || 'Unknown error'), { id: loadingToastId });
            console.error('Booking error:', err);
        } finally {
            toast.dismiss(loadingToastId);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <span className="loading loading-spinner loading-lg text-purple-600"></span>
                <p className="ml-4 text-lg text-purple-600">Loading vehicle details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-700 p-4">
                <p>Error loading vehicle details: {error instanceof Error ? error.message : 'An unknown error occurred'}</p>
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 p-4">
                <p>Vehicle not found.</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <Toaster richColors position="top-right" />
            <div className="container mx-auto px-4">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
                    {/* Vehicle Image Section */}
                    <div className="md:w-1/2">
                        <img
                            src={vehicle.imageUrl}
                            alt={`${vehicle.vehicleSpec.manufacturer} ${vehicle.vehicleSpec.model}`}
                            className="w-full h-96 object-cover"
                        />
                    </div>

                    {/* Vehicle Details & Booking Form Section */}
                    <div className="md:w-1/2 p-8">
                        <h1 className="text-4xl font-extrabold text-purple-800 mb-2">
                            {vehicle.vehicleSpec.manufacturer} {vehicle.vehicleSpec.model}
                        </h1>
                        <p className="text-gray-700 text-lg mb-4">{vehicle.description}</p>

                        <div className="grid grid-cols-2 gap-y-3 text-gray-600 text-base mb-6">
                            <div className="flex items-center gap-2">
                                <FaCar className="text-purple-600" /> Type: {vehicle.vehicleSpec.model}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaChair className="text-purple-600" /> Seats: {vehicle.vehicleSpec.seatingCapacity}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaGasPump className="text-purple-600" /> Fuel: {vehicle.vehicleSpec.fuelType}
                            </div>
                            <div className="flex items-center gap-2">
                                <FaCogs className="text-purple-600" /> Trans: {vehicle.vehicleSpec.transmission}
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <FaDollarSign className="text-purple-600" /> Daily Rate: <span className="text-2xl font-bold text-orange-600 ml-1">${vehicle.rentalRate}</span>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <span className={`badge ${vehicle.availability ? 'badge-success' : 'badge-error'} text-white`}>
                                    {vehicle.availability ? 'Available for Rent' : 'Currently Unavailable'}
                                </span>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4 mt-6">
                            <h3 className="text-2xl font-bold text-purple-800 mb-4">Book This Vehicle</h3>

                            <div>
                                <label htmlFor="pickupDateTime" className="block text-gray-700 text-sm font-semibold mb-2">Pick-up Date & Time</label>
                                <input
                                    type="datetime-local"
                                    id="pickupDateTime"
                                    className="input input-bordered w-full"
                                    value={pickupDateTime}
                                    onChange={(e) => setPickupDateTime(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="dropoffDateTime" className="block text-gray-700 text-sm font-semibold mb-2">Drop-off Date & Time</label>
                                <input
                                    type="datetime-local"
                                    id="dropoffDateTime"
                                    className="input input-bordered w-full"
                                    value={dropoffDateTime}
                                    onChange={(e) => setDropoffDateTime(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="text-xl font-bold text-right text-purple-800">
                                Total Estimated Cost: <span className="text-orange-600">${totalCost.toFixed(2)}</span>
                            </div>

                            <button
                                type="submit"
                                className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-4"
                                disabled={isBookingLoading || !vehicle.availability || totalCost <= 0}
                            >
                                {isBookingLoading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    'Book Now'
                                )}
                            </button>

                            {!isAuthenticated && (
                                <p className="text-sm text-gray-500 text-center mt-2">
                                    You must be <Link to="/login" className="text-blue-500 hover:underline">logged in</Link> to book a vehicle.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VDetails;
