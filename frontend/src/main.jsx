import { StrictMode } from 'react'  // Importing StrictMode to help with highlighting potential problems in the app
import { createRoot } from 'react-dom/client'   // Importing the function to create a React root
import './index.css'    // Importing global CSS styles
import App from './App.jsx'   // Importing main App component that holds the router and all pages
import { Toaster } from './components/ui/sonner'  // Importing Toaster component for showing notifications (likely using Sonner library)

// Importing Redux store Provider to give app-wide access to the Redux state
import { Provider } from 'react-redux'
import store from './redux/store'

// Import tools for Redux persist – to store Redux state in local storage
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor = persistStore(store);

createRoot(document.getElementById('root')).render(   // Rendering the React app into the div with id="root" in index.html
  <StrictMode>  
    {/* Provide Redux store to the entire app */}
    <Provider store={store}>    
      {/* Delay rendering until persisted state has been retrieved and saved to Redux */}
      <PersistGate loading={null} persistor={persistor}>
        {/* Main app component with all routing logic */}
      <App />
      </PersistGate>
    </Provider>
    {/* Toast notification system to show alerts */}
    <Toaster /> 
  </StrictMode>,
)
