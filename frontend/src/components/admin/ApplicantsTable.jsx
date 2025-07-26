import React from 'react'       // Importing necessary modules and components
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'    // Custom UI table components
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';        // Popover for dropdown actions
import { MoreHorizontal } from 'lucide-react';      // Icon with 3 dots (⋯)
import { useSelector } from 'react-redux';          // To get Redux state
import { toast } from 'sonner';                     // Toast notification library
import axios from 'axios';                          // Axios for HTTP requests
import { APPLICATION_API_END_POINT } from '@/utils/constant';       // API endpoint constant

const shortlistingStatus = ["Accepted", "Rejected"];        // Possible shortlisting statuses for an applicant

const ApplicantsTable = () => {         // Main component

    const { applicants } = useSelector(store => store.application);     // Accessing applicants data from Redux store

    const statusHandler = async (status, id) => {                       // Handler function to update applicant status (Accepted / Rejected)
        try {
            axios.defaults.withCredentials = true;                      // Allow cookies/session on request
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });       // API call to update status
            if(res.data.success){                   // If request is successful, show success toast
                toast.success(res.data.message);
            }
        } catch (error) {           // If there's an error, show error toast
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table>
                {/* Table caption (optional) */}
                <TableCaption>A list of your recent applied user</TableCaption>
                {/* Table header row */}
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        // Mapping each application to a row
                        applicants && applicants?.applications?.map((item) => (
                            <tr key={item._id}>
                                <TableCell>{item?.applicant?.fullname}</TableCell>
                                <TableCell>{item?.applicant?.email}</TableCell>
                                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item?.applicant?.profile?.resume ?
                                            <a className='text-blue-600 cursor-pointer' href={item?.applicant?.profile?.resume} target='_blank' rel='noopener noreferrer'>{item?.applicant?.profile?.resumeOriginalName}</a> :
                                            <span>NA</span>
                                    }
                                </TableCell>
                                {/* <TableCell>{item?.applicant?.profile?.resumeOriginalName}</TableCell> */}
                                {/* Application submission date (formatted to only show date, not time) */}
                                <TableCell>{item?.applicant?.createdAt.split('T')[0]}</TableCell>
                                <TableCell className={'float-right cursor-pointer'}>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className={'w-32'}>
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status, item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        ))
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable
