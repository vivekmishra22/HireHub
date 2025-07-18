// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  // Import routing utilities from React Router

// Import all components/pages used in routing
// Auth pages
import Login from './components/auth/Login' 
import Signup from './components/auth/Signup'

// Public user-facing pages
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'

// Admin pages
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'

// Wrapper component to protect admin routes (e.g., check if user is admin)
import ProtectedRoute from './components/admin/protectedRoute'

const appRouter = createBrowserRouter([   // Define all application routes using createBrowserRouter
  {
    path: '/',            // Default route (homepage)
    element: <Home />
  },
  {
    path: '/login',       // Login route
    element: <Login />
  },
  {
    path: '/signup',      // Signup route
    element: <Signup />
  },
  {
    path: '/jobs',        // Job listings
    element: <Jobs />
  },
  {
    path: '/description/:id',   // Job description by ID
    element: <JobDescription />
  },
  {
    path: '/browse',      // Browse jobs/companies page
    element: <Browse />
  },
  {
    path: '/profile',     // User profile page
    element: <Profile />
  },
  
  // ---------- Admin routes (protected by role check) ----------
  {
    path:"/admin/companies",        // Admin: List of companies
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",   // Admin: Create new company
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",    // Admin: Setup/edit specific company
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",            // Admin: View all jobs
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/create",    // Admin: Post a new job
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",  // Admin: View job applicants
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
])

function App() {    // Main App component

  return (
    <>
      <RouterProvider router={appRouter} />   {/* RouterProvider connects your routes to the app */}
      {/* <Navbar/> */}   {/* Optional: Uncomment this if you want a persistent Navbar on all pages */}
    </>
  )
}

export default App;   // Export App component as default
