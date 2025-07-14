import React from 'react'
import { useGetAllVehiclesQuery, vehicleApi } from '../../features/api/vehiclesApi'
import { PuffLoader } from 'react-spinners';
import type { Vehicle } from '../../types/vehicleDetails';



const AllVehicles = () => {
  const {data: vehicles=[],isLoading,error} = useGetAllVehiclesQuery()
    console.log(vehicles)
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className='text-green-800'>Vehicle ID</th>
            <th className='text-green-800'>Vehicle Color</th>
            <th className='text-green-800'>Vehicle Description</th>
            <th className='text-green-800'>Vehicle rentalRate</th>
            <th className='text-green-800'>Vehicle Color</th>
            <th className='text-green-800'>Vehicle Price</th>
            <th className='text-green-800'>Vehicle Image</th>
          </tr>
         </thead>

          {
        error ? (<span className='text-red-600'>Error Occcured</span>)
        :isLoading? (<span><PuffLoader/></span>): 
        vehicles.length === 0 ? (<span>No Vehicles found</span>):(
           vehicles.map((car: Vehicle)=>(
            <tr key={car.vehicleId}>
              <td className='text-black'>{car.vehicleId}</td>
                 <td className='text-black'>{car.color}</td>
                    <td className='text-black'>{car.description}</td>
                       <td className='text-black'>{car.rentalRate}</td>
                       <td className='text-black'>{car.imageUrl}</td>
                       <td className='text-black'>{car.availability}</td>
                          <td className='text-black'>{car.vehicleSpec.engineCapacity}</td>
                             <td className='text-black'>{car.vehicleSpec.seatingCapacity}</td>
                                <td className='text-black'>{car.vehicleSpec.transmission}</td>
                                   <td className='text-black'>{car.vehicleSpec.fuelType}</td>
                                     <td className='text-black'>{car.vehicleSpec.seatingCapacity}</td>
                                       <td className='text-black'>{car.vehicleSpec.transmission}</td>
            </tr>
           ))
        )
      }

      </table>
     
    </div>
  )
}

export default AllVehicles
