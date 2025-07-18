import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice function from Redux Toolkit to create a slice of the Redux store

const applicationSlice = createSlice({      // Creating a slice named 'application'
    name:'application',     // Name of the slice
    initialState:{      // Initial state for this slice
        applicants:[],  // This holds the list of job applicants (can be updated later)
    },
    reducers:{      // Reducers are functions that modify the state
        // This reducer will update the 'applicants' state with new data
        setAllApplicants:(state, action) => {
            state.applicants = action.payload;  // Replace applicants array with the payload data
        }
    }
});

export const {setAllApplicants} = applicationSlice.actions; // Exporting the action (so you can dispatch it from components or async thunks)
export default applicationSlice.reducer;        // Exporting the reducer to be added to the Redux store