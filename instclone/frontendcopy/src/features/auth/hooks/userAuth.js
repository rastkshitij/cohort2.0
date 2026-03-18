import { useContext } from "react";
import { AuthContext } from "../../auth.context";
import { login , register ,getme } from "../services/auth.api";
export const userAuth =()=>{
    const context =  useContext(AuthContext)
    const {user , setuser , loading , setloading} = context
    
   
    const handleLogin = async (username  , password)=>{
 setloading(true)
const response =  await login(username , password)
setuser(response.user)
setloading(false)
    }
const handleRegister = async (username, email, password) => {
  try {
    setloading(true)

    const response = await register(username, email, password)

    console.log("REGISTER RESPONSE:", response)

    if (response.user) {
      setuser(response.user)
    } else {
      console.log("No user returned from backend")
    }

  } catch (error) {
    console.log("Register error:", error.response?.data || error.message)
  } finally {
    setloading(false)
  }
}
    return {
        user , loading , handleLogin , handleRegister
    }
}