import React, { useState } from 'react'                     // useState is for managing local state
import Navbar from '../shared/Navbar'                       // Custom Navbar component
import { Label } from '../ui/label'                         // Label component for form inputs
import { Input } from '../ui/input'                         // Input field component
import { Button } from '../ui/button'                       // Styled button component
import { useNavigate } from 'react-router-dom'              // Hook to navigate programmatically
import axios from 'axios'                                   // HTTP client for API calls
import { COMPANY_API_END_POINT } from '@/utils/constant'    // API endpoint constant
import { toast } from 'sonner'                              // Library for showing toast notifications
import { useDispatch } from 'react-redux'                   // Redux hook to dispatch actions
import { setSingleCompany } from '@/redux/companySlice'     // Redux action to store single company

const CompanyCreate = () => {                           // Component definition

    const navigate = useNavigate();                     // Hook to redirect user
    const [companyName, setCompanyName] = useState();   // State to hold input value for company name
    const dispatch = useDispatch();                     // Get Redux dispatch function

    const registerNewCompany = async () => {            // Function to register a new company
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`,   // Make POST request to backend with company name
                {companyName},                                                  // Sending company name in body
                {  
                headers:{
                    'Content-Length':'application/json'                         // Incorrect header value; should be Content-Type
                },
                withCredentials:true                                            // Include cookies (for auth/session)
            });
            if(res?.data?.success){                                             // If registration is successful
                dispatch(setSingleCompany(res.data.company));                   // Store the new company in Redux
                toast.success(res.data.message);                                // Show success notification
                const companyId = res?.data?.company?._id;                      // Extract new company ID
                navigate(`/admin/companies/${companyId}`);                      // Redirect to company details page
            }
        } catch (error) {
            console.log(error);                         // Log error if API call fails
        }
    }
    
    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto'>
                <div className='my-10'>
                    <h1 className='font-bold text-2xl'>Your Company Name</h1>
                    <p className='text-gray-500'>What would you like to give your company name? you can change this later</p>
                </div>
                <Label>Company Name</Label>
                <Input onChange={(e) => setCompanyName(e.target.value)}
                className={'my-2'} type={'text'} placeholder='HireHub, Google, etc.' />
                <div className='flex items-center gap-2 my-10'>
                    <Button onClick={() => navigate('/admin/companies')} variant='outline'>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;                           // Exporting the component for use in other parts of the app
