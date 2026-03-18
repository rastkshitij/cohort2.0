import AppRoutes from "./routes";
import './style.css'
import { Authprovider } from "./features/auth/auth.context.jsx";
const App = () => {
  return <>
<Authprovider>
  <AppRoutes />
</Authprovider>

  </>;
};

export default App;