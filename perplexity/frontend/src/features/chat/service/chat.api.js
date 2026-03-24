import axios from  "axios"


const api =  axios.create({
    baseURL : "http://localhost:3000" ,
    withCredentials : true
})

export const sendMessage =   async ({message , chatId}) =>{
    const payload = { message }
    if (chatId) payload.chat = chatId
    const response =  await api.post("/api/chats/message" , payload)
    return response.data
}

export const getChats = async () => {
    const response = await api.get('/api/chats')
    return response.data
}

export const getMessage = async(chatId) =>{
    const response =  await api.get(`/api/chats/${chatId}/messages`)
    return response.data
}
export const deleteMessage =  async(chatId)=>{
    const response =  await  api.delete(`/api/chats/delete/${chatId}`)
    return response.data
}