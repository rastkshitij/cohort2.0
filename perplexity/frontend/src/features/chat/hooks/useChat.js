import { initializeSocketconnection } from "../service/chat.socket";
import { sendMessage ,deleteMessage , getMessage , getChats } from "../service/chat.api";
import { setChats , setCurrentChatId , setError , setLoading  ,createNewChat ,addNewMessage} from "../chat.slice";
import { useDispatch, useSelector }  from  "react-redux"
import { setloading } from "../../auth/auth.slice";
import { deleteChat } from "../chat.slice"
export const useChat = ()=> {
    const dispatch =  useDispatch()
    const chats = useSelector((state) => state.chat.chats || {})

    const toMap = (arr) => {
        if (!Array.isArray(arr)) return {}
        return arr.reduce((acc, item) => {
            if (item?._id) acc[item._id] = item
            return acc
        }, {})
    }

    const handleGetChats = async () => {
        dispatch(setLoading(true))
        try {
            const data = await getChats()
            dispatch(setChats(toMap(data.chats || [])))
        } catch (error) {
            dispatch(setError(error.message || 'Failed to fetch chats'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    const handleOpenChat = (chatId, chats) => {
        dispatch(setCurrentChatId(chatId))
        if (chatId && chats[chatId] && !chats[chatId].messages) {
            dispatch(setLoading(true))
            getMessage(chatId).then(data => {
                dispatch(setChats({ ...chats, [chatId]: { ...chats[chatId], messages: data.messages || [] } }))
            }).catch(err => {
                dispatch(setError(err?.message || 'Failed to load messages'))
            }).finally(() => {
                dispatch(setLoading(false))
            })
        }
    }

    const createNewChat = () => {
        const tempId = `temp-${Date.now()}`
        dispatch(setChats({ ...chats, [tempId]: { _id: tempId, title: 'New Chat', messages: [] } }))
        dispatch(setCurrentChatId(tempId))
    }

 async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true))

    try {
        const isNewChat = !chatId || chatId.startsWith('temp-')

        const data = await sendMessage({
            message,
            chatId: isNewChat ? undefined : chatId
        })

        const { chat, aiMessage, aimessage, title } = data

        // ✅ normalize AI response
        const aiContent = aiMessage?.content || aimessage || "No response"

        if (isNewChat) {
            const newChats = { ...chats }

            if (chatId && chatId.startsWith('temp-')) {
                delete newChats[chatId]
            }

            newChats[chat._id] = {
                ...chat,
                title: title || chat.title || "New Chat",
                messages: [
                    { id: Date.now(), content: message, role: 'user' },
                    { id: Date.now() + 1, content: aiContent, role: 'ai' }
                ]
            }

            dispatch(setChats(newChats))
        } else {
            dispatch(addNewMessage({
                chatId: chat._id,
                content: message,
                role: "user"
            }))

            dispatch(addNewMessage({
                chatId: chat._id,
                content: aiContent,
                role: "ai"
            }))
        }

        dispatch(setCurrentChatId(chat._id))

    } catch (error) {
        dispatch(setError(error.message || "Message failed"))
    } finally {
        dispatch(setLoading(false))
    }
}

 async function handleDeleteChat(chatId) {
        try {
            dispatch(setLoading(true))

            if (!chatId.startsWith("temp-")) {
                await deleteMessage(chatId)
            }

            dispatch(deleteChat(chatId))

        } catch (error) {
            dispatch(setError(error.message || "Delete failed"))
        } finally {
            dispatch(setLoading(false))
        }
    }
    return  {
        initializeSocketConnection: initializeSocketconnection , handleSendMessage, handleGetChats, handleOpenChat, createNewChat ,handleDeleteChat
    }
}