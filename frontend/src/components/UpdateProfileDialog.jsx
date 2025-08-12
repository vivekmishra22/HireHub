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
      console.log(error)
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
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
          <DialogHeader className="relative">
            <DialogTitle className='text-cyan-600 font-semibold'>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} action="">
            <div className='grid gap-4 py-4'>

              <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                <Label htmlFor='fullname' className={'text-right'}>Name</Label>
                <Input type='text' id="fullname" name="fullname" value={input.fullname} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className={'text-right'}>Email</Label>
                <Input type='email' id="email" name="email" value={input.email} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='number' className={'text-right'}>Number</Label>
                <Input id="number" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='bio' className={'text-right'}>Bio</Label>
                <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='skills' className={'text-right'}>Skills</Label>
                <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='file' className={'text-right'}>Resume</Label>
                <Input type={'file'} accept='application/pdf' id="file" name="file" onChange={fileChangeHandler} className={'col-span-3'} />
              </div>

            </div>
            <DialogFooter>
              {
                loading ? ( <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> 
                ) : (
                  <Button type='submit' className='w-full my-4'>Save Changes</Button>
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
