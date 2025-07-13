import { createBrowserRouter, RouterProvider } from "react-router"
import { Register } from "./pages/Register"
import Error from "./pages/Error"
import "./App.css"
import { Login } from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import UserProfile from "./components/dashboard/UserProfile"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminDashboard from "./pages/AdminDashboard"


import AdminUserProfile from "./components/adminDashboard/AdminUserProfile"

import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Services from "./pages/Services"
import { AllUsers } from "./components/adminDashboard/AllUsers"
import { AllBookings } from "./components/adminDashboard/AllBookings"
import { AllTickets } from "./components/adminDashboard/AllTickets"
import AllVehicles from "./components/adminDashboard/AllVehicles"
import UserBookings from "./components/dashboard/Bookings"
import UserPayments from "./components/dashboard/Payments"
import UserTickets from "./components/dashboard/Tickets"
import Analytics from "./components/adminDashboard/Analytics"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      errorElement: <Error />,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement: <Error />,
    },
    {
      path: 'services',
      element: <Services />,
      errorElement: <Error />,
    },
    {
      path: 'login',
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: 'contact',
      element: <Contact/>,
      errorElement: <Error />,
    },
    {
      path: 'dashboard',
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "me",
          element: <UserProfile />,
        },
          {
          path: "bookings",
          element: <UserBookings />,
        },
       
         {
          path: "payments",
          element: <UserPayments />,
        },
          {
          path: "tickets",
          element: <UserTickets />,
        },
      ]
    },
    {
      path: 'admindashboard',
      element: (
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "allbookings",
          element: <AllBookings />,
        },
         {
          path: "alltickets",
          element: <AllTickets />,
        },
        {
          path: "allvehicles",
          element: <AllVehicles />,
        },
        {
          path: "allusers",
          element: <AllUsers/>,
        },
        {
          path: "adminprofile",
          element: <AdminUserProfile />,
        },
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
