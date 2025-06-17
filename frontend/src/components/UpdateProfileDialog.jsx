import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'

const UpdateProfileDialog = ({ open, setOpen }) => {

  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.map(skill => skill) || "",
    file: user?.profile?.resume || ""
  });

  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    };

    try {
      setLoading(true);
      const res = await axios.put(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    } 

    setOpen(false);
    console.log(input);
  }

  return (
    <div>
      <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler} action="">
            <div className='grid gap-4 py-4'>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='name' className={'text-right'}>Name</Label>
                <Input type='text' id="name" name="name" value={input.fullname} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='email' className={'text-right'}>Email</Label>
                <Input type='email' id="email" name="email" value={input.email} onChange={changeEventHandler} className={'col-span-3'} />
              </div>

              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='number' className={'text-right'}>Number</Label>
                <Input id="number" name="number" value={input.phoneNumber} onChange={changeEventHandler} className={'col-span-3'} />
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
                loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button> :
                  <Button type='submit' className='w-full my-4'>Update</Button>
              }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
