import axios from "axios";


const authApiInstance = axios.create({
    baseURL : "http://localhost:3000/api/auth",
  withCredentials: true
})

const register = async ({email , password , fullname ,  contact , isSeller =  false })=>{
    const response = await authApiInstance.post("/register",{
        email , password , fullname ,  contact , isSeller
    })
    return response
}