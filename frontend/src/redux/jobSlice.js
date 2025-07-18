import { createSlice } from "@reduxjs/toolkit";     // Importing createSlice from Redux Toolkit

const jobSlice = createSlice({      // Creating a Redux slice named "job" to manage job-related state
    name:"job",             // This name is used as a key in the Redux store
    initialState:{          // Initial state for job-related data
        allJobs:[],         // Stores all jobs available (user-side listing)
        allAdminJobs:[],    // Stores all jobs created by admin (admin-side listing)
        singleJob:null,     // Stores details of a single job (used for view/edit)
        searchJobByText:"",     // Input text for job search field (used for filtering)
        allAppliedJobs:[],      // Stores jobs applied by the logged-in user
        searchedQuery:"",       // Another search field (could be for dashboard or live search)
    },
    reducers:{      // Reducers are functions that define how state should be updated
        setAllJobs:( state, action) => {        // Set all user-visible jobs
            state.allJobs = action.payload;
        },
        setSingleJob:(state, action) => {       // Set a single job's detail (used for job detail view or edit form)
            state.singleJob = action.payload;
        },
        setAllAdminJobs:( state, action) => {   // Set all admin-created jobs (admin dashboard)
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state, action) => { // Set search text for filtering jobs
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state, action) => {  // Set list of jobs the current user has applied to
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state, action) => {   // Set value for another search input (e.g., dashboard search)
            state.searchedQuery = action.payload;
        }
    }
});

// Exporting all actions to be used in components or async thunks
export const {setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobByText, setAllAppliedJobs, setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;        // Exporting the reducer to be used in store configuration