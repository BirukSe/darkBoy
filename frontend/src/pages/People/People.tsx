import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../lib/axios';

const People = () => {
  const list = ['Get in touch with our subscribers', 'Listen to what your friends are listening', 'Enjoy life!'];
  const [typedText, setTypedText] = useState('');
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [users, setUsers] = useState<any>([]); // For users data

  // Fetching users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/auth/people");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (charIndex < list[index].length) {
        setTypedText((prev) => prev + list[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => {
          setIndex((prevIndex) => (prevIndex + 1) % list.length);
          setCharIndex(0);
          setTypedText('');
        }, 1500);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, [charIndex, index]);

  return (
    <div>
      <h1 
        id="header-text"
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 drop-shadow-lg flex justify-center"
      >
        {typedText}
      </h1>
      <div className="bg-gray-100 min-h-screen p-6 m-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {users.length === 0 ? (
            <p className="text-center col-span-full text-lg text-gray-600">Loading users...</p>
          ) : (
            users.map((user: any, index: number) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                {/* Display more user information if available */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default People;
