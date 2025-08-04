import React, { useEffect, useState } from 'react'        // Importing required React hooks and components
import { Label } from "@/components/ui/label"             // Label component for form labels
import { Input } from "@/components/ui/input"             // Input component for form inputs
import { RadioGroup } from "@/components/ui/radio-group"  // RadioGroup component for radio buttons
import { Button } from '../ui/button'                     // Button component
import { Link, useNavigate } from 'react-router-dom'      // For navigation and linking between routes
import { USER_API_END_POINT } from '@/utils/constant'     // API endpoint for user routes
import axios from 'axios'                                 // Library for making HTTP requests
import { toast } from 'sonner'                            // Toast library for showing success/error messages
import { useDispatch, useSelector } from 'react-redux'    // Redux hooks to dispatch actions and access store
import { setLoading, setUser } from '@/redux/authSlice'   // Redux actions from the auth slice
import { Loader2 } from 'lucide-react'                    // Spinner icon used when loading
import Navbar from '../shared/Navbar'                     // Navbar component
import { motion } from "framer-motion"
import Footer from '../shared/Footer'

const Login = () => {     // Login component

  const [input, setInput] = useState({    // Setting up local state to handle form input values
    email: "",      // Email field
    password: "",   // Password field
    role: ""        // Role field (student or recruiter)
  });

  const { loading, user } = useSelector(store => store.auth);   // Access loading and user state from the Redux store
  const navigate = useNavigate();     // React-router hook to navigate between pages
  const dispatch = useDispatch();     // Redux hook to dispatch actions

  const changeEventHandler = (e) => {   // Function to update local state whenever an input changes
    setInput({ ...input, [e.target.name]: e.target.value });    // Update the corresponding field
  };

  // const submitHandler = async (e) => {
  //     e.preventDefault();
  //     console.log(input);
  // };

  const submitHandler = async (e) => {    // Function to handle form submission
    e.preventDefault();   // Prevent default form reload behavior

    // Basic validation before request
    if (!input.email || !input.password || !input.role) {
      toast.error("All fields are required.")
      return
    }

    try {
      dispatch(setLoading(true));   // Set loading to true in Redux store
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"    // Sending data as JSON
        },
        withCredentials: true,    // Include cookies (for sessions/auth)
      });
      if (res.data.success) {     // If login is successful
        dispatch(setUser(res.data.user));   // Save user info in Redux store
        navigate("/");                      // Redirect to homepage
        // router.push("/")
        toast.success(res.data.message);    // Show success toast
      }
    } catch (error) {
      console.log(error);       // Log error to console
      toast.error(error.response.data.message);   // Show error toast message from API
    } finally {
      dispatch(setLoading(false));    // Stop loading spinner
    }
  }

  useEffect(() => {   // useEffect to redirect if user is already logged in
    if (user) {
      navigate("/");    // Redirect to home if already logged in
    }
  }, []);

  return (    // JSX returned by component

    <div className="min-h-screen flex flex-col bg-[#f8fafc]">

      <Navbar />

      {/* centered layout with soft background */}
      <div className="flex items-center justify-center bg-[#f8fafc] px-4 py-20">
        <motion.form
          onSubmit={submitHandler}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full sm:w-[90%] md:w-2/3 lg:w-1/2 bg-white shadow-lg rounded-2xl p-8 animate-in fade-in zoom-in-50"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">Login</h2>
          {/* <p className="text-sm text-gray-600 text-center mb-6">
          Login to access your dashboard
        </p> */}

          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
            <Input
              id="email"
              type="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              placeholder="Enter your email"
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</Label>
            <Input
              id="password"
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              placeholder="Enter your password"
              className="mt-1"
            />
          </div>

          <div className="mb-4">
            <Label className="block text-sm font-medium text-gray-700 mb-1">Role</Label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={(e) => setInput({ ...input, role: e.target.value })}
                  className="mr-2"
                />
                Student
              </label>
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={input.role === "admin"}
                  onChange={(e) => setInput({ ...input, role: e.target.value })}
                  className="mr-2"
                />
                Admin
              </label>
            </div>
          </div>

          {/* ✅ Primary Button with custom color and disabled state */}
          <Button
            type="submit"
            disabled={loading}
            className={`w-full my-4 bg-indigo-600 hover:bg-indigo-700 text-white ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-sm text-gray-600 text-center">
            Don't have an account? <a href="/signup" className="text-indigo-600 hover:underline">Sign Up</a>
          </p>
        </motion.form>
      </div>
    </div>

    // <div className="min-h-screen bg-gray-50">   {/* Full screen height with light background */}
    //   <Navbar />    {/* Top navbar */}

    //   <div className='flex items-center justify-center max-w-7xl mx-auto'>  {/* Center the form horizontally */}
    //     {/* <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'> */}
    //     <form
    //       onSubmit={submitHandler}    // Call submitHandler on form submit
    //       className="w-full sm:w-[90%] md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6 mt-10 animate-in fade-in zoom-in-50"
    //     >
    //       {/* <h1 className='font-bold text-xl mb-5'>Sign Up</h1> */}
    //       <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

    //       {/* Email */}
    //       <div className='my-2'>
    //         <Label htmlFor="email" className='mb-1 block'>Email</Label>
    //         <Input
    //           type="email"
    //           value={input.email}             // Controlled input
    //           name="email"
    //           onChange={changeEventHandler}   // Handle change
    //           placeholder="vivek@gmail.com" />
    //       </div>

    //       {/* Password */}
    //       <div className='my-2'>
    //         <Label htmlFor="password" className='mb-1'>Password</Label>
    //         <Input
    //           type="password"
    //           value={input.password}
    //           name="password"
    //           onChange={changeEventHandler}
    //           placeholder="********" />
    //       </div>

    //       {/* Role selection - Student or Recruiter */}
    //       <div className="mb-4 flex flex-col sm:flex-row sm:gap-6">

    //         {/* Student Radio Option */}
    //         <div className="sm:w-1/2">
    //           <Label htmlFor="role" className="block mb-2">Select Role</Label>
    //           <RadioGroup defaultValue="student" className="flex gap-6">
    //             <div className="flex items-center space-x-2">
    //               <Input
    //                 type="radio"
    //                 name="role"
    //                 value="student"
    //                 checked={input.role === 'student'}
    //                 onChange={changeEventHandler}
    //                 className="cursor-pointer" />
    //               <Label htmlFor="student">Student</Label>
    //             </div>

    //             {/* Recruiter Radio Option */}
    //             <div className="flex items-center space-x-2">
    //               <Input
    //                 type="radio"
    //                 name="role"
    //                 value="recruiter"
    //                 checked={input.role === 'recruiter'}
    //                 onChange={changeEventHandler}
    //                 className="cursor-pointer" />
    //               <Label htmlFor="recruiter">Recruiter</Label>
    //             </div>
    //           </RadioGroup>
    //         </div>

    //       </div>
    //       {/* Submit button - show loader if loading */}
    //       {
    //         loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
    //           <Button type='submit' className='w-full my-4'>Login</Button>
    //       }

    //       {/* Signup link */}
    //       <span className="text-sm text-center text-gray-600 block">
    //         Don't have an account ?
    //         <Link to='/signup' className='text-blue-600 hover:underline ml-1'> Signup </Link>
    //       </span>

    //     </form>
    //   </div>
    // </div>

  )
}

export default Login;     // Exporting the Login component
