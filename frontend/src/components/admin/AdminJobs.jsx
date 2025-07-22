import React, { useEffect, useState } from 'react'            // Import necessary React hooks and components
import Navbar from '../shared/Navbar'                         // Navbar component used at the top

// UI components for input and button
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'              // Hook to navigate between routes
import { useDispatch } from 'react-redux'                   // Redux hook to dispatch actions
import AdminJobsTable from './AdminJobsTable'               // Component to display all jobs in a table format
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs' // Custom hook to fetch all jobs created by admin
import { setSearchJobByText } from '@/redux/jobSlice'       // Redux action to update search filter in global state

const AdminJobs = () => {         // Functional component definition

  useGetAllAdminJobs();           // Call custom hook to fetch all admin jobs on component mount

  const [input, setInput] = useState("");   // Local state to store search input value
  const navigate = useNavigate();           // Hook to programmatically navigate to other routes
  const dispatch = useDispatch();           // Hook to dispatch Redux actions

  useEffect(() => {           // Whenever `input` value changes, update Redux state to filter jobs by text
    dispatch(setSearchJobByText(input));  // Updates the job search text in Redux state
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>

        <div className='flex items-center justify-between my-5'>
          <Input className={'w-fit'} placeholder='Filter by name, role' onChange={(e) => setInput(e.target.value)} />
          <Button onClick={() => navigate("/admin/jobs/create")}>Add Job</Button>
        </div>

        <AdminJobsTable />

      </div>
    </div>
  )
}

export default AdminJobs;     // Export the component for use in other files
