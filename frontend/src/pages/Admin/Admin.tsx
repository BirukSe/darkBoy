import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';

const Admin = () => {
  const [array, setArray] = useState<any>([]);
  const [showUsers, setShowUsers] = useState<boolean>(false); // Flag to toggle detailed view

  // Fetch all users
  useEffect(() => {
    axiosInstance.get('/auth/people')
      .then((res) => {
        setArray(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Handle card click: Show users when a card is clicked
  const handleCardClick = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Display Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300 transform hover:scale-105"
            onClick={handleCardClick}
          >
            <h3 className="text-lg font-semibold text-gray-800">Total Users</h3>
            <p className="text-2xl font-bold text-blue-600">{array.length} Users</p>
          </div>
        </div>

        {/* Show the detailed list of users when a card is clicked */}
        {showUsers && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">All Users</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {array.map((user: any) => (
                <div key={user._id} className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                  <p className="font-semibold text-gray-700">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
