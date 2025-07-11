
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PaymentDetails, NewPayment, UpdatePayment } from '../../types/paymentDetails';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/', 
    prepareHeaders: (headers, { getState }) => {
      // Assuming you store your token in Redux state or localStorage
      const token = (getState() as any).auth.token; // Adjust based on your auth slice
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Payments'],
  endpoints: (builder) => ({
    getAllPayments: builder.query<PaymentDetails[], void>({
      query: () => 'payments',
      providesTags: (result) =>
        result
          ? [...result.map(({ paymentId }) => ({ type: 'Payments' as const, id: paymentId })), 'Payments']
          : ['Payments'],
    }),
    getPaymentById: builder.query<PaymentDetails, number>({
      query: (id) => `payments/${id}`,
      providesTags: (result, error, id) => [{ type: 'Payments', id }],
    }),
    createPayment: builder.mutation<PaymentDetails, NewPayment>({
      query: (newPayment) => ({
        url: 'payments',
        method: 'POST',
        body: newPayment,
      }),
      invalidatesTags: ['Payments'],
    }),
    updatePayment: builder.mutation<PaymentDetails, { paymentId: number; status?: UpdatePayment['status'] | string; amount?: UpdatePayment['amount']; paymentMethod?: UpdatePayment['paymentMethod']; transactionId?: UpdatePayment['transactionId'] }>({
      query: ({ paymentId, ...patch }) => ({
        url: `payments/${paymentId}`,
        method: 'PUT', // Or PATCH depending on your backend
        body: patch,
      }),
      invalidatesTags: (result, error, { paymentId }) => [{ type: 'Payments', id: paymentId }],
    }),
    deletePayment: builder.mutation<void, number>({
      query: (id) => ({
        url: `payments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Payments', id }],
    }),
  }),
});

export const {
  useGetAllPaymentsQuery,
  useGetPaymentByIdQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentsApi;