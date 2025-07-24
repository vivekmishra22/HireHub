import React, { useEffect } from 'react'                        // Import necessary React hooks and components
import Navbar from '../shared/Navbar'                           // Navigation bar component
import ApplicantsTable from './ApplicantsTable'                 // Table component to display applicants
import axios from 'axios'                                       // Library to make HTTP requests
import { APPLICATION_API_END_POINT } from '@/utils/constant'    // Base URL constant for application API
import { useParams } from 'react-router-dom'                    // Hook to access URL parameters
import { useDispatch, useSelector } from 'react-redux'          // Redux hooks to access state and dispatch actions
import { setAllApplicants } from '@/redux/applicationSlice'     // Redux action to store applicant data

const Applicants = () => {

  const params = useParams();       // Extract job ID from the URL parameters (e.g., /jobs/:id/applicants)
  const dispatch = useDispatch();   // Initialize Redux dispatch function
  const {applicants} = useSelector(store=>store.application);   // Access the 'applicants' state from the Redux store

  useEffect(() => {                           // Fetch all applicants when the component mounts
    const fetchAllApplicants = async() => {   
      try {     // API call to get applicants for a specific job using job ID from params
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, {
          withCredentials:true      // Required to send cookies/session
        });
        dispatch(setAllApplicants(res.data.job));   // Save the fetched applicant data in Redux store
      } catch (error) {       // Log any error that occurs during the fetch
        console.log(error);
      }
    }
    fetchAllApplicants();     // Call the function
  },[]);                      // Empty dependency array ensures this runs once on mount
  
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            {/* Heading showing count of total applicants */}
            <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
            <ApplicantsTable/>    {/* Render the ApplicantsTable component to show applicant details */}
        </div>
    </div>
  )
}

export default Applicants;    // Export component for use in routing or other components
