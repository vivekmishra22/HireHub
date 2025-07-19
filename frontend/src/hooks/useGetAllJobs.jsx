import { setAllJobs } from '@/redux/jobSlice'           // Import Redux action to update job list
import { JOB_API_END_POINT } from '@/utils/constant'    // Import constant for API base URL
import axios from 'axios'           // Axios for making API calls
import { useEffect } from 'react'   // useEffect to run side-effects on component mount or state change
import { useDispatch, useSelector } from 'react-redux'  // Redux hooks to dispatch actions and access the store state

const useGetAllJobs = () => {           // Custom hook to fetch all jobs (filtered by search query)

    const dispatch = useDispatch();     // Used to dispatch actions to Redux store
    const {searchedQuery} = useSelector(store => store.job);    // Get the search keyword from the Redux store
    
    // Fetch jobs when the component mounts
  useEffect (() => {        
    const fetchAllJobs = async () => {      // Function to fetch all jobs from API
        try {
            // Make GET request to fetch jobs based on searchedQuery
            const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`, {
                withCredentials:true    // send cookies/session
            });
            if(res.data.success) {      // If request is successful, store the jobs in Redux
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error);     // log error if request fails
        }
    }
    fetchAllJobs();     // Immediately call the function
  }, [])    // [] --> // Empty dependency array → this runs only once on mount
}

export default useGetAllJobs;       // 📤 Export the Hook
