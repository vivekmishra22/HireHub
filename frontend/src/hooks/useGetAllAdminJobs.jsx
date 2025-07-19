import { setAllAdminJobs } from '@/redux/jobSlice'          // Redux action to store all jobs created by the admin
import { JOB_API_END_POINT } from '@/utils/constant'        // Constant that holds the base URL of job-related APIs
import axios from 'axios'                   // Axios for making HTTP requests
import { useEffect } from 'react'           // useEffect is used to run code when the component mounts
import { useDispatch } from 'react-redux'   // useDispatch lets you dispatch actions to the Redux store

const useGetAllAdminJobs = () => {      // 🧠 Hook Definition

    const dispatch = useDispatch();     // 🔧 Initialize Dispatch
    
  useEffect (() => {        // ⚙️ Fetching Data When Component Mounts
    const fetchAllAdminJobs = async () => {
        try {
            const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {withCredentials:true});   // 🌐 Make GET Request to Fetch Jobs
            if(res.data.success) {      // ✅ On Success, Update Redux Store
                dispatch(setAllAdminJobs(res.data.jobs));
            }
        } catch (error) {       // ❌ Handle Errors Gracefully
            console.log(error);
        }
    }   // ⏯️ Call Function & Finish useEffect
    fetchAllAdminJobs();    
  }, [])    // [] --> array dependency
}

export default useGetAllAdminJobs;      // 📤 Export the Hook
