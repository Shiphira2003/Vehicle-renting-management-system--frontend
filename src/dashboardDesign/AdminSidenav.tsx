import { SquareUserRound, LogOut, TrendingUpIcon, Home, Car, Users, Ticket, ListTodo } from "lucide-react" // Added Home, Car, Users, Ticket, ListTodo
import { Link } from "react-router-dom"


export const AdminSideNav =()=> {
    return (
        <ul className="menu bg-gray-300 text-dark-300 shadow-lg min-w-full gap-2 text-base-content min-h-full p-4"> {/* Added p-4 for padding */}
            {/* Analytics */}
            <li>
                <Link to="analytics" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <TrendingUpIcon className="text-orange-600 w-5 h-5"/> {/* Icon for Analytics */}
                    <span className="text-gray-800 text-lg">Analytics</span> {/* Text color and size adjusted */}
                </Link>
            </li>
            {/* All bookings */}
            <li>
                <Link to="allbookings" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <ListTodo className="text-orange-600 w-5 h-5"/> {/* Changed to ListTodo for bookings/tasks */}
                    <span className="text-gray-800 text-lg">All bookings</span>
                </Link>
            </li>
            {/* All vehicles */}
            <li>
                <Link to="allvehicles" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <Car className="text-orange-600 w-5 h-5"/> {/* Changed to Car icon for vehicles */}
                    <span className="text-gray-800 text-lg">All vehicles</span>
                </Link>
            </li>
            {/* All users */}
            <li>
                <Link to="allusers" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <Users className="text-orange-600 w-5 h-5"/> {/* Changed to Users icon */}
                    <span className="text-gray-800 text-lg">All users</span>
                </Link>
            </li>
            {/* All tickets */}
            <li>
                <Link to="alltickets" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <Ticket className="text-orange-600 w-5 h-5"/> {/* Changed to Ticket icon */}
                    <span className="text-gray-800 text-lg">All tickets</span>
                </Link>
            </li>
            {/* My profile */}
            <li>
                <Link to="adminprofile" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <SquareUserRound className="text-orange-600 w-5 h-5"/> {/* Icon for My Profile */}
                    <span className="text-gray-800 text-lg">My profile</span>
                </Link>
            </li>
            {/* Spacing for Logout and Home - you might add a divider or margin here */}
            <div className="my-4 border-t border-gray-400"></div> {/* Optional divider */}

            {/* Logout */}
            <li>
                <Link to="#" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <LogOut className="text-red-600 w-5 h-5"/> {/* Icon for Logout */}
                    <span className="text-gray-800 text-lg">Logout</span>
                </Link>
            </li>
            {/* Home */}
            <li>
                <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-400">
                    <Home className="text-green-500 w-5 h-5"/> {/* Icon for Home */}
                    <span className="text-gray-800 text-lg">Home</span>
                </Link>
            </li>
        </ul>
    )
}