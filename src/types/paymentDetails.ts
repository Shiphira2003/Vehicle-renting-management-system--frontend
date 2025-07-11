// src/types/PaymentDetails.ts

export interface PaymentDetails {
  paymentId: number;
  bookingId: number;
  amount: number;
  paymentDate: string; // ISO date string, e.g., "2023-10-27T10:00:00Z"
  paymentMethod: string;
  transactionId: string;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
  // Nested booking and user details for context in the admin dashboard
  booking: {
    bookingId: number;
    bookingDate: string;
    returnDate: string;
    totalAmount: number;
    bookingStatus: "Pending" | "Confirmed" | "Cancelled" | "Completed";
    vehicle: {
      vehicleId: number;
      rentalRate: number;
      vehicleSpec: {
        manufacturer: string;
        model: string;
        year: number;
        fuelType: string;
        engineCapacity: string;
        transmission: string;
        seatingCapacity: number;
        color: string;
        features: string; 
        imageUrl?: string; 
      };
    };
  };
  user: {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    contactNo: string;
    address: string;
    role: "user" | "admin";
  };
}

export interface NewPayment {
  bookingId: number;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId: string;
  paymentStatus: "Pending" | "Completed" | "Failed" | "Refunded";
}

export interface UpdatePayment {
  paymentId: number;
  status?: "Pending" | "Completed" | "Failed" | "Refunded";
  amount?: number;
  paymentMethod?: string;
  transactionId?: string;
}