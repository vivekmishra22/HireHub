import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {

    const navigate = useNavigate();
    // const jobId = "anjcknscn";

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();

        const timeDifference = currentTime - createdAt;

        return Math.floor(timeDifference/(1000*24*60*60));
    }
    
    return (
        <div className="p-5 rounded-md shadow-lg bg-white border border-gray-100">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago` }</p>
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
                    <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">
                    {job?.description}
                </p>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge variant="ghost" className={'text-blue-700 font-bold'}>{job?.position} Positions</Badge>
                <Badge variant="ghost" className={'text-[#F83002] font-bold'}>{job?.jobType}</Badge>
                <Badge variant="ghost" className={'text-[#7209b7] font-bold'}>{job?.salary} LPA</Badge>
            </div>
            <div className="flex items-center gap-4 mt-4">
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                {/* <Button onClick={() => navigate(`/description/${jobId}`)} variant="outline">Details</Button> */}
                <Button className={'bg-[#7209b7]'}>Save for Later</Button>
            </div>
        </div>
    );
};

export default Job;
