import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'

const CompaniesTable = () => {
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
            <TableCell>
                <Avatar>
                    <AvatarImage src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt='company-profile' />
                </Avatar>
            </TableCell>
            <TableCell>Company Name</TableCell>
            <TableCell>23-06-2025</TableCell>
            <TableCell className={'text-right cursor-pointer'}>
                <Popover>
                    <PopoverTrigger>
                        <MoreHorizontal/>
                    </PopoverTrigger>
                    <PopoverContent className={'w-32'}>
                        <div className='flex items-center gap-2 w-fit cursor-pointer'>
                            <Edit2 className='w-4'/>
                            <span>Edit</span>
                        </div>
                    </PopoverContent>
                </Popover>
            </TableCell>
        </TableBody>
      </Table>
    </div>
  )
}

export default CompaniesTable
