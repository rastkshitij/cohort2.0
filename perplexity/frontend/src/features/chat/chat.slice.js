import { createSlice, current } from "@reduxjs/toolkit";
const chatSlice  = createSlice({
    name :"chat",
    initialState : {
        chats : {},
        currentChatId :null ,
        isloading :  false ,
        error : null
    },
    reducers : {
        createNewChat : (state , action)=>{
            const {chatId , title }  =action.payload
            if (!state.chats[chatId]) {
                state.chats[chatId] = { _id: chatId, title, messages: [] }
            }
        },
        addNewMessage: (state , action) => {
            const { chatId , content , role } = action.payload
            if (state.chats[chatId]) {
                if (!state.chats[chatId].messages) state.chats[chatId].messages = []
                state.chats[chatId].messages.push({ content, role, id: Date.now() })
            }
        }
        ,setChats: ( state , action )=>{
            if (Array.isArray(action.payload)) {
                state.chats = action.payload.reduce((acc, chat) => {
                    acc[chat._id] = chat
                    return acc
                }, {})
            } else {
                state.chats = action.payload
            }
        } ,
        setCurrentChatId :  (state , action )=> {
            state.currentChatId =  action.payload
        }
        ,setLoading : (state , action) =>{
            state.isloading =  action.payload;
        }
        ,setError : (state , action) =>{
            state.error = action.payload;
        } ,
        deleteChat: (state, action) => {
    delete state.chats[action.payload]

    if (state.currentChatId === action.payload) {
        state.currentChatId = null
    }
}
    }
})

export const {setChats , setCurrentChatId , setLoading , setError ,createNewChat , addNewMessage , deleteChat} = chatSlice.actions
export default chatSlice.reducer