import React, { useState } from 'react'     // Import necessary libraries and components
import Navbar from '../shared/Navbar'       // Reusable navigation bar
import { Label } from '../ui/label'         // Reusable navigation bar
import { Input } from '../ui/input'         // Custom input field
import { Button } from '../ui/button'       // Custom button component
import { useSelector } from 'react-redux'   // Redux hook to read from state
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'   // Custom dropdown components
import axios from 'axios'                   // HTTP client
import { JOB_API_END_POINT } from '@/utils/constant'    // API endpoint for job-related requests
import { toast } from 'sonner'              // Notification utility
import { useNavigate } from 'react-router-dom'          // Navigation hook
import { Loader2 } from 'lucide-react'      // Loading spinner icon

const companyArray = [];                    // Unused array (can be removed)

const PostJob = () => {                     // Component definition

    // State management for form input and loading
    const [input, setInput] = useState({            // Initialize job posting input fields
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""                       // Will be set when a company is selected
    });

    const [loading, setLoading] = useState(false);  // Tracks form submission status
    const navigate = useNavigate();                 // Used to redirect after successful job posting

    const { companies } = useSelector(store => store.company);  // Fetch companies from Redux store

    // Handlers for input and select
    const changeEventHandler = (e) => {             // Handles changes to standard input fields
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {        // Handles selection of company from dropdown
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({...input, companyId:selectedCompany._id});    // Set selected company's ID
    }

    const submitHandler = async(e) => {     // Submit handler with API call
        e.preventDefault();                 // Prevent page reload
        try {
            setLoading(true);               // Show loader
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers:{
                    'Content-Type':'application/json'   // Send JSON body
                },
                withCredentials:true                    // Include cookies (if needed)
            });
            if(res.data.success){
                toast.success(res.data.message);        // Show success notification
                navigate("/admin/jobs");                // Redirect to jobs listing page
            }
        } catch (error) {
            toast.error(error.response.data.message);   // Show error notification
        } finally {
            setLoading(false);                          // Hide loader
        }
    }

    return (                // JSX Markup (Render form)
        <div>
            <Navbar />

            <div className='flex items-center justify-center w-screen my-5'>

                {/* All form inputs (8 fields) */}
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border-gray-200 shadow-lg rounded-md'>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input type="text"
                                name='title' value={input.title}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text"
                                name='description' value={input.description}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text"
                                name='requirements' value={input.requirements}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="text"
                                name='salary' value={input.salary}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text"
                                name='location' value={input.location}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text"
                                name='jobType' value={input.jobType}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="text"
                                name='experience' value={input.experience}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        <div>
                            <Label>No. of Position</Label>
                            <Input type="number"
                                name='position' value={input.position}
                                onChange={changeEventHandler}
                                className={'focus-visible:ring-offset-0 focus-visible:ring-0 my-1'} />
                        </div>
                        {/* Company selection dropdown (only shows if companies exist) */}
                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                companies.map((company) => {
                                                    return (
                                                        <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                            <Button type='submit' className='w-full my-4'>Post New Job</Button>
                    }
                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-2'>* Please register a company first, before posting a Job</p>
                    }
                </form>
            </div>
        </div>
    )
}

export default PostJob
