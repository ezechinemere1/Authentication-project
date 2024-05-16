import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/signup"
import Signin from "./Components/signin"
import Home from "./Components/Home";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";


function App() {
  return <BrowserRouter>
   
   <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="/sign-up" element={<Signup />}></Route>
    <Route path="/sign-in" element={<Signin />}></Route>
    <Route path="/forgot-password" element={<ForgotPassword />}></Route>
    <Route path="/reset-password/:token" element={<ResetPassword />}></Route>
    <Route path="/dashboard" element={<Dashboard />}></Route>
   </Routes>
   </BrowserRouter>
   
}

export default App;
