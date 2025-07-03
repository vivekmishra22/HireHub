import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'

const CompaniesTable = () => {

    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.toLowerCase().includes(searchCompanyByText.toLowerCase())
        })
    }, [companies, searchCompanyByText])

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
                        companies.length <= 0 ? <span>You haven't registered any company yet.</span> : (
                            <>
                                {
                                    companies?.map((company) => (
                                        <tr>
                                            <TableCell>
                                                <Avatar>
                                                    <AvatarImage src={company.logo} alt='company-profile' />
                                                    {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt='company-profile' /> */}
                                                </Avatar>
                                            </TableCell>
                                            <TableCell>{company.name}</TableCell>
                                            <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                            <TableCell className={'text-right cursor-pointer'}>
                                                <Popover>
                                                    <PopoverTrigger>
                                                        <MoreHorizontal />
                                                    </PopoverTrigger>
                                                    <PopoverContent className={'w-32'}>
                                                        <div className='flex items-center gap-2 w-fit cursor-pointer'>
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

export default CompaniesTable
