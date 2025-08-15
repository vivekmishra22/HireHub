import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'                  // Import loader icon for loading state
import { useDispatch, useSelector } from 'react-redux'  // Import hooks for accessing Redux store and dispatching actions
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'             // Redux action to update user data in the store

const UpdateProfileDialog = ({ open, setOpen }) => {

  const [loading, setLoading] = useState(false);        // State to manage loading spinner during API call
  const { user } = useSelector(store => store.auth);    // Access current user info from Redux

  const [input, setInput] = useState({      // Local state for form input fields, prefilled with current user data
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",  // Convert array to string for input
    file: user?.profile?.resume || ""                         // File input will later be overwritten with File object
    // file: null                                    // Start with null so it's only set when new file is chosen
  });

  const dispatch = useDispatch();       // Redux dispatch function

  const changeEventHandler = (e) => {   // Handles text input changes for all fields
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {    // Handles file input change specifically for the resume upload
    const file = e.target.files?.[0];
    setInput({ ...input, file })        // Store File object in state
  }

  const submitHandler = async (e) => {    // Submit handler for updating the profile
    e.preventDefault();
    const formData = new FormData();      // Prepare FormData object for multipart/form-data submission
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {                     // Only append file if it's a new file
      formData.append("file", input.file);
    };

    try {
      setLoading(true);                   // Show loading spinner
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }

    // setOpen(false);
    // console.log(input);
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='max-w-lg w-[90%] sm:w-full p-6 rounded-2xl shadow-lg bg-white dark:bg-gray-900'
        // onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle className='text-xl font-semibold text-gray-900 dark:text-gray-100'>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} action="" className='space-y-4'>

            <div className='flex flex-col space-y-1'>
              <Label htmlFor='fullname' className='text-gray-700 dark:text-gray-300'>Name</Label>
              <Input type='text' id="fullname" name="fullname"
                value={input.fullname} onChange={changeEventHandler}
                className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100' />
            </div>

            <div className='flex flex-col space-y-1'>
              <Label htmlFor='email' className='text-gray-700 dark:text-gray-300' >Email</Label>
              <Input type='email' id="email" name="email"
                value={input.email} onChange={changeEventHandler}
                className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100' />
            </div>

            <div className='flex flex-col space-y-1'>
              <Label htmlFor='number' className='text-gray-700 dark:text-gray-300'>Number</Label>
              <Input id="number" name="phoneNumber"
                value={input.phoneNumber} onChange={changeEventHandler}
                className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100' />
            </div>

            <div className='flex flex-col space-y-1'>
              <Label htmlFor='bio' className='text-gray-700 dark:text-gray-300' >Bio</Label>
              <Input id="bio" name="bio"
                value={input.bio} onChange={changeEventHandler}
                className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100' />
            </div>

            <div className='flex flex-col space-y-1'>
              <Label htmlFor='skills' className='text-gray-700 dark:text-gray-300'>Skills</Label>
              <Input id="skills" name="skills"
                value={input.skills} onChange={changeEventHandler}
                className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100' />
            </div>

            {/* <div className='text-gray-700 dark:text-gray-300'>
              <Label htmlFor='file' className='text-gray-700 dark:text-gray-300'>Resume</Label>
              <Input type='file' accept='application/pdf' id="file" name="file"
                onChange={fileChangeHandler}
                className='bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100' />
            </div> */}

            <div className="flex flex-col space-y-1">
              <Label htmlFor="file" className="text-gray-700 dark:text-gray-300">
                Resume
              </Label>

              <div
                onClick={() => document.getElementById("fileInput").click()}
                className="flex items-center bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 cursor-pointer"
              >
                <span className="px-2 rounded text-sm">
                  Choose File : 
                </span>
                <span className="truncate text-gray-700 dark:text-gray-300">
                  {input.file?.name || user?.profile?.resumeOriginalName || "No file chosen"}
                </span>
              </div>

              <input
                id="fileInput"
                type="file"
                accept="application/pdf"
                name="file"
                className="hidden"
                onChange={fileChangeHandler}
              />
            </div>

            <DialogFooter className='flex flex-col-reverse sm:flex-row gap-3 pt-4'>
              <DialogClose asChild>
                <Button variant="outline" type="button"
                  className='border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800' >
                  Cancel</Button>
              </DialogClose>
              {
                loading ?
                  (<Button className='bg-blue-600 hover:bg-blue-700 text-white shadow-md'>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait</Button>
                  ) : (
                    <Button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white shadow-md'>
                      Save Changes</Button>
                  )
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpdateProfileDialog
