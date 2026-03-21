import { useDispatch } from "react-redux"

 import { registerUser  , loginUser , getme } from "../services/auth.api"
import { setError, setloading, setUser } from "../auth.slice"

 export function useAuth(){
    const dispatch  = useDispatch()
    async function handleRegister(params) {
        try{
            dispatch(setloading(true))
            const data = await registerUser({email , username , password})

        }catch(err){
            dispatch(setError(err.reponse?.data?.message || "Registration Failed"))
        } finally{
            dispatch(setloading(false))
        }
    }
async function handleLogin({ email, password }) {
    try {
        dispatch(setloading(true))

        const res = await loginUser({ email, password })

        console.log("LOGIN:", res)

        dispatch(setUser(res.data.user))

        return res.data   // ✅ IMPORTANT

    } catch (err) {
        dispatch(setError(err.response?.data?.message || "Login Failed"))
        return null       // ✅ IMPORTANT
    } finally {
        dispatch(setloading(false))
    }
}
    async function handleGetme(){
        try{
            dispatch(setloading(true))
                  const res = await getme()
           
        dispatch(setUser(res.data.user))  
        }catch(err){
            dispatch(setError(err.reponse?.data?.message || "failed to fetchg user data"))
        }finally{
            dispatch(setloading(false))
        }
    }

    return {
        handleRegister , handleLogin , handleGetme
    }
 }