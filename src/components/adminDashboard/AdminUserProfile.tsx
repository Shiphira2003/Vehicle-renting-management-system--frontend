import { useEffect, useState } from 'react';
import { FaCamera, FaEdit, FaTimes } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { SaveIcon } from 'lucide-react';
import type { RootState } from '../../apps/store';
import Swal from 'sweetalert2'; 

import { useUpdateUserProfileMutation, useUpdateUserProfileImageMutation } from '../../features/api/userApi';


interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  contact: string; 
  password?: string; 
}


const AdminUserProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, role } = useSelector((state: RootState) => state.auth);

  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      address: user?.address || '',
      contact: user?.contactNo || '', 
    }
  });

 
  const profilePicture = user?.profileUrl ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.firstName || 'Admin')}+${encodeURIComponent(user?.lastName || 'Profile')}&background=A75288&color=fff&size=128`;

  const [isModalOpen, setIsModalOpen] = useState(false);

 
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateUserProfileMutation();
  const [updateProfileImage, { isLoading: isUploadingImage }] = useUpdateUserProfileImageMutation();


  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
   
    if (!isModalOpen && user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address || '',
        contact: user.contactNo || '',
      });
    }
  };

  // useEffect(() => {
  //   // user must exist and be authenticated
  //   if (!isAuthenticated || !user) {
  //     navigate('/login');
  //   } else if (role !== 'admin') {
  //     navigate('/login'); // Redirect if not an admin
  //   }
  // }, [isAuthenticated, user, role, navigate]);


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const userId = user?.userId; 
      if (!userId) {
        Swal.fire('Error!', 'User ID not found. Cannot update profile.', 'error');
        return;
      }

      // Destructure password as it's not part of the standard update
      const { password, ...patch } = data;

      await updateProfile({ userId, ...patch }).unwrap();
      Swal.fire('Success!', 'Profile updated successfully!', 'success');
      handleModalToggle(); // Close modal on success
    } catch (error: any) { 
      console.error('Failed to update profile:', error);
      Swal.fire('Error!', error?.data?.message || 'Failed to update profile. Please try again.', 'error');
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Swal.fire({
        title: 'Uploading Image...',
        text: 'Please wait, your profile picture is being uploaded.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      try {
        const userId = user?.userId;
        if (!userId) {
          Swal.fire('Error!', 'User ID not found for image upload.', 'error');
          return;
        }

        

        const temporaryProfileUrl = URL.createObjectURL(file); // For immediate visual feedback

        // Call the mutation to update the user's profile URL in the database
        await updateProfileImage({ userId: userId, profileUrl: temporaryProfileUrl }).unwrap();

        Swal.fire('Success!', 'Profile image updated successfully!', 'success');
       
      } catch (error: any) {
        console.error('Failed to update profile image:', error);
        Swal.fire('Error!', error?.data?.message || 'Failed to upload image. Please try again.', 'error');
      }
    }
  };

  return (
    // Main container with dark background
    <div className="min-h-screen bg-darkGray text-white py-10 px-5">
      <div className="max-w-4xl mx-auto rounded-lg shadow-lg p-5">
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-lightTextGray pb-5 mb-5">
          <div className="relative flex items-center gap-4 mb-4 md:mb-0">
            <img
              src={user?.profileUrl || profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-accentPink object-cover"
            />
            {/* Camera icon for changing profile picture */}
            <label
              htmlFor="admin-profile-picture-upload" // Unique ID for admin profile picture upload
              className="absolute bottom-0 right-0 bg-accentPink p-2 rounded-full cursor-pointer text-white hover:bg-accentPinkDark transition-colors duration-200"
              title="Change Profile Picture"
            >
              <FaCamera />
              <input
                type="file"
                id="admin-profile-picture-upload" // Unique ID
                className="hidden"
                onChange={handleImageUpload}
                accept="image/*"
                disabled={isUploadingImage} // Disable input during upload
              />
            </label>
            <div>
              <h2 className="text-3xl font-bold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-lightTextGray">{user?.email}</p>
            </div>
          </div>
          <button
            className="btn btn-primary flex items-center gap-2 bg-accentPink text-white hover:bg-accentPinkDark"
            onClick={handleModalToggle}
            disabled={isUpdatingProfile || isUploadingImage} // Disable button if any update is in progress
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <div className="bg-gradient-to-r from-accentPink to-accentPinkDark rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Personal Information</h3>
            <p className="mb-2">
              <span className="font-bold text-black">First Name:</span> {user?.firstName || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">Last Name:</span> {user?.lastName || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">Email:</span> {user?.email || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">Contact:</span> {user?.contactNo || 'N/A'}
            </p>
            <p className="mb-2">
              <span className="font-bold text-black">Address:</span> {user?.address || 'N/A'}
            </p>
          </div>
          {/* Security Settings Card */}
          <div className="bg-gradient-to-r from-accentPink to-accentPinkDark rounded-lg p-4">
            <h3 className="text-2xl font-bold mb-3">Security Settings</h3>
            <p className="mb-2">
              <span className="font-bold">Password:</span> ********
            </p>
            <button
              className="btn btn-secondary bg-gray-700 text-white hover:bg-gray-600 border-none" // Adjusted for dark theme secondary button
              disabled={isUpdatingProfile || isUploadingImage}
            >
              Change Password
            </button>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="modal modal-open flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="modal-box bg-darkGray text-white p-8 rounded-lg shadow-xl relative max-w-lg w-full">
            <button
              className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-700 hover:bg-gray-600 text-white border-none"
              onClick={handleModalToggle}
              disabled={isUpdatingProfile} // Disable close button while saving
            >
              ✕
            </button>
            <div className="flex justify-center items-center mb-6">
              <h2 className="text-3xl font-bold text-accentPink ">Edit Admin Profile</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-accentPink mb-1">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="input input-bordered w-full text-white bg-darkGray border-lightTextGray placeholder-lightTextGray"
                  defaultValue={user?.firstName}
                  {...register('firstName', { required: 'First Name is required' })}
                  disabled={isUpdatingProfile} // Disable input fields during submission
                />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-accentPink mb-1">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="input input-bordered w-full text-white bg-darkGray border-lightTextGray placeholder-lightTextGray"
                  defaultValue={user?.lastName}
                  {...register('lastName', { required: 'Last Name is required' })}
                  disabled={isUpdatingProfile}
                />
                {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-accentPink mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  readOnly // Email is disabled
                  className="input input-bordered w-full bg-darkGray border-lightTextGray text-lightTextGray cursor-not-allowed"
                  defaultValue={user?.email}
                  {...register('email')}
                />
                {/* No error message needed for readOnly email */}
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-sm font-medium text-accentPink mb-1">Contact</label>
                <input
                  type="text"
                  id="contact"
                  className="input input-bordered w-full text-white bg-darkGray border-lightTextGray placeholder-lightTextGray"
                  defaultValue={user?.contactNo}
                  {...register('contact')}
                  disabled={isUpdatingProfile}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-accentPink mb-1">Address</label>
                <textarea
                  id="address"
                  className="textarea textarea-bordered w-full text-white bg-darkGray border-lightTextGray placeholder-lightTextGray"
                  rows={3}
                  defaultValue={user?.address}
                  {...register('address')}
                  disabled={isUpdatingProfile}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleModalToggle}
                  className="btn bg-red-500 hover:bg-red-600 text-white font-bold shadow-md transition-colors duration-200 flex items-center gap-2 border-none"
                  disabled={isUpdatingProfile}
                >
                  <FaTimes /> Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary bg-accentPink hover:bg-accentPinkDark text-white font-bold shadow-md transition-colors duration-200 flex items-center gap-2"
                  disabled={isUpdatingProfile}
                >
                  <SaveIcon className="w-4 h-4" /> {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserProfile;