// src/features/api/bookingsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../../apps/store';
import type { BookingDetails } from '../../types/BookingDetails'; // Assuming path to your new interface

export const bookingsApi = createApi({
    reducerPath: 'bookingsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `${token}`);
            }
            headers.set('Content-Type', 'application/json');
            return headers;
        }
    }),
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,

    tagTypes: ['Bookings', 'Booking'], // Tags for cache invalidation
    endpoints: (builder) => ({
        createBooking: builder.mutation<BookingDetails, any>({ // Adjust 'any' to specific create payload type
            query: (createBookingPayload) => ({
                url: 'bookings',
                method: 'POST',
                body: createBookingPayload,
            }),
            invalidatesTags: ["Bookings"]
        }),
        updateBooking: builder.mutation<BookingDetails, { bookingId: number; status?: "Pending" | "Confirmed" | "Completed" | "Cancelled"; [key: string]: any; }>({
            query: ({ bookingId, ...bookingUpdatePayload }) => ({
                url: `bookings/${bookingId}`,
                method: 'PUT', // Or 'PATCH' depending on your backend
                body: bookingUpdatePayload,
            }),
            // FIX: Corrected invalidatesTags format
            invalidatesTags: (result, error, arg) => [
                'Bookings', // Invalidate the list of all bookings
                { type: 'Booking', id: arg.bookingId } // Invalidate the specific booking by ID
            ],
        }),
        getAllBookings: builder.query<BookingDetails[], void>({
            query: () => 'bookings',
            // FIX: Corrected providesTags format
            providesTags: ["Bookings"]
        }),
        getBookingById: builder.query<BookingDetails, number>({
            query: (bookingId) => `bookings/${bookingId}`,
            // FIX: Corrected providesTags format
            providesTags: (result, error, id) => [{ type: 'Booking', id }],
        }),
        getAllBookingsForOneUserById: builder.query<BookingDetails[], number>({
            query: (userId) => `bookings/user?userId=${userId}`,
            providesTags: ["Bookings"]
        }),
        deleteBooking: builder.mutation<void, number>({
            query: (bookingId) => ({
                url: `bookings/${bookingId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Bookings'],
        }),
    }),
});

// Export hooks for use in components
export const {
    useCreateBookingMutation,
    useUpdateBookingMutation,
    useGetAllBookingsQuery,
    useGetBookingByIdQuery,
    useGetAllBookingsForOneUserByIdQuery,
    useDeleteBookingMutation,
} = bookingsApi;