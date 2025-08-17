import React, { useEffect } from 'react'
import Job from './Job'                                     // Job card component for displaying individual job info
import { useDispatch, useSelector } from 'react-redux'      // Hooks for interacting with Redux store
import { setSearchedQuery } from '@/redux/jobSlice'         // Action to reset search query
import useGetAllJobs from '@/hooks/useGetAllJobs'           // Custom hook to fetch all jobs from backend

// const randomjobs = [1, 2, 3, 4, 5, 6, 7]

const Browse = () => {

    useGetAllJobs();        // Call custom hook to fetch all job data on mount

    const {allJobs} = useSelector(store => store.job);      // Extract allJobs data from Redux store (jobSlice)
    const dispatch = useDispatch();                         // Create dispatch function to dispatch Redux actions

    useEffect(() => {       // useEffect to clean up the searched query when component unmounts
        return ()=> {       // Return a function that resets search query on component unmount
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);         // Add dispatch to dependency array (best practice)
    
    return (
        <div>
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>

                    {
                        // randomjobs.map((item, index) => {
                            // Loop through all jobs and render each Job component
                        allJobs.map((job) => {
                            return (
                                <Job key={job._id} job={job} />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse;                  // Export Browse component as default
