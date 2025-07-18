import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit to manage state

const companySlice = createSlice({      // Creating a slice named 'company' to manage company-related data
    name : 'company',       // Unique name for the slice in Redux DevTools
    initialState:{      // Initial state of this slice
        singleCompany:null,     // Stores data of a single company (for details or update view)
        companies:[],           // Stores all companies list
        searchCompanyByText:"", // Stores search text used to filter companies
    },
    reducers:{      // Reducers are functions that handle state changes
        // Sets the data of one selected company
        setSingleCompany:(state, action) => {       
            state.singleCompany = action.payload;
        },
        // Sets the list of all companies
        setCompanies:(state, action) => {
            state.companies = action.payload;
        },
        // Updates the search text used to filter/search companies
        setSearchCompanyByText:(state, action) => {
            state.searchCompanyByText = action.payload;
        }
    }
});

// Exporting individual action creators
export const {setSingleCompany, setCompanies, setSearchCompanyByText} = companySlice.actions;
export default companySlice.reducer;    // Exporting the reducer function to add it in the Redux store