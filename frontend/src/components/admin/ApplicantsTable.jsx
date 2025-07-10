import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {

    const { applicants } = useSelector(store => store.application);

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
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
                                                        <div key={index} className='flex w-fit items-center my-2 cursor-pointer'>
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
