import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'           // Import child component to show applied jobs in a table format
import UpdateProfileDialog from './UpdateProfileDialog'   // Import Dialog component to update user profile
import { useSelector } from 'react-redux'                 // Import useSelector hook to access global state from Redux store
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs' // Custom hook to fetch user's applied jobs data

// const skills = ["HTML", "CSS", "JavaScript", "React.js"]
const isResume = true;

const Profile = () => {

  useGetAppliedJobs();          // Call the custom hook to fetch applied jobs (fires once on component mount)

  const [open, setOpen] = useState(false);          // Local state to manage the dialog open/close state
  const {user} = useSelector(store => store.auth);  // Get the authenticated user details from Redux store

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-2 p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src={user?.profile?.profilePhoto} alt='profile' />
              {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt='profile' /> */}
            </Avatar>
            <div>
              <h1 className='font-medium text-xl'>{user?.fullname}</h1>
              <p>{user?.profile.bio}</p>
            </div>
          </div>

          {/* Edit profile button (opens dialog) */}
          <Button onClick={ () => setOpen(true)} variant='outline' className='text-right'><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-3 my-2'>
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3 my-2'>
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1>Skills</h1>
          <div className='flex items-center gap-1'>
            {
            // Check if skills exist, then display them using Badge component
              user?.profile.skills.length != 0 ? user?.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
              // skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {
            isResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' href={user?.profile?.resume} target='_blank'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            // isResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' href="https://youtube.com" target='_blank'>Youtube</a> : <span>NA</span>
          }
        </div>
        
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
        <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
        {/* Applied job table */}
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
      
    </div>
  )
}

export default Profile
