import React, { useState } from 'react'
import { Send, Paperclip, Mic } from 'lucide-react'

const ChatArea = ({ chat }) => {
  const [inputValue, setInputValue] = useState('')

  // Sample messages for demo
  const sampleMessages = [
    {
      id: 1,
      type: 'user',
      content: 'What are React Hooks?'
    },
    {
      id: 2,
      type: 'assistant',
      content: 'React Hooks are functions that let you use state and other React features in functional components. They were introduced in React 16.8 to allow you to use state without writing class components.\n\nSome common hooks include:\n- useState: Manage state in functional components\n- useEffect: Handle side effects\n- useContext: Access context values\n- useReducer: Complex state management\n- useCallback: Memoize callback functions\n- useMemo: Memoize expensive calculations'
    },
    {
      id: 3,
      type: 'user',
      content: 'Can you give me an example of useState?'
    },
    {
      id: 4,
      type: 'assistant',
      content: 'Sure! Here\'s a simple example:\n\nimport { useState } from \'react\';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>\n        Increment\n      </button>\n    </div>\n  );\n}\n\nIn this example:\n- useState(0) creates a state variable with initial value 0\n- count is the current value\n- setCount is the function to update it\n- Each time you click the button, the count increases by 1'
    }
  ]

  const displayMessages = chat ? sampleMessages : []

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Message sending logic will be added here
      console.log('Message sent:', inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className='flex-1 flex flex-col bg-gray-900'>
      {/* Messages Area */}
      <div className='flex-1 overflow-y-auto p-6 space-y-6'>
        {chat ? (
          <>
            <div className='mb-8'>
              <h1 className='text-3xl font-bold text-white mb-2'>{chat.title}</h1>
              <p className='text-gray-400'>{chat.timestamp}</p>
            </div>

            {displayMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-2xl px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >  
                  <p className='whitespace-pre-wrap text-sm leading-relaxed'>
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='flex items-center justify-center h-full'>
            <div className='text-center'>
              <div className='text-6xl mb-4'>✨</div>
              <h2 className='text-2xl font-bold text-white mb-2'>Start a New Chat</h2>
              <p className='text-gray-400'>Select a chat from the sidebar or create a new one</p>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className='border-t border-gray-800 bg-gray-900 p-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-end gap-3'>
            <button className='p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors'>
              <Paperclip size={20} />
            </button>

            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder='Ask me anything...'
              className='flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:border-gray-600 focus:ring-1 focus:ring-gray-600 resize-none'
              rows='3'
            />

            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className='p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 text-white rounded-lg transition-colors disabled:cursor-not-allowed'
            >
              <Send size={20} />
            </button>

            <button className='p-2 text-gray-400 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors'>
              <Mic size={20} />
            </button>
          </div>
          <div className='text-xs text-gray-500 mt-2'>
            Use Shift + Enter for new line
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatArea