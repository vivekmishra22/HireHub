import React, { useEffect, useState } from 'react'  // Import necessary hooks and components, React + hooks
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'       // Custom Table UI components
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'     // Popover for dropdown actions
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'                   // Icons from Lucide
import { useSelector } from 'react-redux'                                   // Hook to access Redux state
import { useNavigate } from 'react-router-dom'                              // Hook for page navigation

const AdminJobsTable = () => {

    // const { companies, searchCompanyByText } = useSelector(store => store.company);
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);      // Access job-related data from Redux store
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);                     // Local state to manage filtered jobs

    const navigate = useNavigate();         // Hook to navigate programmatically

    useEffect(() => {               // Run when job list or search text changes
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => { // Filter jobs based on title or company name using the search text
            if (!searchJobByText) {
                return true             // If no search input, return all jobs
            };
            return job?.title.toLowerCase().includes(searchJobByText.toLowerCase()) ||          // Match title
                    job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());   // Match Company Name
        });
        setFilterJobs(filteredJobs);            // Update local filtered job lis
    }, [allAdminJobs, searchJobByText])         // Dependency array

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent posted jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Company Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        // Loop through each job and display in table row
                        filterJobs?.map((job) => (
                            // companies?.map((company) => (
                            <tr key={job._id}>        {/* Add key for performance */}
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>
                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className={'text-right cursor-pointer'}>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className={'w-32'}>
                                            <div onClick={() => navigate(`/admin/companies/${job._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            <div onClick={()=> navigate(`/admin/jobs/${job._id}/applicants`)} className='flec items-center w-fit gap-2 cursor-pointer mt-2'>
                                                <Eye className='w-4'/>
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        )
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable;      // Export component
