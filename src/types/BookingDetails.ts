

export interface BookingDetails {
    bookingId: number;
    userId: number;
    vehicleId: number;
    locationId: number;
    bookingDate: string; // Assuming string for simplicity, or Date if parsed
    returnDate: string; // Assuming string for simplicity, or Date if parsed
    totalAmount: string; // Numeric type from DB is often string in JS/TS
    bookingStatus: "Pending" | "Confirmed" | "Completed" | "Cancelled";
    createdAt: string;
    updatedAt: string;
    // Nested user details
    user: {
        firstName: string;
        email: string;
    };
    // Nested vehicle details
    vehicle: {
        vehicleId: number;
        rentalRate: string; // Numeric from DB
        availability: boolean;
        // Nested vehicle specification details
        vehicleSpec: {
            vehicleSpecId: number;
            manufacturer: string;
            model: string;
            year: number;
            fuelType: "Petrol" | "Diesel" | "Electric" | "Hybrid";
            engineCapacity: string;
            transmission: "Manual" | "Automatic";
            seatingCapacity: number;
            color: string;
            features: string;
        };
    };
    // Nested location details (optional, but good to have if needed for display)
    location: {
        locationId: number;
        name: string;
        address: string;
    };
}
