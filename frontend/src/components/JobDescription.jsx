import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useParams } from 'react-router-dom';               // Hook to access route parameters
import axios from 'axios';                                  // For making API requests
import { setSingleJob } from '@/redux/jobSlice';            // Redux action to set single job
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';                             // For toast notifications

const JobDescription = () => {

  // Access job data and user data from Redux store
  const { singleJob } = useSelector(store => store.job);
  const {user} = useSelector(store=>store.auth);

  // Check if the user has already applied to the job
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);       // Local state to track whether job is applied

  const params = useParams();       // Extract job ID from the URL
  const jobId = params.id;          // Get jobId from route parameters
  const dispatch = useDispatch();   // Dispatch to Redux store

  const applyJobHandler = async () => {     // Function to handle job application
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
      console.log(res.data);
      if(res.data.success){
        setIsApplied(true); // Update local state

        // Update Redux store with the new application added
        const updatedSingleJob = {...singleJob, applications:[...singleJob.application,{applicant:user ?. _id}]}
        dispatch(setSingleJob(updatedSingleJob));   // helps us to real time UI update
        toast.success(res.data.message);            // Show success toast
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {                         // Fetch job details when component mounts or jobId/userId changes
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));     // Store job in Redux
          // Ensure local state is synced with fetched job applications
          setIsApplied(res.data.job.applications.some(application=>application.applicant === user ?. _id))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);    

  return (
    <div className='max-w-7xl mx-auto my-10'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
          {/* <h1 className='font-bold text-xl'>Frontend Developer</h1> */}
          <div className='flex items-center gap-2 mt-4'>
            <Badge variant="ghost" className={'text-blue-700 font-bold'}>{singleJob?.position} Positions</Badge>
            <Badge variant="ghost" className={'text-[#F83002] font-bold'}>{singleJob?.jobType}</Badge>
            <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>{singleJob?.salary} LPA</Badge>
          </div>
        </div>
        <Button onClick={isApplied ? null : applyJobHandler}
        disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#7c63a5]'}`}>{isApplied ? 'Already Applied' : 'Apply Now'}</Button>
      </div>
      <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
      <div className='my-4'>
        <h1 className='font-bold my-1'>Role :<span className='pl-2 font-normal text-gray-800'>{singleJob?.title}</span></h1>
        <h1 className='font-bold my-1'>Location :<span className='pl-2 font-normal text-gray-800'>{singleJob?.location}</span></h1>
        <h1 className='font-bold my-1'>Description :<span className='pl-2 font-normal text-gray-800'>{singleJob?.description}</span></h1>
        <h1 className='font-bold my-1'>Experience :<span className='pl-2 font-normal text-gray-800'>{singleJob?.experienceLevel} yrs.</span></h1>
        <h1 className='font-bold my-1'>Salary :<span className='pl-2 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
        <h1 className='font-bold my-1'>Total Applicants :<span className='pl-2 font-normal text-gray-800'>{singleJob?.applications?.length}</span></h1>
        <h1 className='font-bold my-1'>Posted Date :<span className='pl-2 font-normal text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span></h1>
      </div>
    </div>
  )
}

export default JobDescription
