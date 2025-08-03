// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'  // Import routing utilities from React Router
// import { AnimatePresence } from 'framer-motion'

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
import ProtectedRoute from './components/admin/ProtectedRoute'

// Toast (optional UI enhancement)
import { Toaster } from 'react-hot-toast'
import Navbar from './components/shared/Navbar'

const appRouter = createBrowserRouter([   // Define all application routes using createBrowserRouter

  { path: '/', element: <Home /> },       // Default route (homepage)
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/jobs', element: <Jobs /> },
  { path: '/description/:id', element: <JobDescription /> },    // Job description by ID
  { path: '/browse', element: <Browse /> },
  { path: '/profile', element: <Profile /> },
  
  
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
      {/* <Navbar /> */}
      {/* <Toaster position="top-right" /> */}
      {/* <AnimatePresence> */}
        {/* RouterProvider connects your routes to the app */}
      <RouterProvider router={appRouter} />
      {/* </AnimatePresence>    */}
    </>
  )
}

export default App;   // Export App component as default
