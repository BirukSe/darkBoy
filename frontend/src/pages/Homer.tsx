import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

function Homer() {
    const isAuthenticated = false;

    return (
        <>
        {isAuthenticated ? (
            <Navigate to="/" />
        ) : (
            <>
           
            <section className="flex flex-1 justify-center items-center flex-row py-10 bg-black text-white min-h-screen">
            <div className="flex-1 flex justify-center items-center px-4 md:px-10">
              <div className="max-w-lg w-full">
                <Outlet />
              </div>
            </div>
          
            {/* Image */}
            <img
              src='../assets/an.jpg'
              alt="logo"
              className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
            />
          </section>
          

            </>
        )}
        </>
    );
}

export default Homer;
