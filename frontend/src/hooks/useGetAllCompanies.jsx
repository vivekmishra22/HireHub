import { setCompanies } from '@/redux/companySlice'         // Action creator to store all companies in Redux
import { COMPANY_API_END_POINT } from '@/utils/constant'    // API endpoint constant
import axios from 'axios'                   // HTTP client for making API calls
import { useEffect } from 'react'           // React hook to run code on component lifecycle events
import { useDispatch } from 'react-redux'   // Hook to dispatch actions to the Redux store

const useGetAllCompanies = () => {      // 🔄 Hook Definition

    const dispatch = useDispatch();     // 🚀 Setup Redux Dispatch

    useEffect(() => {       // 🧠 useEffect to Run Side Effect
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
                if (res.data.success) {     // On Successful Response
                    dispatch(setCompanies(res.data.companies));
                }
            } catch (error) {       // ❌ Error Handling
                console.log(error);
            }
        }
        fetchCompanies();
    }, [])    // [] ensures this effect runs only once after component mounts
}

export default useGetAllCompanies;      // 📤 Export Hook
