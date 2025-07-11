import React from 'react';
import { useSelector } from 'react-redux';
import  type{ RootState } from '../../apps/store';
import { useGetAllPaymentsQuery } from '../../features/api/paymentsApi';
import type { PaymentDetails } from '../../types/paymentDetails';
import Swal from 'sweetalert2';

const UserPayments = () => {
  const userId = useSelector((state: RootState) => state.auth.user?.userId);

  const { data: allPayments, isLoading, isError, error } = useGetAllPaymentsQuery();

  const userPayments = React.useMemo(() => {
    if (!allPayments || !userId) return [];
    return allPayments.filter((payment: PaymentDetails) => payment.booking?.userId === userId);
  }, [allPayments, userId]);

  if (!userId) {
    return <div className="text-center py-10 text-white">Please log in to view your payments.</div>;
  }

  if (isLoading) return <div className="text-center py-10 text-white">Loading your payments...</div>;
  if (isError) {
    Swal.fire({
      icon: 'error',
      title: 'Payment Error',
      text: `Failed to fetch payments: ${(error)}`,
    });
    return <div className="text-center py-10 text-red-500">Error loading payments.</div>;
  }
  if (!userPayments || userPayments.length === 0) return <div className="text-center py-10 text-white">You have no payments yet.</div>;

  return (
    <div className="min-h-screen bg-darkGray text-white p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-accentPink">My Payments</h2>
      <div className="overflow-x-auto">
        <table className="table w-full bg-lightGray rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-4 text-left">Payment ID</th>
              <th className="p-4 text-left">Booking ID</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {userPayments.map((payment: PaymentDetails) => (
              <tr key={payment.paymentId} className="border-b border-gray-600 hover:bg-gray-700 transition-colors duration-150">
                <td className="p-4">{payment.paymentId}</td>
                <td className="p-4">{payment.bookingId}</td>
                <td className="p-4">${payment.amount.toFixed(2)}</td>
                <td className="p-4">{payment.paymentMethod}</td>
                <td className="p-4">{payment.status}</td>
                <td className="p-4">{new Date(payment.paymentDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPayments;