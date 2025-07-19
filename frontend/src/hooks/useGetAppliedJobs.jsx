import { setAllAppliedJobs } from "@/redux/jobSlice";           // Import Redux action to store applied jobs in state
import { APPLICATION_API_END_POINT } from "@/utils/constant";   // Import constant for API endpoint
import axios from "axios";      // Axios for making HTTP requests
import { useEffect } from "react";      // React hook to handle side effects (like fetching data)
import { useDispatch } from "react-redux";  // Redux hook to dispatch actions

// 🔄 Hook Definition and Logic
const useGetAppliedJobs = () => {       // Custom hook definition
    const dispatch = useDispatch();     // Access the dispatch function from Redux

    useEffect(() => {           // useEffect to fetch data on component mount
        const fetchAppliedJobs = async () => {
            try {
                // Make a GET request to fetch all applied jobs
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
                    withCredentials:true        // Include cookies (e.g., session/auth tokens)
                });
                if(res.data.success) {      // If response indicates success
                    dispatch(setAllAppliedJobs(res.data.application));      // Dispatch action to update Redux state with the applied jobs
                }
            } catch (error) {   
                console.log(error);     // Log any error
            }
        }
        fetchAppliedJobs();     // Call the function immediately
    },[]);      // Empty dependency array ensures it runs only once on mount
};

export default useGetAppliedJobs;       // 📤 Export the Custom Hook