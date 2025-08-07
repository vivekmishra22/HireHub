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


  // ---------- Admin routes ----------
  { path: "/admin/companies", element: <Companies /> },             // Admin: List of companies
  { path: "/admin/companies/create", element: <CompanyCreate /> },   // Admin: Create new company
  { path: "/admin/companies/:id", element: <CompanySetup /> },       // Admin: Setup/edit specific company
  { path: "/admin/jobs", element: <AdminJobs /> },                   // Admin: View all jobs
  { path: "/admin/jobs/create", element: <PostJob /> },              // Admin: Post a new job
  { path: "/admin/jobs/:id/applicants", element: <Applicants /> },   // Admin: View job applicants
])

function App() {    // Main App component

  return (
    <>

      <div className="min-h-screen bg-white text-slate-800 flex flex-col">
        {/* Navbar visible on all pages */}
        {/* <Navbar /> */}

        {/* Toast notification */}
        <Toaster
          position="top-right"
          toastOptions={{
            className:
              'bg-cyan-500 text-white font-medium px-4 py-2 rounded shadow',
          }}
        />

        {/* Page content */}
        <RouterProvider router={appRouter} />

      </div>

      {/* <Navbar /> */}
      {/* <Toaster position="top-right" /> */}
      {/* RouterProvider connects your routes to the app */}
      {/* <RouterProvider router={appRouter} /> */}
    </>
  )
}

export default App;   // Export App component as default
