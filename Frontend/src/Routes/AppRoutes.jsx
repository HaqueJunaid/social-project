import { BrowserRouter, Routes, Route } from "react-router-dom"
import UserRegister from "../pages/UserRegister"
import UserLogin from "../pages/UserLogin"
import FoodPartnerRegister from "../pages/FoodPartnerRegister"
import FoodPartnerLogin from "../pages/FoodPartnerLogin"
import ReelScroller from "../pages/ReelScroller"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<><ReelScroller /></>} />
        <Route path="/user/registration" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/foodpartner/registration" element={<FoodPartnerRegister />} />
        <Route path="/foodpartner/login" element={<FoodPartnerLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes