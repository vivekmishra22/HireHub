import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useDispatch } from 'react-redux'             // Hook to dispatch Redux actions
import { setSearchedQuery } from '@/redux/jobSlice'   // Action to update the searched query in Redux state

const filterData = [          // Predefined filter categories with options
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0 - 40k", "42-1lakh", "1lakh to 5lakh"]
  },
]

const FilterCard = () => {

  const [selectedValue, setSelectedValue] = useState("");   // State to store the selected filter value
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);          // Updates the selected value when user selects a filter
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));    // Whenever selectedValue changes, dispatch it to Redux store
  },[selectedValue]);
  
  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler} >
        {
          filterData.map((data, index) => (
            <div>
              {/* Key prop added to avoid React warning */}
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId=`r${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard;    //   Exporting component for use elsewhere
