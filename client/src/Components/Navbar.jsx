import React from 'react'
import { HugeiconsIcon } from '@hugeicons/react';
import { SearchIcon,MenuIcon, CancelIcon } from '@hugeicons/core-free-icons';
import { useState } from 'react';
function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='fixed top-0 w-full backdrop-blur-sm bg-white/30 z-50'>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-semibold">
              Algo<span className="text-blue-500 font-bold">Sync</span>
              <span className="text-blue-500">...</span>
            </h1>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="search"
                
                className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-200/20 
                          focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                          placeholder-gray-400 backdrop-blur-sm"
                placeholder="Search location..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <HugeiconsIcon
                  icon={SearchIcon}
                  size={20}
                  className="text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
            >
              <HugeiconsIcon
                icon={isOpen ? CancelIcon : MenuIcon}
                size={24}
                className="text-gray-600"
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative mt-3 mb-4">
                <input
                  type="search"
                 
                  className="w-full px-4 py-2 rounded-full bg-white/10 border border-gray-200/20 
                            focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent
                            placeholder-gray-400 backdrop-blur-sm"
                  placeholder="Search Algo..."
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <HugeiconsIcon
                    icon={SearchIcon}
                    size={20}
                    className="text-gray-400"
                  />
                </div>
              </div>
              
              {/* Add any additional mobile menu items here */}
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                Home
              </a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                Forecast
              </a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors">
                Maps
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
