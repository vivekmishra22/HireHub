import React, { useEffect } from 'react'          // Import necessary hooks and modules from React and React Router
import { useSelector } from 'react-redux'         // For accessing Redux store state
import { useNavigate } from 'react-router-dom';   // For programmatic navigation

const ProtectedRoute = ({children}) => {          // This component wraps protected routes and ensures only allowed users can access them
    const {user} = useSelector(store => store.auth);  // Destructures the 'user' object from the Redux store's 'auth' slice

    const navigate = useNavigate();               // Hook to navigate programmatically

    useEffect(() => {                             // Side-effect hook that runs once after initial render
        if(user === null || user.role !== 'recruiter'){ // Checks if the user is not logged in or not a 'recruiter'
            navigate("/");                        // If not authorized, navigate to the home page
        }
    },[]);                                        // Empty dependency array ensures this runs only on mount
    
  return (
    <>
    {/* Renders child components only if user passes the auth check */}
     {children} 
    </>
  )
}

export default ProtectedRoute;                  // Exports the component so it can be used elsewhere
