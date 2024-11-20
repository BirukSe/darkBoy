// // import React, { useEffect } from 'react';
// // import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// // import { Button } from '../components/ui/button';

// // import { sidebarLinks } from '../constants/Sidebar';
// // // Correct import in your component file
// // import { useAuthContext } from '../context/AuthContext'; // Adjust the path based on the actual file structure


// // const Navbar = () => {
// //   const { pathname } = useLocation();
// //   const navigate = useNavigate();
// //   const { currentUserName } = useAuthContext();
// //   const image = currentUserName[0];

// //   return (
// //     <>
// //       <nav className="leftsidebar">
// //         <div className="flex flex-col gap-11">
          

// //           <div className="flex flex-col">
// //             <img 
// //               src={image || "/assets/icons/profile-placeholder.svg"}
// //               alt="profile"
// //               className="h-14 w-14 rounded-full"
// //             />
// //             <p className="body-bold">
// //               {currentUserName || "Guest"}
// //             </p>
// //             <p className="small-regular text-light-3">
// //               @{currentUserName || "Guest"}
// //             </p>
// //           </div>

// //           {/* Closing Link tag here */}
// //           <ul className="flex flex-col gap-6">
// //             {sidebarLinks.map((link) => {
// //               const isActive = pathname === link.route;
// //               return (
// //                 <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
// //                   <NavLink to={link.route} className="flex gap-4 items-center p-4">
// //                     <img 
// //                       src={link.imgURL}
// //                       alt={link.label}
// //                       className={`group-hover:invert-white ${isActive && 'invert-white'}`}
// //                     />
// //                     {link.label}
// //                   </NavLink>
// //                 </li>
// //               );
// //             })}
// //           </ul>
// //         </div>

// //         {/* Logout button */}
// //         <Button variant="ghost" className="shad-button_ghost" onClick={() => signOut()}>
// //           <img src="/assets/icons/logout.svg" alt="logout"/>
// //           <p className="small-medium lg:base-medium">Logout</p>
// //         </Button>
// //       </nav>
// //     </>
// //   );
// // };

// // export default Navbar;
// import React, { useEffect } from 'react';
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
// import { Button } from '../components/ui/button';  // Assuming Button component is reusable

// import { sidebarLinks } from '../constants/Sidebar';
// import { useAuthContext } from '../context/AuthContext'; // Adjust the path based on the actual file structure

// const Navbar = () => {
//   const { pathname } = useLocation();
//   const navigate = useNavigate();
//   const { currentUserName, currentUserImage, signOut } = useAuthContext();  // Get user data and signOut
//   const image = currentUserImage || "/assets/icons/profile-placeholder.svg";  // Fallback image if none exists
  
//   // UseEffect to handle redirection or state changes based on auth status, if needed
//   useEffect(() => {
//     // Additional logic for navigation after logout, etc.
//   }, []);
  
//   return (
//     <nav className="bg-dark-1 text-white p-4 w-30">
//       <div className="flex flex-col gap-11">
        
       

//         <Link to={`/profile/${currentUserName}`} className="flex gap-3 items-center">
//           <img 
//             src={image}
//             alt="profile"
//             className="h-14 w-14 rounded-full"
//           />
//           <div className="flex flex-col">
//             <p className="body-bold">
//               {currentUserName || "Guest"}
//             </p>
//             <p className="small-regular text-light-3">
//               @{currentUserName || "Guest"}
//             </p>
//           </div>
//         </Link>

//         {/* Sidebar Links */}
//         <ul className="flex flex-col gap-6">
//           {sidebarLinks.map((link) => {
//             const isActive = pathname === link.route;
//             return (
//               <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
//                 <NavLink to={link.route} className="flex gap-4 items-center p-4 hover:bg-sky-500 w-60">
//                   <img 
//                     src={link.imgURL}
//                     alt={link.label}
//                     className={`group-hover:invert-white ${isActive && 'invert-white'}`}
//                   />
//                   {link.label}
//                 </NavLink>
//               </li>
//             );
//           })}
//         </ul>
//       </div>

//       {/* Logout Button */}
//       <Button variant="ghost" className="shad-button_ghost" onClick={signOut}>
//         <img src="/assets/icons/logout.svg" alt="logout"/>
//         <p className="small-medium lg:base-medium">Logout</p>
//       </Button>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Button } from '../components/ui/button'; // Assuming Button component is reusable
import { sidebarLinks } from '../constants/Sidebar';
import { useAuthContext } from '../context/AuthContext'; // Adjust the path based on the actual file structure
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate=useNavigate();
  const { currentUserName, currentUserImage} = useAuthContext();  // Get user data and signOut
  const image = currentUserImage || "/assets/icons/profile-placeholder.svg";  // Fallback image if none exists
  const {setCurrentUserEmail, setCurrentUserName}=useAuthContext();
  function signOut(){
    setCurrentUserName(null);
    setCurrentUserImage(null);
    navigate('/')
    

  }
  

  return (
    <div className="flex">
      <nav className="bg-dark-1 text-white p-4 w-21">
        <div className="flex flex-col gap-11">
          <Link to={`/profile/${currentUserName}`} className="flex gap-3 items-center">
            <img 
              src={image}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="body-bold">
                {currentUserName || "Guest"}
              </p>
              <p className="small-regular text-light-3">
                @{currentUserName || "Guest"}
              </p>
            </div>
          </Link>

          {/* Sidebar Links */}
          <ul className="flex flex-col gap-6">
            {sidebarLinks.map((link) => {
              return (
                <li key={link.label} className="leftsidebar-link group">
                  <NavLink to={link.route} className="flex gap-4 items-center p-4 hover:bg-sky-500 w-60">
                    <img 
                      src={link.imgURL}
                      alt={link.label}
                      className="group-hover:invert-white"
                    />
                    {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout Button */}
        <Button variant="ghost" className="shad-button_ghost" onClick={signOut}>
          <img src="/assets/icons/logout.svg" alt="logout"/>
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </nav>

      {/* The Outlet where the nested routes will be rendered */}
      <div className="main-content flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Navbar;
