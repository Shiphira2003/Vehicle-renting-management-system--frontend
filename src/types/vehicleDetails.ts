// src/types/VehicleDetails.ts

export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";

export interface VehicleSpec {
  vehicleSpecId: number;
  manufacturer: string;
  model: string;
  year: number;
  fuelType: FuelType;
  engineCapacity: string;
  seatingCapacity: number;
  features: string;
}

export interface Vehicle {
  vehicleId: number;
  rentalRate: number;
  availability: boolean;
  imageUrl: string;
  vehicleSpec: VehicleSpec;
  description?: string;
  color?: string;
}

export interface CreateVehiclePayload {
  rentalRate: number;
  availability: boolean;
  imageUrl: string;
  vehicleSpecId: number;
  description?: string;
  color?: string;
}

export interface UpdateVehiclePayload {
  rentalRate?: number;
  availability?: boolean;
  imageUrl?: string;
  vehicleSpecId?: number;
  description?: string;
  color?: string;
}