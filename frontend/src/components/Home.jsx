import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'               // Latest job listings component
import useGetAllJobs from '@/hooks/useGetAllJobs'   // Custom hook to fetch all jobs
import { useSelector } from 'react-redux'           // Redux hook to access state
import { useNavigate } from 'react-router-dom'

const Home = () => {
  useGetAllJobs();                                  // Invoke custom hook to fetch job data on page load
  const { user } = useSelector(store => store.auth);    // Accessing logged-in user info from Redux state
  const navigate = useNavigate();

  useEffect(() => {                                 // If the user is logged in and is a recruiter, redirect to admin company management page
    if (user?.role === 'recruiter') {
      navigate("/admin/companies");
    }
  }, [user, navigate]);

  // useEffect(() => {
  //   useGetAllJobs();
  // }, []);


  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobs />
    </div>
  )
}

export default Home
