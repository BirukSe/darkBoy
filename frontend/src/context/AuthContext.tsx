// import React, { createContext, useContext, useState, ReactNode } from "react";

// // Define the shape of the context's value
// interface AuthContextType {
//   isGuest: boolean;
//   setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
//   currentUserName: string;
//   setCurrentUserName: React.Dispatch<React.SetStateAction<string>>;
//   currentUserEmail: string;
//   setCurrentUserEmail: React.Dispatch<React.SetStateAction<string>>;
// }

// // Create the context with an initial value of null (for now)
// export const AuthContext = createContext<AuthContextType | null>(null);

// // Define the provider component
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
//   const [isGuest, setIsGuest] = useState<boolean>(false);
//   const [currentUserName, setCurrentUserName] = useState<string>("");
//   const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

//   // Create the context value with explicit types
//   const contextValue: AuthContextType = {
//     isGuest,
//     setIsGuest,
//     currentUserName,
//     setCurrentUserName,
//     currentUserEmail,
//     setCurrentUserEmail,
//   };

//   // Return the provider with the context value
//   return (
//     <AuthContext.Provider value={contextValue}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuthContext = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuthContext must be used within an AuthProvider");
//   }
//   return context;
// };
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSignIn, useUser } from '@clerk/clerk-react'; // Import Clerk hooks

// Define the shape of the context's value
interface AuthContextType {
  isGuest: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserName: string;
  setCurrentUserName: React.Dispatch<React.SetStateAction<string>>;
  currentUserEmail: string;
  setCurrentUserEmail: React.Dispatch<React.SetStateAction<string>>;
  isAuthenticated: boolean; // To track if the user is authenticated or not
  user: any; // The user object (can be more strongly typed depending on your user data structure)
  signInWithGoogle: () => void; // Function to trigger Google OAuth sign-in
  isLoading: boolean; // Loading state
  error: string | null; // Error state
}

// Create the context with an initial value of null (for now)
export const AuthContext = createContext<AuthContextType | null>(null);

// Define the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  // State to handle guest data and user info
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [currentUserName, setCurrentUserName] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  // Clerk authentication hooks
  const { user: clerkUser, isSignedIn, isLoaded, isPending, error } = useUser(); // User info from Clerk
  const { signIn, isSigningIn } = useSignIn();

  // Set user details when authenticated
  useEffect(() => {
    if (clerkUser) {
      setCurrentUserName(clerkUser.firstName || "Guest");
      setCurrentUserEmail(clerkUser.emailAddresses[0]?.emailAddress || "guest@example.com");
    }
  }, [clerkUser]);

  // Function to handle Google OAuth sign-in
  const signInWithGoogle = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/feed",
      });
    } catch (err) {
      console.error("Sign-in failed:", err);
    }
  };

  // Determine if the user is authenticated
  const isAuthenticated = isSignedIn || isGuest;

  // Create the context value
  const contextValue: AuthContextType = {
    isGuest,
    setIsGuest,
    currentUserName,
    setCurrentUserName,
    currentUserEmail,
    setCurrentUserEmail,
    isAuthenticated,
    user: clerkUser,
    signInWithGoogle,
    isLoading: isLoaded || isPending,
    error: error ? error.message : null,
  };

  // Return the provider with the context value
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
