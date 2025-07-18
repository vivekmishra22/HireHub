import { combineReducers, configureStore } from "@reduxjs/toolkit";     // Import core Redux Toolkit functions

// Import individual slice reducers
import authSlice from "./authSlice";        
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";

import {        // Import persistence utilities from redux-persist
    persistReducer,     // To wrap the rootReducer for persistence
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER   // Constants for serializableCheck middleware
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'     // Uses localStorage for persistence

const persistConfig = {
    key: 'root',        // The key under which the root reducer state will be stored in localStorage
    version: 1,         // Versioning your persisted data (useful for migrations)
    storage,            // Specifies the storage engine (localStorage here)
}

const rootReducer = combineReducers({       // Combine All Reducers
    auth: authSlice,        // Stores authentication-related state
    job: jobSlice,          // Stores job-related state
    company: companySlice,  // Stores company-related state
    application:applicationSlice    // Stores job application-related state
})

const persistedReducer = persistReducer(persistConfig, rootReducer);    // Wrap Reducer with Persistence

const store = configureStore({      // 🛠 Configure Redux Store
    reducer: persistedReducer,      // Using persisted version of root reducer
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {    // Ignore these specific redux-persist actions to avoid warnings
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

// const store = configureStore({
//     reducer: {
//         auth: authSlice,
//         job: jobSlice
//     }
// });

export default store;       // 📤 Export Store