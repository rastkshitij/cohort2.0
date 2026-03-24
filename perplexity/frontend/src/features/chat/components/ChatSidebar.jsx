import React, { useState } from 'react'
import { Plus, Trash2, Edit2 } from 'lucide-react'

const ChatSidebar = ({ selectedChat, onSelectChat }) => {
  // Sample chat history data
  const [chats, setChats] = useState([
    {
      id: 1,
      title: 'React Hooks Best Practices',
      timestamp: '2 hours ago',
      preview: 'What are the best practices for using...'
    },
    {
      id: 2,
      title: 'JavaScript async/await',
      timestamp: '5 hours ago',
      preview: 'How do async/await work in JavaScript...'
    },
    {
      id: 3,
      title: 'CSS Grid Layout',
      timestamp: '1 day ago',
      preview: 'Can you explain CSS Grid layout...'
    },
    {
      id: 4,
      title: 'Python Data Structures',
      timestamp: '2 days ago',
      preview: 'What are the most common data structures...'
    },
    {
      id: 5,
      title: 'REST API Design',
      timestamp: '3 days ago',
      preview: 'Best practices for designing REST APIs...'
    },
    {
      id: 6,
      title: 'Database Optimization',
      timestamp: '1 week ago',
      preview: 'How to optimize database queries...'
    },
  ])

  const handleDeleteChat = (id, e) => {
    e.stopPropagation()
    setChats(chats.filter(chat => chat.id !== id))
    if (selectedChat?.id === id) {
      onSelectChat(null)
    }
  }

  const handleNewChat = () => {
    onSelectChat(null)
  }

  return (
    <div className='w-64 bg-gray-950 border-r border-gray-800 flex flex-col h-full'>
      {/* New Chat Button */}
      <div className='p-4 border-b border-gray-800'>
        <button
          onClick={handleNewChat}
          className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors'
        >
          <Plus size={18} />
          <span className='text-sm font-medium'>New Chat</span>
        </button>
      </div>

      {/* Chat History */}
      <div className='flex-1 overflow-y-auto'>
        <div className='p-3 space-y-2'>
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`p-3 rounded-lg cursor-pointer transition-colors group ${
                selectedChat?.id === chat.id
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
            >
              <div className='flex justify-between items-start gap-2'>
                <div className='flex-1 min-w-0'>
                  <h3 className='text-sm font-medium text-white truncate'>
                    {chat.title}
                  </h3>
                  <p className='text-xs text-gray-600 mt-1'>{chat.timestamp}</p>
                </div>
                <button
                  onClick={(e) => handleDeleteChat(chat.id, e)}
                  className='opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-400 transition-opacity'
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='border-t border-gray-800 p-4 space-y-2'>
        <button className='w-full text-left text-sm text-gray-400 hover:text-gray-300 px-2 py-2 rounded transition-colors'>
          Settings
        </button>
        <div className='pt-2 border-t border-gray-800'>
          <p className='text-xs text-gray-500 px-2'>Signed in as: User</p>
        </div>
      </div>
    </div>
  )
}

export default ChatSidebar