import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import ReelScroller from "../pages/ReelScroller";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import FoodPartnerAddListing from "../pages/FoodPartnerAddListing";
import Profile from "../pages/Profile";
import BottomNav from "../components/BottomNav";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/foodmato" element={<Landing />} />
        <Route
          path="/foodmato/reels"
          element={
            <>
              <ReelScroller />
            </>
          }
        />
        <Route path="/foodmato/profile" element={<Profile />} />
        <Route path="/foodmato/new" element={<FoodPartnerAddListing />} />
        <Route path="/foodmato/user/registration" element={<UserRegister />} />
        <Route path="/foodmato/user/login" element={<UserLogin />} />
        <Route
          path="/foodmato/partner/registration"
          element={<FoodPartnerRegister />}
        />
        <Route path="/foodmato/partner/login" element={<FoodPartnerLogin />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  );
}

export default AppRoutes;
