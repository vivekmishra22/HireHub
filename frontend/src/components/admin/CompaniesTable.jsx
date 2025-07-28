import React, { useEffect, useState } from 'react'          // Importing necessary hooks and UI components
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'       // Importing necessary hooks and UI components
import { Avatar, AvatarImage } from '../ui/avatar'          // Importing Avatar components to show company logo
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'     // Importing Popover components for the "More" action button
import { Edit2, MoreHorizontal } from 'lucide-react'        // Importing icons from the Lucide icon set
import { useSelector } from 'react-redux'                   // useSelector hook lets us access Redux store data
import { useNavigate } from 'react-router-dom'              // useNavigate helps us navigate programmatically in React Router

const CompaniesTable = () => {              

    const { companies, searchCompanyByText } = useSelector(store => store.company);     // Getting `companies` and search text from Redux store (companySlice)
    const [filterCompany, setFilterCompany] = useState(companies);                      // Local state to store the filtered list of companies

    const navigate = useNavigate();             // Hook for navigation between pages

    useEffect(() => {                           // useEffect runs whenever `companies` or `searchCompanyByText` changes
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {    // Filter companies based on the search text
            if (!searchCompanyByText) {         // If no search text, show all companies
                return true
            };
            return company?.name.toLowerCase().includes(searchCompanyByText.toLowerCase()); // Case-insensitive matching of company name with search input
        });
        setFilterCompany(filteredCompany);      // Set the filtered result into state
    }, [companies, searchCompanyByText])        // Dependency array

    return (
        <div>
            <Table>
                <TableCaption>A list of your registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        // If there are no companies, show a message
                        companies.length <= 0 ? <span>You haven't registered any company yet.</span> : (
                            <>
                                {
                                    // Mapping through filtered company list
                                    filterCompany?.map((company) => (
                                    // companies?.map((company) => (
                                        <tr>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={company.logo} alt='company-profile' />
                                                    {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt='company-profile' /> */}
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>   // {/* Created date (YYYY-MM-DD) extracted from full timestamp */}
                                            <TableCell className={'text-right cursor-pointer'}>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />
                                                    </PopoverTrigger>
                                                    <PopoverContent className={'w-32'}>
                                                        <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                            <Edit2 className='w-4' />
                                                            <span>Edit</span>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        </tr>
                                    )
                                    )
                                }
                            </>
                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable;          // Exporting the component to be used in other files