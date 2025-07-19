import { setSingleCompany } from '@/redux/companySlice'     // Import the Redux action to update the company state
import { COMPANY_API_END_POINT } from '@/utils/constant'    // API endpoint constant
import axios from 'axios'               // Axios for making HTTP requests
import { useEffect } from 'react'       // React's useEffect hook to handle side effects (like fetching data)
import { useDispatch } from 'react-redux'   // Redux's useDispatch to dispatch actions

const useGetCompanyById = (companyId) => {  // Custom hook to fetch company data by ID and store it in Redux

    const dispatch = useDispatch();     // Allows dispatching Redux actions
    
  useEffect (() => {        // 📡 Fetch Company on Component Mount or ID Change
    const fetchSingleCompany = async () => {        // Async function to fetch company data
        try {
            // Make GET request to fetch company by ID
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
                withCredentials:true    // Ensures cookies (like auth tokens) are sent
            });
            if(res.data.success) {      // If the API response is successful
                dispatch(setSingleCompany(res.data.company));       // Dispatch the company data to Redux store
            }
        } catch (error) {
            console.log(error);     // Log any error for debugging
        }
    }
    fetchSingleCompany();       // Call the async function
  }, [companyId, dispatch])    // [] --> Dependency array: re-run effect if companyId or dispatch changes
}

export default useGetCompanyById;   // 📤 Export Hook
