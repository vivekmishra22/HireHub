import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel" 
import { Button } from './ui/button'
import { useDispatch } from 'react-redux';              // Importing useDispatch hook to dispatch Redux actions
import { useNavigate } from 'react-router-dom';         // Importing useNavigate hook for navigation
import { setSearchedQuery } from '@/redux/jobSlice';    // Importing Redux action to set search query
// import { Carousel, CarouselContent, CarouselItem } from './carousel'

const category = [              // Static array of job categories
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {

    const dispatch = useDispatch();             // Getting dispatch function from Redux
    const navigate = useNavigate();             // Getting navigate function from React Router

    const searchJobHandler = (query) => {       // Function to dispatch search query and navigate to the Browse page
        dispatch(setSearchedQuery(query));      // Dispatch the selected category as search query
        navigate("/browse");                    // Navigate to the Browse page to show results
    }

    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        // Loop through each category and render it as a button inside the carousel
                        category.map((cat, index) => (

                            <CarouselItem className="md:basis-1/2 lg-basis-1/3">
                                {/* On click, trigger search and redirect to /browse */}
                                <Button onClick={()=> searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel;        // Exporting component to use elsewhere
