import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
// import { Avatar, AvatarImage } from './ui/avatar'

const Job = () => {

    const navigate = useNavigate();
    const jobId = "anjcknscn";
    
    return (
        <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">2 day days ago</p>
                <Button variant="outline" className={"rounded-full"} size="icon">
                    <Bookmark />
                </Button>
            </div>
            <div className="flex items-center gap-2 my-2">
                <Button variant={"outline"} className={"p-6"} size={"icon"}>
                    <Avatar>
                        <AvatarImage src="https://cdn-icons-png.flaticon.com/128/270/270781.png" />
                        {/* <AvatarImage src="https://cdn-icons-png.flaticon.com/128/15189/15189159.png" /> */}
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg">Company Name</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">Title</h1>
                <p className="text-sm text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus
                    explicabo qui voluptatem dolorem at eius officiis id dolorum laborum
                    veniam?
                </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="ghost" className={'text-blue-700 font-bold'}>12 Positions</Badge>
                <Badge variant="ghost" className={'text-[#F83002] font-bold'}>Part Time</Badge>
                <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>24 LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${jobId}`)} variant="outline">Details</Button>
                <Button className={'bg-[#7209b7]'}>Save for Later</Button>
            </div>
        </div>
    );
};

export default Job;
