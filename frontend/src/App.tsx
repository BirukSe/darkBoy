// import { Routes, Route } from "react-router-dom";
// import Homer from "./pages/Homer";
// import Signin from "./pages/login/Signin";
// import Signup from "./pages/signup/Signup";
// import Feed from "./pages/Feed/Feed";
// import Navbar from "./Navigation/Navbar";
// import { useAuthContext } from './context/AuthContext'; // Adjust the path based on the actual file structure
// import Home from "./pages/Home/Home";
// import News from "./pages/News/News";
// import People from "./pages/People/People";
// import Admin from "./pages/Admin/Admin";
// // Assuming you have this context

// export default function App() {
//   const { currentUserName } = useAuthContext(); // Get the current user name or authentication state

//   return (
//     <Routes>
//       {/* Public Routes: Homer, Sign In, Sign Up */}
//       <Route path="/" element={<Homer />} >
//         <Route index element={<Signin />} /> 
//         <Route path="/sign-up" element={<Signup />} />
//       </Route>

//       {/* Protected Routes: Navbar is rendered when the user is authenticated */}
//       {currentUserName ? (
//         <>
//         <Route element={<Navbar />}>
//           {/* Protected Routes - Nested Routes */}
//           <Route path="/feed" element={<Feed />} />
//           <Route index path="/home" element={<Home />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/people" element={<People />} />
//         </Route>
//         <Route path="/admin" element={<Admin/>}/>
//         </>
        
//       ) : (
//         <>
//         <Route path="/admin" element={<Admin/>}/>
        
//         // Optionally, you could add a catch-all route here, like a 404 or redirect
//         <Route path="*" element={<Homer />} /> // Redirect to home page or login if not authenticated
//         </>
//       )}
//     </Routes>
//   );
// }
import { Routes, Route } from "react-router-dom";
import Homer from "./pages/Homer";
import Signin from "./pages/login/Signin";
import Signup from "./pages/signup/Signup";
import Feed from "./pages/Feed/Feed";
import Navbar from "./Navigation/Navbar";
import { useAuthContext } from './context/AuthContext'; // Adjust the path based on the actual file structure
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import People from "./pages/People/People";
import Admin from "./pages/Admin/Admin";

export default function App() {
  const { currentUserName } = useAuthContext(); // Get the current user name or authentication state

  return (
    <Routes>
      {/* Public Routes: Homer, Sign In, Sign Up */}
      <Route path="/" element={<Homer />} >
        <Route index element={<Signin />} /> 
        <Route path="/sign-up" element={<Signup />} />
      </Route>

      {/* Protected Routes: Navbar is rendered when the user is authenticated */}
      {currentUserName ? (
        <>
        <Route element={<Navbar />}>
          {/* Default Route: Home and Feed will both be visible when navigating to /feed */}
          <Route index path="/home" element={<Home />} />
          <Route path="/feed" element={<><Home /><Feed /></>} />
          <Route path="/news" element={<News />} />
          <Route path="/people" element={<People />} />
        </Route>
        <Route path="/admin" element={<Admin/>}/>
        </>
        
      ) : (
        <>
        <Route path="/admin" element={<Admin/>}/>
        
        {/* Optionally, you could add a catch-all route here, like a 404 or redirect */}
        <Route path="*" element={<Homer />} /> {/* Redirect to home page or login if not authenticated */}
        </>
      )}
    </Routes>
  );
}
