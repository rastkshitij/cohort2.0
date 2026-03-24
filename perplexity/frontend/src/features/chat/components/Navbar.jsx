import React from 'react'
import { Search, Settings, LogOut } from 'lucide-react'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <nav className='bg-gray-950 border-b border-gray-800 px-6 py-4 flex items-center justify-between h-16'>
      {/* Left Side - Logo and App Name */}
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg flex items-center justify-center'>
          <span className='text-white font-bold text-lg'>P</span>
        </div>
        <h1 className='text-xl font-bold text-white'>Perplexity</h1>
      </div>

      {/* Right Side - Profile Section */}
      <div className='flex items-center gap-6'>
        <button className='p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors'>
          <Search size={20} />
        </button>

        <button className='p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors'>
          <Settings size={20} />
        </button>

        <div className='flex items-center gap-3 pl-3 border-l border-gray-800'>
          <div className='text-right'>
            <p className='text-sm font-medium text-white'>
              {user?.name || 'User'}
            </p>
            <p className='text-xs text-gray-400'>
              {user?.email || 'user@example.com'}
            </p>
          </div>
          <div className='w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden'>
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className='w-full h-full object-cover'
              />
            ) : (
              <span>{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar