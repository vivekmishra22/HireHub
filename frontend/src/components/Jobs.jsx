import React, { useEffect, useState } from 'react'
import FilterCard from './FilterCard'         // Sidebar filter component
import Job from './Job'                       // Hook to access Redux store state
import { useSelector } from 'react-redux';    // Animation library for smooth component transitions
import { motion } from 'framer-motion';

const Jobs = () => {

  // abc

  const { allJobs, searchedQuery } = useSelector(store => store.job);   // Get all jobs and the search query from Redux store (job slice)
  const [filterJobs, setFilterJobs] = useState(allJobs);                // Local state to store filtered jobs

  useEffect(() => {           // useEffect will run whenever allJobs or searchedQuery changes
    if (searchedQuery) {      // If there's a search query, filter jobs based on title, description, or location
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      });
      setFilterJobs(filteredJobs);    // Update local state with filtered results
    } else {
      setFilterJobs(allJobs);         // If no query, show all jobs
    }
  }, [allJobs, searchedQuery]);       // Dependency array ensures this runs on change

  return (
    <div>
      {/* <Navbar /> */}
      <div className='max-w-7xl mx-auto mt-5 flex gap-5 px-4'>
        <div className='hidden md:block w-[20%] lg:w-[15%]'>
          <FilterCard />
        </div>
        {
          filterJobs.length <= 0 ? (
            <div className='flex-1 flex items-center justify-center text-gray-500 text-lg'>
              Job not found
            </div>
          ) : (
            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  // jobsArray.map((item, index) => (
                  // allJobs.map((job) => (
                  filterJobs.map((job) => (
                    <motion.div
                      key={job?._id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Job job={job} />
                    </motion.div>
                  ))
                }
              </div>
            </div>
          )
          // jobsArray.map((item, index) => <Job />)
        }
      </div>

    </div>
  )
}

export default Jobs
