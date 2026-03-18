import { RouterProvider } from "react-router-dom"
import { routes } from "./app.routes"
import "./features/shared/globel.scss"
import { AuthProvider } from "./features/auth.context"
import { PostContextProvider } from "./features/post/post.context"
const App = () => {
  return ( 
    <AuthProvider >
     <PostContextProvider>
    <RouterProvider  router={routes} />
     </PostContextProvider>
    </AuthProvider>

  )
}

export default App