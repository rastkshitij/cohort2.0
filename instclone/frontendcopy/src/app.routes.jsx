import { createBrowserRouter } from "react-router-dom";
import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";
import Feed from "./features/post/pages/Feed"
import Createpost from "./features/post/pages/Createpost";
export const routes = createBrowserRouter([
    {
path :'/',
element : <Feed />
    },
    {
        path: '/login',
        element : <Login />
    } ,
    {
        path: '/register',
        element : <Register />
    },
    {
        path :  '/create-post',
        element : <Createpost />
    }
])