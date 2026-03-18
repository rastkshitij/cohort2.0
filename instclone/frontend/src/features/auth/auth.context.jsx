import { createContext , useState , useEffect } from "react";
import { login , getMe ,register } from "../services/auth.api.jsx";

export const Authcontext =  createContext()
export function Authprovider ({children}) {

    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)
    const handlelogin = async (username , password)=>{
    
        setloading(true)
        try{
            const response =  await login(username , password)
            setuser(response.user)
        }
        catch(err){
            console.log(err)
        }
}
    const handleRegister =  async (username , email , password)=>{
                setloading(true)
                try{
                    const response =  await register(username ,email , password)
                    setuser(response.user)
                }
                catch(err){
                    console.log(err)
                }
                finally{
                    setloading(false)
                }
        }

return <Authcontext.Provider value={{user , loading , handleRegister , handlelogin}} >
    {children}
</Authcontext.Provider>   

}