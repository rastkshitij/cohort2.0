import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/Login";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
             <Route path="/" element={<h1>welcome to the app</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;