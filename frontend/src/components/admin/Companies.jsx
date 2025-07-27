import React, { useEffect, useState } from 'react'              // Importing React and necessary hooks

// Importing custom components
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'

import { useNavigate } from 'react-router-dom'                  // React Router hook for navigation
import useGetAllCompanies from '@/hooks/useGetAllCompanies'     // Custom hook to fetch all companies

// Redux hooks and actions
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'

const Companies = () => {

  useGetAllCompanies();                       // Call the custom hook to fetch companies when the component loads

  const[ input, setInput] = useState("");     // Local state for search input

  const navigate = useNavigate();             // Hook to programmatically navigate between pages
  const dispatch = useDispatch();             // Hook to dispatch Redux actions

  useEffect(() => {                           // useEffect runs whenever the search input changes
    dispatch(setSearchCompanyByText(input));  // Dispatch an action to update the Redux store with the search text
  }, [input]);                                // Runs on every `input` change
  
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>

        <div className='flex items-center justify-between my-5'>
        <Input className={'w-fit'} placeholder='Filter by name' onChange={(e) => setInput(e.target.value)} />
        
        {/* Button to navigate to "Create New Company" form */}
        <Button onClick={() => navigate("/admin/companies/create")}>New Company</Button>
        </div>

        <CompaniesTable/>
        
      </div>
    </div>
  )
}

export default Companies
