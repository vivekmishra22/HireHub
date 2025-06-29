import { setAllJobs } from '@/redux/jobSlice'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetCompanyById = (companyId) => {

    const dispatch = useDispatch();
    
  useEffect (() => {
    const fetchSingleCompany = async () => {
        try {
            const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {withCredentials:true});
            if(res.data.success) {
                dispatch(setAllJobs(res.data.jobs));
            }
        } catch (error) {
            console.log(error)
        }
    }
    fetchSingleCompany();
  }, [])    // [] --> array dependency
}

export default useGetCompanyById;
