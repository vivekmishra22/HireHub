// React and Routing imports
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// UI components from your UI library
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { LogOut, Menu, UserRound } from 'lucide-react'    // Icons from lucide-react

import { useDispatch, useSelector } from 'react-redux'  // Redux hooks to read and update state

import axios from 'axios'           // Axios for API requests
import { toast } from 'sonner'      // To show toast notifications
import { motion } from 'framer-motion'

import { USER_API_END_POINT } from '@/utils/constant'       // Constant for backend API URL
import { setUser } from '@/redux/authSlice'                 // Redux action to reset user on logout
import { AvatarFallback } from '@radix-ui/react-avatar'

const Navbar = () => {          // Navbar component definition

    const { user } = useSelector(store => store.auth);      // Get user from Redux state (auth slice)
    // const [logoutApi] = useLogoutMutation()
    const dispatch = useDispatch();                         // Dispatch to trigger Redux actions
    const navigate = useNavigate();                         // useNavigate hook to redirect after logout
    const [mobileOpen, setMobileOpen] = useState(false);

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
            toast.error(error.response?.data?.message || 'Logout failed')
            // toast.error(error.response.data.message);       // Show error toast
        }
    }

    // const handleLogout = async () => {
    //     try {
    //         await logoutApi().unwrap()
    //         dispatch(logout())
    //         navigate('/login')
    //     } catch (error) {
    //         console.error('Logout error:', error)
    //     }
    // }

    return (        // JSX return block

        <header className='w-full bg-white border-b shadow-sm sticky top-0 z-50 rounded-full mx-2'>
            {/* <div className='bg-white py-2'> */}
            <nav className='flex justify-between items-center px-3 sm:px-6 lg:px-20 py-3'>
                {/* <div className='flex items-center justify-between mx-auto max-w-7xl'>   Navbar wrapper with padding and max width */}

                {/* <div>
                        <h1 className='text-2xl font-bold'>Hire<span className='text-[#F83002]'>Hub</span></h1>
                    </div> */}

                {/* Logo */}
                {/* <Link to='/'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                    Hire<span className='text-cyan-600'>Hub</span>
                    </h1>
                    </Link> */}
                <Link to='/'>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        Hire<span className='text-cyan-600'>Hub</span>
                    </h1>
                </Link>

                {/* Hamburger for Mobile */}
                <button
                    className="sm:hidden block text-gray-700"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    <Menu size={24} />
                </button>

                {/* Navigation links and buttons */}
                <div className='hidden sm:flex items-center gap-6'>
                    {/* Conditional Navigation links */}
                    <ul className='flex items-center gap-5 text-gray-700 font-medium text-sm'>
                        {
                            user && user.role === 'recruiter' ? (
                                // Links for recruiter/admin
                                <>
                                    <li><Link to='/admin/companies' className='hover:text-cyan-600 transition'>Companies</Link></li>
                                    <li><Link to='/admin/jobs' className='hover:text-cyan-600 transition'>Jobs</Link></li>
                                </>
                            ) : (
                                // Links for normal users
                                <>
                                    <li><Link to='/' className='hover:text-cyan-600 transition'>Home</Link></li>
                                    <li><Link to='/jobs' className='hover:text-cyan-600 transition'>Jobs</Link></li>
                                    <li><Link to='/browse' className='hover:text-cyan-600 transition'>Browse</Link></li>
                                </>
                            )
                        }
                    </ul>

                    {/* Authentication buttons */}
                    {/* {
                        !user ? (
                            // If not logged in: Show Login & Signup buttons
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#6b5591]">Signup</Button>
                                </Link>
                            </div> */}

                    {!user ? (
                        <div className='flex items-center gap-2'>
                            <Link to='/login'>
                                <Button variant='ghost' className='text-gray-700 hover:scale-105 transition'>
                                    Login
                                </Button>
                            </Link>
                            <Link to='/signup'>
                                <Button className='bg-cyan-600 hover:bg-cyan-700 text-white hover:scale-105 transition'>
                                    Signup
                                </Button>
                            </Link>
                        </div>

                    ) : (
                        // If logged in: Show profile avatar and dropdown
                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar className='cursor-pointer border hover:scale-105 transition'>
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt={`${user?.fullname || 'User'} profile`}
                                    />
                                    <AvatarFallback>
                                        {(user?.fullname?.[0] || 'U').toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>

                            <PopoverContent asChild align='end' className='w-72'>
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                    <div className='flex flex-col gap-4 p-2'>
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto}
                                                alt={`${user?.fullname || 'User'} profile`}
                                            />
                                            <AvatarFallback>
                                                {(user?.fullname?.[0] || 'U').toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className='font-medium'> {user?.fullname} </p>
                                            <p className='text-sm text-gray-500'>{user?.email}</p>
                                        </div>
                                    </div>

                                    <Link to="/profile" className='flex items-center gap-2 p-2 hover:bg-cyan-50 rounded-md text-sm'>
                                        <UserRound size={16} /> Profile
                                    </Link>
                                    <button onClick={logoutHandler} className='w-full flex items-center gap-2 p-2 hover:bg-red-50 rounded-md text-sm text-red-600'>
                                        <LogOut size={16} /> Logout
                                    </button>

                                </motion.div>
                            </PopoverContent>
                        </Popover>
                        // <Popover>
                        //     {/* Avatar as dropdown trigger */}
                        //     <PopoverTrigger asChild>
                        //         <Avatar className="cursor-pointer">
                        //             <AvatarImage src={user?.profile?.profilePhoto} />
                        //             {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        //         </Avatar>
                        //     </PopoverTrigger>
                        //     {/* Popover dropdown content */}
                        //     <PopoverContent className="w-80">
                        //         {/* User info row */}
                        //         <div className='flex gap-4  items-center'>
                        //             <Avatar className="cursor-pointer">
                        //                 <AvatarImage src={user?.profile?.profilePhoto} />
                        //                 {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        //             </Avatar>
                        //             <div>
                        //                 <h4 className='font-medium'>{user?.fullname}</h4>
                        //                 {/* <h4 className='font-medium'>Vivek Software Engineer</h4> */}
                        //                 <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                        //                 {/* <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit.</p> */}
                        //             </div>
                        //         </div>
                        //         {/* Profile options */}
                        //         <div className='flex flex-col my-3 text-gray-600'>
                        //             {
                        //                 user && user.role === 'student' && (
                        //                     // View profile for students
                        //                     <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        //                         <User2 />
                        //                         <Button variant="link" ><Link to="/profile">View Profile</Link></Button>
                        //                     </div>
                        //                 )
                        //             }

                        //             {/* Logout option */}
                        //             <div className='flex w-fit items-center gap-2 cursor-pointer'>
                        //                 <LogOut />
                        //                 <Button onClick={logoutHandler} variant="link" >Logout</Button>
                        //             </div>
                        //         </div>
                        //     </PopoverContent>
                        // </Popover>
                    )
                    }
                </div>
                {/* </div> */}
            </nav>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="sm:hidden bg-white border-t shadow-md">
                    <ul className="flex flex-col p-4 gap-3">
                        {user && user.role === 'recruiter' ? (
                            <>
                                <Link to="/admin/companies" onClick={() => setMobileOpen(false)}>Companies</Link>
                                <Link to="/admin/jobs" onClick={() => setMobileOpen(false)}>Jobs</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
                                <Link to="/jobs" onClick={() => setMobileOpen(false)}>Jobs</Link>
                                <Link to="/browse" onClick={() => setMobileOpen(false)}>Browse</Link>
                            </>
                        )}
                        {!user ? (
                            <>
                                <Link to="/login" onClick={() => setMobileOpen(false)}>Login</Link>
                                <Link to="/signup" onClick={() => setMobileOpen(false)}>Signup</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/profile" onClick={() => setMobileOpen(false)}>Profile</Link>
                                <button onClick={() => { logoutHandler(); setMobileOpen(false); }} className="text-left text-red-600">Logout</button>
                            </>
                        )}
                    </ul>
                </motion.div>
            )}

            {/* </div > */}
        </header>
    )
}

export default Navbar;      // Export Navbar component
