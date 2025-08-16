import React from 'react'
import { Badge } from "@/components/ui/badge"
import { useNavigate } from 'react-router-dom';

// Functional component to display a single latest job card
// It receives a `job` object as a prop
const LatestJobCards = ({ job }) => {

  const navigate = useNavigate();

  return (
    // Card container for the job card with click functionality to navigate to job details
    // Note: Use backticks (``) not quotes for dynamic route
    <div onClick={() => navigate(`/description/${job._id}`)}
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-2xl'>
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-sm text-gray-500'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg md:text-xl my-2'>{job?.title}</h1>
        <p className='text-sm md:text-base text-gray-600 line-clamp-2'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant="ghost" className={'text-blue-700 font-bold'}>{job?.position} Positions</Badge>
        <Badge variant="ghost" className={'text-[#F83002] font-bold'}>{job?.jobType}</Badge>
        <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>{job?.salary} LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
