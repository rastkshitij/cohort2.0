import { AuthContext } from "../auth.context"
import {login  , register, getme , logout} from "../services/auth.api"
import { useContext } from "react"


export  const useAuth =()=>{
    const context = useContext(AuthContext)
    const {user , setuser , loading , setloading}=context
  async function handleRegister(username, email, password) {
    setloading(true)

    const data = await register(email, password, username)

    setuser(data.user)
    setloading(false)
}
 async function handleLogin({ email, password }) {

        setloading(true)

        const data = await login({ email, password })

        setuser(data.user)

        setloading(false)
    }
    async function handleGetMe(){
        setloading(true)
        const data =  await getme()
        setuser(data.use)
    }
    async function handleLogout(){
        setloading(true)
        const data =  await logout()
        setuser(null)
        setloading(false)
    }
    return ({
        user, loading , handleLogin , handleLogout , handleGetMe , handleRegister
    })
}
