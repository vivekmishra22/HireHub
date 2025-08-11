import React from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <div className="min-h-screen text-gray-800 flex flex-col transition-all duration-300">
      <Navbar />
      <Toaster
        position="top-right"
        toastOptions={{
          className:
            'bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg shadow-lg transition-all duration-300',
        }}
      />
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default Layout
