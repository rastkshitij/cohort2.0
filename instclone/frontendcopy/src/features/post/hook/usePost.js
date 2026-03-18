import {getFeed  , createPost, likePost, unlikePost} from "../services/post.api"
import { useContext } from "react"
import { postContext } from "../post.context"

export const usePost = ()=>{
    const context =  useContext(postContext)
    const {loading , setloading , Post , setPost , feed , setfeed} = context
    const handleGetFeed =  async    () =>{
        setloading(false)
        const data = await getFeed()
        setfeed(data.post)
        setloading(false)
    }
    const handlecreatepost = async( imagefile , caption) =>{
        setloading(true)
        const data = await createPost(imagefile ,  caption)
        setfeed([data.post , ...feed ])
        setloading(false)
    }
    const handlelike =  async(post)=>{
    
        const data =  await likePost(post)
        await handleGetFeed()
       
    }
     const handleunlike =  async(post)=>{
      
        const data =  await unlikePost(post)
        await handleGetFeed()
    
    }

    return {loading  , feed ,  Post , handleGetFeed , handlecreatepost ,  handlelike , handleunlike}
}