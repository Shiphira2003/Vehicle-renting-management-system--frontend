// src/pages/Analytics.tsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import type { RootState } from "../../apps/store"; // Adjust path as necessary

// Import your RTK Query hooks
import { bookingsApi } from "../../features/api/bookingsApi";
import { paymentsApi } from "../../features/api/paymentsApi";
import { ticketsApi } from "../../features/api/ticketsApi";
import { userApi } from "../../features/api/userApi";
import { useGetAllVehiclesQuery } from '../../features/api/vehiclesApi';

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "Confirmed":
        case "Completed":
        case "Open":
        case "admin":
        case "Available":
            return "bg-green-100 text-green-800";
        case "Pending":
        case "user":
            return "bg-yellow-100 text-yellow-800";
        case "Cancelled":
        case "Failed":
        case "Closed":
        case "disabled":
        case "Booked":
            return "bg-red-100 text-red-800";
        case "Refunded":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const Analytics = () => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    // Fetch data for summaries
    const { data: bookingsData = [], isLoading: bookingsLoading, error: bookingsError } = bookingsApi.useGetAllBookingsQuery(undefined, { skip: !isAuthenticated });
    const { data: paymentsData = [], isLoading: paymentsLoading, error: paymentsError } = paymentsApi.useGetAllPaymentsQuery(undefined, { skip: !isAuthenticated });
    const { data: ticketsData = [], isLoading: ticketsLoading, error: ticketsError } = ticketsApi.useGetAllTicketsQuery(undefined, { skip: !isAuthenticated });
    const { data: usersData = [], isLoading: usersLoading, error: usersError } = userApi.useGetAllUsersProfilesQuery(undefined, { skip: !isAuthenticated });
    const { data: vehiclesData = [], isLoading: vehiclesLoading, error: vehiclesError } = useGetAllVehiclesQuery(undefined, { skip: !isAuthenticated });

    // Calculations with proper type safety
    const totalBookings = bookingsData.length;
    const pendingBookings = bookingsData.filter(b => b.bookingStatus === "Pending").length;
    const confirmedBookings = bookingsData.filter(b => b.bookingStatus === "Confirmed").length;

    const totalPayments = paymentsData.length;
    const completedPayments = paymentsData.filter(p => p.paymentStatus === "Completed").length;
    const pendingPayments = paymentsData.filter(p => p.paymentStatus === "Pending").length;
    
    // Safe totalRevenue calculation
    const totalRevenue = paymentsData.reduce((sum, p) => {
        const amount = typeof p.amount === 'string' ? parseFloat(p.amount) : p.amount;
        return sum + (Number.isFinite(amount) ? amount : 0);
    }, 0);

    const totalTickets = ticketsData.length;
    const openTickets = ticketsData.filter(t => t.status === "Open" || t.status === "Pending").length;
    const closedTickets = ticketsData.filter(t => t.status === "Closed").length;

    type User = { role: string; [key: string]: any };
    const totalUsers = usersData.length;
    const adminUsers = usersData.filter((u: User) => u.role === "admin").length;
    const users = usersData.filter((u: User) => u.role === "user").length;
    const disabledUsers = usersData.filter((u: User) => u.role === "disabled").length;

    const totalVehicles = vehiclesData.length;
    const availableVehicles = vehiclesData.filter(v => v.availability).length;
    const bookedVehicles = vehiclesData.filter(v => !v.availability).length;

    // Check for any loading or error state
    const anyLoading = bookingsLoading || paymentsLoading || ticketsLoading || usersLoading || vehiclesLoading;
    const anyError = bookingsError || paymentsError || ticketsError || usersError || vehiclesError;

    if (anyLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <PuffLoader color="#0aff13" size={80} />
                <span className="ml-4 text-gray-700 text-xl">Loading dashboard data...</span>
            </div>
        );
    }

    if (anyError) {
        return (
            <div className="text-center py-10 text-red-600 bg-white rounded-lg shadow-md m-4">
                <h2 className="text-2xl font-bold mb-4">Error Loading Data</h2>
                <p>There was an issue fetching some dashboard statistics. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-700 animate-fadeInUp">
                Admin Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Bookings Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-semibold text-blue-600 mb-4">Bookings</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{totalBookings}</p>
                    <p className="text-gray-600">Total Bookings</p>
                    <div className="mt-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getStatusBadgeClass("Confirmed")}`}>
                            Confirmed: {confirmedBookings}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass("Pending")}`}>
                            Pending: {pendingBookings}
                        </span>
                    </div>
                    <Link to="/admin/bookings" className="text-blue-500 hover:underline mt-4 block text-right">View All &rarr;</Link>
                </div>

                {/* Payments Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-semibold text-green-600 mb-4">Payments</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-2">Ksh {Number(totalRevenue).toFixed(2)}</p>
                    <p className="text-gray-600">Total Revenue</p>
                    <div className="mt-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getStatusBadgeClass("Completed")}`}>
                            Completed: {completedPayments}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass("Pending")}`}>
                            Pending: {pendingPayments}
                        </span>
                    </div>
                    <Link to="/admin/payments" className="text-green-500 hover:underline mt-4 block text-right">View All &rarr;</Link>
                </div>

                {/* Tickets Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-semibold text-purple-600 mb-4">Support Tickets</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{totalTickets}</p>
                    <p className="text-gray-600">Total Tickets</p>
                    <div className="mt-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getStatusBadgeClass("Open")}`}>
                            Open: {openTickets}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass("Closed")}`}>
                            Closed: {closedTickets}
                        </span>
                    </div>
                    <Link to="/admin/tickets" className="text-purple-500 hover:underline mt-4 block text-right">View All &rarr;</Link>
                </div>

                {/* Users Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-semibold text-orange-600 mb-4">Users</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{totalUsers}</p>
                    <p className="text-gray-600">Total Users</p>
                    <div className="mt-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getStatusBadgeClass("admin")}`}>
                            Admins: {adminUsers}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass("member")}`}>
                            Users: {users}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${getStatusBadgeClass("disabled")}`}>
                            Disabled: {disabledUsers}
                        </span>
                    </div>
                    <Link to="/admin/users" className="text-orange-500 hover:underline mt-4 block text-right">View All &rarr;</Link>
                </div>

                {/* Vehicles Card */}
                <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <h2 className="text-xl font-semibold text-teal-600 mb-4">Vehicles</h2>
                    <p className="text-3xl font-bold text-gray-900 mb-2">{totalVehicles}</p>
                    <p className="text-gray-600">Total Vehicles</p>
                    <div className="mt-4 text-sm">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2 ${getStatusBadgeClass("Available")}`}>
                            Available: {availableVehicles}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass("Booked")}`}>
                            Booked: {bookedVehicles}
                        </span>
                    </div>
                    <Link to="/admin/vehicles" className="text-teal-500 hover:underline mt-4 block text-right">View All &rarr;</Link>
                </div>
            </div>

            {/* Quick Insights section */}
            <section className="mt-10">
                <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Quick Insights</h2>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Overall System Health</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        <li>There are <span className="font-bold text-blue-600">{totalBookings}</span> total bookings in the system, with <span className="font-bold text-yellow-600">{pendingBookings}</span> currently pending confirmation.</li>
                        <li>Total revenue generated from <span className="font-bold text-green-600">{totalPayments}</span> payments is <span className="font-bold text-green-600">Ksh {Number(totalRevenue).toFixed(2)}</span>.</li>
                        <li>Out of <span className="font-bold text-purple-600">{totalTickets}</span> support tickets, <span className="font-bold text-blue-600">{openTickets}</span> are still open or pending resolution.</li>
                        <li>The platform has <span className="font-bold text-orange-600">{totalUsers}</span> registered users, including <span className="font-bold text-green-600">{adminUsers}</span> administrators.</li>
                        <li>Currently, <span className="font-bold text-teal-600">{availableVehicles}</span> out of <span className="font-bold text-gray-900">{totalVehicles}</span> vehicles are available for rent.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default Analytics;