import React from 'react'
import LatestJobCards from './LatestJobCards';      // Importing the LatestJobCards component that will be used to display individual job cards
import { useSelector } from 'react-redux';          // Importing useSelector hook from react-redux to access Redux state
import { motion } from 'framer-motion'

// const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {

    const { allJobs } = useSelector(store => store.job);        // Destructuring allJobs from the Redux store's job slice

    return (
        <div className='max-w-7xl mx-auto my-10 sm:my-20 px-4 sm:px-6'>
            <h1 className='text-3xl sm:text-4xl font-bold'><span className='text-cyan-600'>Latest & Top</span> Job Openings</h1>
            {/* Display multiple card */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5 sm:my-8'>
                {
                    // Conditional rendering:
                    // If no jobs available, show fallback message
                    // Otherwise, slice the first 6 jobs and map each to a LatestJobCards component
                    allJobs.length <= 0 ? (
                        <span className='text-gray-500'>Job Not Available</span>
                    ) : (
                        allJobs.slice(0, 6).map((job, index) =>
                        (
                        <motion.div
                            key={job._id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.1, // Stagger animation
                                ease: "easeOut"
                            }}
                            >
                    <LatestJobCards job={job} />
                    </motion.div>
            ))
                    )}
            {/* // randomJobs.slice(0,6).map((Item, index) => <LatestJobCards />) */}
        </div>
        </div >
    )
}

export default LatestJobs
