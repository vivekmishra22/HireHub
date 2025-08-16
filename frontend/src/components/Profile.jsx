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
// const isResume = Boolean(user?.profile?.resume);
const isResume = true;

const Profile = () => {

  useGetAppliedJobs();          // Call the custom hook to fetch applied jobs (fires once on component mount)

  const [open, setOpen] = useState(false);          // Local state to manage the dialog open/close state
  const { user } = useSelector(store => store.auth);  // Get the authenticated user details from Redux store

  return (
    <>
      <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-6 p-6 sm:p-8'>
        <div className='flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-6'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-16 w-16 sm:h-20 sm:w-20'>
              <AvatarImage src={user?.profile?.profilePhoto} alt='profile' />
              {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt='profile' /> */}
            </Avatar>
            <div>
              <h1 className='font-semibold text-xl text-gray-900'>{user?.fullname}</h1>
              <p className='text-gray-600 text-sm sm:text-base'>{user?.profile.bio}</p>
            </div>
          </div>

          {/* Edit profile button (opens dialog) */}
          <Button onClick={() => setOpen(true)} variant='outline'
            className='border-cyan-600 text-cyan-600 hover:bg-cyan-50'>
            <Pen size={18} />
          </Button>
        </div>
        <div className='my-6 space-y-4'>
          <div className='flex items-center gap-3'>
            <Mail className='text-cyan-600' />
            <span className='text-gray-700'>{user?.email}</span>
          </div>
          <div className='flex items-center gap-3'>
            <Contact className='text-cyan-600' />
            <span className='text-gray-700'>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-6'>
          <h2 className='font-semibold text-lg text-cyan-600'>Skills</h2>
          <div className='flex flex-wrap gap-2 mt-3'>
            {/* {user?.profile?.skills?.length
              ? user.profile.skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              : <span className='text-gray-500'>NA</span>} */}

            {
              // Check if skills exist, then display them using Badge component
              user?.profile?.skills?.length != 0
                ? user?.profile.skills.map((item, index) =>
                  <Badge key={index}
                    className='bg-blue-200 text-blue-900 hover:bg-blue-300 transition-colors duration-200'>
                    {item}
                  </Badge>)
                : <span className='text-gray-500'>NA</span>
              // skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
          </div>
        </div>
        <div className='my-6'>
          <Label className='text-lg font-semibold text-cyan-600'>Resume</Label>
          {
            isResume ? <a className='block text-blue-800 hover:underline mt-2 break-words' href={user?.profile?.resume}
              target='_blank'>{user?.profile?.resumeOriginalName}</a> : <span className='text-gray-500'>NA</span>
            // isResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' href="https://youtube.com" target='_blank'>Youtube</a> : <span>NA</span>
          }
        </div>

      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl my-6 px-4 sm:px-8'>
        <h1 className='font-semibold text-lg text-cyan-600 mb-4'>Applied Jobs</h1>
        {/* Applied job table */}
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />

    </>
  )
}

export default Profile
