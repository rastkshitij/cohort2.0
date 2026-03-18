import { createContext , useState } from "react";

export const postContext = createContext()

export const PostContextProvider = ({children})=>{
 const [loading, setloading] = useState(false)
 const [Post, setPost] = useState(null)
 const [feed, setfeed] = useState(null)
  return (
    <postContext.Provider value = {{loading , setloading , Post , setPost , feed , setfeed} } >
      {children}
      </postContext.Provider>
  )
}