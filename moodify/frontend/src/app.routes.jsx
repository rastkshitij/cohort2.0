import {createBrowserRouter} from "react-router-dom"
import Resgister from "./features/auth/pages/Resgister"
import Login from "./features/auth/pages/Login"
import Protected from "./features/auth/component/Protected"
export const router = createBrowserRouter([
    {
        path: "/",
        element : <Protected><h1>Home...</h1></Protected>
    } ,
    {
        path : "/register",
        element : <Resgister />
    }
    ,{
        path :  "/login" 
        ,element : <Login />
    }
])