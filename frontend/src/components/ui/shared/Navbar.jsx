import React from 'react'
import { Link } from 'react-router-dom'
// import { Button } from '../button'
// import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LogOut, User2 } from 'lucide-react'

const Navbar = () => {

    const user = false;

    return (
        <div className='bg-white py-2'>
            <div className='flex items-center justify-between mx-auto max-w-7xl'>
                <div>
                    <h1 className='text-2xl font-bold'>Hire<span className='text-[#F83002]'>Hub</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link to="/signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#6b5591]">Signup</Button>
                                </Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div className='flex gap-4  items-center'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>Vivek Software Engineer</h4>
                                            <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet.</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-3 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link" >View Profile</Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link" >Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar
