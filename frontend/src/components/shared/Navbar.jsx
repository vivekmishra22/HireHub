// React and Routing imports
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

// UI components from your UI library
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { LogOut, User2 } from 'lucide-react'    // Icons from lucide-react

import { useDispatch, useSelector } from 'react-redux'  // Redux hooks to read and update state

import { toast } from 'sonner'      // To show toast notifications
import axios from 'axios'           // Axios for API requests

import { USER_API_END_POINT } from '@/utils/constant'       // Constant for backend API URL
import { setUser } from '@/redux/authSlice'                 // Redux action to reset user on logout

const Navbar = () => {          // Navbar component definition

    const { user } = useSelector(store => store.auth);      // Get user from Redux state (auth slice)
    const dispatch = useDispatch();                         // Dispatch to trigger Redux actions
    const navigate = useNavigate();                         // useNavigate hook to redirect after logout

    const logoutHandler = async () => {             // Function to handle logout logic
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true }); // Make logout API request with cookies
            if (res.data.success) {             // If logout is successful
                dispatch(setUser(null));        // Remove user from Redux state
                navigate("/");                  // Redirect to homepage
                toast.success(res.data.message);// Show success toast
            }
        } catch (error) {       
            console.log(error);     // Log error in console
            toast.error(error.response.data.message);       // Show error toast
        }
    }

    return (        // JSX return block
        <div className='bg-white py-2'>
            <div className='flex items-center justify-between mx-auto max-w-7xl'>   {/* Navbar wrapper with padding and max width */}
                
                {/* Logo */}
                <div>
                    <h1 className='text-2xl font-bold'>Hire<span className='text-[#F83002]'>Hub</span></h1>
                </div>

                {/* Navigation links and buttons */}
                <div className='flex items-center gap-12'>
                    {/* Conditional Navigation links */}
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                // Links for recruiter/admin
                                <>
                                    <li><Link to='/admin/companies'>Companies</Link></li>
                                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                // Links for normal users
                                <>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Jobs</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Authentication buttons */}
                    {
                        !user ? (
                            // If not logged in: Show Login & Signup buttons
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#6b5591]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            // If logged in: Show profile avatar and dropdown
                            <Popover>
                                {/* Avatar as dropdown trigger */}
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                    </Avatar>
                                </PopoverTrigger>
                                {/* Popover dropdown content */}
                                <PopoverContent className="w-80">
                                    {/* User info row */}
                                    <div className='flex gap-4  items-center'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src={user?.profile?.profilePhoto} />
                                            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            {/* <h4 className='font-medium'>Vivek Software Engineer</h4> */}
                                            <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit.</p> */}
                                        </div>
                                    </div>
                                    {/* Profile options */}
                                    <div className='flex flex-col my-3 text-gray-600'>
                                        {
                                            user && user.role === 'student' && (
                                                // View profile for students
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant="link" ><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        {/* Logout option */}
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link" >Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div >
    )
}

export default Navbar;      // Export Navbar component
