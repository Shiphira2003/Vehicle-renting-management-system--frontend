import { FiEdit } from "react-icons/fi"
import { userApi } from "../../features/api/userApi" 
import type { RootState } from "../../apps/store"
import { useSelector } from "react-redux"
import { PuffLoader } from "react-spinners"
import { useState } from "react"
import { FaTimes } from "react-icons/fa"
import { SaveIcon } from "lucide-react"

interface UserDetail {
    userId: number;
    firstName: string;
    lastName: string;
    profileUrl: string;
    email: string;
    role: "admin" | "member" | "disabled";
    createdAt: string;
}

const getUserRoleBadge = (role: string) => {
    switch (role) {
        case "admin": return "badge-success text-green-800 bg-green-200 border-green-300";
        case "disabled": return "badge-error text-red-800 bg-red-200 border-red-300";
        case "member": return "badge-warning text-yellow-800 bg-yellow-200 border-yellow-300";
        default: return "badge-primary";
    }
}

export const AllUsers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null);
    const [newRole, setNewRole] = useState<"admin" | "member" | "disabled">("member");

    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

   
    const [updateUserProfile, { isLoading: isUpdatingUser, error: updateError }] = userApi.useUpdateUserProfileMutation();

    const { data: usersData = [], isLoading: userDataIsLoading, error: fetchError } = userApi.useGetAllUsersProfilesQuery(
        undefined,
        { skip: !isAuthenticated }
    );

    const handleModalToggle = (user?: UserDetail) => {
        setIsModalOpen(!isModalOpen);
        if (user) {
            setSelectedUser(user);
            setNewRole(user.role);
        } else {
            setSelectedUser(null);
            setNewRole("member");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedUser && newRole) {
            try {
            
                await updateUserProfile({ userId: selectedUser.userId, role: newRole }).unwrap();
                setIsModalOpen(false);
                //  show a success message
            } catch (err) {
                console.error("Failed to update user role:", err);
                //  show an error message
            }
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-purple-700 animate-fadeInDown">
                    Manage All Users
                </h1>

                <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
                    {fetchError ? (
                        <div className="text-red-600 text-center py-4 text-lg">
                            Error fetching user data. Please try again.
                        </div>
                    ) : userDataIsLoading ? (
                        <div className="flex justify-center items-center py-8">
                            <PuffLoader color="#8B5CF6" size={60} />
                            <span className="ml-4 text-gray-700">Loading users...</span>
                        </div>
                    ) : usersData.length === 0 ? (
                        <div className="text-center text-gray-600 py-8 text-lg">
                            No users found.
                        </div>
                    ) : (
                        <table className="table w-full text-left">
                            {/* head */}
                            <thead>
                                <tr className="bg-purple-100 text-purple-800 text-sm uppercase">
                                    <th className="p-4 rounded-tl-lg"> # </th>
                                    <th className="p-4">User</th>
                                    <th className="p-4">Joined On</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4 rounded-tr-lg">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData?.map((user: UserDetail) => (
                                    <tr key={user.userId} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                                        <th className="p-4 text-gray-700"> {user.userId} </th>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12 border-2 border-orange-400">
                                                        <img
                                                            src={user.profileUrl || "/default-avatar.png"}
                                                            alt={`${user.firstName} ${user.lastName} Avatar`}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-purple-700">{user.firstName} {user.lastName}</div>
                                                    <div className="text-sm opacity-70 text-gray-600">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700"> {new Date(user.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <div className="flex items-center">
                                                <span className={`badge text-xs font-semibold px-3 py-1 rounded-full ${getUserRoleBadge(user.role)} `}>
                                                    {user.role}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <button
                                                className="btn btn-sm btn-outline border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white transition-colors duration-200"
                                                onClick={() => handleModalToggle(user)}
                                            >
                                                <FiEdit className="w-4 h-4" />
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Edit User Role Modal */}
            {isModalOpen && selectedUser && (
                <div className="modal modal-open flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="modal-box bg-white p-8 rounded-lg shadow-xl relative max-w-lg w-full">
                        <button
                            className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 text-gray-700"
                            onClick={() => handleModalToggle()}
                        >
                            ✕
                        </button>
                        <div className="flex justify-center items-center mb-6">
                            <h2 className="text-2xl font-bold text-purple-700 ">Change User Role for {selectedUser.firstName}</h2>
                        </div>
                        {updateError && (
                            <div className="text-red-500 text-center mb-4">
                                Failed to update user. Please try again.
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label htmlFor="userRole" className="block text-sm font-medium text-gray-700 mb-2">User Role</label>
                                <select
                                    id="userRole"
                                    className="select select-bordered w-full p-3 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value as "admin" | "member" | "disabled")}
                                >
                                    <option value="member">Member</option>
                                    <option value="admin">Admin</option>
                                    <option value="disabled">Disabled</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleModalToggle()}
                                    className="btn bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 flex items-center gap-2"
                                >
                                    <FaTimes /> Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="btn bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200 flex items-center gap-2"
                                    disabled={isUpdatingUser}
                                >
                                    <SaveIcon className="w-4 h-4"/> {isUpdatingUser ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}