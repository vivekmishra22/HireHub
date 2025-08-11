import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";              // Importing Redux hook to dispatch actions
import { setSearchedQuery } from "@/redux/jobSlice";    // Importing an action to set the search query in Redux store
import { useNavigate } from "react-router-dom";

const HeroSection = () => {

    const [query, setQuery] = useState("");         // Local state to track the value typed in the search input
    const dispatch = useDispatch();                 // Redux dispatch function to dispatch actions
    const navigate = useNavigate();

    const searchJobHandler = () => {                // Function to handle search button click
        dispatch(setSearchedQuery(query));          // Dispatching the search query to Redux store
        navigate("/browse");
    }

    return (
        <div className="text-center px-4 sm:px-6 md:px-12 lg:px-24 pt-10">
            {/* <div className="flex flex-col gap-5 my-5"> */}
            <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                {/* <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
                    No. 1 Hire Hub Website
                </span> */}
                <span className="self-center px-5 py-2 rounded-full bg-cyan-100 text-cyan-700 font-medium tracking-wide text-sm sm:text-base">
                    India's #1 Job Portal for Your Career Growth
                </span>

                {/* <h1 className="text-5xl font-bold">
                    Search, Apply & <br /> Get Your
                    <span className="text-[#6A38C2]"> Dream Jobs</span>
                </h1> */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-relaxed">
                    Find, Apply & <br />Land Your <span className="text-cyan-600">Dream Job</span>
                </h1>
                <p className="text-gray-700 text-base sm:text-base md:text-lg max-w-2xl mx-auto">
                    Explore thousands of verified job listings from top companies across India. Your next opportunity awaits!
                </p>
                {/* <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
                    <input type="text" value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your dream jobs"
                        className="rounded-l-full"
                    />
                    <Button onClick={searchJobHandler}
                        className="rounded-r-full bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 transition">
                        <Search className="h-5 w-5" />
                    </Button>
                </div> */}
                <div className="flex w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto shadow-lg rounded-full overflow-hidden items-stretch">
                    <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search jobs by title, skills, or company"
                        className="flex-grow px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-300 transition rounded-l-full text-sm sm:text-base"
                        onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="rounded-r-full px-4 h-auto py-3 shadow bg-cyan-600 hover:bg-cyan-700 transition"
                        aria-label="Search Jobs"
                    >
                        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;     
