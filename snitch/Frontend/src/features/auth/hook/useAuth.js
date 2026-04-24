import { setUser , setError , setLoading } from "../state/auth.slice";
import { register}  from "../services/auth.api.js";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    async function handleRegister({ email , password , fullname ,  contact , isSeller =  false }) {
    const data =  await register({ email , password , fullname ,  contact   , isSeller})
    dispatch(setUser(data))
}
return { handleRegister}
}