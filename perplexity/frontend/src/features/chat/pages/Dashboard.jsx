import React, { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat'
import remarkGfm from 'remark-gfm'

const Dashboard = () => {
  const chat = useChat()
  const [chatInput, setChatInput] = useState('')
  const chats = useSelector((state) => state.chat.chats)
  const currentChatId = useSelector((state) => state.chat.currentChatId)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    chat.handleGetChats()
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chats, currentChatId])

  const handleSubmitMessage = (e) => {
    e.preventDefault()

    const msg = chatInput.trim()
    if (!msg) return

    chat.handleSendMessage({
      message: msg,
      chatId: currentChatId
    })

    setChatInput('')
  }

const handleDelete = (chatId) => {
  chat.handleDeleteChat(chatId)
}

  return (
    <main className='min-h-screen w-full bg-[#07090f] text-white p-4'>
      <div className='flex h-[90vh] gap-4'>

        {/* ✅ Sidebar */}
        <aside className='w-72 bg-[#080b12] rounded-2xl p-4 flex flex-col'>
          <h1 className='text-2xl font-bold mb-4'>Perplexity</h1>

          <button
            onClick={chat.createNewChat}
            className='mb-4 py-2 rounded-lg border hover:bg-white/10'
          >
            + New Chat
          </button>

          <div className='flex-1 overflow-y-auto space-y-2'>
            {Object.values(chats).map((c) => (
              <div key={c._id} className='flex items-center gap-2'>
                <button
                  onClick={() => chat.handleOpenChat(c._id, chats)}
                  className={`flex-1 text-left px-3 py-2 rounded-lg ${
                    currentChatId === c._id
                      ? 'bg-white/10'
                      : 'hover:bg-white/10'
                  }`}
                >
                  {c.title || 'New Chat'}
                </button>

                {/* ✅ Delete button */}
                <button
                  onClick={() => handleDelete(c._id)}
                  className='text-red-400 hover:text-red-600'
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* ✅ Chat Area */}
        <section className='flex-1 flex flex-col relative'>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto space-y-3 pb-24'>
            {currentChatId && chats[currentChatId] ? (
              chats[currentChatId].messages?.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[75%] px-4 py-2 rounded-xl ${
                    msg.role === 'user'
                      ? 'ml-auto bg-white/10'
                      : 'mr-auto bg-transparent'
                  }`}
                >
                  {msg.role === 'user' ? (
                    msg.content
                  ) : (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  )}
                </div>
              ))
            ) : (
              <div className='h-full flex items-center justify-center text-gray-400'>
                Start a new chat 🚀
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmitMessage}
            className='absolute bottom-0 w-full flex gap-2 bg-[#080b12] p-3 rounded-xl'
          >
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder='Ask anything...'
              className='flex-1 px-4 py-2 rounded-lg bg-transparent border outline-none'
            />
            <button
              disabled={!chatInput.trim()}
              className='px-4 py-2 rounded-lg border hover:bg-white/10 disabled:opacity-50'
            >
              Send
            </button>
          </form>

        </section>
      </div>
    </main>
  )
}

export default Dashboard