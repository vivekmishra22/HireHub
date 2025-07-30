import React, { useEffect, useState } from 'react'          // Import necessary libraries and components
import Navbar from '../shared/Navbar'                       // Shared Navbar component
import { Button } from '../ui/button'                       // Shared Navbar component
import { ArrowLeft, Loader2 } from 'lucide-react'           // Icons for UI
import { Label } from '../ui/label'                         // Label for form inputs
import { Input } from '../ui/input'                         // Styled input component
import axios from 'axios'                                   // Axios for HTTP requests
import { COMPANY_API_END_POINT } from '@/utils/constant'    // API constant
import { useNavigate, useParams } from 'react-router-dom'   // React Router hooks
import { toast } from 'sonner'                              // Toast notifications
import { useSelector } from 'react-redux'                   // Access redux store
import useGetCompanyById from '@/hooks/useGetCompanyById'   // Custom hook to fetch single company

const CompanySetup = () => {                    // Component Start

    const params = useParams();                 // Get route parameters (e.g., company ID from URL)
    useGetCompanyById(params.id);               // Fetch company data by ID

    const [input, setInput] = useState({        
        name: "",
        description: "",
        website: "",
        location: "",
        file: null                              // Holds the logo image file
    });

    const {singleCompany} = useSelector(store=>store.company);      // Get single company from Redux
    const [loading, setLoading] = useState(false);                  // Track loading state
    const navigate = useNavigate();                                 // Navigate programmatically

    const changeEventHandler = (e) => {                             //  Input Change Handlers, For text inputs
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {          // For file input
        const file = e.target.files?.[0];       // Get first selected file
        setInput({ ...input, file });
    }

    const SubmitHandler = async (e) => {        // Submit Handler
        e.preventDefault();
        const formData = new FormData();        // Create form data for file upload
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file); // Append file only if present
        }
        try {
            setLoading(true);       // Show loader
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${param.id}`, formData, {      // API call to update company details
                headers: {
                    "Content-Type": 'multipart/form-data'       // Important for file upload
                },
                withCredentials: true                           // Include credentials (cookies)
            });
            if (res.data.success) {
                toast.success(res.data.message);                // Show success toast
                navigate('/admin/companies');                   // Redirect after update
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);           // Show error toast
        } finally {
            setLoading(false);                                  // Hide loader
        }
    }

    useEffect(() => {                                       //  Set Initial Form Values After Data Fetch
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null                // Reset file to null on mount
        })
    }, [singleCompany]);

    return (                                                //  JSX Markup (Render)
        <div>
            <Navbar />
            <div className='max-w-xl mx-auto my-10'>
                <form action="" onSubmit={SubmitHandler}>
                    <div className='flex items-center gap-5 p-8'>
                        <Button onClick={() => navigate('/admin/companies')} variant='outline' className={'flex items-center gap-2 text-gray-500 font-semibold'}>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input type='text' name='name' value={input.name} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type='text' name='description' value={input.description} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input type='text' name='website' value={input.website} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type='text' name='location' value={input.location} onChange={changeEventHandler} />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input type='file' accept="image/*" onChange={changeFileHandler} />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                            <Button type='submit' className='w-full my-4'>Update</Button>
                    }
                </form>
            </div>
        </div>
    )
}

export default CompanySetup
