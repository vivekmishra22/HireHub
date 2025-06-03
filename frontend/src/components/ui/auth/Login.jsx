import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../button'
import { Link } from 'react-router-dom'

const Login = () => {

  const [input, setInput] = useState({
          email: "",
          password: "",
          role: ""
      });
  
      const changeEventHandler = (e) => {
          setInput({ ...input, [e.target.name]: e.target.value });
      };
  
      const submitHandler = async (e) => {
          e.preventDefault();
          console.log(input);
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className='flex items-center justify-center max-w-7xl mx-auto'>
        {/* <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'> */}
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-[90%] md:w-2/3 lg:w-1/2 bg-white shadow-md rounded-xl p-6 mt-10 animate-in fade-in zoom-in-50"
        >
          {/* <h1 className='font-bold text-xl mb-5'>Sign Up</h1> */}
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>

          {/* Email */}
          <div className='my-2'>
            <Label htmlFor="email" className='mb-1 block'>Email</Label>
            <Input 
            type="email" 
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="vivek@gmail.com" />
          </div>

          {/* Password */}
          <div className='my-2'>
            <Label htmlFor="password" className='mb-1'>Password</Label>
            <Input 
            type="password" 
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="********" />
          </div>

          {/* Role and Profile side by side */}
          <div className="mb-4 flex flex-col sm:flex-row sm:gap-6">

            {/* Role */}
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

          <Button type='submit' className='w-full my-4'>Login</Button>

          <span className="text-sm text-center text-gray-600 block">
            Don't have an account ?
            <Link to='/signup' className='text-blue-600 hover:underline ml-1'> Signup </Link>
          </span>

        </form>
      </div>
    </div>
  )
}

export default Login
