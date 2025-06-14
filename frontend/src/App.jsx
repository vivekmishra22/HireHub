// import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/ui/shared/Navbar'
import Login from './components/ui/auth/Login'
import Signup from './components/ui/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
])

function App() {

  return (
    <>
      <RouterProvider router= {appRouter} />
      {/* <Navbar/> */}
    </>
  )
}

export default App
