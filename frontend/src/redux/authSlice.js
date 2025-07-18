// Importing createSlice from Redux Toolkit to create a slice of the Redux state
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({     // Creating a slice named 'auth' to manage authentication-related state
    name:"auth",        // Unique name for this slice in the Redux store
    initialState:{      // Initial state for the auth slice
        loading:false,  // Used to show loader during API requests
        user:null       // Stores the logged-in user's data, initially null
    },
    reducers:{      // Reducers: Functions that modify state based on dispatched actions
        // Action to update the 'loading' state (true or false) 
        setLoading:(state, action) => {
            state.loading = action.payload;     // e.g., true during login, false when done
        },
        setUser:(state, action) => {        // Action to update the 'user' state with user data after login/signup
            state.user = action.payload;    // e.g., { id, name, email, role }
        }
    }
});

export const {setLoading, setUser} = authSlice.actions; // Exporting the individual action creators so they can be dispatched
export default authSlice.reducer;       // Exporting the reducer to be included in the Redux store setup