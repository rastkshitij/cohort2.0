import axios from 'axios'
const api  =  axios.create({
    baseURL : "http://localhost:3000" , 
    withCredentials :  true
})



export async function getFeed(){
    const response =  await api.get('/api/post/feed')
    return response.data
}

export async function createPost(imagefile ,  caption) {
    const formdata =  new FormData()
    formdata.append("image" , imagefile)
    formdata.append('caption' , caption)
    const response = await api.post("/api/post" ,  formdata)
    return response.data
}


export async function likePost(postId){
    const response = await api.post("/api/post/like/" + postId)
    return  response.data
}
export async function unlikePost(postId){
    const response = await api.post("/api/post/unlike/" + postId)
    return  response.data
}