import React, { useEffect, useState } from 'react'      // Import React and required hooks

import Navbar from '../shared/Navbar'                   // Navbar component

// UI components from your design system
import { Label } from "@/components/ui/label"           
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'

// React Router for navigation and linking
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'    // Axios for HTTP requests
import { USER_API_END_POINT } from '@/utils/constant'       // API endpoint constant
import { toast } from 'sonner'      // Toast notifications

// Redux hooks and actions
import { useDispatch, useSelector } from 'react-redux'      
import { setLoading } from '@/redux/authSlice'

// Loading spinner icon
import { Loader2 } from 'lucide-react'

const Signup = () => {      // Signup Component

    const [input, setInput] = useState({        // Local state for form inputs
        fullname: "",       // Full name of user
        email: "",          // Email address
        phoneNumber: "",    // Phone number
        password: "",       // Account password
        role: "",           // User role: student or recruiter
        file: ""            // Profile image file
    });

    const {loading, user} = useSelector(store => store.auth);   // Access loading state and current user from Redux
    const dispatch = useDispatch();         // Dispatch Redux actions
    const navigate = useNavigate();         // React Router navigation

    const changeEventHandler = (e) => {     // Handle input changes for text fields
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {      // Handle file input changes for profile image
        setInput({ ...input, file: e.target.files?.[0] });      // Access first selected file
    }

    const submitHandler = async (e) => {        // Submit form handler
        e.preventDefault();                     // Prevent form from refreshing the page
        // console.log(input);

        // Create FormData object for file + text data
        const formData = new FormData();        
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);        // Only append if a file is selected
        }
        try {
            dispatch(setLoading(true));     // Start loading
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"       // For file uploads
                },
                withCredentials: true,               // Allow cookies (important for auth)
            });
            if (res.data.success) { 
                navigate("/login");                 // Redirect to login on success
                toast.success(res.data.message);    // Show success toast
            }
        } catch (error) {
            console.log(error);                         // Log any error
            toast.error(error.response.data.message);   // Show error toast
        } finally {
            dispatch(setLoading(false));                // Stop loading
        }
    }

    useEffect(() => {           // Redirect if already logged in
        if(user){
          navigate("/");
        }
      },[]);

    return (        // Component UI
        <div className="min-h-screen bg-gray-50">
            <Navbar />      {/* Navbar at the top */}

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                {/* <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'> */}
                <form
                    onSubmit={submitHandler}        // Submit handler
                    className="w-full sm:w-[90%] md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6 mt-10 animate-in fade-in zoom-in-50"
                >
                    {/* <h1 className='font-bold text-xl mb-5'>Sign Up</h1> */}
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h1>

                    {/* Full Name Input */}
                    <div className='my-2'>
                        <Label htmlFor="name" className='mb-1 block'>Full Name</Label>
                        <Input
                            type="text"
                            value={input.fullname}
                            name="fullname"
                            onChange={changeEventHandler}
                            placeholder="Vivek" />
                    </div>

                    {/* Email Input */}
                    <div className='my-2'>
                        <Label htmlFor="email" className='mb-1 block'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="vivek@gmail.com" />
                    </div>

                    {/* Phone Number Input */}
                    <div className='my-2'>
                        <Label htmlFor="phone" className='mb-1 block'>Phone Number</Label>
                        <Input
                            type="tel"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="+91 9876543210" />
                    </div>

                    {/* Password Input */}
                    <div className='my-2'>
                        <Label htmlFor="password" className='mb-1'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="********" />
                    </div>

                    {/* File upload and Role Selection in a flex row */}
                    <div className="mb-4 flex flex-col sm:flex-row sm:gap-6">

                        {/* Profile Image Upload */}
                        <div className="sm:w-1/2">
                            <Label htmlFor="profile" className="block mb-1">Profile Image</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="cursor-pointer" />
                        </div>

                        {/* Role Selection - Student or Recruiter */}
                        <div className="sm:w-1/2">
                            <Label htmlFor="role" className="block mb-2">Select Role</Label>
                            <RadioGroup defaultValue="student" className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer" />
                                    <Label htmlFor="student">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer" />
                                    <Label htmlFor="recruiter">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                    </div>


                    {/* Role */}
                    {/* <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5' >
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='student' className='cursor-pointer' />
                                <Label htmlFor="option-one">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='recruiter' className='cursor-pointer' />
                                <Label htmlFor="option-two">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div className='flex items-center gap-2'>
                            <Label className='mb-2 flex items-center'>Profile Image</Label>
                            <Input accept='image/*' type='file' className='cursor-pointer' />
                        </div>
                    </div> */}

                    {/* Submit Button */}
                    {
                        loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                            <Button type='submit' className='w-full my-4'>Signup</Button>
                    }

                    {/* Redirect to Login if already have account */}
                    <span className="text-sm text-center text-gray-600 block">
                        Already have an account ?
                        <Link to='/login' className='text-blue-600 hover:underline ml-1'> Login </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Signup;      // Export the Signup component
