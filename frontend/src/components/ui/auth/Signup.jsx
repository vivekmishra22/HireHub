import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../button'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                {/* <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'> */}
                <form
                    action=""
                    className="w-full sm:w-[90%] md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6 mt-10 animate-in fade-in zoom-in-50"
                >
                    {/* <h1 className='font-bold text-xl mb-5'>Sign Up</h1> */}
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an Account</h1>

                    {/* Full Name */}
                    <div className='my-2'>
                        <Label htmlFor="name" className='mb-1 block'>Full Name</Label>
                        <Input type="text" placeholder="Vivek" />
                    </div>

                    {/* Email */}
                    <div className='my-2'>
                        <Label className='mb-1 block'>Email</Label>
                        <Input htmlFor="email" type="email" placeholder="vivek@gmail.com" />
                    </div>

                    {/* Phone */}
                    <div className='my-2'>
                        <Label htmlFor="phone" className='mb-1 block'>Phone Number</Label>
                        <Input type="tel" placeholder="+91 9876543210" />
                    </div>

                    {/* Password */}
                    <div className='my-2'>
                        <Label className='mb-1'>Password</Label>
                        <Input type="password" placeholder="********" />
                    </div>

                    {/* Role and Profile side by side */}
                    <div className="mb-4 flex flex-col sm:flex-row sm:gap-6">

                        {/* Profile Image Upload */}
                        <div className="sm:w-1/2">
                            <Label htmlFor="profile" className="block mb-1">Profile Image</Label>
                            <Input type="file" accept="image/*" className="cursor-pointer"/>
                        </div>

                        {/* Role */}
                        <div className="sm:w-1/2">
                            <Label className="block mb-2">Select Role</Label>
                            <RadioGroup defaultValue="student" className="flex gap-6">
                                <div className="flex items-center space-x-2">
                                    <Input type="radio" name="role" value="student" className="cursor-pointer" />
                                    <Label htmlFor="student">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input type="radio" name="role" value="recruiter" className="cursor-pointer" />
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


                    <Button type='submit' className='w-full my-4'>Signup</Button>

                    <span className="text-sm text-center text-gray-600">
                        Already have an account ?
                        <Link to='/login' className='text-blue-600 hover:underline ml-1'> Login </Link>
                    </span>

                </form>
            </div>
        </div>
    )
}

export default Signup
